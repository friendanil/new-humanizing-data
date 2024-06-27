import routes from "../../routes/routes";
import { initiateDashboard } from "../dashboard/dashboard.service";
import { initiateHome } from "../home/home.service";
import { initiateLogin } from "../login/login.service";
import { initiateSignup } from "../signup/signup.service";

const app: any = document.getElementById("app");
// const nav: any = document.querySelector("#nav");

// export const renderContent = (route: any) => (app.innerHTML = routes[route]?.content);
export const renderContent = (route: any, e: any = "") => {
  console.log("route", route);
  console.log("renderContent e ->", e);
  // console.log('routes[route]?.content', routes[route]?.content)
  // app.innerHTML = ''
  app.innerHTML = routes[route]?.content;
  // window.history.pushState({prevUrl: window.location.href}, "", route)
  
  if (location.pathname === "/" || location.pathname === "") {
    console.log('0 Home page')
    initiateHome();
  } else if (location.pathname === "/login") {
    console.log('0 Login page')
    initiateLogin();
  } else if (location.pathname === "/signup") {
    console.log('0 Signup page')
    initiateSignup()
  } else if (location.pathname === "/dashboard") {
    initiateDashboard()
  }
};

export const updateContent = (route: any, e: any = "") => {
  console.log("updateContent route ->", route);
  console.log("updateContent e ->", e);
  console.log("window.location.href", window.location.href);
  // app.innerHTML = ''
  // window.history.pushState({ prevUrl: window.location.href }, "", route);
  // location.pathname = route
  window.history.pushState({ route }, "", route);
  app.innerHTML = routes[route]?.content;

  if (location.pathname === "/" || location.pathname === "") {
    console.log('0 Home page')
    initiateHome();
  } else if (location.pathname === "/login") {
    console.log('0 Login page')
    initiateLogin();
  } else if (location.pathname === "/signup") {
    console.log('0 Signup page')
    initiateSignup()
  } else if (location.pathname === "/dashboard") {
    initiateDashboard()
  }
};

const navigate = (e: any) => {
  console.log('e.state on navigate', e.state)
  const route = e?.target?.location?.pathname;
  console.log("route clicked e", e, e.target.location.pathname);
  // const route = e.target.location.pathname;
  console.log("route clicked", route);
  // window.history.pushState({}, "", route);
  // renderContent(route);
  updateContent(route, e);
};

// const registerNavLinks = () => {
//   nav.addEventListener("click", (e: any) => {
//     e.preventDefault();
//     const { href } = e.target;
//     window.history.pushState({}, "", href);
//     navigate(e);
//   });
// };

export const registerNavLinks = () => {
  // document.addEventListener("DOMContentLoaded", (e: any) => {
  window.addEventListener("popstate", (e: any) => {
    console.log("Location: " + document.location + ", state: " + JSON.stringify(e.state));
    console.log("window.history", window.history);
    console.log("e ->", e);
    console.log("e state ->", e.state);

    // if (Object.keys(e.state).length === 0) {
    //   initiateHome();
    // }

    console.log("e pathname ->", e?.target?.location?.pathname);
    // e.preventDefault();
    const { href } = e?.target;
    // const { href } = e?.target?.location?.pathname;
    // const href = e?.target?.location?.pathname;
    console.log("href", href);
    // window.history.pushState({}, "", href);
    navigate(e);
  });
};

// const renderNavlinks = () => {
//   const navFragment = document.createDocumentFragment();
//   Object.keys(routes).forEach((route) => {
//     const { linkLabel } = routes[route];

//     const linkElement = document.createElement("a");
//     linkElement.href = route;
//     linkElement.textContent = linkLabel;
//     linkElement.className = "nav-link";
//     navFragment.appendChild(linkElement);
//   });

//   nav.append(navFragment);
// };

const registerBrowserBackAndForth = () => {
  window.onpopstate = function () {
    const route = window.location.pathname;
    renderContent(route);
  };
};

const renderInitialPage = () => {
  const route = window.location.pathname;
  renderContent(route);
};

// (function bootup() {
//   renderNavlinks();
//   registerNavLinks();
//   registerBrowserBackAndForth();
//   renderInitialPage();
// })();

export const bootup = () => {
  // renderNavlinks();
  registerNavLinks();
  // registerBrowserBackAndForth();
  renderInitialPage();
};
