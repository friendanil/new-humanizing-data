import routes from "./routes";
import { IUser } from "../interfaces/IUser.interface";

const app = <HTMLElement>document.getElementById("app");

const checkAuthentication = () => {
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage);
    return profileData?.token ? true : false;
  } else {
    return false;
  }
};

const checkRouteAuthentication = async (route: string) => {
  console.log("checkRouteAuthentication route", route);

  let routeInfo = routes?.find((routeData: any) => routeData?.path === route);
  console.log("routeInfo ->", routeInfo);
  console.log("routeInfo?.isAuthenticated", routeInfo?.isAuthenticated);

  // Authentication check
  if (routeInfo?.isAuthenticated) {
    const isAuthenticationValid = checkAuthentication();
    if (!isAuthenticationValid) {
      const loginURL = routes.find((route: any) => route.path === "/login");
      console.log("loginURL", loginURL);
      app.innerHTML = loginURL?.content;
      location.pathname = loginURL?.path;
      return;
    }
  }
  checkRouting();
};

const pathToRegex = (path: any) =>
  new RegExp("^" + path.replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: any) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result: any) => result[1]
  );
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

export async function checkRouting() {
  const potentialMatches = routes.map((route: any) => {
    // console.log('checkRouting route ->', route)
    // console.log('pathToRegex(route.path)', pathToRegex(route.path))
    // console.log('nnn', location.pathname.match(pathToRegex(route.path)))
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  console.log("potentialMatches", potentialMatches);

  let match = potentialMatches.find(
    (potentialMatch: any) => potentialMatch.result !== null
  );
  console.log("match ->", match);

  // NOT FOUND PAGE
  if (!match) {
    const notFoundURL = routes.find((route: any) => route.path === "/404");
    match = {
      // route: routes[0],
      route: notFoundURL,
      result: [location.pathname],
    };
  }

  // const view = typeof match.route.content === 'function'
  //   ? new match.route.content(getParams(match))
  //   : match.route.content;

  const view = new match.route.content(await getParams(match));
  console.log("view ->", view);

  const htmlContentDetails = await view?.getHtml();
  // console.log("htmlContentDetails", htmlContentDetails);
  app.innerHTML = htmlContentDetails;
}

export const renderContent = async (route: any) => {
  console.log("renderContent route", route);
  console.log("routes", routes);
  history.pushState(null, "", route);
  checkRouteAuthentication(route);
};

export const updateContent = async (route: any) => {
  console.log("updateContent route ->", route);
  window.history.pushState({ route }, "", route);
  // window.history.replaceState({ route }, "", route);
  checkRouteAuthentication(route);
};

// const navigate = (e: any) => {
//   console.log("e.state on navigate", e.state);
//   const route = e?.target?.location?.pathname;
//   // console.log("route clicked e", e, e.target.location.pathname);
//   console.log("route clicked", route);
//   updateContent(route);
// };

// export const registerNavLinks = () => {
//   window.addEventListener("popstate", (e: any) => {
//     console.log(
//       "Location: " + document.location + ", state: " + JSON.stringify(e.state)
//     );
//     navigate(e);
//   });
// };

const renderInitialPage = () => {
  const route = window.location.pathname;
  console.log("renderInitialPage route ->", route);
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
        // updateContent(href);
        renderContent(href);
        // checkRouting()
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
  // registerNavLinks();
  renderInitialPage();
  initRouterLinks();
  console.log("bootup ->");
  window.addEventListener("popstate", checkRouting);
};