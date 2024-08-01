import {
  Concept,
  CreateConnectionBetweenTwoConcepts,
  CreateTheConnection,
  GetCompositionWithId,
  GetLink,
  GetTheConcept,
  GetTheConceptLocal,
  LocalSyncData,
  MakeTheInstanceConcept,
  PatcherStructure,
  SearchLinkMultipleAll,
  SearchQuery,
  SyncData,
  UpdateComposition,
  DeleteConceptById,
} from "mftsccs-browser";
import { IUser } from "../../interfaces/IUser.interface";
import { getLocalStorageData } from "../../services/helper.service";
import { createEntityInstance } from "../../services/createEntityInstance.service";
// import { initTopNavigation } from "../../modules/top-nav/top-navigation.service";
import { environment } from "../../environments/environment.dev";
import { showToast } from "../../modules/toast-bar/toast-bar.index";
import { CreateConnectionBetweenEntityLocal } from "../../services/entity.service";
import './profile.style.css';

const thetaBoommAPI = environment?.boomURL;
let attachmentValues: any;
let attachmentConcept: any;
let output: any;
let profilePicUrl: any;

(window as any).deleteFn = deleteFn;
(window as any).deleteFnExperience = deleteFnExperience;
(window as any).deleteDocFn = deleteDocFn;
// (window as any).updateInput = updateInput;
// Array to hold the input field data
const EducationFieldsArray: any = [];
const ExperienceFieldsArray: any = [];
const DocumentFieldsArray: any = [];

// Function to add addEducation fields
export async function addEducation(param: any) {
  const divEle: any = document.getElementById("inputFields");
  const container = document.createElement("div");
  container.classList.add("input-container");

  // Add HTML for input fields and delete button
  container.innerHTML = `
             <div id="input-container" class="grid gap-6 mb-6 mt-6 md:grid-cols-3">
            <div>
              <label for="eduLevel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Education Level</label>
              <select id="eduLevel${param}" name='eduLevel' autocomplete="eduLevel-name"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" >
                 <option value="phd">PHD</option>
                <option value="masters">Masters</option>
                <option value="bachelore">Bachelore</option>
                <option value="highSchool">High School</option>
              </select>
          </div>
          <div>
              <label for="course" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
              <select id="course${param}" name="course" autocomplete="course-name"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" >
                 <option value="science">Science</option>
                <option value="computerScience">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="management">Management</option>
                <option value="business">Business</option>
              </select>
          </div>
          <div>
              <label for="eduDateFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date From</label>
              <input type="date" id="eduDateFrom${param}"
                name="eduDateFrom"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From Date" />
            </div>
          <div>
              <label for="eduDateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date To</label>
              <input type="date" id="eduDateTo${param}"
                name="eduDateTo"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="To Date" />
          </div>
          <div>
              <label for="institutionName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Name</label>
              <input type="text" id="institutionName${param}"
                name="institutionName"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Institution Name" />
          </div>
          <div>
              <label for="institutionAddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Address</label>
              <input type="text" id="institutionAddress${param}"
                name="institutionAddress"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Institution Address" />
          </div>
        </div> 
        <button 
           class="delete-button text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onclick="deleteFn(this)">Delete</button>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">

      `;
  divEle.appendChild(container);
}

// Function to add addEducation fields
export async function addExperience(param: any) {
  const divEle: any = document.getElementById("inputFields-1");
  const container = document.createElement("div-1");
  container.classList.add("input-container-1");

  // Add HTML for input fields and delete button
  container.innerHTML = `
          <div id="input-container-1" class="grid gap-6 mb-6 mt-6 md:grid-cols-3">
          <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
             <input type="text" id="company${param}"
                name="company"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Company Name" />
          </div>      
          <div>
              <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
             <input type="text" id="position${param}"
                name="position"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Position" />
          </div>
           <div>
              <label for="expAddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
             <input type="text" id="expAddress${param}"
                name="expAddress"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Address" />
          </div>
          <div>
              <label for="expCountry" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
              <select id="expCountry${param}" name='expCountry' autocomplete="expCountry-name"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" >
                 <option value="nepal">Nepal</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
              </select>
          </div>
          <div>
              <label for="expDateFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date From</label>
              <input type="date" id="expDateFrom${param}"
                name="expDateFrom"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From Date" />
            </div>
          <div>
              <label for="expDateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date To</label>
              <input type="date" id="expDateTo${param}"
                name="expDateTo"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="To Date" />
          </div>
          <div>
          <button 
          class="delete-button-1 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onclick="deleteFnExperience(this)">Delete</button>
          </div>
          </div>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      `;
  divEle.appendChild(container);
}

// Function to add Documents fields
export async function addDoc(param: any) {
  const divEle: any = document.getElementById("inputFields-2");
  const container = document.createElement("div-2");
  container.classList.add("input-container-2");

  // Add HTML for input fields and delete button
  container.innerHTML = `
        <div id="loader" class="center"></div>
          <div id="input-container-2" class="grid gap-6 mb-6 mt-6 md:grid-cols-3">
            <div>
              <label for="docName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Name</label>
               <input type="text" id="docName${param}"
                name="docName"
                class="input-field-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Document Name" />
            </div>
       
          <div>
              <label for="docUpload" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
              <input id="docUpload${param}" type="file" accept=".pdf" onchange="previewImage(event)" name="profilePic" autocomplete="item-attachment"
                class="input-field-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
          </div>
           <div>
              <input id="pdfFile${param}" type="hidden" accept=".pdf" onchange="previewImage(event)" name="profilePic" autocomplete="item-attachment"
                class="input-field-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6 text-zinc-900 bg-zinc-50 dark:text-white dark:bg-gray-900">
          </div>
        </div>
        <button 
           class="delete-button text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onclick="deleteDocFn(this)">Delete</button>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      `;
  divEle.appendChild(container);
}

// Function to delete Education fields
export async function deleteFn(button: any) {
  const container = button.parentElement;
  const index = Array.from(container.parentElement.children).indexOf(container);
  container.remove();

  // Remove from array
  EducationFieldsArray.splice(index, 1);
  // console.log("Updated array:", EducationFieldsArray);
}

// Function to delete Education fields
export async function deleteFnExperience(button: any) {
  const container = button.parentElement;
  const index = Array.from(container.parentElement.children).indexOf(container);
  container.remove();

  // Remove from array
  EducationFieldsArray.splice(index, 1);
  // console.log("Updated array:", EducationFieldsArray);
}

// Function to delete Documents fields
export async function deleteDocFn(button: any) {
  const container = button.parentElement;
  const index = Array.from(container.parentElement.children).indexOf(container);
  container.remove();

  // Remove from array
  EducationFieldsArray.splice(index, 1);
  // console.log("Updated array:", EducationFieldsArray);
}


// function is to preview image
export async function previewImage(event: any) {
  var input: any = event.target;
  var image: any = document.getElementById("profilePic");
  if (input.files && input.files[0]) {
    const files = input.files[0];

    if(files.type==="image/jpeg" || files.type==="image/png"){
      await uploadImageFile(files);
      var reader = new FileReader();
      reader.onload = function (e: any) {
        image.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }else if(files.type==="application/pdf"){
      await uploadPdfFile(files);
    }else{
      setTimeout(async () => {
        await showToast(
          "error",
          "File formate incorrect!",
          "",
          "top-right",
          5000
        );
      }, 100);
    }
  }
}

// function is to upload files
export async function uploadImageFile(files: any) {
  const loader:any=document?.querySelector("#loader")
  if(loader){
    loader.style.display = "block"
    // body.style.visibility="hidden"
  }
  let formdata = new FormData();
  formdata.append("image", files);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const token = profileStorageData?.token;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${thetaBoommAPI}/api/Image/UploadImage`, {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  });
  if (!response.ok) {
    const errorData = await response.text();
    console.error(`${response.status} ${errorData}`);
    return null;
  }
  const output = await response.json();
  const inputPdf = <HTMLInputElement>document.getElementById("fileInput");
  inputPdf.value=output.data


  // attachmentValues = {
  //   name: files?.name,
  //   size: files?.size,
  //   type: files?.type,
  //   url: output?.data,
  // };

  // attachmentConcept = await createEntityInstance(
  //   "attachment",
  //   userId,
  //   attachmentValues
  // );
  if(output.data){
      if(loader){
        // body.style.visibility = "visible";
        loader.style.display = "none"
      }
  setTimeout(async () => {
    await showToast(
      "success",
      "Profile pic added successfully!",
      "",
      "top-right",
      5000
    );
  }, 100);
}
  // console.log("attachmentConcept", attachmentConcept);
}

// function is to upload files
export async function uploadPdfFile(files: any) {
  // const body:any=document?.querySelector("body")
  const loader:any=document?.querySelector("#loader")
  if(loader){
    loader.style.display = "block"
    // body.style.visibility="hidden"
  }
  let formdata = new FormData();
  formdata.append("file", files);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const token = profileStorageData?.token;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${thetaBoommAPI}/api/Image/UploadFile`, {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`${response.status} ${errorData}`);
    return null;
  }
  const output = await response.json();

  const inputImg = <HTMLInputElement>document.getElementById("fileInput");
  inputImg.value=output.data
  // attachmentValues = {
  //   name: files?.name,
  //   size: files?.size,
  //   type: files?.type,
  //   url: output?.data,
  // };

  // attachmentConcept = await createEntityInstance(
  //   "attachment",
  //   userId,
  //   attachmentValues
  // );
  if(output){
    if(loader){
      // body.style.visibility = "visible";
      loader.style.display = "none"
    }
  setTimeout(async () => {
    await showToast(
      "success",
      "Profile pic added successfully!",
      "",
      "top-right",
      5000
    );
  }, 100);
}
  // console.log("attachmentConcept", attachmentConcept);
}

// Save profile details
export async function saveProfileDetails(e: Event) {
  e.preventDefault();

  let userId!: number;
  let userConceptId!: number;
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage);
    userId = Number(profileData?.userId);
    userConceptId = Number(profileData?.userConcept);
  }

  const testProfile: Concept = await MakeTheInstanceConcept(
    "test-profile",
    "",
    true,
    userId,
    4,
    0
  );

  const inputFirstName = <HTMLInputElement>(
    document.getElementById("first_name")
  );
  const firstNameValue = inputFirstName?.value;
  const firstNameConcept: Concept = await MakeTheInstanceConcept(
    "firstName",
    firstNameValue,
    false,
    userId,
    4,
    0
  );
  CreateTheConnection(
    testProfile?.id,
    testProfile?.userId,
    firstNameConcept?.id,
    firstNameConcept?.userId,
    testProfile?.id,
    firstNameConcept?.sessionInformationId,
    firstNameConcept?.sessionInformationUserId
  );

  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  const lastNameValue = inputLastName?.value;
  const lastNameConcept: Concept = await MakeTheInstanceConcept(
    "lastName",
    lastNameValue,
    false,
    userId,
    4,
    0
  );
  CreateTheConnection(
    testProfile?.id,
    testProfile?.userId,
    lastNameConcept?.id,
    lastNameConcept?.userId,
    testProfile?.id,
    lastNameConcept?.sessionInformationId,
    lastNameConcept?.sessionInformationUserId
  );

  const inputCompany = <HTMLInputElement>document.getElementById("company");
  const companyValue = inputCompany?.value;
  const companyConcept: Concept = await MakeTheInstanceConcept(
    "company",
    companyValue,
    false,
    userId,
    4,
    0
  );
  CreateTheConnection(
    testProfile?.id,
    testProfile?.userId,
    companyConcept?.id,
    companyConcept?.userId,
    testProfile?.id,
    companyConcept?.sessionInformationId,
    companyConcept?.sessionInformationUserId
  );

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  const phoneValue = inputPhone?.value;
  const phoneConcept: Concept = await MakeTheInstanceConcept(
    "phone",
    phoneValue,
    false,
    userId,
    4,
    0
  );
  CreateTheConnection(
    testProfile?.id,
    testProfile?.userId,
    phoneConcept?.id,
    phoneConcept?.userId,
    testProfile?.id,
    phoneConcept?.sessionInformationId,
    phoneConcept?.sessionInformationUserId
  );

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  const websiteValue = inputWebsite?.value;
  const websiteConcept: Concept = await MakeTheInstanceConcept(
    "website",
    websiteValue,
    false,
    userId,
    4,
    0
  );
  CreateTheConnection(
    testProfile?.id,
    testProfile?.userId,
    websiteConcept?.id,
    websiteConcept?.userId,
    testProfile?.id,
    websiteConcept?.sessionInformationId,
    websiteConcept?.sessionInformationUserId
  );

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const emailValue = inputEmail?.value;
  const emailConcept: Concept = await MakeTheInstanceConcept(
    "email",
    emailValue,
    false,
    userId,
    4,
    0
  );
  CreateTheConnection(
    testProfile?.id,
    testProfile?.userId,
    emailConcept?.id,
    emailConcept?.userId,
    testProfile?.id,
    emailConcept?.sessionInformationId,
    emailConcept?.sessionInformationUserId
  );

  await SyncData.SyncDataOnline();

  const tesProfileConcept = await GetTheConcept(testProfile?.id);

  const testProfileComp2 = await GetCompositionWithId(testProfile?.id);

  const userConcept: Concept = await GetTheConcept(userConceptId);
  await CreateConnectionBetweenTwoConcepts(
    userConcept,
    tesProfileConcept,
    "hd_profile",
    true
  );
  await SyncData.SyncDataOnline();
  loadProfileDetails();
}

export async function getHTML() {
  try {
    const response = await fetch(
      "/src/app/pages/profile/profile.component.html"
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

// export async function initiateProfile() {
//   initTopNavigation()
//   loadProfileDetails()
// }

export async function popupAlert() {
  alert("ABCDE");
}

export async function loadProfileDetails() {
  let userId!: number;
  let userConceptId!: number;
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage);
    userId = Number(profileData?.userId);
    userConceptId = Number(profileData?.userConcept);
  }

  const linkResponse = await GetLink(userConceptId, "hd_profile_s", 10, 1);
  const data = linkResponse?.[0]?.data?.["test-profile"];

  const inputFirstName = <HTMLInputElement>(
    document.getElementById("first_name")
  );
  inputFirstName.value = data?.firstName || "";

  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  inputLastName.value = data?.lastName || "";

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  inputEmail.value = data?.email || "";

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  inputPhone.value = data?.phone || "";

  const inputDob = <HTMLInputElement>document.getElementById("dob");
  inputDob.value = data?.dob || "dummy";

  const inputGender = <HTMLInputElement>document.getElementById("gender");
  inputGender.value = data?.gender || "dummy";

  const inputMaritialStatus = <HTMLInputElement>(
    document.getElementById("maritialStatus")
  );
  inputMaritialStatus.value = data?.maritialStatus || "dummy";

  const inputEducationLevel = <HTMLInputElement>(
    document.getElementById("educationLevel")
  );
  inputEducationLevel.value = data?.educationLevel || "educationLevel";

  const inputDepartment = <HTMLInputElement>(
    document.getElementById("department")
  );
  inputDepartment.value = data?.department || "educationLevel";

  const inputWorkExperience = <HTMLInputElement>(
    document.getElementById("workExperience")
  );
  inputWorkExperience.value = data?.workExperience || "workExperience";

  const inputAddressType = <HTMLInputElement>(
    document.getElementById("addressType")
  );
  inputAddressType.value = data?.addressType || "addressType";

  const inputStreetnumber = <HTMLInputElement>(
    document.getElementById("streetnumber")
  );
  inputStreetnumber.value = data?.streetnumber || "streetnumber";

  const inputStreetAddress = <HTMLInputElement>(
    document.getElementById("streetAddress")
  );
  inputStreetAddress.value = data?.streetAddress || "streetAddress";

  const inputUnit = <HTMLInputElement>document.getElementById("unit");
  inputUnit.value = data?.unit || "unit";
  // if (data?.company) {
  //   await addExperience();
  //   const inputCompany = <HTMLInputElement>document.getElementById("company");
  //   inputCompany.value = data?.company || "";
  //   const divEle: any = document.getElementById("show");
  //   divEle.style.display = "none";

  //   const inputPosition = <HTMLInputElement>document.getElementById("position");
  //   inputPosition.value = data?.position || "";

  //   const inputAddress = <HTMLInputElement>document.getElementById("address");
  //   inputAddress.value = data?.address || "";

  //   const inputCountry = <HTMLInputElement>document.getElementById("country");
  //   inputCountry.value = data?.country || "";

  //   const inputDateFrom = <HTMLInputElement>document.getElementById("dateFrom");
  //   inputDateFrom.value = data?.dateFrom || "";

  //   const inputDateTo = <HTMLInputElement>document.getElementById("dateTo");
  //   inputDateTo.value = data?.dateTo || "";
  // }

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  inputWebsite.value = data?.website || "";
}

export async function updateProfile(e: Event) {
  e.preventDefault();

  let userId!: number;
  let userConceptId!: number;
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage);
    userId = Number(profileData?.userId);
    userConceptId = Number(profileData?.userConcept);
  }

  const linkResponse = await GetLink(userConceptId, "profile", 10, 1);

  if (!linkResponse?.length) {
    saveProfileDetails(e);
  } else {
    submitUpdateProfile(linkResponse);
  }
}

export async function submitUpdateProfile(linkProfileData: any) {
  let userId!: number;
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage);
    userId = Number(profileData?.userId);
  }

  const profileCompositionId = linkProfileData?.[0]?.id;

  const inputFirstName = <HTMLInputElement>(
    document.getElementById("first_name")
  );
  const firstNameValue = inputFirstName?.value;

  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  const lastNameValue = inputLastName?.value;

  const inputCompany = <HTMLInputElement>document.getElementById("company");
  const companyValue = inputCompany?.value;

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  const phoneValue = inputPhone?.value;

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  const websiteValue = inputWebsite?.value;

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const emailValue = inputEmail?.value;

  const patcherStructure = new PatcherStructure();
  patcherStructure.userId = userId;
  patcherStructure.compositionId = profileCompositionId;
  patcherStructure.ofTheCompositionId = profileCompositionId;
  patcherStructure.patchObject = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    company: companyValue,
    phone: phoneValue,
    website: websiteValue,
    email: emailValue,
  };
  await UpdateComposition(patcherStructure);
  loadProfileDetails();
}

export async function submitAddProfileForm(e: any) {
  const eduContainers = document.querySelectorAll(".input-container");
  EducationFieldsArray.length = 0; // Clear the array

  eduContainers.forEach((container, index) => {
    const inputs: any = container.querySelectorAll(".input-field");
    EducationFieldsArray.push({
      eduLevel: inputs[0].value,
      course: inputs[1].value,
      dobFrom: inputs[2].value,
      dobTo: inputs[3].value,
      institutionName: inputs[4].value,
      institutionAddress: inputs[5].value,
    });
  });

  const expContainers = document.querySelectorAll(".input-container-1");
  ExperienceFieldsArray.length = 0; // Clear the array

  expContainers.forEach(async(container1, index) => {
    const inputs: any = container1.querySelectorAll(".input-field-1");
    ExperienceFieldsArray.push({
      company: inputs[0].value,
      position: inputs[1].value,
      address: inputs[2].value,
      country: inputs[3].value,
      expdobFrom: inputs[4].value,
      expdobTo: inputs[5].value,
    });
  });

  const docContainers = document.querySelectorAll(".input-container-2");
  ExperienceFieldsArray.length = 0; // Clear the array

  docContainers.forEach((container2, index) => {
    const inputs: any = container2.querySelectorAll(".input-field-2");
    DocumentFieldsArray.push({
      docName: inputs[0].value,
      // docUrl: inputs[1].value,
      docUrl: inputs[2].value,
    });
  });

  e.preventDefault();

  const formData: any = new FormData(e.target);
  formData.append("education", JSON.stringify(EducationFieldsArray));
  formData.append("experience", JSON.stringify(ExperienceFieldsArray));
  formData.append("documents", JSON.stringify(DocumentFieldsArray));
  delete formData?.profilePic;
  formData.image = attachmentValues?.url;
  // output as an object
  const formValues: any = Object.fromEntries(formData);
  const inputFirstName = <HTMLInputElement>document.getElementById("first_name");
  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const inputPhone = <HTMLInputElement>document.getElementById("phone");

  function setErrorFor(input: any, message: any) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }
  if (formValues.first_name === "") {
    inputFirstName.focus();
    setErrorFor(inputFirstName, "First Name cannot be empty");
  } if (formValues.last_name === "") {
    inputLastName.focus();
    setErrorFor(inputLastName, "Last Name cannot be empty");
  } if (formValues.email === "") {
    inputEmail.focus();
    setErrorFor(inputEmail, "Email cannot be empty");
  } if (formValues.phone === "") {
    setErrorFor(inputPhone, "Phone no cannot be empty");
  }if(formValues.first_name && formValues.last_name && formValues.email && formValues.phone)
  {
    await createProfile(formValues);
  }
  
}
export async function getProfileData() {
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || "";
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage);
    // let userId:any = Number(profileData?.userId);
    let userConceptId: any = Number(profileData?.userConcept);

    let searchfirst = new SearchQuery();
    searchfirst.composition = userConceptId;
    searchfirst.fullLinkers = ["the_user_profile"];
    searchfirst.inpage = 100;

    let searchsecond: any = new SearchQuery();
    searchsecond.fullLinkers = [
      "the_profile_profilePic",
      "the_profile_first_name",
      "the_profile_last_name",
      "the_profile_email",
      "the_profile_phone",
      "the_profile_dob",
      "the_profile_gender",
      "the_profile_maritialStatus",
      "the_profile_educationLevel",
      "the_profile_department",
      "the_profile_workExperience",
      "the_profile_aboutYou",
      "the_profile_addressType",
      "the_profile_streetNumber",
      "the_profile_streetAddress",
      "the_profile_unit",
      "the_profile_city",
      "the_profile_state",
      "the_profile_zip",
      "the_profile_country",
      "the_profile_eduLevel",
      "the_profile_course",
      "the_profile_eduDateFrom",
      "the_profile_eduDateTo",
      "the_profile_institutionName",
      "the_profile_institutionAddress",
      "the_profile_company",
      "the_profile_position",
      "the_profile_expAddress",
      "the_profile_expCountry",
      "the_profile_expDateFrom",
      "the_profile_expDateTo",
      "the_profile_currentCompany",
      "the_profile_currentSalary",
      "the_profile_desireSalary",
      "the_profile_s_education",
      "the_profile_s_experience",
      "the_profile_s_documents",
    ];

    let searchthird = new SearchQuery();
    searchthird.fullLinkers = [
      "the_education_eduLevel",
      "the_education_course",
      "the_education_dobFrom",
      "the_education_dobTo",
      "the_education_institutionName",
      "the_education_institutionAddress",
      "the_experience_company",
      "the_experience_position",
      "the_experience_address",
      "the_experience_country",
      "the_experience_expdobFrom",
      "the_experience_expdobTo",
      "the_documents_docName",
      "the_documents_docUrl",
    ];
    searchthird.inpage = 100;
    searchsecond.inpage = 100;
    const queryParams = [searchfirst, searchsecond, searchthird];
    output = await SearchLinkMultipleAll(queryParams, profileData?.token);
    console.log("output ->", output.data);
    const data =
      output?.data?.the_user?.the_user_profile[0]?.data?.the_profile ?? "";

    const inputFirstName = <HTMLInputElement>(
      document.getElementById("first_name")
    );
    inputFirstName.value =
      data?.the_profile_first_name[0]?.data?.the_first_name ||
      output.data.the_user.entity.person.first_name;

    const inputProfilePic = <HTMLInputElement>(
      document.getElementById("profilePic")
    );
    inputProfilePic.src =
      data?.the_profile_profilePic[0]?.data?.the_profilePic ||
      output.data.the_user.entity.person.profile_img;

      
      const inputImgInput = <HTMLInputElement>(
        document.getElementById("fileInput")
      );
      inputImgInput.value =
        data?.the_profile_profilePic[0]?.data?.the_profilePic ||
        output.data.the_user.entity.person.last_name;  

    const inputLastName = <HTMLInputElement>(
      document.getElementById("last_name")
    );
    inputLastName.value =
      data?.the_profile_last_name[0]?.data?.the_last_name ||
      output.data.the_user.entity.person.last_name;

    const inputEmail = <HTMLInputElement>document.getElementById("email");
    inputEmail.value =
      data?.the_profile_email[0]?.data?.the_email ||
      output.data.the_user.entity.person.email;

    const inputPhone = <HTMLInputElement>document.getElementById("phone");
    inputPhone.value =
      data?.the_profile_phone[0]?.data?.the_phone ||
      output.data.the_user.entity.person.phone;

    const inputDob = <HTMLInputElement>document.getElementById("dob");
    inputDob.value = data?.the_profile_dob[0]?.data?.the_dob || "";

    const inputGender = <HTMLInputElement>document.getElementById("gender");
    inputGender.value = data?.the_profile_gender[0]?.data?.the_gender || "";

    const inputMaritialStatus = <HTMLInputElement>(
      document.getElementById("maritialStatus")
    );
    inputMaritialStatus.value =
      data?.the_profile_maritialStatus[0]?.data?.the_maritialStatus || "";

    const inputEducationLevel = <HTMLInputElement>(
      document.getElementById("educationLevel")
    );
    inputEducationLevel.value =
      data?.the_profile_educationLevel[0]?.data?.the_educationLevel || "";

    const inputDepartment = <HTMLInputElement>(
      document.getElementById("department")
    );
    inputDepartment.value =
      data?.the_profile_department[0]?.data?.the_department || "";

    const inputWorkExperience = <HTMLInputElement>(
      document.getElementById("workExperience")
    );
    inputWorkExperience.value =
      data?.the_profile_workExperience[0]?.data?.the_workExperience || "";

     const inputAboutYou = <HTMLInputElement>(
      document.getElementById("aboutYou")
    );
    inputAboutYou.value =
      data?.the_profile_aboutYou[0]?.data?.the_aboutYou || "";  

    const inputAddressType = <HTMLInputElement>(
      document.getElementById("addressType")
    );
    inputAddressType.value =
      data?.the_profile_addressType[0]?.data?.the_addressType || "";

    const inputStreetNumber = <HTMLInputElement>(
      document.getElementById("streetNumber")
    );
    inputStreetNumber.value =
      data?.the_profile_streetNumber[0]?.data?.the_streetNumber || "";

    const inputStreetAddress = <HTMLInputElement>(
      document.getElementById("streetAddress")
    );
    inputStreetAddress.value =
      data?.the_profile_streetAddress[0]?.data?.the_streetAddress || "";

    const inputUnit = <HTMLInputElement>document.getElementById("unit");
    inputUnit.value = data?.the_profile_unit[0]?.data?.the_unit || "";

    const inputCity = <HTMLInputElement>document.getElementById("city");
    inputCity.value = data?.the_profile_city[0]?.data?.the_city || "";

    const inputState = <HTMLInputElement>document.getElementById("state");
    inputState.value = data?.the_profile_state[0]?.data?.the_state || "";

    const inputZip = <HTMLInputElement>document.getElementById("zip");
    inputZip.value = data?.the_profile_zip[0]?.data?.the_zip || "";

    const inputCountry = <HTMLInputElement>document.getElementById("country");
    inputCountry.value = data?.the_profile_country[0]?.data?.the_country || "";

    const inputCurrentCompany = <HTMLInputElement>(
      document.getElementById("currentCompany")
    );
    inputCurrentCompany.value =
      data?.the_profile_currentCompany[0]?.data?.the_currentCompany || "";

    const inputCurrentSalary = <HTMLInputElement>(
      document.getElementById("currentSalary")
    );
    inputCurrentSalary.value =
      data?.the_profile_currentSalary[0]?.data?.the_currentSalary || "";

    const inputDesireSalary = <HTMLInputElement>(
      document.getElementById("desireSalary")
    );
    inputDesireSalary.value =
      data?.the_profile_desireSalary[0]?.data?.the_desireSalary || "";

    data?.the_profile_s_education?.map(async (data: any, index: any) => {
      await addEducation(index);
      const inputEduLevel = <HTMLInputElement>(
        document.getElementById(`eduLevel${index}`)
      );
      inputEduLevel.value =
        data?.data?.the_education?.the_education_eduLevel[0]?.data
          ?.the_eduLevel || "";

      const inputCourse = <HTMLInputElement>(
        document.getElementById(`course${index}`)
      );
      inputCourse.value =
        data?.data?.the_education?.the_education_course[0]?.data?.the_course ||
        "";

      const inputEduDateFrom = <HTMLInputElement>(
        document.getElementById(`eduDateFrom${index}`)
      );
      inputEduDateFrom.value =
        data?.data?.the_education?.the_education_dobFrom[0]?.data
          ?.the_dobFrom || "";

      const inputEduDateTo = <HTMLInputElement>(
        document.getElementById(`eduDateTo${index}`)
      );
      inputEduDateTo.value =
        data?.data?.the_education?.the_education_dobTo[0]?.data?.the_dobTo ||
        "";

      const inputInstitutionName = <HTMLInputElement>(
        document.getElementById(`institutionName${index}`)
      );
      inputInstitutionName.value =
        data?.data?.the_education?.the_education_institutionName[0]?.data
          ?.the_institutionName || "";

      const inputInstitutionAddress = <HTMLInputElement>(
        document.getElementById(`institutionAddress${index}`)
      );
      inputInstitutionAddress.value =
        data?.data?.the_education?.the_education_institutionAddress[0]?.data
          ?.the_institutionAddress || "";
    });

    data?.the_profile_s_experience?.map(async (data: any, index: any) => {
      await addExperience(index);
      const inputCompany = <HTMLInputElement>(
        document.getElementById(`company${index}`)
      );
      inputCompany.value =
        data?.data?.the_experience?.the_experience_company[0]?.data
          ?.the_company || "";

      const inputPosition = <HTMLInputElement>(
        document.getElementById(`position${index}`)
      );
      inputPosition.value =
        data?.data?.the_experience?.the_experience_position[0]?.data
          ?.the_position || "";

      const inputExpAddress = <HTMLInputElement>(
        document.getElementById(`expAddress${index}`)
      );
      inputExpAddress.value =
        data?.data?.the_experience?.the_experience_address[0]?.data
          ?.the_address || "";

      const inputExpCountry = <HTMLInputElement>(
        document.getElementById(`expCountry${index}`)
      );
      inputExpCountry.value =
        data?.data?.the_experience?.the_experience_country[0]?.data
          ?.the_country || "";

      const inputExpDateFrom = <HTMLInputElement>(
        document.getElementById(`expDateFrom${index}`)
      );
      inputExpDateFrom.value =
        data?.data?.the_experience?.the_experience_expdobFrom[0]?.data
          ?.the_expdobFrom || "";

      const inputExpDateTo = <HTMLInputElement>(
        document.getElementById(`expDateTo${index}`)
      );
      inputExpDateTo.value =
        data?.data?.the_experience?.the_experience_expdobTo[0]?.data
          ?.the_expdobTo || "";
    });

    data?.the_profile_s_documents?.map(async (data: any, index: any) => {
      console.log(data.data.the_documents.the_documents_docName[0].data.the_docName,"data")
      await addDoc(index);
      const inputDocName = <HTMLInputElement>(
        document.getElementById(`docName${index}`)
      );
      inputDocName.value =data?.data?.the_documents?.the_documents_docName[0]?.data?.the_docName
    })
  }
}

export async function createProfile(formValues: any) {
  let profileId: any;
  profileId = output?.data?.the_user?.the_user_profile[0]?.id || "";
  if (profileId) {
    await DeleteConceptById(profileId);
    // console.log(deleteProfile, "deleteProfile");
  }

  const eduName = JSON.parse(formValues?.education as string);
  const expName = JSON.parse(formValues?.experience as string);
  const documents = JSON.parse(formValues?.documents as string);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  let profileNameConcept: any;
  let eduNameConcept: any;
  let expNameConcept: any;
  let docConcept: any;
  let deletedFormValue: any;
  console.log(profilePicUrl,"profilePicUrl")
  Object.assign(formValues, { profilePicUrl: profilePicUrl });
  
  deletedFormValue = delete formValues.education;
  deletedFormValue = delete formValues.experience;
  deletedFormValue = delete formValues.documents;
  deletedFormValue = delete formValues.eduLevel;
  deletedFormValue = delete formValues.course;
  deletedFormValue = delete formValues.eduDateFrom;
  deletedFormValue = delete formValues.eduDateTo;
  deletedFormValue = delete formValues.institutionName;
  deletedFormValue = delete formValues.institutionAddress;
  deletedFormValue = delete formValues.company;
  deletedFormValue = delete formValues.position;
  deletedFormValue = delete formValues.expAddress;
  deletedFormValue = delete formValues.expCountry;
  deletedFormValue = delete formValues.expDateFrom;
  deletedFormValue = delete formValues.expDateTo;
  
  profileNameConcept = await createEntityInstance(
    "profile",
    userId,
    formValues
  );
  await Promise.all(
    eduName?.map(async (items: any) => {
      eduNameConcept = await createEntityInstance("education", userId, items);

      await CreateConnectionBetweenEntityLocal(
        profileNameConcept,
        eduNameConcept,
        "s_education"
      );
    })
  );

  await Promise.all(
    expName?.map(async function (item: any) {
      expNameConcept = await createEntityInstance("experience", userId, item);
      await CreateConnectionBetweenEntityLocal(
        profileNameConcept,
        expNameConcept,
        "s_experience"
      );
    })
  );
  await Promise.all(
    documents?.map(async function (item: any) {
      docConcept = await createEntityInstance("documents", userId, item);
      await CreateConnectionBetweenEntityLocal(
        profileNameConcept,
        docConcept,
        "s_documents"
      );
    })
  );
  const userConcept: any = await GetTheConceptLocal(
    profileStorageData.userConcept
  );
  await CreateConnectionBetweenEntityLocal(
    userConcept,
    profileNameConcept,
    "profile"
  );
  await LocalSyncData.SyncDataOnline();
  setTimeout(async () => {
    await showToast(
      "success",
      "Profile updated successfully!",
      "",
      "top-right",
      5000
    );
  }, 100);
  // location.reload();
}
// console.log("itemEntityConcept ID ->", profileNameConcept?.id);
// await getProfileData()
// return profileNameConcept;
