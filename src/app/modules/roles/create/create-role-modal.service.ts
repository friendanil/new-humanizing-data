import { closeModal } from "../../../pages/listItem/listItem.service";
import { addPermission, createRole } from "../../../pages/roles/roles.apis";
import {
  Permission,
  PermissionAction,
} from "../../../pages/roles/roles.service";

export async function submitCreateRoleForm(e: any) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const formValues = Object.fromEntries(formData);

  const permissionList: any[] = [];
  Object.keys(Permission).forEach((permission) => {
    let permissionActionJSON: any = {};

    permissionActionJSON.module_name = permission;

    Object.keys(PermissionAction).forEach((action) => {
      permissionActionJSON[action] = formValues?.[`${permission}_${action}`]
        ? 1
        : 0;
    });
    permissionList.push(permissionActionJSON);
  });

  const addingRoleBody = { name: formValues.name.toString() };
  const body = {
    name: formValues.name.toString(),
    permissions: permissionList,
  };

  const responseRole = await createRole(addingRoleBody);

  const responsePermission = await addPermission(body);
  console.log("adding roles", addingRoleBody, responseRole);
  console.log("adding permission", body, responsePermission);

  closeModal("create-role-modal");
}
