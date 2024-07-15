import "./style.css";

// import routes from "./app/routes/routes.ts";
import {
  bootup,
  // renderContent,
} from "./app/routes/renderRoute.service.ts";
import { init, updateAccessToken } from "mftsccs-browser";
import { environment } from "./app/environments/environment.dev.ts";
import { getLocalStorageData } from "./app/services/helper.service.ts";
await init(environment?.boomURL, environment?.aiURL, '', environment?.baseNodeUrl )
const profileStorageData: any = await getLocalStorageData()
updateAccessToken(profileStorageData?.token)
bootup();

// let url = location.href;
// console.log("URL", url, location.pathname);

document.addEventListener("DOMContentLoaded", () => {
  // console.log('DOMContentLoaded ->')
  document.body.addEventListener("click", (e: any) => {
    // console.log('xxyyzzyy ->', e)
      if (e.target.matches("router-link")) {
          e.preventDefault();
          // renderContent(e.target.href);
      }
  });

  // checkRouting();
});