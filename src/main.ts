import "./style.css";

import routes from "./app/routes/routes.ts";
import {
  bootup,
  renderContent,
} from "./app/routes/renderRoute.service.ts";

bootup();

// let url = location.href;
// console.log("URL", url, location.pathname);
// console.log("routes", Object.keys(routes));
if (!Object.keys(routes).includes(location.pathname)) {
  renderContent("/404");
}
