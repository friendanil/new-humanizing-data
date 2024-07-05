import topNavigation from "../../modules/top-nav/top-navigation";
import { loadHTML } from "./listItem.service";

const listItemHTML = `
  ${topNavigation}
  ${loadHTML}
`
export default listItemHTML