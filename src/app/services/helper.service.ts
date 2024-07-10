import { IUser } from "../interfaces/IUser.interface"

export async function getLocalStorageData() {
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    return profileData
  }
  return
}