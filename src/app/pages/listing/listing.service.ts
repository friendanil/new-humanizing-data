import { SearchLinkInternal, SearchStructure } from "mftsccs-browser";
// import { environment } from "../../environments/environment.dev";
import { getLocalStorageData } from "../../services/helper.service";

// const thetaBoommAPI = environment?.boomURL;

export async function getHTML() {
  try {
    const response = await fetch(
      "src/app/pages/listing/listing.component.html"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const htmlContent = await response.text();
    return htmlContent;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// export const loadHTML = await getHTML();
// export async function loadHTML() {
//   return await getHTML();
// }

export async function initiateListing() {
  console.log("Listing page landed!!");
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
       let values = await SearchLinkInternal(search,token);

       console.log("this is the console data", values);  

       const productList = values;
      // const productList: any = await fetch(
      //   `${thetaBoommAPI}/api/search-compositions-internal-clean?search=&type=&composition=the_item&inpage=100&page=1`
      // )
      //   .then((res) => res.json())
      //   .then((json) => {
      //     console.log(json);
      //     return json;
      //   });

      console.log("productList", productList);

      const listingItems = await productList
        .map((product: any) => {
          if (!product?.data?.image) product.data.image = "https://placehold.co/600x600"
          return `
            <router-link href="/listitem/${product?.id}" class="mx-auto border sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
              <div class="">
                <img src="${product?.data?.image}" alt="face cream image" class="w-full border aspect-square">
                <!-- <img src="https://placehold.co/600x600" alt="face cream image" class="w-full aspect-square"> -->
              </div>
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

      // console.log('listingItems', listingItems, typeof(listingItems))

      // return listingItems
      // resolve(listingItems);
      // listContent.innerHTML = listingItems

      const itemListLoader = <HTMLDivElement>document.getElementById('item-list-loader')
      itemListLoader.classList.add('hidden')

      const itemListContainer = <HTMLDivElement>document.getElementById('item-list-container')
      itemListContainer.classList.remove('hidden')

      const itemContainer = <HTMLDivElement>document.getElementById('product-listings')
      itemContainer.innerHTML = listingItems

      resolve(listingItems);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export async function _getProducts() {
  const productList: any = await fetch(
    "https://fakestoreapi.com/products?limit=10"
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });

  console.log("productList", productList);

  const listingItems = await productList
    .map((product: any) => {
      // href="/list/${product.id}"
      return `
      <router-link href="/listitem/${product.id}" class="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
        <div class="">
          <img src="${product.image}" alt="face cream image" class="w-full aspect-square">
        </div>
        <div class="mt-5">
          <div class="flex items-center justify-between">
            <h6 class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${product.title}</h6>
            <h6 class="font-semibold text-xl leading-8 text-indigo-600">$${product.price}</h6>
          </div>
          <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${product.category}</p>
        </div>
      </router-link>
    `;
    })
    .join("");

  console.log("listingItems", listingItems, typeof listingItems);

  return listingItems;

  // const productListEl = <HTMLElement>document.getElementById('product-listings')
  // productListEl.innerHTML = listingItems
}
