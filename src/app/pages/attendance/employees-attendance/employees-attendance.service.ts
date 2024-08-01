export function showDropdownMenuOption(id: string) {
  const dropdown = document.getElementById(id);
  if (dropdown?.classList.contains("hidden"))
    dropdown.classList.remove("hidden");
  else dropdown?.classList.add("hidden");
}

export function getEmployeesAttendanceList(employees: any[]) {
  let employeesAttendanceRows = "";

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    employeesAttendanceRows += `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-green-400 bg-opacity-25">
                  <img class="max-w-8 max-h-8 min-w-8 min-h-8 h-full w-full rounded-full border border-gray-300 dark:boarder-gray-700" src="https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg" alt="" />
              </td>
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
                  <div class="inline-block text-left">
                      <button type="button" onclick="showDropdownMenuOption('dropdown-menu-${employee.id}')" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="inherit"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                      </button>
                      <div id="dropdown-menu-${employee.id}" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                          <div class="py-1" role="none">
                              <router-link href="/employee/attendance/${'100144987'}"><a role="button" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">View Attendance</a></router-link>
                          </div>
                      </div>
                  </div>
              </td>
          </tr>
          `;
  }
  return employeesAttendanceRows;
}
