
import login from "../pages/login/login.ts";
import signup from "../pages/signup/signup.ts";
import home from "../pages/home/home.ts";
import dashboard from "../pages/dashboard/dashboard.ts"

const routes: any = {
  "/": {
    linkLabel: "Home",
    content: home,
  },
  "/about": {
    linkLabel: "About",
    content: `I am in about page`,
  },
  "/friends": {
    linkLabel: "Friends",
    content: `I am in friends page`,
  },
  "/login": {
    linkLabel: "Login",
    content: login,
  },
  "/signup": {
    linkLabel: "signup",
    content: signup,
  },
  "/404": {
    linkLabel: "404",
    content: `The page not found`,
  },
  "/dashboard": {
    linkLabel: "dashboard",
    content: dashboard,
  },
};

export default routes