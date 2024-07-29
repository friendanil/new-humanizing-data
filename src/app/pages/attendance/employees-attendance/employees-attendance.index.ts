import mainViewClass from "../../../default/mainView.class";


export default class extends mainViewClass {

    async getHtml(): Promise<string> {
        return `
        <div class="container mx-auto my-4 text-gray-800">
            <h3 class="text-3xl font-bold">Today's Attendance</h3>
            <p class="text-gray-500">2024-2-10</p>
            <div class="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="relative overflow-x-auto">
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
                                    8hr 42min
                                </td>
                                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                                Present
                                </td>
                                <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                                    8hr 42min
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `
    }
}