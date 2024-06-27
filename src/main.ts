import "./style.css";
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// import test from './test.ts'
// import login from "./app/pages/login.ts";
// import signup from "./app/pages/signup.ts";
// import home from "./app/pages/home.ts";
// import dashboard from "./app/pages/dashboard.ts";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = login;
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

import routes from "./app/routes/routes.ts";
import {
  bootup,
  renderContent,
} from "./app/services/route/renderRoute.service.ts";
import { initiateLogin } from "./app/services/login/login.service.ts";
import { initiateSignup } from "./app/services/signup/signup.service.ts";
import { initiateHome } from "./app/services/home/home.service.ts";
import { initiateDashboard } from "./app/services/dashboard/dashboard.service.ts";

bootup();

// const routes: any = {
//   "/": {
//     linkLabel: "Home",
//     // content: `I am in home page`
//     content: home,
//   },
//   "/about": {
//     linkLabel: "About",
//     content: `I am in about page`,
//   },
//   "/friends": {
//     linkLabel: "Friends",
//     content: `I am in friends page`,
//   },
//   "/login": {
//     linkLabel: "Login",
//     content: login,
//   },
//   "/signup": {
//     linkLabel: "signup",
//     content: signup,
//   },
//   "/404": {
//     linkLabel: "404",
//     content: `The page not found`,
//   },
//   "/dashboard": {
//     linkLabel: "dashboard",
//     content: dashboard,
//   },
// };

// const app: any = document.querySelector("#app");
// const nav: any = document.querySelector("#nav");

// const renderContent = (route: any) => (app.innerHTML = routes[route]?.content);

// const navigate = (e: any) => {
//   const route = e.target.pathname;
//   console.log("route clicked", route);
//   // window.history.pushState({}, "", route);
//   renderContent(route);
// };

// const registerNavLinks = () => {
//   nav.addEventListener("click", (e: any) => {
//     e.preventDefault();
//     const { href } = e.target;
//     window.history.pushState({}, "", href);
//     navigate(e);
//   });
// };

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

// const registerBrowserBackAndForth = () => {
//   window.onpopstate = function () {
//     const route = window.location.pathname;
//     renderContent(route);
//   };
// };

// const renderInitialPage = () => {
//   const route = window.location.pathname;
//   renderContent(route);
// };

// (function bootup() {
//   renderNavlinks();
//   registerNavLinks();
//   registerBrowserBackAndForth();
//   renderInitialPage();
// })();

// const signin = async () => {
//   const raw = JSON.stringify({
//     email: 'anilmaharjan@mentorfriends.com',
//     password: 'freeschema',
//   })
//   let freeschemaRes: any = {
//     message: 'success',
//     status: false,
//     statusCode: 200,
//     data: '',
//   }
//   const myHeaders = new Headers()
//   myHeaders.append('Content-Type', 'application/json')
//   // const url = process.env.BASE_URL + '/auth/login'
//   try {
//     const response = await fetch(`https://theta.boomconcole.com/api/auth/login`, {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     })
//     const output = await response.json()
//     if (response.ok) {
//       const dataObject = output?.data
//       freeschemaRes = {
//         message: 'success',
//         status: true,
//         statusCode: 200,
//         data: dataObject,
//       }
//     } else {
//       freeschemaRes = {
//         message: 'cannot authenticate',
//         status: false,
//         statusCode: response.status,
//         data: '',
//       }
//     }
//     return freeschemaRes
//   } catch (error) {
//     console.log('Sign in api error', error)
//     freeschemaRes = {
//       message: 'error',
//       status: false,
//       statusCode: 500,
//       data: '',
//     }
//     return freeschemaRes
//   }
// }

// const initLogin = async() => {
//   console.log("window.location.pathname", window.location.pathname);
//   const loginButton = document.getElementById("login-btn");
//   console.log("loginButton", loginButton);
//   loginButton?.addEventListener("click", async (e) => {
//     e.preventDefault();
//     alert("hello");
//     console.log("login button clicked!");
//     const signResponse = await signin()
//     console.log('signResponse', signResponse)
//     if (signResponse.statusCode === 200) {
//       location.pathname = "/dashboard"
//       renderContent("/dashboard");
//     }
//   });
// };

let url = location.href;
console.log("URL", url, location.pathname);
console.log("routes", Object.keys(routes));
if (!Object.keys(routes).includes(location.pathname)) {
  renderContent("/404");
}

// history.replaceState({ route: location?.pathname }, "", location?.pathname);

// window.history.pushState({ route: location?.pathname }, "", location?.pathname);

console.log('url', url)
console.log('location.pathname', location.pathname)

// if (location.pathname === "/" || location.pathname === "") {
//   console.log('0 Home page')
//   initiateHome();
// } else if (location.pathname === "/login") {
//   console.log('0 Login page')
//   initiateLogin();
// } else if (location.pathname === "/signup") {
//   console.log('0 Signup page')
//   initiateSignup()
// } else if (location.pathname === "/dashboard") {
//   initiateDashboard()
// }


// const app: any = document.getElementById("app");
// app.addEventListener(
//   'load',

// document.body.addEventListener(
//   "click",
//   () => {
//     requestAnimationFrame(() => {
//       if (url !== location.href) {
//         console.log("url changed before", url);
//         url = location.href;
//         console.log("url changed after", url);
//         if (location.pathname === "/" || location.pathname === "") {
//           console.log('1 HOME')
//           initiateHome();
//         } else if (location.pathname === "/login") {
//           console.log('1 LOGIN')
//           initiateLogin();
//         } else if (location.pathname === "/signup") {
//           console.log('1 SINGUP')
//           initiateSignup()
//         } else if (location.pathname === "/dashboard") {
//           initiateDashboard()
//         }
//       }
//     });
//   },
//   true
// );


// window.addEventListener("popstate", (event) => {
//   console.log(
//     `location: ${document.location}, state: ${JSON.stringify(event.state)}`,
//   );
// });

// var oldHref = document.location.href;

// window.onload = function () {
//   var bodyList: any = document.querySelector("body");

//   var observer = new MutationObserver(function (mutations: any) {
//     if (oldHref != document.location.href) {
//       oldHref = document.location.href;
//       /* Changed ! your code here */
//     }
//   });

//   var config = {
//     childList: true,
//     subtree: true,
//   };

//   observer.observe(bodyList, config);
// };

// signup load
// document.addEventListener('DOMContentLoaded', (event) => {
//   const signupLink = document.getElementById('signup-link');

//   signupLink?.addEventListener('click', (event) => {
//       event.preventDefault(); // Prevent the default link behavior

//       // Load the actual content (could be via AJAX or directly setting the location)
//       // Here we just demonstrate changing the URL without loading the content
//       const actualPath = '/src/app/pages/signup/signup.html';
//       history.pushState(null, '/', '/signup');

//       // Optionally, you can load the content via AJAX if needed
//       loadSignupPage(actualPath);
//   });

//   // Handle the back/forward navigation
//   window.addEventListener('popstate', (event) => {
//       // Handle the navigation, for example by loading the correct content
//       if (location.pathname === '/signup') {
//           loadSignupPage('/src/app/pages/signup/signup.html');
//       } else {
//           // Load other content or handle other paths
//           console.log('else popstate')
//       }
//   });
// });

// function loadSignupPage(path: string) {
//   // Example of content loading via AJAX (optional)
//   // In a real application, you might want to fetch the content dynamically
//   // For simplicity, let's just log the path here
//   console.log('Loading content from:', path);

//   // If using AJAX, you might do something like:
//   fetch(path)
//       .then(response => response.text())
//       .then(html => {
//           // document.getElementById('content').innerHTML = html;
//           document.querySelector<HTMLDivElement>('#app')!.innerHTML = html;
//       });
// }

// const signupBtn = document.getElementById('signup-btn')
// signupBtn?.addEventListener('click', (e) => {
//   alert('signup')
// })
