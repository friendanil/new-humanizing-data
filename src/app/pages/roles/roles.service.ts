import { openModal } from "../listItem/listItem.service";


export async function fetchRoles() {
    return [] as any
}

export async function createRoleModal() {

}

export async function deleteRole() {

}

export async function openCreateRoleModal() {
    console.log("openRFQModal clicked!");
    const xyz = await openModal("create-role-modal");
    console.log("xyz", xyz);
}