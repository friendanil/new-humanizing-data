// import login from "../pages/login/login.ts";
// import signup from "../pages/signup/signup.ts";
// import home from "../pages/home/home.ts";
// import dashboard from "../pages/dashboard/dashboard.ts";
// import profile from "../pages/profile/profile.ts";
// import listingHTML from "../pages/listing/listing.ts";
// import listItemHTML from "../pages/listItem/listItem.ts";
// import { listingHTML } from "../pages/listing/listing.ts";
// import { listItemHTML } from "../pages/listItem/listItem.ts";
// import listingHTML from "../pages/listing/listing.ts";
// import { listItemHTML } from "../pages/listItem/listItem.ts";

// import testService from "../pages/listItem/listItem.index.ts";
// import onlistItemLoad from "../pages/listItem/listItem.ts";

// import indexHome from "../pages/home/indexHome.ts";

import homeIndex from "../pages/home/home.index.ts";
import loginIndex from "../pages/login/login.index.ts";
import signupIndex from "../pages/signup/signup.index.ts";
import dashboardIndex from "../pages/dashboard/dashboard.index.ts";
import listingIndex from "../pages/listing/listing.index.ts";
import listItemIndex from "../pages/listItem/listItem.index.ts";
import profileIndex from "../pages/profile/profile.index.ts";
import noPageFoundIndex from "../pages/noPageFound/noPageFound.index.ts";

const routes: any = [
  {
    path: "/",
    linkLabel: "Home",
    // content: home,
    // content: indexHome,
    content: homeIndex,
  },
  {
    path: "/about",
    linkLabel: "About",
    content: `I am in about page`,
  },
  {
    path: "/login",
    linkLabel: "Login",
    // content: login,
    content: loginIndex,
  },
  {
    path: "/signup",
    linkLabel: "signup",
    // content: signup,
    content: signupIndex,
  },
  {
    path: "/404",
    linkLabel: "404",
    // content: `The page not found`,
    content: noPageFoundIndex,
  },
  {
    path: "/dashboard",
    linkLabel: "dashboard",
    // content: dashboard,
    content: dashboardIndex,
    isAuthenticated: true,
  },
  {
    path: "/profile",
    linkLabel: "profile",
    // content: profile,
    content: profileIndex,
    isAuthenticated: true,
  },
  {
    path: "/listing",
    linkLabel: "listing",
    // content: listingHTML,
    content: listingIndex,
    isAuthenticated: true,
  },
  {
    path: "/listitem/:id",
    linkLabel: "listitem",
    // content: listItem,
    // content: () => listItemHTML,
    // content: listItemHTML,
    // content: new testService({}),
    // content: testService,
    content: listItemIndex,
    // content: await onlistItemLoad(),
    // content: `<h1>LIST ITEM PAGE</h1>`,
    // content: (params: any) => `Profile of ${params.id}`,
    // content: () => listItemHTML,
    isAuthenticated: true,
  },
];

export default routes;
