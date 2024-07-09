import mainViewClass from '../../default/mainView.class.ts';
import topNavigation from '../../modules/top-nav/top-navigation.ts';
import { getProductDetails } from './listItem.service.ts';

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle('Listing Item');
  }

  async getHtml() {
    let productId: any = window?.location?.href?.split("/")?.reverse()?.[0];
    console.log("hey productId ->", productId, typeof productId);
    if (!(Number(productId) > 0)) productId = 1;
    const productDetails = await getProductDetails(Number(productId));

    return `
      ${topNavigation}
      <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" id="list-item">
            ${productDetails}
          </div>
        </div>
      </section>
    `
  }
}

