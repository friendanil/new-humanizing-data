import { Concept, MakeTheInstanceConcept, SyncData } from "mftsccs-browser";
import { getLocalStorageData } from "../../services/helper.service";
import { CreateConnectionBetweenEntity } from "../../services/entity.service";

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

export const loadHTML = await getHTML();


export async function submitAddItemForm(e: any) {
  console.log('e ->', e)
  e.preventDefault()
  // alert('Add item clicked!')

  let formValues: any = {}

  const formData: any = new FormData(e.target);
  // output as an object
  console.log(Object.fromEntries(formData));

  // ...or iterate through the name-value pairs
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
    formValues[pair[0]] = pair[1]
  }

  console.log('formValues ->', formValues)

  const itemConceptResponse = await createItem(formValues)
  if (itemConceptResponse) {
    e?.target?.reset()
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
  console.log('itemEntityConcept ->', itemEntityConcept)
  return itemEntityConcept
}


// check form with document.forms[]
export async function formcheck() {
  console.log('testtesttest')

  const formdata: any = new FormData(document.forms[<any>"addItemForm"] as HTMLFormElement);
  console.log('formdata', formdata)
  const userInput = formdata.get('name');
  console.log('name ->', userInput)

  const form: any = document?.forms[0];
  console.log('form ->', form)
  form.addEventListener("submit", getValues);

  function getValues(e: any) {
    console.log('getvalues e', e)
    e.preventDefault()
  
    console.log(form.name.value)
  }

  return true
}