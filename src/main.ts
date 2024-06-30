import "./style.css";

import routes from "./app/routes/routes.ts";
import {
  bootup,
  renderContent,
} from "./app/services/route/renderRoute.service.ts";

bootup();

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

let url = location.href;
console.log("URL", url, location.pathname);
console.log("routes", Object.keys(routes));
if (!Object.keys(routes).includes(location.pathname)) {
  renderContent("/404");
}

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