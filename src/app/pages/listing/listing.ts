import topNavigation from "../../modules/top-nav/top-navigation";
import { loadHTML } from "./listing.service";

const listingHTML = `
  ${topNavigation}
  ${loadHTML}
`
export default listingHTML
