import { environment } from "../../environments/environment.dev";

const boomUrl = environment.boomURL;

export async function fetchRoles() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(boomUrl + "/api/humanizing/roles/list", {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  console.log(data);
  return data || [];
}

export async function createRole(body: {name: string}) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(boomUrl + "/api/humanizing/roles/create", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body)
  });
  const data = await response.json();
  console.log(data);
  return data || [];
}

export async function addPermission(body: {name: string, permissions: any[]}) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(boomUrl + "/api/humanizing/permissions/add", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body)
  });
  const data = await response.json();
  console.log(data);
  return data || [];
}
