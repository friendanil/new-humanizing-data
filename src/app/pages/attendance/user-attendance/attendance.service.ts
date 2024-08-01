import {
  GetTheConceptLocal,
  LocalSyncData,
  MakeTheInstanceConceptLocal,
} from "mftsccs-browser";
import { getLocalStorageData } from "../../../services/helper.service";
import { createEntityInstance } from "../../../services/createEntityInstance.service";
import { CreateConnectionBetweenEntityLocal } from "../../../services/entity.service";
import {
  Attendance,
  getDuration,
  getUserMonthlyAttendanceRows,
  searchUserAttendance,
} from "../attendance.helper";

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
  const attendanceList = await searchUserAttendance(
    userConceptId,
    new Date().toISOString().slice(0, 10)
  );
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
  const profileStorageData: any = await getLocalStorageData();
  const userConceptId = profileStorageData?.userConcept;

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

  const monthlyDate = `${yearSelect.value}-${
    parseInt(monthSelect.value) + 1 < 9 ? "0" : ""
  }${parseInt(monthSelect.value) + 1}`;
  const monthlyAttendanceList = await searchUserAttendance(
    userConceptId,
    monthlyDate
  );
  console.log("list", monthlyAttendanceList, monthlyTableBody);

  const attendanceListHTML = await getUserMonthlyAttendanceRows(
    monthlyAttendanceList,
    monthlyDate
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

  if (attendanceList?.length == 0) {
    checkInBtn.disabled = false;
    checkOutBtn.disabled = true;
    return;
  }
  // for absent case checkin and checkout value is ''
  let checkin = true;
  for (let i = 0; i < attendanceList.length; i++) {
    const attendance = attendanceList[i];
    if (!attendance.checkin && !attendance.checkout) {
      checkin = true;
      break;
    } else if (attendance.checkin && !attendance.checkout) {
      checkin = false;
      break;
    }
  }
  if (checkin) {
    checkInBtn.disabled = false;
    checkOutBtn.disabled = true;
  } else {
    checkInBtn.disabled = true;
    checkOutBtn.disabled = false;
  }
  return;
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

  let checkin = true;
  let attendanceId = 0;
  let ids: any[] = [];
  for (let i = 0; i < attendanceList.length; i++) {
    const attendance = attendanceList[i];
    ids.push(attendance.id);
    if (!attendance.checkin && !attendance.checkout) {
      checkin = true;
      attendanceId = attendance.id;
    } else if (attendance.checkin && !attendance.checkout) {
      checkin = false;
      attendanceId = attendance.id;
    }
  }
  console.log(ids, "ids");
  if (!checkin) return await GetTheConceptLocal(attendanceId);
  return;
  if (attendanceList[0]?.checkin && !attendanceList[0]?.checkout)
    return await GetTheConceptLocal(attendanceList[0]?.id);
  return;
}
