import { GetCompositionWithId } from "mftsccs-browser";
import mainViewClass from "../../../default/mainView.class";
import { updateContent } from "../../../routes/renderRoute.service";
import { getLocalStorageData } from "../../../services/helper.service";
import {
  formatUserComposition,
  generateMonthOptions,
  generateYearOptions,
  getUserMonthlyAttendanceRows,
  searchUserAttendance,
} from "../attendance.helper";
import { handleMonthlyDateChange } from "../user-attendance/attendance.service";
import editAttendanceModalHTML from "../../../modules/attendance/edit/edit-attendance-modal.index";
import { showEditAttendanceModal } from "./indivisual-attendance.service";

export default class extends mainViewClass {
  userConcept!: number;

  constructor(params: { [key: string]: string }) {
    super(params);
    this.userConcept = parseInt(params.userConcept);
    if (isNaN(this.userConcept)) {
      updateContent("/404");
    }
  }

  async getHtml(): Promise<string> {
    (window as any).handleMonthlyDateChange = handleMonthlyDateChange;
    (window as any).showEditAttendanceModal = showEditAttendanceModal;

    const monthlyDate = `${new Date().getFullYear()}-${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}`;

    const profileStorageData: any = await getLocalStorageData();
    const userConceptId = profileStorageData?.userConcept;

    const [monthlyAttendanceList, user] = await Promise.all([
      searchUserAttendance(userConceptId, monthlyDate),
      formatUserComposition(await GetCompositionWithId(this.userConcept)),
    ]);

    const attendanceRowsHTML = await getUserMonthlyAttendanceRows(
      monthlyAttendanceList,
      true,
      userConceptId
    );

    return `
        <div class="container mx-auto my-4 text-gray-800">
            <div class="flex flex-row items-center justify-between mb-4">
                <h3 class="text-4xl font-bold">Monthly Attendance</h3>
                <div class="flex flex-row gap-4 items-center">
                    <div class="">
                        <label for="filter-attendance-year" class="block text-sm font-medium leading-6">For the year of</label>
                        <select id="filter-attendance-year" name="filter-attendance-year" onchange="handleMonthlyDateChange()"
                            class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                            ${generateYearOptions()}
                        </select>
                    </div>
                    <div class="">
                        <label for="filter-attendance-month" class="block text-sm font-medium leading-6">For the month of</label>
                        <select id="filter-attendance-month" name="filter-attendance-month" onchange="handleMonthlyDateChange()"
                            class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                            ${generateMonthOptions()}
                        </select>
                    </div>
                </div>
            </div>

            <div class="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="col-span-1 flex justify-center items-center">
                        <img class="w-24 h-24 rounded-full border boder-gray-300 dark:border-gray-700" src="${
                          user.profileImg
                        }" alt="" />
                    </div>
                    <div class="col-span-1 text-lg text-gray-600 dark:text-gray-400">
                        <p class="mb-1.5">
                            <b>Name: </b>
                            ${user.firstName} 
                            ${user.lastName}
                        </p>
                        <p class="mb-1.5"><b>Email: </b>${user.lastName}</p>
                    </div>
                    <div class="col-span-1 text-lg text-gray-600 dark:text-gray-400">
                        <p class="mb-1.5"><b>Total working hour: </b>Lorem</p>
                        <p class="mb-1.5"><b>Weekly working hour: </b>Lorem</p>
                        <p class="mb-1.5"><b>Highest Working Hour: </b>Lorem</p>
                        <p class="mb-1.5"><b>Total Absent days: </b>Lorem</p>
                        <p class="mb-1.5"><b>Total working days: </b>Lorem</p>
                    </div>
                </div>
            
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Date</th>
                                <th scope="col" class="px-6 py-3">Day</th>
                                <th scope="col" class="px-6 py-3">Check In</th>
                                <th scope="col" class="px-6 py-3">Breaks</th>
                                <th scope="col" class="px-6 py-3">Check Out</th>
                                <th scope="col" class="px-6 py-3">Hours</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="monthly-attendance">
                            ${attendanceRowsHTML}
                        </tbody>
                    </table>
                </div>
            </div>

            ${editAttendanceModalHTML()}
        </div>
    `;
  }
}
