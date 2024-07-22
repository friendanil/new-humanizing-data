import {
  MakeTheInstanceConcept,
  SearchLinkMultipleAll,
  SearchQuery,
} from "mftsccs-browser";
import { getLocalStorageData } from "../../services/helper.service";
// import { environment } from "../../environments/environment.dev";

// const boomURL = environment?.boomURL;

export async function getListingItems() {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const profileStorageData: any = await getLocalStorageData();
      const userId = profileStorageData?.userId;
      const token = profileStorageData?.token;

      const boomconsoleData = await MakeTheInstanceConcept(
        "the_listing",
        "Nepal CRE",
        false,
        userId
      );
      console.log("boomconsoleData", boomconsoleData);

      let searchfirst = new SearchQuery();
      searchfirst.composition = boomconsoleData?.id;
      searchfirst.fullLinkers = ["the_item_s_listing"];
      searchfirst.reverse = true;
      searchfirst.inpage = 100;

      let searchsecond = new SearchQuery();
      searchsecond.fullLinkers = [
        "the_item_name",
        "the_item_price",
        "the_item_category",
        "the_item_image",
      ];
      searchsecond.inpage = 100;

      const queryParams = [searchfirst, searchsecond];
      console.log("queryParams ->", queryParams);
      const output = await SearchLinkMultipleAll(queryParams, token);
      console.log("output ->", output);

      const listingItems =
        output?.data?.the_listing?.the_item_s_listing_reverse;
        
      const itemList = listingItems?.map((item: any) => {
        const itemDetails = item?.data?.the_item;
        return {
          id: item?.id,
          name: itemDetails?.the_item_name?.[0]?.data?.the_name,
          price: itemDetails?.the_item_price?.[0]?.data?.the_price,
          category: itemDetails?.the_item_category?.[0]?.data?.the_category,
          image: itemDetails?.the_item_image?.[0]?.data?.the_image,
        };
      });

      console.log("itemList", itemList);

      const finalItemsList = itemList
        ?.map((item: any) => {
          console.log("ITEM-<", item);
          if (!item?.image || item?.image === "undefined")
            item.image = "https://placehold.co/600x600";
          return `
            <router-link href="/listitem/${item?.id}" class="mx-auto border sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500 w-full">
              <img src="${item?.image}" alt="face cream image" class="w-full border object-cover aspect-square">
              <!-- <div>
                <img src="${item?.image}" alt="face cream image" class="w-full border aspect-square">
              </div> -->
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <h6 class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${item?.name}</h6>
                  <h6 class="font-semibold text-xl leading-8 text-indigo-600">$${item?.price}</h6>
                </div>
                <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${item?.category}</p>
              </div>
            </router-link>
          `;
        })
        .join("");

      resolve(finalItemsList);

      // setTimeout(async () => {
      // const platformList = await GetCompositionListWithId(
      //   "the_listing",
      //   userId,
      //   10,
      //   1
      // );
      // console.log("platformList", platformList);

      // const platformIds = platformList?.map((item: any) => item?.id);

      // const platformIds = await Promise.all(
      //   platformList?.map(async (item: any) => {
      //     const myHeaders = new Headers();
      //     myHeaders.append("Content-Type", "application/json");
      //     myHeaders.append("Authorization", `Bearer ${token}`);

      //     const queryData = [
      //       {
      //         composition: item?.id,
      //         fullLinkers: ["the_item_s_listing"],
      //         reverse: true,
      //         inpage: 100,
      //         page: 1,
      //         logic: "or",
      //         filterSearches: [],
      //       },
      //       {
      //         fullLinkers: [
      //           "the_item_name",
      //           "the_item_price",
      //           "the_item_category",
      //           "the_item_image",
      //         ],
      //         inpage: 100,
      //         page: 1,
      //         logic: "or",
      //         filterSearches: [],
      //       },
      //     ];

      //     const response = await fetch(
      //       `${boomURL}/api/Connection/search-link-multiple-clean`,
      //       {
      //         method: "POST",
      //         headers: myHeaders,
      //         body: JSON.stringify(queryData),
      //         redirect: "follow",
      //       }
      //     );

      //     const output = await response.json();
      //     console.log("output ->", output);

      //     return output;
      //   })
      // );

      // const allItems = await Promise.all(
      //   platformList?.map(async (item: any) => {
      //     let searchfirst = new SearchQuery();
      //     searchfirst.composition = item?.id;
      //     searchfirst.fullLinkers = ["the_item_s_listing"];
      //     searchfirst.reverse = true;
      //     searchfirst.inpage = 100;

      //     let searchsecond = new SearchQuery();
      //     searchsecond.fullLinkers = [
      //       "the_item_name",
      //       "the_item_price",
      //       "the_item_category",
      //       "the_item_image",
      //     ];
      //     searchsecond.inpage = 100;

      //     const queryParams = [searchfirst, searchsecond];
      //     console.log("queryParams ->", queryParams);
      //     const output = await SearchLinkMultipleAll(queryParams, '');
      //     console.log("output ->", output);
      //     return output;
      //   })
      // );

      // console.log("allItems ->", allItems);

      // const itemList = allItems?.map((listing: any) => {
      //   const listingItems =
      //     listing?.data?.the_listing?.the_item_s_listing_reverse;
      //   // if (listingItems.length) {
      //   return listingItems?.map((item: any) => {
      //     const itemDetails = item?.data?.the_item;
      //     return {
      //       id: item?.id,
      //       name: itemDetails?.the_item_name?.[0]?.data?.the_name,
      //       price: itemDetails?.the_item_price?.[0]?.data?.the_price,
      //       category: itemDetails?.the_item_category?.[0]?.data?.the_category,
      //       image: itemDetails?.the_item_image?.[0]?.data?.the_image,
      //     };
      //   });
      //   // } else return []
      // });
      // // );

      // console.log("itemList ->", itemList.flat());

      // const finalItemList = itemList
      //   ?.flat()
      //   ?.map((item: any) => {
      //     console.log("ITEM-<", item);
      //     if (!item?.image || item?.image === "undefined")
      //       item.image = "https://placehold.co/600x600";
      //     return `
      //       <router-link href="/listitem/${item?.id}" class="mx-auto border sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500 w-full">
      //         <img src="${item?.image}" alt="face cream image" class="w-full border object-cover aspect-square">
      //         <!-- <div>
      //           <img src="${item?.image}" alt="face cream image" class="w-full border aspect-square">
      //         </div> -->
      //         <div class="p-4">
      //           <div class="flex items-center justify-between">
      //             <h6 class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${item?.name}</h6>
      //             <h6 class="font-semibold text-xl leading-8 text-indigo-600">$${item?.price}</h6>
      //           </div>
      //           <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${item?.category}</p>
      //         </div>
      //       </router-link>
      //     `;
      //   })
      //   .join("");

      // // return finalItemList;
      // resolve(finalItemList);
      // }, 500);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
