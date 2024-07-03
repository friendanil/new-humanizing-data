import { updateContent } from "../../routes/renderRoute.service";

export async function logout() {
  localStorage.removeItem("profile");
  location.reload()
  updateContent("/");
}
