import routes from "./routes";
// import { initiateDashboard } from "../dashboard/dashboard.service";
// import { initiateHome } from "../home/home.service";
// import { initiateLogin } from "../pages/login/login.service";
import { IUser } from "../interfaces/IUser.interface";
// import { initiateProfile } from "../pages/profile/profile.service";
// import { initiateListing } from "../pages/listing/listing.service";
// import { initiateListItem } from "../pages/listItem/listItem.service";
// import { initiateDashboard } from "../pages/dashboard/dashboard.service";
// import { initiateLogin } from "../login/login.service";
// import { initiateSignup } from "../signup/signup.service";

const app = <HTMLElement>document.getElementById("app");

const checkAuthentication = () => {
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    return profileData?.token ? true : false
  } else {
    return false
  }
}

const checkRouteAuthentication = async (route: string) => {
  // const routeResult = await checkRouting2(route)
  // console.log('routeResult', routeResult)
  // route = routeResult?.route?.path

  console.log('checkRouteAuthentication route', route)

  let routeInfo = routes?.find((routeData: any) => routeData?.path === route)
  console.log('routeInfo ->', routeInfo)
  console.log('routeInfo?.isAuthenticated', routeInfo?.isAuthenticated)

  // NOT FOUND PAGE
  // if (!routeInfo)  {
  //   const notFoundURL = routes.find((route: any) => route.path === '/404')
  //   console.log('notFoundURL', notFoundURL)
  //   app.innerHTML = notFoundURL?.content;
  //   return
  // }

  // Authentication check
  if (routeInfo?.isAuthenticated) {
    const isAuthenticationValid = checkAuthentication()
    if (!isAuthenticationValid) {
      // updateContent('/login')
      const loginURL = routes.find((route: any) => route.path === '/login')
      console.log('loginURL', loginURL)
      app.innerHTML = loginURL?.content;
      location.pathname = loginURL?.path
      return
    }
  }
  checkRouting()

  // window.history.pushState({ route }, "", route);
  // // app.innerHTML = routes[route]?.content;
  // console.log('3 innerHTML')
  // app.innerHTML = routeInfo?.content;
  // renderPage();

  // renderContent(route)
  // location.pathname = routeInfo?.path
}

// const renderPage = async () => {
//   const routeResult: any = await checkRouting()
//   console.log('routeResult', routeResult)

//   const route = routeResult?.route?.path

//   if (route === "/listitem/:id") {
//     console.log('listitem pathname')
//     initiateListItem();
//   } else if (route === "/" || route === "") {
//     console.log("0 Home page");
//     // initiateHome();
//   } else if (route === "/login") {
//     console.log("0 Login page");
//     initiateLogin();
//   } else if (route === "/signup") {
//     console.log("0 Signup page");
//     // initiateSignup();
//   } else if (route === "/dashboard") {
//     initiateDashboard();
//   } else if (route === "/profile") {
//     initiateProfile();
//   } else if (route === "/listing") {
//     initiateListing();
//   } else if (route === "/404") {
//     // initiateListItem();
//   }

//   // return

//   // console.log('check end')
//   // if (location.pathname === "/" || location.pathname === "") {
//   //   console.log("0 Home page");
//   //   // initiateHome();
//   // } else if (location.pathname === "/login") {
//   //   console.log("0 Login page");
//   //   initiateLogin();
//   // } else if (location.pathname === "/signup") {
//   //   console.log("0 Signup page");
//   //   // initiateSignup();
//   // } else if (location.pathname === "/dashboard") {
//   //   initiateDashboard();
//   // } else if (location.pathname === "/profile") {
//   //   initiateProfile();
//   // } else if (location.pathname === "/listing") {
//   //   initiateListing();
//   // } 
//   // else if (location.pathname === "/listitem/:id") {
//   //   console.log('listitem pathname')
//   //   initiateListItem();
//   // } 
//   // else if (location.pathname === "/404") {
//   //   // initiateListItem();
//   // }

// };

const pathToRegex = (path: any) => new RegExp('^' + path.replace(/:\w+/g, '(.+)') + '$');

const getParams = (match: any) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result: any) => result[1]);
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

// const router = () => {
//   const potentialMatches = routes.map((route: any) => {
//     console.log('route', route)
//     console.log('pathToRegex(route.path)', pathToRegex(route.path))
//     return {
//       route: route,
//       result: location.pathname.match(pathToRegex(route.path))
//     };
//   });

//   console.log('potentialMatches', potentialMatches)

//   let match = potentialMatches.find((potentialMatch: any) => potentialMatch.result !== null);

//   if (!match) {
//     match = {
//       route: routes[0],
//       result: [location.pathname]
//     };
//   }

//   const view = typeof match.route.content === 'function'
//     ? match.route.content(getParams(match))
//     : match.route.content;

//   console.log('view ->', view)

//   app.innerHTML = `<h1>${view}</h1>` || '';
// };

export async function checkRouting() {
  // const router = () => {
    const potentialMatches = routes.map((route: any) => {
      // console.log('checkRouting route ->', route)
      // console.log('pathToRegex(route.path)', pathToRegex(route.path))
      // console.log('nnn', location.pathname.match(pathToRegex(route.path)))
      return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path))
      };
    });
  
    console.log('potentialMatches', potentialMatches)
  
    let match = potentialMatches.find((potentialMatch: any) => potentialMatch.result !== null);
    console.log('match ->', match)
  
    // NOT FOUND PAGE
    if (!match) {
      const notFoundURL = routes.find((route: any) => route.path === '/404')
      match = {
        // route: routes[0],
        route: notFoundURL,
        result: [location.pathname]
      };
    }

    // return match
  
    // const view = typeof match.route.content === 'function'
    //   ? match.route.content(getParams(match))
    //   : match.route.content;
  
    console.log('getParams(match)', getParams(match))

    // const view = typeof match.route.content === 'function'
    //   ? new match.route.content(getParams(match))
    //   : match.route.content;
    
    const view = new match.route.content(await getParams(match));
    console.log('view ->', view)
  
    // app.innerHTML = `<h1>${view}</h1>`;
    // app.innerHTML = view;

    const htmlContentDetails = await view?.getHtml();
    console.log('htmlContentDetails', htmlContentDetails)
    app.innerHTML = htmlContentDetails;


    // CHROME ADVICE:
    // let htmlContentDetails = '';

    // if (typeof match.route.content === 'function') {
    //   const viewInstance = new match.route.content(getParams(match));
    //   if (typeof viewInstance.getHTML === 'function') {
    //     htmlContentDetails = await viewInstance.getHTML();
    //   } else {
    //     console.error('The view instance does not have a getHTML method.');
    //     // Handle the error appropriately (e.g., display a default message)
    //   }
    // } else {
    //   htmlContentDetails = match.route.content; // Directly use the content
    // }

    // console.log('htmlContentDetails', htmlContentDetails);
    // app.innerHTML = htmlContentDetails;

    // return match
    // updateContent('/listItem')
    // initiateListItem();
    // renderPage();
  // };
}


export const renderContent = async (route: any) => {
  console.log("renderContent route", route);
  console.log('routes', routes)

  history.pushState(null, '', route);
  
  checkRouteAuthentication(route)

  // const routeResult = await checkRouting()
  // console.log('routeResult', routeResult)
  // route = routeResult?.route?.path


  // const routeInfo = routes?.find((routeData: any) => routeData?.path === route)
  // console.log('routeInfo', routeInfo)

  // if (!routeInfo) {
  //   // updateContent("/404");
  //   // renderContent("/404")
  //   const routeInfo = routes?.find((routeData: any) => routeData?.path === '/404')
  //   window.history.pushState({ route }, "", route);
  //   console.log('1 innerHTML')
  //   app.innerHTML = routeInfo?.content;
  //   renderPage();
  // } else {
  // // const routeInfo = routeDetails
  // console.log('routeInfo', routeInfo)
  // // if (routes?.[route]?.isAuthenticated) {
  // if (routeInfo?.isAuthenticated) {
  //   const isAuthenticationValid = checkAuthentication()
  //   if (!isAuthenticationValid) {
  //     updateContent('/login')
  //     return
  //   }
  // }
  // console.log('2 innerHTML')
  // app.innerHTML = routeInfo?.content;
  // // app.innerHTML = routes[route]?.content
  // // renderPage();
  // }
};

export const updateContent = async (route: any) => {
  console.log("updateContent route ->", route);
  // console.log('isAuthenticated', routes?.[route]?.isAuthenticated)
  // const routeResult = await checkRouting()
  // console.log('routeResult', routeResult)
  // route = routeResult?.route?.path
  // location.pathname = route

  window.history.pushState({ route }, "", route);
  // window.history.replaceState({ route }, "", route);
  checkRouteAuthentication(route)
  // renderContent(route)

  // app.innerHTML = routes[route]?.content;
  // renderPage();
};

const navigate = (e: any) => {
  console.log("e.state on navigate", e.state);
  const route = e?.target?.location?.pathname;
  // console.log("route clicked e", e, e.target.location.pathname);
  console.log("route clicked", route);
  updateContent(route);
};

export const registerNavLinks = () => {
  window.addEventListener("popstate", (e: any) => {
    console.log(
      "Location: " + document.location + ", state: " + JSON.stringify(e.state)
    );
    // console.log("window.history", window.history);
    // console.log("e ->", e);
    // console.log("e state ->", e.state);
    // console.log("e pathname ->", e?.target?.location?.pathname);
    // const { href } = e?.target;
    // console.log("href", href);
    navigate(e);
  });
};

const renderInitialPage = () => {
  const route = window.location.pathname;
  console.log('renderInitialPage route ->', route)
  renderContent(route);
  // renderPage()
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
        renderContent(href)
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

  console.log('bootup ->')

  window.addEventListener("popstate", checkRouting);

  // document.addEventListener("DOMContentLoaded", () => {
  //   console.log('DOMContentLoaded ->')
  //   document.body.addEventListener("click", (e: any) => {
  //     console.log('xxyyzzyy ->', e)
  //       // if (e.target.matches("[data-link]")) {
  //       if (e.target.matches("router-link")) {
  //           e.preventDefault();
  //           renderContent(e.target.href);
  //       }
  //   });
  
  //   checkRouting();
  // });

};


