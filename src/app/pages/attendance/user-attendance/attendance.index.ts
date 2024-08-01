import { DAYS } from "../../../constants/time.constants";
import mainViewClass from "../../../default/mainView.class";
import topNavigation from "../../../modules/top-nav/top-navigation";
import { getLocalStorageData } from "../../../services/helper.service";
import {
  generateMonthOptions,
  generateYearOptions,
  getUserMonthlyAttendanceRows,
  searchUserAttendance,
} from "../attendance.helper";
import {
  enableButtons,
  getActiveAttendanceRows,
  handleAttendanceClick,
  handleMonthlyDateChange,
  tickTimer,
} from "./attendance.service";

export default class extends mainViewClass {
  attendanceRowHTML = "";
  activeAttendanceRowHTML = "";

  async getHtml(): Promise<string> {
    (window as any).handleAttendanceClick = handleAttendanceClick;
    (window as any).handleMonthlyDateChange = handleMonthlyDateChange;

    const dailyDate = `${new Date().getFullYear()}-${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}-0${new Date().getDate()}`;
    const monthlyDate = `${new Date().getFullYear()}-${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}`;

    const profileStorageData: any = await getLocalStorageData();
    const userConceptId = profileStorageData?.userConcept;

    const [dailyAttendanceList, monthlyAttendanceList] = await Promise.all([
      searchUserAttendance(userConceptId, dailyDate),
      searchUserAttendance(userConceptId, monthlyDate),
    ]);
    console.log(monthlyAttendanceList, "monthlyAttendanceList", dailyAttendanceList, "dailyAttendanceList", dailyDate);

    [this.attendanceRowHTML, this.activeAttendanceRowHTML] = await Promise.all([
      getUserMonthlyAttendanceRows(monthlyAttendanceList),
      getActiveAttendanceRows(dailyAttendanceList),
    ]);

    setTimeout(() => {
      enableButtons(dailyAttendanceList);
      tickTimer();
    }, 1000);

    return `
        ${topNavigation}

        <div class="container mx-auto my-4 text-gray-800">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="col-span-1 flex flex-row items-center justify-around">
                    <button onclick="handleAttendanceClick('check-in-btn')" id="checkin-btn" disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 dark:bg-blue-500 disabled:cursor-not-allowed">Check In</button>
                    <button onclick="handleAttendanceClick('check-out-btn')" id="checkout-btn" disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-400 dark:bg-blue-500 disabled:cursor-not-allowed">Check Out</button>
                </div>
                <div class="col-span-2">
                    <div class="flex flex-col gap-2 mb-4 text-gray-800">
                        <p><b>${DAYS[new Date().getDay()]}, 
                            ${new Date().toLocaleDateString("en-US", {
                              dateStyle: "medium",
                            })}</b></p>
                        <p>Current time: <span id="tick-timer">7/28/2024, 5:34:31 PM</span></p>
                    </div>
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Today's Log</th>
                                    <th scope="col" class="px-6 py-3">Check In</th>
                                    <th scope="col" class="px-6 py-3">Check Out</th>
                                    <th scope="col" class="px-6 py-3">Working Time</th>
                                </tr>
                            </thead>
                            <tbody id="daily-attendance">
                                ${this.activeAttendanceRowHTML}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-row items-center justify-between mb-4">
                    <h4 class="text-xl font-bold">Monthly Attendance</h4>
                    <div class="flex flex-row gap-4 items-center">
                        <div class="">
                            <!-- <label for="filter-attendance-year" class="block text-sm font-medium leading-6">For the month of</label> -->
                            <select id="filter-attendance-year" name="filter-attendance-year" onchange="handleMonthlyDateChange()"
                                class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                                ${generateYearOptions()}
                            </select>
                        </div>
                        <div class="">
                            <!-- <label for="filter-attendance-month" class="block text-sm font-medium leading-6">For the month of</label> -->
                            <select id="filter-attendance-month" name="filter-attendance-month" onchange="handleMonthlyDateChange()"
                                class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                                ${generateMonthOptions()}
                            </select>
                        </div>
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
                            </tr>
                        </thead>
                        <tbody id="monthly-attendance">
                            ${this.attendanceRowHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
  }
}
