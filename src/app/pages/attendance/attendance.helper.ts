import {
  FilterSearch,
  SearchLinkMultipleAll,
  SearchQuery,
} from "mftsccs-browser";
import { MONTHS } from "../../constants/time.constants";
import { getLocalStorageData } from "../../services/helper.service";

export type Attendance = {
  id: any;
  checkin: any;
  checkout?: any;
  status: any;
  createdAt?: any;
  remarks?: any;
};

export function generateYearOptions() {
  let yearOptions = "";
  let currentYear = 2024;
  do {
    yearOptions += `
          <option value="${currentYear}" ${
      currentYear == new Date().getFullYear() && "selected"
    }>
        ${currentYear}
        </option>`;
    currentYear += 1;
  } while (currentYear <= new Date().getFullYear());

  return yearOptions;
}

export function generateMonthOptions() {
  let monthOptions = "";
  for (let i = 0; i < MONTHS.length; i++) {
    const month = MONTHS[i];
    monthOptions += `
        <option value="${i <= 9 ? `0${i}` : i}" ${
      i == new Date().getMonth() && "selected"
    }>
        ${month}
        </option>
        `;
  }
  return monthOptions;
}

export function getDuration(timeMs: number) {
  const days = Math.floor(timeMs / (60 * 60 * 24 * 1000));
  const hours = Math.floor(timeMs / (60 * 60 * 1000)) - days * 24;
  const minutes =
    Math.floor(timeMs / (60 * 1000)) - (days * 24 * 60 + hours * 60);
  const seconds =
    Math.floor(timeMs / 1000) -
    (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
  let timeFormat = "";
  if (hours) timeFormat += `${hours}h `;
  if (minutes) timeFormat += `${minutes}m `;
  if (seconds) timeFormat += `${seconds}s `;

  return timeFormat;
}

export function getDateInMonth(year: number, month: number) {
  let date = new Date(year, month - 1, 1);
  let dates = [];

  while (date.getMonth() === month - 1) {
    dates.push(formatDate(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

/**
 * Method to search the user attendance
 * @param compositionId string
 * @param searchDate string
 * @returns Promise<Attendance[]>
 */
export async function searchUserAttendance(
  compositionId: number,
  searchDate: string
) {
  const profileStorageData: any = await getLocalStorageData();
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
  searchQuery.composition = compositionId;
  searchQuery.fullLinkers = ["the_user_s_attendance"];
  searchQuery.page = 1;
  searchQuery.inpage = 100;
  searchQuery.doFilter = true;

  const attendanceQuery = new SearchQuery();
  attendanceQuery.logic = "or";
  attendanceQuery.fullLinkers = [
    "the_attendance_checkin",
    "the_attendance_checkout",
    "the_attendance_status",
  ];
  attendanceQuery.filterSearches = [checkInFilter];
  attendanceQuery.doFilter = true;

  console.log(searchQuery);

  const user = await SearchLinkMultipleAll(
    [searchQuery, attendanceQuery],
    token
  );
  console.log(
    searchDate,
    "abcbedaa",
    user?.data?.["the_user"]?.["the_user_s_attendance"]
  );

  // TODO:: filter data to proper form
  return await formatUserAttendance(
    user?.data?.["the_user"]?.["the_user_s_attendance"]
  );
}

/**
 * Method to format Indivisual User Attendance
 * @param attendanceList any[]
 * @returns Promise<Attendance[]>
 */
async function formatUserAttendance(attendanceList: any[]) {
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

export function formatUserComposition(user: any) {
  console.log(user);
  return {
    id: user.id,
    email: user?.data?.the_user?.user_data?.primary_email,
    firstName: user?.data?.the_user?.entity?.person?.first_name,
    lastName: user?.data?.the_user?.entity?.person?.last_name,
    profileImg:
      user?.data?.the_user?.entity?.person?.profile_img ||
      "https://apitest.boomconcole.com/uploads/f5542452-47ea-4c1d-9a30-6e0305961a17.png",
  };
}

/**
 * Method to fetch the monthly attendance which returns table rows
 * @returns string
 */
export async function getUserMonthlyAttendanceRows(
  monthlyAttendance: Attendance[],
  showActions: boolean = false,
  userConceptId?: number
) {
  if (
    monthlyAttendance.length == 0 ||
    (monthlyAttendance?.[0]?.checkin?.split(0, 4) < new Date().getFullYear() &&
      monthlyAttendance?.[0]?.checkin?.split(5, 6) < new Date().getMonth())
  ) {
    return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" colspan="8" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-center dark:text-white">No Attendance Found</td>
        </tr>`;
  }

  let attendanceRows = "";

  const dateList = getDateInMonth(
    new Date(monthlyAttendance?.[0]?.checkin).getFullYear(),
    new Date(monthlyAttendance?.[0]?.checkin).getMonth() + 1
  );
  dateList.forEach((date: string) => {
    const attendances = monthlyAttendance.filter(
      (attendance) =>
        attendance?.checkin?.includes(date) ||
        attendance?.checkout?.includes(date)
    );
    const obj: any = {
      ids: [],
      currentDate: date,
      times: -1,
    };
    attendances.map((attendance) => {
      obj.ids.push(attendance.id);
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
      obj.times += 1;
    });

    attendanceRows +=
      '<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">';
    attendanceRows += `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">${obj.currentDate}</td>
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
            ${
              obj.currentDate
                ? new Date(obj.currentDate).toLocaleString("en-us", {
                    weekday: "short",
                  })
                : ""
            }
        </td>
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
            ${obj.checkin ? new Date(obj.checkin).toLocaleTimeString() : ""}
        </td>
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
            ${obj.times > 0 ? `${obj.times} time(s)` : ""}
        </td>
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
            ${obj.checkout ? new Date(obj.checkout).toLocaleTimeString() : ""}
        </td>
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
            ${obj.workingTime ? getDuration(obj.workingTime) : ""}
        </td>
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
            <!-- ${obj.count > 0 ? `Present` : ""} -->
            ${obj.checkin ? "Present" : obj?.status || ""}
        </td>
        `;
    if (showActions && userConceptId) {
      attendanceRows += `
        <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-opacity-25 ${
          obj.checkin ? "bg-green-400" : obj.status == "Absent" && "bg-red-400"
        }">
          <div class="flex flex-row items-center gap-2">
            <a role="button" 
              onclick="showEditAttendanceModal(
                '${userConceptId}', '${obj.currentDate}')" 
              class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
              <span class="sr-only">Icon Edit</span>
            </a>
          </div>
        </td>
        `;
    }
    attendanceRows += "</tr>";
  });

  return attendanceRows;
}

function formatDate(date: any) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
