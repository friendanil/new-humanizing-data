import mainViewClass from "../../default/mainView.class.ts";
import topNavigation from "../../modules/top-nav/top-navigation.ts";
import {
  closeModal,
  getProductDetails,
  openModal,
  submitUpdateSKUForm,
} from "./listItem.service.ts";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("Listing Item");
  }

  async getHtml() {
    // Attach the function to the global window object
    (window as any).openModal = openModal;
    (window as any).closeModal = closeModal;
    (window as any).submitUpdateSKUForm = submitUpdateSKUForm;

    let productId: any = window?.location?.href?.split("/")?.reverse()?.[0];
    console.log("hey productId ->", productId, typeof productId);
    // if (!(Number(productId) > 0)) productId = 1;
    const productDetails = await getProductDetails(Number(productId));

    return `
      ${topNavigation}
      <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          ${productDetails}
        </div>
      </section>
    `;
  }
}
