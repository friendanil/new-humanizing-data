import {
  FilterSearch,
  GetTheConceptLocal,
  LocalSyncData,
  MakeTheInstanceConceptLocal,
  SearchLinkMultipleAll,
  SearchQuery,
} from "mftsccs-browser";
import { getLocalStorageData } from "../../services/helper.service";
import { createEntityInstance } from "../../services/createEntityInstance.service";
import { CreateConnectionBetweenEntityLocal } from "../../services/entity.service";
import { getDuration } from "./attendance.helper";

export type Attendance = {
  id: any;
  checkin: any;
  checkout?: any;
  status: any;
  createdAt?: any;
};

let processingAttendance = false;

export async function handleAttendanceClick() {
  if (processingAttendance) return;
  processingAttendance = true;
  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const userConceptId = profileStorageData?.userConcept;

  const checkInBtn = document.getElementById(
    "checkin-btn"
  ) as HTMLButtonElement;
  const checkOutBtn = document.getElementById(
    "checkout-btn"
  ) as HTMLButtonElement;

  const userConcept = await GetTheConceptLocal(userConceptId);

  // check if the user have already logged in
  const attendanceList = await searchAttendance("");
  const attendanceConcept = await haveActiveAttendance(attendanceList);
  console.log("attendanceList", attendanceConcept);

  if (attendanceConcept) {
    // checkout
    const checkoutConcept = await MakeTheInstanceConceptLocal(
      "checkout",
      new Date().toISOString(),
      false,
      userId,
      4
    );
    await CreateConnectionBetweenEntityLocal(
      attendanceConcept,
      checkoutConcept,
      "checkout"
    );
    // enable checkin
    checkInBtn.disabled = false;
    checkOutBtn.disabled = true;
  } else {
    // checkin
    const attendanceEntityConcept = await createEntityInstance(
      "attendance",
      userId,
      {
        checkin: new Date().toISOString(),
        status: "Present",
      }
    );
    await CreateConnectionBetweenEntityLocal(
      userConcept,
      attendanceEntityConcept,
      "s_attendance"
    );

    // enable checkout
    checkInBtn.disabled = true;
    checkOutBtn.disabled = false;
  }

  await LocalSyncData.SyncDataOnline();
  processingAttendance = false;
}

export async function handleMonthlyDateChange() {
    const monthlyTableBody = document.getElementById('monthly-attendance') as HTMLTableElement
    const yearSelect = document.getElementById('filter-attendance-year') as HTMLSelectElement
    const monthSelect = document.getElementById('filter-attendance-month') as HTMLSelectElement
    console.log('monthlyDateChange', `${yearSelect.value}-${monthSelect.value}`)

    const monthlyAttendanceList = await searchAttendance(`${yearSelect.value}-${monthSelect.value + 1}`)
    console.log('list', monthlyAttendanceList, monthlyTableBody)

    const attendanceListHTML = await fetchMonthlyAttendance(monthlyAttendanceList)

    monthlyTableBody.innerHTML = attendanceListHTML
}

/**
 * Method to search the attendance
 * @param searchDate string
 * @returns Promise<Attendance[]>
 */
export async function searchAttendance(searchDate: string) {
  const profileStorageData: any = await getLocalStorageData();
  const userConceptId = profileStorageData?.userConcept;
  const token = profileStorageData?.token;

  const checkInFilter = new FilterSearch();
  checkInFilter.type = "checkin";
  checkInFilter.logicoperator = "like";
  checkInFilter.search = `%${searchDate}%`;
  checkInFilter.composition = false;

  //   const checkOutFilter = new FilterSearch();
  //   checkOutFilter.type = "checkin";
  //   checkOutFilter.logicoperator = "=";
  //   checkOutFilter.search = "2024";
  //   checkOutFilter.composition = false;

  const searchQuery = new SearchQuery();
  searchQuery.composition = userConceptId;
  searchQuery.fullLinkers = ["the_user_s_attendance"];
  searchQuery.page = 1;
  searchQuery.inpage = 100;

  const attendanceQuery = new SearchQuery();
  attendanceQuery.logic = "or";
  attendanceQuery.fullLinkers = [
    "the_attendance_checkin",
    "the_attendance_checkout",
    "the_attendance_status",
  ];
  //   attendanceQuery.filterSearches = [checkInFilter]

  console.log(searchQuery);

  const user = await SearchLinkMultipleAll(
    [searchQuery, attendanceQuery],
    token
  );
  console.log(user, "data");

  // TODO:: filter data to proper form
  return await formatAttendance(
    user?.data?.["the_user"]?.["the_user_s_attendance"]
  );
}

/**
 * Method to get the daily attendance table rows
 * @returns string
 */
export function getActiveAttendanceRows(attendanceList: Attendance[]) {
  if (attendanceList?.length == 0) {
    return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" colspan="7" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white">Haven't logged today</td>
            </tr>
        `;
  }

  let todayAttendanceRows = "";
  for (let i = 0; i < attendanceList?.length; i++) {
    const attendance = attendanceList[i];
    let workingTime = "";
    if (attendance?.checkin && attendance?.checkout) {
      const diffTime =
        new Date(attendance.checkout).getTime() -
        new Date(attendance.checkin).getTime();

      workingTime = getDuration(diffTime);
    }

    todayAttendanceRows += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${
              i + 1
            }</td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${new Date(attendance.checkin).toLocaleTimeString()}
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${
                  attendance?.checkout
                    ? new Date(attendance.checkout).toLocaleTimeString()
                    : ""
                }
            </td>
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${workingTime}
            </td>
        </tr>
        `;
  }

  return todayAttendanceRows;
}

/**
 * Method to fetch the monthly attendance which returns table rows
 * @returns string
 */
export async function fetchMonthlyAttendance(monthlyAttendance: Attendance[]) {
  if (monthlyAttendance.length == 0) {
    return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" colspan="7" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white">No Attendance Found</td>
            </tr>`;
  }

  let attendanceRows = "";
  for (let i = 0; i < monthlyAttendance?.length; i++) {
    const attendance = monthlyAttendance[i];

    attendanceRows += `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">2020-12-4</td>
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                    Sun
                </td>
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                    06:00
                </td>
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                1 time(s)
                </td>
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                    06:00
                </td>
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                    8hr 42min
                </td>
                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                    Present
                </td>
            </tr>
        `;
  }

  return attendanceRows;
}

export function enableButtons(attendanceList: Attendance[]) {
  const checkInBtn = document.getElementById(
    "checkin-btn"
  ) as HTMLButtonElement;
  const checkOutBtn = document.getElementById(
    "checkout-btn"
  ) as HTMLButtonElement;

  // for absent case checkin and checkout value is ''
  if (
    attendanceList?.length == 0 ||
    (!attendanceList?.[0]?.checkin && !attendanceList?.[0]?.checkout) ||
    (attendanceList?.[0]?.checkin && attendanceList?.[0]?.checkout)
  ) {
    checkInBtn.disabled = false;
    checkOutBtn.disabled = true;
    return;
  } else if (attendanceList?.[0]?.checkin && !attendanceList?.[0]?.checkout) {
    checkInBtn.disabled = true;
    checkOutBtn.disabled = false;
  }
}


async function haveActiveAttendance(attendanceList: any) {
  if (attendanceList?.length == 0) return;

  if (attendanceList[0]?.checkin && !attendanceList[0]?.checkout)
    return await GetTheConceptLocal(attendanceList[0]?.id);
  return;
}

async function formatAttendance(attendanceList: any[]) {
  if (attendanceList?.length == 0) return [];
  return Promise.all(
    attendanceList?.map((attendance: any) => {
      return {
        id: attendance.id,
        checkin:
          attendance?.data?.[`the_attendance`]?.[`the_attendance_checkin`]?.[0]
            ?.data?.["the_checkin"],
        checkout:
          attendance?.data?.[`the_attendance`]?.[`the_attendance_checkout`]?.[0]
            ?.data?.["the_checkout"],
        status:
          attendance?.data?.[`the_attendance`]?.[`the_attendance_status`]?.[0]
            ?.data?.["the_status"],
        createdAt: attendance?.created_at,
      };
    }) || []
  );
}

