import { environment } from "../environments/environment.dev";
import { IUser } from "../interfaces/IUser.interface";

const boomconsoleURL = environment?.boomURL;

export async function getLocalStorageData() {
  return new Promise((resolve: any) => {
    let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
    if (dataFromLocalStorage) {
      const profileData: IUser = JSON.parse(dataFromLocalStorage);
      // return profileData;
      resolve(profileData);
    } else {
      resolve();
    }
  });
}

export async function getEntityByUserconceptId(
  userConceptId: number,
  token: string
) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const response = await fetch(
      `${boomconsoleURL}/api/get-entity-from-user?userConceptId=${userConceptId}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );
    const userEntity = await response.json();
    return userEntity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
