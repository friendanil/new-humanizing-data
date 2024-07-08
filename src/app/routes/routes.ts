import login from "../pages/login/login.ts";
import signup from "../pages/signup/signup.ts";
import home from "../pages/home/home.ts";
import dashboard from "../pages/dashboard/dashboard.ts";
import profile from "../pages/profile/profile.ts";
// import listingHTML from "../pages/listing/listing.ts";
// import listItemHTML from "../pages/listItem/listItem.ts";
import { listingHTML } from "../pages/listing/listing.ts";
import { listItemHTML } from "../pages/listItem/listItem.ts";
// import listingHTML from "../pages/listing/listing.ts";
// import { listItemHTML } from "../pages/listItem/listItem.ts";

const routes: any = [
  {
    path: "/",
    linkLabel: "Home",
    content: home,
  },
  {
    path: "/about",
    linkLabel: "About",
    content: `I am in about page`,
  },
  {
    path: "/friends",
    linkLabel: "Friends",
    content: `I am in friends page`,
  },
  {
    path: "/login",
    linkLabel: "Login",
    content: login,
  },
  {
    path: "/signup",
    linkLabel: "signup",
    content: signup,
  },
  {
    path: "/404",
    linkLabel: "404",
    content: `The page not found`,
  },
  {
    path: "/dashboard",
    linkLabel: "dashboard",
    content: dashboard,
    isAuthenticated: true,
  },
  {
    path: "/profile",
    linkLabel: "profile",
    content: profile,
    isAuthenticated: true,
  },
  {
    path: "/listing",
    linkLabel: "listing",
    // content: listingHTML,
    content: listingHTML,
    isAuthenticated: true,
  },
  {
    path: "/listitem/:id",
    linkLabel: "listitem",
    // content: listItem,
    // content: () => listItemHTML,
    content: listItemHTML,
    // content: `<h1>LIST ITEM PAGE</h1>`,
    // content: (params: any) => `Profile of ${params.id}`,
    // content: () => listItemHTML,
    isAuthenticated: true,
  },
];

export default routes;
