import mainViewClass from "../../default/mainView.class";
import topNavigation from "../../modules/top-nav/top-navigation";

import { addItemDocument, submitAddItemForm } from "./addItem.service";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("Add Item | Humanizing Data");
  }

  async getHtml() {
    // Attach the function to the global window object
    (window as any).submitAddItemForm = submitAddItemForm;
    (window as any).addItemDocument = addItemDocument;

    return `
      ${topNavigation}
      <div class="w-4/5 mx-auto my-8 text-zinc-900 dark:text-white">

        <h1>Add Item</h1>
        <form method="post" action="/" onsubmit="submitAddItemForm(event)" name="addItemForm" id="add-item-form">

          <div class="my-4">
            <label for="name" class="block text-sm font-medium leading-6">Item name<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="text" name="name" id="name" autocomplete="item-name"
                class="block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <div class="mt-4">
            <label for="category" class="block text-sm font-medium leading-6">Item category <span
              class="text-rose-400">*</span></label>
            <select id="category" name="category" autocomplete="category-name"
              class="block w-full rounded-md border-0 mt-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
              <option value="category1">Service</option>
              <option value="category2">Real State</option>
              <option value="category3">Fabrics</option>
            </select>
          </div>

          <div class="my-4">
            <label for="itemAttachment" class="block text-sm font-medium leading-6 text-gray-900">Item Images<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="file" accept=".png, .jpg, .jpeg" onclick="addItemDocument()" name="itemAttachment" id="itemAttachment" autocomplete="item-attachment"
                class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <div class="my-4">
            <label for="description" class="block text-sm font-medium leading-6">Item description<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="text" name="description" id="description" autocomplete="item-description"
                class="block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <div class="my-4">
            <label for="price" class="block text-sm font-medium leading-6">Item price<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="number" name="price" id="price" autocomplete="item-price"
                class="block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <div class="mt-4">
            <label for="type" class="block text-sm font-medium leading-6">Item type <span
              class="text-rose-400">*</span></label>
            <select id="type" name="type" autocomplete="type-name"
              class="block w-full rounded-md border-0 mt-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
              <option value="type1">Basic</option>
              <option value="type2">Standard</option>
              <option value="type3">Premium</option>
            </select>
          </div>

          <div class="mt-4">
            <label for="listingagent" class="block text-sm font-medium leading-6">Item listing agent <span
              class="text-rose-400">*</span></label>
            <select id="listingagent" name="listingagent" autocomplete="listingagent-name"
              class="block w-full rounded-md border-0 mt-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
              <option value="listingagent1">John Doe</option>
              <option value="listingagent2">Jessica Pitt</option>
              <option value="listingagent3">Ram Maharjan</option>
            </select>
          </div>

          <div class="mt-4">
            <label for="selleragent" class="block text-sm font-medium leading-6">Item seller agent <span
              class="text-rose-400">*</span></label>
            <select id="selleragent" name="selleragent" autocomplete="selleragent-name"
              class="block w-full rounded-md border-0 mt-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
              <option value="selleragent1">John Doe</option>
              <option value="selleragent2">Jessica Pitt</option>
              <option value="selleragent3">Ram Maharjan</option>
            </select>
          </div>

          <div class="my-4">
            <label for="delivery" class="block text-sm font-medium leading-6">Item delivery<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="text" name="delivery" id="delivery" autocomplete="item-delivery"
                class="block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <div class="mt-4">
            <label for="country" class="block text-sm font-medium leading-6">Country<span
              class="text-rose-400">*</span></label>
            <select id="country" name="country" autocomplete="country-name"
              class="block w-full rounded-md border-0 mt-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
              <option value="country1">Nepal</option>
              <option value="country2">United States</option>
              <option value="country3">Spain</option>
            </select>
          </div>

          <div class="my-4">
            <label for="quantity" class="block text-sm font-medium leading-6">Item quantity<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="number" name="quantity" id="quantity" autocomplete="item-quantity"
                class="block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <div class="my-4">
            <label for="quality" class="block text-sm font-medium leading-6">Item quality<span
                class="text-rose-400">*</span></label>
            <div class="mt-2">
              <input type="text" name="quality" id="quality" autocomplete="item-quality"
                class="block w-full rounded-md border-0 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
            </div>
          </div>

          <button
            class="bg-green-600 cursor-pointer hover:bg-green-900 text-white text-sm leading-6 font-medium py-3 px-6 m-2 rounded-lg"
            type="submit">Add Item Now</button>
        </form>

      </div>
    `;
  }
}
