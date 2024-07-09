import mainViewClass from '../../default/mainView.class.ts';
import topNavigation from "../../modules/top-nav/top-navigation"
import { loadHTML, loadProfileDetails } from "./profile.service"
import { popupAlert, saveProfileDetails, updateProfile } from "./profile.service"

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle('Listing Item');
    console.log('PROFILE PAGE')
  }

  async getHtml(): Promise<string> {
    (window as any).popupAlert = popupAlert;
    (window as any).saveProfileDetails = saveProfileDetails;
    (window as any).updateProfile = updateProfile;

    // load content
    loadProfileDetails()
    
    return `
      ${topNavigation}
      ${loadHTML}
    `
  }

}

