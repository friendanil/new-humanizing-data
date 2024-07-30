import mainViewClass from "../../../default/mainView.class";
import {
  generateMonthOptions,
  generateYearOptions,
} from "../attendance.helper";
import { handleMonthlyDateChange } from "../attendance.service";

export default class extends mainViewClass {
  async getHtml(): Promise<string> {
    (window as any).handleMonthlyDateChange = handleMonthlyDateChange;

    const attendanceRowsHTML = `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">1</td>
            <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                <div class="flex flex-row items-center gap-2">
                    <a role="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        <span class="sr-only">Icon Edit</span>
                    </a>
                </div>
            </td>
        </tr>
    `;

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
                        <img class="w-24 h-24 rounded-full border boder-gray-300 dark:border-gray-700" src="" alt="" />
                    </div>
                    <div class="col-span-1 text-lg text-gray-600 dark:text-gray-400">
                        <p class="mb-1.5"><b>Name: </b>Lorem</p>
                        <p class="mb-1.5"><b>Email: </b>Lorem</p>
                        <p class="mb-1.5"><b>Department: </b>Lorem</p>
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
        </div>
    `;
  }
}
