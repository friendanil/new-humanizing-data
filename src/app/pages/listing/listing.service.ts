import { SearchLinkInternal, SearchStructure } from "mftsccs-browser";
import { getLocalStorageData } from "../../services/helper.service";

// export async function getHTML() {
//   try {
//     const response = await fetch(
//       "src/app/pages/listing/listing.component.html"
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
// export async function loadHTML() {
//   return await getHTML();
// }

export async function initiateListing() {
  // initTopNavigation()
  // getProducts()
  // return true
}

export async function getProducts() {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      let search = new SearchStructure();
      search.composition = "the_item";
      search.inpage = 100;

      const profileStorageData: any = await getLocalStorageData();
      let token = profileStorageData?.token;
      let values = await SearchLinkInternal(search, token);

      const productList = values;
      // const productList: any = await fetch(
      //   `${thetaBoommAPI}/api/search-compositions-internal-clean?search=&type=&composition=the_item&inpage=100&page=1`
      // )
      //   .then((res) => res.json())
      //   .then((json) => {
      //     return json;
      //   });

      let listingItems = `
        <div class="py-8 text-center">
          <h4 class="text-center text-zinc-900 dark:text-white">You have not added any items yet.</h4>
        </div>
      `;

      if (productList.length) {
        listingItems = productList
          .map((product: any) => {
            if (!product?.data?.image || product?.data?.image === "undefined")
              product.data.image = "https://placehold.co/600x600";
            return `
            <router-link href="/listitem/${product?.id}" class="mx-auto border sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500 w-full">
              <img src="${product?.data?.image}" alt="face cream image" class="w-full border object-cover aspect-square">
              <!-- <div>
                <img src="${product?.data?.image}" alt="face cream image" class="w-full border aspect-square">
              </div> -->
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <h6 class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${product?.data?.name}</h6>
                  <h6 class="font-semibold text-xl leading-8 text-indigo-600">$${product?.data?.price}</h6>
                </div>
                <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${product?.data?.category}</p>
              </div>
            </router-link>
          `;
          })
          .join("");
      }

      const itemListLoader = <HTMLDivElement>(
        document.getElementById("item-list-loader")
      );
      itemListLoader.classList.add("hidden");

      const itemListContainer = <HTMLDivElement>(
        document.getElementById("item-list-container")
      );
      itemListContainer.classList.remove("hidden");

      const itemContainer = <HTMLDivElement>(
        document.getElementById("product-listings")
      );
      itemContainer.innerHTML = listingItems;

      resolve(listingItems);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

// export async function _getProducts() {
//   const productList: any = await fetch(
//     "https://fakestoreapi.com/products?limit=10"
//   )
//     .then((res) => res.json())
//     .then((json) => {
//       return json;
//     });

//   const listingItems = await productList
//     .map((product: any) => {
//       return `
//       <router-link href="/listitem/${product.id}" class="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
//         <div class="">
//           <img src="${product.image}" alt="face cream image" class="w-full aspect-square">
//         </div>
//         <div class="mt-5">
//           <div class="flex items-center justify-between">
//             <h6 class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${product.title}</h6>
//             <h6 class="font-semibold text-xl leading-8 text-indigo-600">$${product.price}</h6>
//           </div>
//           <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${product.category}</p>
//         </div>
//       </router-link>
//     `;
//     })
//     .join("");

//   return listingItems;
// }
