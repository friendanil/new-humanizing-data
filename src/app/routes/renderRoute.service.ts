import routes from "./routes";
// import { initiateDashboard } from "../dashboard/dashboard.service";
// import { initiateHome } from "../home/home.service";
import { initiateLogin } from "../pages/login/login.service";
// import { initiateLogin } from "../login/login.service";
// import { initiateSignup } from "../signup/signup.service";

const app: any = document.getElementById("app");

const renderPage = () => {
  if (location.pathname === "/" || location.pathname === "") {
    console.log("0 Home page");
    // initiateHome();
  } else if (location.pathname === "/login") {
    console.log("0 Login page");
    initiateLogin();
  } else if (location.pathname === "/signup") {
    console.log("0 Signup page");
    // initiateSignup();
  } else if (location.pathname === "/dashboard") {
    // initiateDashboard();
  }
};

export const renderContent = (route: any, e: any = "") => {
  console.log("route", route);
  console.log("renderContent e ->", e);
  app.innerHTML = routes?.[route]?.content;
  renderPage();
};

export const updateContent = (route: any, e: any = "") => {
  console.log("updateContent route ->", route);
  console.log("updateContent e ->", e);
  console.log("window.location.href", window.location.href);
  window.history.pushState({ route }, "", route);
  app.innerHTML = routes[route]?.content;
  renderPage();
};

const navigate = (e: any) => {
  console.log("e.state on navigate", e.state);
  const route = e?.target?.location?.pathname;
  console.log("route clicked e", e, e.target.location.pathname);
  console.log("route clicked", route);
  updateContent(route, e);
};

export const registerNavLinks = () => {
  window.addEventListener("popstate", (e: any) => {
    console.log(
      "Location: " + document.location + ", state: " + JSON.stringify(e.state)
    );
    console.log("window.history", window.history);
    console.log("e ->", e);
    console.log("e state ->", e.state);
    console.log("e pathname ->", e?.target?.location?.pathname);
    const { href } = e?.target;
    console.log("href", href);
    navigate(e);
  });
};

const renderInitialPage = () => {
  const route = window.location.pathname;
  renderContent(route);
};

// <router-link> </router-link>
const initRouterLinks = () => {
  customElements.define(
    "router-link",
    class extends HTMLElement {
      constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
      }

      connectedCallback() {
        this.addEventListener("click", this.handleClick);
      }

      disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
      }

      handleClick(event: any) {
        event.preventDefault(); // Prevent default anchor tag behavior

        const href = this.getAttribute("href");
        console.log("href ->", href);
        updateContent(href);
        // Simulate navigation using History API (replace with your routing logic)
        // history.pushState({}, '', href);
        // window.dispatchEvent(new PopStateEvent("popstate")); // Trigger route change event
      }

      // Optional: Set attributes through properties
      set href(val: any) {
        this.setAttribute("href", val);
      }

      get href() {
        return this.getAttribute("href");
      }
    }
  );
};

export const bootup = () => {
  registerNavLinks();
  renderInitialPage();
  initRouterLinks();
};
