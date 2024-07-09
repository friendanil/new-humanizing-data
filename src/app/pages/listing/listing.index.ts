import mainViewClass from '../../default/mainView.class.ts';
import topNavigation from '../../modules/top-nav/top-navigation.ts';
import { getProducts } from './listing.service.ts';

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle('Listing Item');
  }

  async getHtml() {
    const prouductList = await getProducts()
    return `
      ${topNavigation}
      <section class="py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
            Product list
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="product-listings">
            ${prouductList}
          </div>
        </div>
      </section>
    `
  }
}

