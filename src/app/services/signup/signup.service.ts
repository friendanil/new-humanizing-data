import { updateContent } from "../route/renderRoute.service";

const initListeners = () => {
  const signinLinkButton = document.getElementById("signin-link");
  // signinLinkButton?.removeEventListener("click", (e) => {
  //   console.log("LOGIN");
  //   updateContent('/login', e)
  // });
  signinLinkButton?.addEventListener("click", (e) => {
    console.log("LOGIN");
    updateContent('/login', e)
  });
  
};

export const initiateSignup = () => {
  console.log("signup page landed!");
  initListeners();
}