import mainViewClass from "../../default/mainView.class.ts";
import topNavigation from "../../modules/top-nav/top-navigation.ts";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("Dashboard | Humanizing Data");
  }

  async getHtml() {
    return `
      ${topNavigation}

      <div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pt-20 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
        <h1>Welcome to <strong>Humanizing Data</strong> !</h1>
        <p class="mt-8">We're excited to have you on board and look forward to helping you with your software development needs. Our team is dedicated to providing you with the highest level of service and support, and we're here to answer any questions you may have along the way. Thank you for choosing HumanizingData.com, and we can't wait to see what we can achieve together!</p>
      </div>
    `;
  }
}
