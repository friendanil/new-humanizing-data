import { initTopNavigation } from "../../modules/top-nav/top-navigation.service";

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

export const loadHTML = await getHTML();

export async function initiateListing() {
  console.log("Listing page landed!!");
  initTopNavigation()
  getProducts()
}

export async function getProducts() {
  const productList: any = await fetch('https://fakestoreapi.com/products?limit=10')
  .then(res=>res.json())
  .then(json=> {
    console.log(json)
    return json
  })

  console.log('productList', productList)

  const listingItems = productList.map((product: any) => {
    // href="/list/${product.id}"
    return `
      <router-link href="/listitem" class="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
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
    `
  }).join('')

  const productListEl = <HTMLElement>document.getElementById('product-listings')
  productListEl.innerHTML = listingItems

}
