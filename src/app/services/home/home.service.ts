import { updateContent } from "../route/renderRoute.service";

const initListeners = () => {
  const signupLinkButton = document.getElementById("btn-visit-signup");
  const loginLinkButton = document.getElementById("btn-visit-login");
  
  signupLinkButton?.addEventListener("click", (e) => {
    console.log("FROM HOME");
    updateContent('/signup', e)
  });

  loginLinkButton?.addEventListener("click", (e) => {
    console.log("FROM HOME");
    updateContent('/login', e)
  });
};

export const initiateHome = () => {
  console.log("Home page landed!");
  initListeners();
}