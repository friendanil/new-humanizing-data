import mainViewClass from "../../../default/mainView.class";
import { sidebarHTML, sidebarMenu } from "../../../services/sidebar.service";
import {
  getEmployeesAttendanceList,
  showDropdownMenuOption,
} from "./employees-attendance.service";

export default class extends mainViewClass {
  async getHtml(): Promise<string> {
    (window as any).showDropdownMenuOption = showDropdownMenuOption;

    const employeeAttendanceRows = getEmployeesAttendanceList([
      { id: 100144987 },
    ]);

    return `
        ${sidebarHTML()}
        <div class="flex flex-row justify-end">${sidebarMenu()}</div>

        <div class="container relative mx-auto my-4 text-gray-800">
            <h3 class="text-3xl font-bold">Today's Attendance</h3>
            <p class="text-gray-500 mb-6">${new Date().toLocaleString("en-US", {
              dateStyle: "full",
            })}</p>
            <div class="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">DP</th>
                                <th scope="col" class="px-6 py-3">Name</th>
                                <th scope="col" class="px-6 py-3">Email In</th>
                                <th scope="col" class="px-6 py-3">First In</th>
                                <th scope="col" class="px-6 py-3">Breaks</th>
                                <th scope="col" class="px-6 py-3">Last Out</th>
                                <th scope="col" class="px-6 py-3">Working Time</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                                <th scope="col" class="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${employeeAttendanceRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
  }
}
