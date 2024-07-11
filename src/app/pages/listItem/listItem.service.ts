import { Concept, GetTheConcept, SyncData } from "mftsccs-browser";
import { itemSkuLinker } from "../../constants/type.constants";
import { environment } from "../../environments/environment.dev";
import { createEntityInstance } from "../../services/createEntityInstance.service";
import { CreateConnectionBetweenEntity } from "../../services/entity.service";
import { getLocalStorageData } from "../../services/helper.service";

const thetaBoommAPI = environment?.boomURL;

export async function getHTML() {
  try {
    console.log("TRY");
    const response = await fetch(
      "/src/app/pages/listItem/listItem.component.html"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const htmlContent = await response.text();
    // console.log('listItem htmlContent', htmlContent)
    return htmlContent;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

export const loadHTML = await getHTML();

export async function getProductDetails(productId: number) {
  try {
    console.log("productId ->", productId);
    const product: any = await fetch(
      `${thetaBoommAPI}/api/view-api-internal-data?id=${productId}`
    ).then((res: any) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("error status ->", res.status);
        // if (res.status === 404) throw new Error("404, Not found");
        // if (res.status === 500) throw new Error("500, internal server error");
        // throw new Error(res.status);
        return res.json();
      }
    });

    console.log("product", product);
    console.log("product?.errors", product?.errors);

    let productDetails: string = "";

    if (product?.errors) {
      productDetails = `
        <div class="py-20 text-center">
          <p>There is no such item</p>
        </div>
      `;
    } else {
      productDetails = `
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" id="list-item">
          <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img class="w-full" src="https://placehold.co/600x400" alt="" />
            <!-- <img class="w-full hidden dark:block" src="${product?.image}" alt="" /> -->
          </div>

          <div class="mt-6 sm:mt-8 lg:mt-0">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              ${product?.the_item_name}
            </h1>
            <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                $${product?.the_item_price}
              </p>
            </div>

            <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a href="#" title=""
                class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button">
                <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
                Add to favorites
              </a>

              <a href="#" title=""
                class="text-white hover:text-white mt-4 sm:mt-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 flex items-center justify-center"
                role="button">
                <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Add to cart
              </a>
            </div>

            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p class="mb-6 text-gray-500 dark:text-gray-400">
              ${product?.the_item_description}
            </p>

            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 text-center py-8">
              <button class="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition"
                onclick="openModal('modelConfirm')">
                Update Item SKU
              </button>
            </div>
            </section>

            <!-- <button class="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition" onclick="openModal('modelConfirm')">
                Click to Open modal
              </button> -->

            <!-- https://tailwindflex.com/@lukas-muller/modal-popup -->

            <div id="modelConfirm"
              class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
              <div class="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div class="flex justify-end p-2">
                  <button onclick="closeModal('modelConfirm')" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>

                <div class="p-6 pt-0">
                  <h3 class="text-xl font-normal text-gray-500 mt-0 mb-6">SKU Details</h3>
                  
                  <form method="post" action="/" onsubmit="submitUpdateSKUForm(event)" name="updateSKUForm"
                    id="update-sku-form">
                    <div class="my-4">
                      <label for="stockIn" class="block text-sm font-medium leading-6 text-gray-900">Stock In<span
                          class="text-rose-400">*</span></label>
                      <div class="mt-2">
                        <input type="number" name="stockIn" id="stockIn" autocomplete="sku-stockIn"
                          class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6">
                      </div>
                    </div>
                    <div class="my-4">
                      <label for="stockOut" class="block text-sm font-medium leading-6 text-gray-900">Stock Out<span
                          class="text-rose-400">*</span></label>
                      <div class="mt-2">
                        <input type="number" name="stockOut" id="stockOut" autocomplete="sku-stockOut"
                          class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6">
                      </div>
                    </div>
                    <div class="my-4">
                      <label for="stockRemaining" class="block text-sm font-medium leading-6 text-gray-900">Stock Remaining<span
                          class="text-rose-400">*</span></label>
                      <div class="mt-2">
                        <input type="number" name="stockRemaining" id="stockRemaining" autocomplete="sku-stockRemaining"
                          class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6">
                      </div>
                    </div>

                    <button type="button" onclick="closeModal('modelConfirm')"
                      class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                      data-modal-toggle="delete-user-modal">
                      Cancel
                    </button>
                    <button type="submit"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                      Update SKU Now
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    return productDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function submitUpdateSKUForm(e: any) {
  e.preventDefault();

  const formData: any = new FormData(e.target);
  // output as an object
  console.log("formData entries ->", Object.fromEntries(formData));
  const formValues: any = Object.fromEntries(formData);
  console.log("formValues ->", formValues);

  const skuResponse = await createItemSKU(formValues);
  console.log("skuResponse", skuResponse);
}

export async function createItemSKU(formValues: any) {
  console.log("createItem formValues ->", formValues);

  let urlPath = location.pathname;
  let itemId = Number(urlPath.substring(10));
  console.log("itemId ->", itemId);

  const itemEntityConcept: Concept = await GetTheConcept(itemId);
  console.log("itemEntityConcept ->", itemEntityConcept);

  const profileStorageData: any = await getLocalStorageData();
  console.log("profileStorageData ->", profileStorageData);
  const userId = profileStorageData?.userId;
  console.log("userId ->", userId);

  const skuEntityConcept = await createEntityInstance(
    "sku",
    userId,
    formValues
  );
  console.log("skuEntityConcept ->", skuEntityConcept);

  // the_item_s_sku
  await CreateConnectionBetweenEntity(
    itemEntityConcept,
    skuEntityConcept,
    itemSkuLinker
  );
  await SyncData.SyncDataOnline();

  console.log("SKU completed");
  closeModal('modelConfirm')
}

export async function _getProductDetails(productId: number) {
  // let productId: any = window?.location?.href?.split('/')?.reverse()?.[0]
  console.log("productId ->", productId);
  // if (typeof(productId) !== 'number') productId = 1
  const product: any = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  console.log("product", product);
  // https://flowbite.com/blocks/e-commerce/product-overview/

  const productDetails = `
   <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
    <img class="w-full dark:hidden" src="${product?.image}"
      alt="" />
    <img class="w-full hidden dark:block"
      src="${product?.image}" alt="" />
  </div>

  <div class="mt-6 sm:mt-8 lg:mt-0">
    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
    ${product?.title}
    </h1>
    <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
      <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
        $${product?.price}
      </p>

      <div class="flex items-center gap-2 mt-2 sm:mt-0">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
          </svg>
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
          </svg>
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
          </svg>
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
          </svg>
          <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
          </svg>
        </div>
        <p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
          (${product?.rating?.rate})
        </p>
        <a href="#"
          class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
          ${product?.rating?.count} Reviews
        </a>
      </div>
    </div>

    <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
      <a href="#" title=""
        class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        role="button">
        <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
        </svg>
        Add to favorites
      </a>

      <a href="#" title=""
        class="text-white hover:text-white mt-4 sm:mt-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 flex items-center justify-center"
        role="button">
        <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
        </svg>
        Add to cart
      </a>
    </div>

    <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

    <p class="mb-6 text-gray-500 dark:text-gray-400">
    ${product?.description}
    </p>
  </div>
    `;

  return productDetails;

  const productListEl: any = document.getElementById("list-item");
  console.log("productListEl", productListEl);
  productListEl.innerHTML = productDetails;

  document.addEventListener("DOMContentLoaded", () => {
    const productListEl: any = document.getElementById("list-item");
    console.log("productListEl", productListEl);
  });
}

// for modal
export async function openModal(modalId: string) {
  const check = document.getElementById(modalId);
  if (check) check.style.display = "block";
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");

  // Close all modals when press ESC
  document.onkeydown = function (event: any) {
    if (event.code === "Escape" || event.key === "Escape") {
      console.log("Escape clicked!");
      if (check) check.style.display = "none";
    }
  };
}

export async function closeModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
  document
    .getElementsByTagName("body")[0]
    .classList.remove("overflow-y-hidden");
  // Close all modals when press ESC
  // document.onkeydown = function (event) {
  //   event = event || window.event;
  //   if (event.keyCode === 27) {
  //     document
  //       .getElementsByTagName("body")[0]
  //       .classList.remove("overflow-y-hidden");
  //     let modals = document.getElementsByClassName("modal");
  //     Array.prototype.slice.call(modals).forEach((i) => {
  //       i.style.display = "none";
  //     });
  //   }
  // };
}
