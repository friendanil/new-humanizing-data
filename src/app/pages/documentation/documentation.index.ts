import mainViewClass from "../../default/mainView.class";
import topNavigation from "../../modules/top-nav/top-navigation";
import { initTopNavigation } from "../../modules/top-nav/top-navigation.service";

import {submitAddDocumentationForm } from "./addDocumentation.service";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("Documentation");
  }
  async getHtml() {
    (window as any).submitAddDocumentationForm = submitAddDocumentationForm;
    setTimeout(() => {
      initTopNavigation();
    }, 10);

    return `${topNavigation}
        <div class="w-4/5 mx-auto my-8">
  <h1>Add Document</h1>
  <form method="post" action="/" onsubmit="submitAddDocumentationForm(event)" name="addDocumentationForm" id="add-item-form">
    <div class="my-4">
      <label for="name" class="block text-sm font-medium leading-6 text-white-900">Document Name<span
          class="text-rose-400">*</span></label>
      <div class="mt-2">
        <input type="text" placeholder="Enter Document Name" name="docName" id="name" autocomplete="item-name"
          class="bg-transparent block w-full rounded-md border-0 px-3 py-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6">
      </div>
    </div>
     <button
            class="bg-green-600 cursor-pointer hover:bg-green-900 text-white text-sm leading-6 font-medium py-3 px-6 m-2 rounded-lg"
            type="submit">Add Document</button>
        </form>
      </div>`;
  }
}
