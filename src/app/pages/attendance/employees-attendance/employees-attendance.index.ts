import mainViewClass from "../../../default/mainView.class";
import { showDropdownMenuOption } from "../../../services/dropdown.service";
import { sidebarHTML, sidebarMenu } from "../../../services/sidebar.service";
import {
  getCompanyEmployee,
  getEmployeesAttendanceList,
} from "./employees-attendance.service";

export default class extends mainViewClass {
  async getHtml(): Promise<string> {
    (window as any).showDropdownMenuOption = showDropdownMenuOption;

    const employeeAttendance = await getCompanyEmployee();

    const employeeAttendanceRows =
      getEmployeesAttendanceList(employeeAttendance);

    return `
      ${await sidebarHTML()}
      <div class="flex flex-row justify-end px-4 py-2 shadow w-full">${sidebarMenu()}</div>

      <div class="container mx-auto my-4 text-gray-800 dark:text-white">
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
                              <th scope="col" class="px-6 py-3">Email</th>
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
