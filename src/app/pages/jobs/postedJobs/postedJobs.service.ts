import {
  FilterSearch,
  MakeTheInstanceConcept,
  SearchLinkMultipleAll,
  SearchQuery,
} from "mftsccs-browser";
import { getLocalStorageData } from "../../../services/helper.service";

export async function getPostedJobs() {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const profileStorageData: any = await getLocalStorageData();
      const userId = profileStorageData?.userId;
      const token = profileStorageData?.token;
      const userEntityId = profileStorageData?.entityId;

      const humanizingData = await MakeTheInstanceConcept(
        "the_listing",
        "Humanizing Data",
        false,
        userId
      );
      console.log("humanizingData", humanizingData);

      let searchfirst = new SearchQuery();
      searchfirst.composition = humanizingData?.id;
      searchfirst.fullLinkers = ["the_item_s_listing"];
      searchfirst.reverse = true;
      searchfirst.doFilter = true;
      searchfirst.inpage = 100;
      // searchfirst.selectors = ["the_item", "the_item_name"];

      let searchsecond = new SearchQuery();
      searchsecond.fullLinkers = ["the_listingagent_s_item", "the_seller_s_item"];
      // searchsecond.fullLinkers = ["the_seller_s_item"];
      searchsecond.reverse = true;
      searchsecond.doFilter = true;
      searchsecond.inpage = 100;
      searchsecond.selectors = [
        "the_item",
        "the_item_name",
        "the_item_description",
        "the_item_category",
        "the_item_price",
        "the_item_priceType",
        "the_item_priceCurrency",
        "the_item_type",
        // "the_item_s_image",
      ];

      let filterSearch = new FilterSearch();
      // filterSearch.type = "listingagent";
      filterSearch.type = "seller";
      filterSearch.search = `${userEntityId}`;
      filterSearch.composition = false;
      // searchsecond.filterSearches = [filterSearch];

      let filterSearchTwo = new FilterSearch();
      filterSearchTwo.type = "listingagent";
      filterSearchTwo.search = `${userEntityId}`;
      filterSearchTwo.composition = false;
      searchsecond.filterSearches = [filterSearch, filterSearchTwo];

      const queryParams = [searchfirst, searchsecond];
      console.log("queryParams", queryParams);
      const output = await SearchLinkMultipleAll(queryParams, token);
      console.log("output jobs i have posted ->", output);

      const myPostedJobs =
        output?.data?.the_listing?.the_item_s_listing_reverse;
      console.log("myPostedJobs", myPostedJobs);

      let postedJobsHTML: any;
      if (myPostedJobs?.length) {
        const jobsList = myPostedJobs?.map((job: any) => {
          // console.log("job ->", job);
          const jobItem = job?.data?.the_item;
          return {
            id: job?.id,
            createdAt: job?.created_at,
            name: jobItem?.the_item_name?.[0]?.data?.the_name,
            description:
              jobItem?.the_item_description?.[0]?.data?.the_description,
            price: jobItem?.the_item_price?.[0]?.data?.the_price,
            priceCurrency:
              jobItem?.the_item_priceCurrency?.[0]?.data?.the_priceCurrency,
            priceType: jobItem?.the_item_priceType?.[0]?.data?.the_priceType,
          };
        });
        console.log("jobsList ->", jobsList);
        postedJobsHTML = jobsList
          .map((job: any) => {
            return `
              <div class="grid grid-cols-3 gap-4 my-4 border rounded p-4">
                <div class="p-4 rounded-lg shadow-lg bg-indigo-500 col-span-3">
                  <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    ${job?.name}
                  </h1>
                  <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    ${job?.priceCurrency || "$"}${job?.price} ${
              job?.priceType || ""
            }
                  </p>
                  <p class="mb-6 text-gray-900 dark:text-white">
                    ${job?.description}
                  </p>

                  <router-link href="/job/${
                    job.id
                  }" class="mx-auto my-4 px-4 py-3 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded cursor-pointer">View Job Info And Applicants</router-link>
                </div>

                <!-- <div class="">Image</div> -->
              </div>
            `;
          })
          .join("");
        // postedJobsHTML = `
        //   <div class="flex justify-center flex-col text-center">
        //     <p>You have posted ${myPostedJobs?.length} jobs yet.</p>
        //   </div>
        // `
      } else {
        postedJobsHTML = `
        <div class="flex justify-center flex-col text-center">
          <p>You do not have posted any jobs yet.</p>
          <router-link href="/additem" class="mx-auto my-4 px-4 py-3 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer">Post New Job</router>
        </div>
        `;
      }

      resolve(postedJobsHTML);
      return "<h1> Posted Jobs page</h1>";

      const listingItems =
        output?.data?.the_listing?.the_item_s_listing_reverse;

      const itemList = listingItems?.map((item: any) => {
        const itemDetails = item?.data?.the_item;
        return {
          id: item?.id,
          name: itemDetails?.the_item_name?.[0]?.data?.the_name,
          price: itemDetails?.the_item_price?.[0]?.data?.the_price,
          category: itemDetails?.the_item_category?.[0]?.data?.the_category,
          // image: itemDetails?.the_item_image?.[0]?.data?.the_image,
          image:
            itemDetails?.the_item_s_image?.[0]?.data?.the_attachment
              ?.the_attachment_url?.[0]?.data?.the_url,
        };
      });

      console.log("itemList", itemList);

      const finalItemsList = itemList
        ?.map((item: any) => {
          if (!item?.image || item?.image === "undefined")
            item.image = "https://placehold.co/600x600";
          return `
            <router-link href="/job/${item?.id}" class="mx-auto border sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500 w-full">
              <img src="${item?.image}" alt="face cream image" class="w-full border object-cover aspect-square">
              <!-- <div>
                <img src="${item?.image}" alt="face cream image" class="w-full border aspect-square">
              </div> -->
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <h6 class="truncate font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">${item?.name}</h6>
                  <h6 class="font-semibold text-xl leading-8 text-indigo-600">$${item?.price}</h6>
                </div>
                <!-- <p class="mt-2 font-normal text-sm leading-6 text-gray-500">${item?.category}</p> -->
              </div>
            </router-link>
          `;
        })
        .join("");

      resolve(finalItemsList);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
