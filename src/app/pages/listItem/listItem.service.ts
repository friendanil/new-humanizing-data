import { GetTheConceptLocal, LConcept, LocalSyncData, MakeTheInstanceConceptLocal, SearchLinkMultipleAll, SearchQuery, ViewInternalData } from "mftsccs-browser";
import { itemSkuLinker, rfqAttachmentLinker, s_item_linker } from "../../constants/type.constants";
import { environment } from "../../environments/environment.dev";
import { createEntityInstance } from "../../services/createEntityInstance.service";
import { CreateConnectionBetweenEntityLocal } from "../../services/entity.service";
import { getEntityByUserconceptId, getLocalStorageData } from "../../services/helper.service";
// import rfqModal from "../../modules/rfq-modal/rfq-modal";
// import { rfqModalHTML } from "../../modules/rfq-modal/rfq-modal";

import rfqModalHTML from "../../modules/rfq-modal/rfq-modal";
import listModalHTML from "../../modules/list-modal/list-modal";

const thetaBoommAPI = environment?.boomURL;
// let rfqAttachment = ''
let attachmentConcept: LConcept
let rfqModalHTMLCode = `
  <h1>Hey</h1>
`
let listModalHTMLCode = `
  <h1>List Modal</h1>
`
let listingItem: any

// export async function getHTML() {
//   try {
//     const response = await fetch(
//       "/src/app/pages/listItem/listItem.component.html"
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     const htmlContent = await response.text();
//     return htmlContent;
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//   }
// }

// export const loadHTML = await getHTML();

export async function getProductDetails(productId: number) {
  try {
    console.log("productId ->", productId);
    const productList = await ViewInternalData([productId]);
    const product = productList[0];
    // const product: any = await fetch(
    //   `${thetaBoommAPI}/api/view-api-internal-data?id=${productId}`
    // ).then((res: any) => {
    //   if (res.ok) {
    //     return res.json();
    //   } else {
    //     // if (res.status === 404) throw new Error("404, Not found");
    //     // if (res.status === 500) throw new Error("500, internal server error");
    //     // throw new Error(res.status);
    //     return res.json();
    //   }
    // });

    console.log("product", product);
    listingItem = product
    if (!product?.data.image || product?.data?.image === 'undefined') product.data.image = 'https://placehold.co/600x600'

    let productDetails: string = "";

    if (product?.errors) {
      productDetails = `
        <div class="py-20 text-center">
          <p>There is no such item</p>
        </div>
      `;
    } else {
      const skuData: any = await getSkuDetails();
      let listedInfoEl = ''
      if (product?.data?.listing)  {
        listedInfoEl = `
          <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
          <p>Listed at: ${product?.data?.listing}</p>
        `
      }
      productDetails = `
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" id="list-item">
          <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <!-- <img class="w-full" src="https://placehold.co/600x600" alt="" /> -->
            <img class="w-full border" src="${product?.data?.image}" alt="item image" />
          </div>

          <div class="mt-6 sm:mt-8 lg:mt-0">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              ${product?.data?.name}
            </h1>
            <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                $${product?.data?.price}
              </p>
            </div>

            <!-- <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <router-link title=""
                class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button">
                <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
                Add to favorites
              </router-link>

              <router-link title=""
                class="text-white hover:text-white mt-4 sm:mt-0 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 flex items-center justify-center"
                role="button">
                <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Add to cart
              </router-link>
            </div> -->

            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p class="mb-6 text-gray-500 dark:text-gray-400">
              ${product?.data?.description}
            </p>

            <p class="mb-6 text-gray-500 dark:text-gray-400">
            Stocks In: ${skuData?.totalStockIn || 0}, Stocks Out: ${skuData?.totalStockOut || 0}, Stocks Remaining: ${skuData?.toatalStockRemaining || 0}
            </p>

            ${listedInfoEl}

            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 text-center py-8">

            <button class="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition" onclick="openModal('list-modal')">
                List this Item
              </button>

              <button class="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-700 transition" onclick="openModal('rfq-modal')">
                Add Request for Quote
              </button>

              <button class="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition"
                onclick="openModal('modelConfirm')">
                Update Item SKU
              </button>
            </div>
            </section>

            <div id="list-modal" class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 dark:bg-gray-200 dark:bg-opacity-40 overflow-y-auto h-full w-full px-4">
              ${listModalHTMLCode}
            </div>

            <div id="rfq-modal" class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 dark:bg-gray-200 dark:bg-opacity-40 overflow-y-auto h-full w-full px-4">
              ${rfqModalHTMLCode}
            </div>

            <!-- <button class="bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-rose-700 transition" onclick="openModal('modelConfirm')">
                Click to Open modal
              </button> -->

            <!-- https://tailwindflex.com/@lukas-muller/modal-popup -->

            <div id="modelConfirm"
              class="fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 dark:bg-gray-200 dark:bg-opacity-40 overflow-y-auto h-full w-full px-4 ">
              <div class="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-md text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                <div class="flex justify-between px-4 pt-4">
                  <h3 class="text-xl font-normal text-zinc-900 dark:text-white my-0">SKU Details</h3>
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
                  <form method="post" action="/" onsubmit="submitUpdateSKUForm(event)" name="updateSKUForm"
                    id="update-sku-form">
                    <div class="my-4">
                      <label for="stockIn" class="block text-sm font-medium leading-6">Stock In<span
                          class="text-rose-400">*</span></label>
                      <div class="mt-2">
                        <input type="number" name="stockIn" id="stockIn" autocomplete="sku-stockIn"
                          class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                      </div>
                    </div>
                    <div class="my-4">
                      <label for="stockOut" class="block text-sm font-medium leading-6">Stock Out<span
                          class="text-rose-400">*</span></label>
                      <div class="mt-2">
                        <input type="number" name="stockOut" id="stockOut" autocomplete="sku-stockOut"
                          class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                      </div>
                    </div>
                    <div class="my-4">
                      <label for="stockRemaining" class="block text-sm font-medium leading-6">Stock Remaining<span
                          class="text-rose-400">*</span></label>
                      <div class="mt-2">
                        <input type="number" name="stockRemaining" id="stockRemaining" autocomplete="sku-stockRemaining"
                          class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
                      </div>
                    </div>

                    <div class="text-right">
                      <button type="button" onclick="closeModal('modelConfirm')"
                        class="text-gray-900 bg-white hover:bg-gray-300 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                        data-modal-toggle="delete-user-modal">
                        Cancel
                      </button>
                      <button type="submit"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                        Update SKU Now
                      </button>
                    </div>
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

export async function getListingItemDetails() {
  return listingItem
}

export async function getSkuDetails() {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      let urlPath = location.pathname;
      let itemId = Number(urlPath.substring(10));

      const profileStorageData: any = await getLocalStorageData();
      const token = profileStorageData?.token;

      let searchfirst = new SearchQuery();
      searchfirst.composition = itemId
      searchfirst.fullLinkers = ["the_item_s_sku"]
      searchfirst.inpage = 100

      let searchsecond = new SearchQuery();
      searchsecond.fullLinkers = [
        "the_sku_stockIn",
        "the_sku_stockOut",
        "the_sku_stockRemaining",
      ];
      searchsecond.inpage = 100

      const queryParams = [searchfirst, searchsecond];
      const output = await SearchLinkMultipleAll(queryParams, token)
      console.log('output SKU ->', output)

      // const queryParams = [
      //   {
      //     composition: itemId,
      //     fullLinkers: ["the_item_s_sku"],
      //     inpage: 100,
      //     page: 1,
      //     logic: "or",
      //     filterSearches: [],
      //   },
      //   {
      //     fullLinkers: [
      //       "the_sku_stockIn",
      //       "the_sku_stockOut",
      //       "the_sku_stockRemaining",
      //     ],
      //     inpage: 100,
      //     page: 1,
      //     logic: "or",
      //     filterSearches: [],
      //   },
      // ];

      // const profileStorageData: any = await getLocalStorageData();
      // const token = profileStorageData?.token;

      // const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // myHeaders.append("Authorization", `Bearer ${token}`);

      // const response = await fetch(
      //   `${thetaBoommAPI}/api/Connection/search-link-multiple-clean`,
      //   {
      //     method: "POST",
      //     headers: myHeaders,
      //     body: JSON.stringify(queryParams),
      //     redirect: "follow",
      //   }
      // );
      // const output = await response.json();

      // sku summary
      const skuData = output?.data?.the_item?.the_item_s_sku;

      const skuStockIn = skuData?.reduce(
        (accum: number, curr: any) =>
          Number(accum) +
          Number(curr?.data?.the_sku?.the_sku_stockIn?.[0]?.data?.the_stockIn),
        0
      );

      const skuStockOut = skuData?.reduce(
        (accum: number, curr: any) =>
          Number(accum) +
          Number(
            curr?.data?.the_sku?.the_sku_stockOut?.[0]?.data?.the_stockOut
          ),
        0
      );

      const skuStockRemaining = skuData?.reduce(
        (accum: number, curr: any) =>
          Number(accum) +
          Number(
            curr?.data?.the_sku?.the_sku_stockRemaining?.[0]?.data
              ?.the_stockRemaining
          ),
        0
      );

      listModalHTMLCode = await listModalHTML()
      rfqModalHTMLCode = await rfqModalHTML()

      resolve({
        totalStockIn: skuStockIn,
        totalStockOut: skuStockOut,
        toatalStockRemaining: skuStockRemaining,
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export async function submitUpdateSKUForm(e: any) {
  e.preventDefault();
  const formData: any = new FormData(e.target);
  const formValues: any = Object.fromEntries(formData); // output as an object
  await createItemSKU(formValues);
}

export async function createItemSKU(formValues: any) {
  console.log('formValues SKU ->', formValues)
  let urlPath = location.pathname;
  let itemId = Number(urlPath.substring(10));

  // const itemEntityConcept: Concept = await GetTheConcept(itemId);
  const itemEntityConcept: LConcept = await GetTheConceptLocal(itemId);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;

  const skuEntityConcept: LConcept = await createEntityInstance(
    "sku",
    userId,
    formValues
  );

  // the_item_s_sku
  await CreateConnectionBetweenEntityLocal(
    itemEntityConcept,
    skuEntityConcept,
    itemSkuLinker
  );
  await LocalSyncData.SyncDataOnline();

  closeModal("modelConfirm");
}

// for modal
export async function openModal(modalId: string) {
  const check = document.getElementById(modalId);
  if (check) check.style.display = "block";
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");

  // Close all modals when press ESC
  document.onkeydown = function (event: any) {
    if (event.code === "Escape" || event.key === "Escape") {
      // if (check) check.style.display = "none";
      closeModal(modalId)
    }
  };

  // if (modalId === 'rfq-modal') {
  //   rfqModalHTMLCode = await rfqModalHTML()
  // }

  // if (modalId === 'list-modal') {
  //   // createListingPlatform()

  //   // const profileStorageData: any = await getLocalStorageData();
  //   // const userId = profileStorageData?.userId;
  //   // const platformList = await GetCompositionListWithId('the_listing', userId, 10, 1)
  // }
}

export async function createListingPlatform() {
  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const listingInstanceConcept: LConcept = await MakeTheInstanceConceptLocal(
    `the_listing`,
    'Nepal CRE',
    true,
    userId,
    4,
    999
  );
  
  await LocalSyncData.SyncDataOnline();
  console.log('listingInstanceConcept ->', listingInstanceConcept)
}

export async function closeModal(modalId: string) {
  const modal: any = document.getElementById(modalId);

  const modalFormEl = modal.querySelector('form')
  modalFormEl.reset()

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

// listing platform
// export async function submitListingForm(e: any) {
//   e.preventDefault()
// }


export async function submitRFQForm(e: any) {
  e.preventDefault();

  const formData: any = new FormData(e.target);
  // output as an object
  const formValues: any = Object.fromEntries(formData);

  const rfqResponse = await createItemRFQ(formValues);
  console.log("rfqResponse", rfqResponse);
}

export async function createItemRFQ(formValues: any) {
  console.log("createItem formValues ->", formValues);
  
  let urlPath = location.pathname;
  let itemId = Number(urlPath.substring(10));
  console.log("itemId ->", itemId);

  // const itemEntityConcept: Concept = await GetTheConcept(itemId);
  const itemEntityConcept = await GetTheConceptLocal(itemId);
  console.log("itemEntityConcept ->", itemEntityConcept);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const token = profileStorageData?.token;

  // buyerAgentEntity
  const buyAgentEntityDetails = await getBuyerAgentData(Number(formValues?.buyeragent), token)
  console.log('buyAgentEntityDetails', buyAgentEntityDetails)

  delete formValues.attachment
  formValues.buyer = profileStorageData?.entityId
  formValues.timestamp = new Date().toISOString()
  // formValues.buyeragent = buyerAgentEntity?.entity
  console.log("createItem formValues 2 ->", formValues);

  const rfqEntityConcept = await createEntityInstance(
    "rfq",
    userId,
    formValues
  );
  console.log("rfqEntityConcept ->", rfqEntityConcept);

  // the_rfq_s_attachment
  // await CreateConnectionBetweenEntity(
  //   rfqEntityConcept,
  //   attachmentConcept,
  //   rfqAttachmentLinker
  // );
  await CreateConnectionBetweenEntityLocal(
    rfqEntityConcept,
    attachmentConcept,
    rfqAttachmentLinker
  );

  // the_rfq_s_item
  // await CreateConnectionBetweenEntity(
  //   rfqEntityConcept,
  //   itemEntityConcept,
  //   s_item_linker
  // );
  await CreateConnectionBetweenEntityLocal(
    rfqEntityConcept,
    itemEntityConcept,
    s_item_linker
  );
  // await SyncData.SyncDataOnline();
  await LocalSyncData.SyncDataOnline();

  console.log("rfq completed");
  closeModal("rfq-modal");
}

export async function getBuyerAgentData(buyerAgentConceptId: number, token: string) {
  let buyerAgentEntityConcept: LConcept;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const buyerAgentConceptResponse = await fetch(
    `${thetaBoommAPI}/api/search-compositions-internal?search=&type=&composition=the_buyeragent&inpage=10&page=1`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const output = await buyerAgentConceptResponse.json();

  // let search = new SearchStructure();
  // search.composition = "the_seller";
  // search.inpage = 100;
  // const output = await SearchLinkInternal(search, token);

  console.log("output the_buyerAgent ->", output);

  const buyerAgentEntityId = Number(Object.keys(output)?.[0]);
  console.log("buyerAgentEntityId ->", buyerAgentEntityId);

  if (buyerAgentEntityId) {
    console.log("IF")
    buyerAgentEntityConcept = await GetTheConceptLocal(buyerAgentEntityId);
  } else {
    console.log("ELSE")

    const entityDetails = await getEntityByUserconceptId(Number(buyerAgentConceptId), token)
    console.log('buyer agent entityDetails ->', entityDetails)


    // const entityDetails: any = await fetch(
    //   `${thetaBoommAPI}/api/get-entity-from-user?userConceptId=${userConceptId}`
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     return json;
    //   });

    console.log("entityDetails ->", entityDetails);
    const entityId = entityDetails?.entity;

    buyerAgentEntityConcept = await MakeTheInstanceConceptLocal(
      "the_buyeragent",
      entityId,
      true,
      999,
      4,
      999
    );
  }

  console.log("buyerAgentEntityConcept ->", buyerAgentEntityConcept);

  // await CreateConnectionBetweenEntityLocal(
  //   buyerAgentEntityConcept,
  //   itemEntityConcept,
  //   "s_item"
  // );

  return buyerAgentEntityConcept;

}

export async function addDocument() {
  const attachmentEl = <HTMLInputElement>document.getElementById('attachment')
  attachmentEl.addEventListener("change", (e: any) => {
    const files = e.target.files[0];
    // const docName = files.name;

    // for (let i = 0; i < files.length; i++) {
    //   const file = files.item(i);
    //   const fileName = file.name;
    //   // this.uploadFile(file, fileName);
    // }

    // let formdata = new FormData();
    // formdata.append("file", files);

    uploadFile(files);
  });

  // event.target.value = null;
}

export async function uploadFile(files: any) {
  let formdata = new FormData();
  formdata.append("file", files);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const token = profileStorageData?.token;

  const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${thetaBoommAPI}/api/Image/UploadFile`,
    {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }
  );
  if (!response.ok) {
    const errorData = await response.text()
    console.error(`${response.status} ${errorData}`)
    return null
  }
  const output = await response.json();

  const attachmentValues = {
    name: files?.name, 
    size: files?.size,
    type: files?.type,
    url: output?.data
  }

  attachmentConcept = await createEntityInstance(
    "attachment",
    userId,
    attachmentValues
  );

  console.log('attachmentConcept', attachmentConcept)
}
