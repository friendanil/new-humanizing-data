// import { Concept, MakeTheInstanceConcept, SyncData } from "mftsccs-browser";
import {
  GetTheConceptLocal,
  LConcept,
  LocalSyncData,
  MakeTheInstanceConceptLocal,
  SearchLinkInternal,
  SearchStructure,
} from "mftsccs-browser";
import { getLocalStorageData } from "../../services/helper.service";
import { CreateConnectionBetweenEntityLocal } from "../../services/entity.service";
import { updateContent } from "../../routes/renderRoute.service";
import { environment } from "../../environments/environment.dev";

const thetaBoommAPI = environment?.boomURL;

export async function getHTML() {
  try {
    const response = await fetch(
      "/src/app/pages/addItem/addItem.component.html"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const htmlContent = await response.text();
    // console.log('profile htmlContent', htmlContent)
    return htmlContent;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

// export async function loadHTML() {
//   return await getHTML();
// }

export async function submitAddItemForm(e: any) {
  console.log("e ->", e);
  e.preventDefault();

  const formData: any = new FormData(e.target);
  // output as an object
  console.log("formData entries ->", Object.fromEntries(formData));
  const formValues: any = Object.fromEntries(formData);
  console.log("formValues ->", formValues);

  // ...or iterate through the name-value pairs
  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  //   formValues[pair[0]] = pair[1]
  // }

  const elements = e.target;
  for (let i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }

  const itemConceptResponse = await createItem(formValues);
  await LocalSyncData.SyncDataOnline();

  // the_seller_s_item
  const sellerItemResponse = await updateItem(itemConceptResponse);
  console.log("sellerItemResponse ->", sellerItemResponse);
  await LocalSyncData.SyncDataOnline();

  if (itemConceptResponse) {
    e?.target?.reset();
    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled = false;
    }
    updateContent("/listing");
  }
}

export async function createItem(formValues: any) {
  console.log("createItem formValues ->", formValues);
  const itemName = formValues?.name;

  const profileStorageData: any = await getLocalStorageData();
  // console.log("profileStorageData ->", profileStorageData);
  const userId = profileStorageData?.userId;
  // console.log("userId ->", userId);

  const itemEntityConcept = await MakeTheInstanceConceptLocal(
    "the_item",
    itemName,
    true,
    userId,
    4,
    999
  );

  console.log("itemEntityConcept ->", itemEntityConcept);

  for (const [key, value] of Object.entries(formValues)) {
    let ObjKey = key;

    const keyConcept: LConcept = await MakeTheInstanceConceptLocal(
      `${ObjKey}`,
      `${value}`,
      false,
      userId,
      4,
      999
    );
    await CreateConnectionBetweenEntityLocal(
      itemEntityConcept,
      keyConcept,
      ObjKey
    );
  }

  console.log("itemEntityConcept ID ->", itemEntityConcept?.id);
  return itemEntityConcept;
}

export async function updateItem(itemEntityConcept: any) {
  console.log("updateItem itemEntityConcept ->", itemEntityConcept);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const userConceptId = profileStorageData?.userConcept;
  const token = profileStorageData?.token;

  let sellerEntityConcept: LConcept;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const sellerConceptResponse = await fetch(
    `${thetaBoommAPI}/api/search-compositions-internal?search=&type=&composition=the_seller&inpage=10&page=1`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );

  const output = await sellerConceptResponse.json();

  // let search = new SearchStructure();
  // search.composition = "the_seller";
  // search.inpage = 100;
  // const output = await SearchLinkInternal(search, token);

  console.log("output the_seller ->", output);

  const sellerEntityId = Number(Object.keys(output)?.[0]);
  console.log("sellerEntityId ->", sellerEntityId);

  if (sellerEntityId) {
    console.log("IF")
    sellerEntityConcept = await GetTheConceptLocal(sellerEntityId);
  } else {
    console.log("ELSE")
    const entityDetails: any = await fetch(
      `${thetaBoommAPI}/api/get-entity-from-user?userConceptId=${userConceptId}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json;
      });

    console.log("entityDetails ->", entityDetails);
    const entityId = entityDetails?.entity;
    sellerEntityConcept = await MakeTheInstanceConceptLocal(
      "the_seller",
      entityId,
      true,
      userId,
      4,
      999
    );
  }

  console.log("sellerEntityConcept ->", sellerEntityConcept);

  await CreateConnectionBetweenEntityLocal(
    sellerEntityConcept,
    itemEntityConcept,
    "s_item"
  );

  return sellerEntityConcept;
}
