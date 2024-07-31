import { submitUpdateAttendance } from "../../../modules/attendance/edit/edit-attendance.service";
import { openModal } from "../../listItem/listItem.service";
import { searchUserAttendance } from "../attendance.helper";

export async function showEditAttendanceModal(
  userConceptId: string = "",
  currentDate: string = ""
) {
  if (isNaN(parseInt(userConceptId))) return;

  const attendanceList = await searchUserAttendance(
    parseInt(userConceptId),
    currentDate
  );
  console.log("open Edit Attendance Modal clicked!", attendanceList);
  await openModal("edit-attendance-modal");

  if (attendanceList.length == 0) return;
  let form = "";

  const formDataContainer = document.getElementById(
    "edit-attendance-form-data"
  );
  const editAttendanceForm = document.getElementById(
    "editAttendanceForm"
  ) as HTMLFormElement;

  editAttendanceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitUpdateAttendance(e, attendanceList);
  });

  for (let i = 0; i < attendanceList.length; i++) {
    const attendance = attendanceList[i];

    form += `
        <div class="my-4">
            <label 
                for="checkin_${attendance.id}" 
                class="block text-sm font-medium leading-6 text-gray-900">
                Check In
                <span class="text-rose-400">*</span>
            </label>
            <div class="mt-2">
                <input 
                    type="datetime-local" 
                    name="checkin_${attendance.id}" 
                    id="checkin_${attendance.id}" 
                    value="${
                      attendance.checkin
                        ? formatedLocalDate(attendance.checkin)
                        : ""
                    }"
                    class="block w-full rounded-md border-0 px-3 py-2 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div class="my-4">
            <label 
                for="checkout_${attendance.id}" 
                class="block text-sm font-medium leading-6 text-gray-900">
                Check Out
                <span class="text-rose-400">*</span>
            </label>
            <div class="mt-2">
                <input
                    type="datetime-local" 
                    name="checkout_${attendance.id}" 
                    id="checkout_${attendance.id}" 
                    value="${
                      attendance.checkout
                        ? formatedLocalDate(attendance.checkout)
                        : ""
                    }"
                    class="block w-full rounded-md border-0 px-3 py-2 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
    `;
    if (i < attendanceList.length - 1) {
      form += `<div class="flex flex-row items-center justify-center gap-4"><hr class="w-8 border border-gray-400 dark:border-gray-600"><p>Break</p><hr class="w-8 border border-gray-400 dark:border-gray-600"></div>`;
    }
  }

  form += `
        <div class="my-4">
            <label for="remarks" class="block text-sm font-medium leading-6 text-gray-900">Remarks<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
                <textarea name="remarks" id="remarks" required
                class="block w-full rounded-md border-0 px-3 py-2 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
        </div>
    `;
  if (formDataContainer) formDataContainer.innerHTML = form;
}

function formatedLocalDate(date: any) {
  const timestamp = new Date(date);
  timestamp.setMinutes(timestamp.getMinutes() - timestamp.getTimezoneOffset());
  return timestamp.toISOString().slice(0, 16);
}
