import { getLocalStorageData } from "../../services/helper.service";
import { Permission, PermissionAction } from "./roles.service";


export async function hasPermission(permission: Permission, action: PermissionAction | PermissionAction[]) {
    let actions = action
    if (!Array.isArray(action)) actions = [action]

    const roles = await getLocalRoles()

    for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        
        // if (role?.internal)
    }
    
    return false
}

async function getLocalRoles() {
    const profileStorageData: any = await getLocalStorageData();
    const roles = atob(profileStorageData?.roles);

    return roles
}