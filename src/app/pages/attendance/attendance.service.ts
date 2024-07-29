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
import { getDateInMonth, getDuration } from "./attendance.helper";
import { DAYS } from "../../constants/time.constants";

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
  console.log(attendanceConcept);
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
    console.log("checkin");

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
  const monthlyTableBody = document.getElementById(
    "monthly-attendance"
  ) as HTMLTableElement;
  const yearSelect = document.getElementById(
    "filter-attendance-year"
  ) as HTMLSelectElement;
  const monthSelect = document.getElementById(
    "filter-attendance-month"
  ) as HTMLSelectElement;
  console.log("monthlyDateChange", `${yearSelect.value}-${monthSelect.value}`);

  const monthlyAttendanceList = await searchAttendance(
    `${yearSelect.value}-${parseInt(monthSelect.value) + 1 < 9 ? "0" : ""}${
      parseInt(monthSelect.value) + 1
    }`
  );
  console.log("list", monthlyAttendanceList, monthlyTableBody);

  const attendanceListHTML = await fetchMonthlyAttendance(
    monthlyAttendanceList
  );

  monthlyTableBody.innerHTML = attendanceListHTML;
}

/**
 * Method to show active running timer
 */
export async function tickTimer() {
  const timerEl = document?.getElementById("tick-timer");
  if (timerEl)
    setInterval(() => {
      timerEl.innerText = new Date().toLocaleString();
    }, 1000);
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
  console.log(searchDate, "seachdate");

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
  attendanceQuery.filterSearches = [checkInFilter];

  console.log(searchQuery);

  const user = await SearchLinkMultipleAll(
    [searchQuery, attendanceQuery],
    token
  );
  console.log("avc, ", [searchQuery, attendanceQuery]);
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
  console.log("att", attendanceList);

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
  if (
    monthlyAttendance.length == 0 ||
    (monthlyAttendance?.[0]?.checkin?.split(0, 4) < new Date().getFullYear() &&
      monthlyAttendance?.[0]?.checkin?.split(5, 6) < new Date().getMonth())
  ) {
    return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" colspan="7" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white">No Attendance Found</td>
            </tr>`;
  }

  let attendanceRows = "";

  const dateList = getDateInMonth(
    new Date(monthlyAttendance?.[0]?.checkin).getFullYear(),
    new Date(monthlyAttendance?.[0]?.checkin).getMonth() + 1
  );
  dateList.forEach((date: string) => {
    if (new Date().getTime() > new Date(date).getTime()) return;

    const attendances = monthlyAttendance.filter(
      (attendance) =>
        attendance?.checkin?.includes(date) ||
        attendance?.checkout?.includes(date)
    );
    const obj: any = {
      currentDate: date,
      count: -1,
    };
    attendances.map((attendance) => {
      if (!obj.checkin && attendance.checkin) obj.checkin = attendance.checkin;
      else if (obj.checkin && attendance.checkin) {
        if (
          new Date(attendance.checkin).getTime() -
            new Date(obj.checkin).getTime() <=
          0
        ) {
          obj.checkin = attendance.checkin;
        }
      }

      if (!obj.checkout && attendance.checkout)
        obj.checkout = attendance.checkout;
      else if (obj.checkout && attendance.checkout) {
        if (
          new Date(attendance.checkout).getTime() -
            new Date(obj.checkout).getTime() >=
          0
        ) {
          obj.checkout = attendance.checkout;
        }
      }
      if (attendance.checkin && attendance.checkout) {
        if (!obj.workingTime)
          obj.workingTime =
            new Date(attendance.checkout).getTime() -
            new Date(attendance.checkin).getTime();
        else
          obj.workingTime +=
            new Date(attendance.checkout).getTime() -
            new Date(attendance.checkin).getTime();
      }
      obj.count += 1;
    });

    attendanceRows += `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">${
            obj.currentDate
          }</td>
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
              ${obj.currentDate ? DAYS[new Date(obj.currentDate).getDay()] : ''}
          </td>
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
              ${obj.checkin ? new Date(obj.checkin).toLocaleTimeString() : ""}
          </td>
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
              ${obj.count > 0 ? `${obj.count} time(s)` : ""}
          </td>
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
              ${obj.checkout ? new Date(obj.checkout).toLocaleTimeString() : ""}
          </td>
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
              ${obj.workingTime? getDuration(obj.workingTime) : ''}
          </td>
          <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
              ${obj.count > 0 ? `Present` : ""}
          </td>
      </tr>
  `;
  });

  console.log("herearasfdasfa", attendanceRows);

  //   for (let i = 0; i < monthlyAttendance?.length; i++) {
  //     const attendance = monthlyAttendance[i];

  //     attendanceRows += `
  //             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">2020-12-4</td>
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
  //                     Sun
  //                 </td>
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
  //                     06:00
  //                 </td>
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
  //                 1 time(s)
  //                 </td>
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
  //                     06:00
  //                 </td>
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
  //                     8hr 42min
  //                 </td>
  //                 <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
  //                     Present
  //                 </td>
  //             </tr>
  //         `;
  //   }

  return attendanceRows;
}

/**
 * Method to enable and disable checkin buttons
 * @param attendanceList Attendance[]
 */
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
