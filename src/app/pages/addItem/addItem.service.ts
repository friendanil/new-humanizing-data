import { Concept, MakeTheInstanceConcept, SyncData } from "mftsccs-browser";
import { getLocalStorageData } from "../../services/helper.service";
import { CreateConnectionBetweenEntity } from "../../services/entity.service";
import { updateContent } from "../../routes/renderRoute.service";

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
  console.log('e ->', e)
  e.preventDefault()

  const formData: any = new FormData(e.target);
  // output as an object
  console.log('formData entries ->', Object.fromEntries(formData));
  const formValues: any = Object.fromEntries(formData)
  console.log('formValues ->', formValues)

  // ...or iterate through the name-value pairs
  // for (let pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  //   formValues[pair[0]] = pair[1]
  // }

  const elements = e.target;
  for (let i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
  }

  const itemConceptResponse = await createItem(formValues)
  if (itemConceptResponse) {
    e?.target?.reset()
    for (let i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled = false;
    }
    updateContent("/listing");
  }
}

export async function createItem(formValues: any) {
  console.log('createItem formValues ->', formValues)

  const profileStorageData: any = await getLocalStorageData()
  console.log('profileStorageData ->', profileStorageData)
  const userId = profileStorageData?.userId
  console.log('userId ->', userId)

  const itemEntityConcept = await MakeTheInstanceConcept(
    'the_item',
    '',
    true,
    userId,
    4,
    999,
  )

  console.log('itemEntityConcept ->', itemEntityConcept)

  for (const [key, value] of Object.entries(formValues)) {
    let ObjKey = key

    const keyConcept: Concept = await MakeTheInstanceConcept(
      `${ObjKey}`,
      `${value}`,
      false,
      userId,
      4,
      999,
    )
    await CreateConnectionBetweenEntity(itemEntityConcept, keyConcept, ObjKey)
  }

  await SyncData.SyncDataOnline()
  console.log('itemEntityConcept ID ->', itemEntityConcept?.id)
  return itemEntityConcept
}
