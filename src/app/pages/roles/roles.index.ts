import mainViewClass from "../../default/mainView.class";
import initNavigation from "../../modules/home-nav/home-navigation.service";
import createRoleModalHTML from "../../modules/roles/create/create-role-modal";
import topNavigation from "../../modules/top-nav/top-navigation";
import { deleteRole, fetchRoles, openCreateRoleModal } from "./roles.service";

export default class extends mainViewClass {
  roles: any[] = [];

  constructor(params: any) {
    super(params);
    this.setTitle("Roles");
  }

  async getHtml(): Promise<string> {
    const createRoleModalHTMLCode = await createRoleModalHTML();

    this.roles = await fetchRoles();

    setTimeout(() => {
      initNavigation();
    }, 100);

    (window as any).openCreateRoleModal = openCreateRoleModal;
    (window as any).deleteRole = deleteRole;

    return `
      ${topNavigation}

        <div class="container mx-auto">
            <div class="flex flex-row justify-end mt-4">
                <button onclick="openCreateRoleModal()" class="bg-green-600 cursor-pointer hover:bg-green-900 text-white text-sm leading-6 font-medium py-3 px-6 m-2 rounded-lg">Create</button>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Roles</th>
                            <th scope="col" class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">ROLE_EMPLOYEE</td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="flex flex-row items-center gap-2">
                                    <a role="button" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                        <span class="sr-only">Icon Edit</span>
                                    </a>
                                    <a role="button" onclick="deleteRole()" class="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#333"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                        <span class="sr-only">Icon Delete</span>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        ${createRoleModalHTMLCode}
        
        `;
  }
}
