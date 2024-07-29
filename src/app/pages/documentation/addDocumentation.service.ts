import { LConcept, MakeTheInstanceConceptLocal } from "mftsccs-browser";
import { environment } from "../../environments/environment.dev";
import { createEntityInstance } from "../../services/createEntityInstance.service";
import { getLocalStorageData } from "../../services/helper.service";
import { CreateConnectionBetweenEntityLocal } from "../../services/entity.service";

const thetaBoommAPI = environment?.boomURL;

export async function getHTML() {
    try {
      const response = await fetch(
        "/src/app/pages/addItem/documentation.component.html"
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

export async function submitAddDocumentationForm(e: any) {
    e.preventDefault();
    const formData: any = new FormData(e.target);
    // output as an object
    const formValues: any = Object.fromEntries(formData);
    await createDocumentation(formValues)
}

export async function createDocumentation(formValues: any) {
    const documentName = formValues?.docName;
    const profileStorageData: any = await getLocalStorageData();
    const userId = profileStorageData?.userId;
    // console.log(userId,"get userId",documentName)
    const docConcept = await createEntityInstance('documentName', userId, {title: documentName})
    const makeConcepts= await MakeTheInstanceConceptLocal("the_documentaion",
    '',
    true,
    userId,
    4,
    999,
    docConcept?.id)
   
    const docEntityConcept = await MakeTheInstanceConceptLocal(
      "the_documentaion",
      '',
      true,
      userId,
      4,
      999,
      makeConcepts?.id
    )
    console.log(docEntityConcept,"here")
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
        docEntityConcept,
        keyConcept,
        ObjKey
      );
    }
  
    // console.log("itemEntityConcept ID ->", itemEntityConcept?.id);
    // return itemEntityConcept;
}