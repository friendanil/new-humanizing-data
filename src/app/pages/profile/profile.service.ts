import { Concept, CreateConnectionBetweenTwoConcepts, CreateTheConnection, GetCompositionWithId, GetLink, GetTheConcept, LConcept, LocalSyncData, MakeTheInstanceConcept, MakeTheInstanceConceptLocal, PatcherStructure, SyncData, UpdateComposition } from "mftsccs-browser";
import { IUser } from "../../interfaces/IUser.interface";
import { getLocalStorageData } from "../../services/helper.service";
import { createEntityInstance } from "../../services/createEntityInstance.service";
// import { initTopNavigation } from "../../modules/top-nav/top-navigation.service";
import { environment } from "../../environments/environment.dev";
import { showToast } from "../../modules/toast-bar/toast-bar.index";
import { CreateConnectionBetweenEntityLocal } from "../../services/entity.service";

const thetaBoommAPI = environment?.boomURL;
let attachmentValues: any
let attachmentConcept

(window as any).deleteFn = deleteFn;
(window as any).deleteFnExperience=deleteFnExperience
// (window as any).updateInput = updateInput;
  // Array to hold the input field data
  const EducationFieldsArray:any = [];
  const ExperienceFieldsArray:any=[];

  // Function to add addEducation fields
  export async function addEducation() {
    const divEle:any = document.getElementById("inputFields");
    const container = document.createElement("div");
    container.classList.add("input-container");

    // Add HTML for input fields and delete button
    container.innerHTML = `
             <div id="input-container" class="grid gap-6 mb-6 mt-6 md:grid-cols-3">
            <div>
              <label for="eduLevel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Education Level</label>
              <select id="eduLevel" name='eduLevel' autocomplete="eduLevel-name"
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
              <select id="course" name="course" autocomplete="course-name"
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
              <label for="dobFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date From</label>
              <input type="date" id="dobFrom"
                name="dobFrom"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From Date" />
            </div>
          <div>
              <label for="dobTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date To</label>
              <input type="date" id="dobTo"
                name="dobTo"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="To Date" />
          </div>
          <div>
              <label for="institutionName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Name</label>
              <input type="text" id="institutionName"
                name="institutionName"
                class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Institution Name" />
          </div>
          <div>
              <label for="institutionAddress" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institution Address</label>
              <input type="text" id="institutionAddress"
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

   // Function to Add Experience fields
  export async function addExperience() {
    const divEle:any = document.getElementById("inputFields-1");
    const container:any = document.createElement("div-1");
    container.classList.add("input-container-1");
    // Add HTML for input fields and delete button
    container.innerHTML = `
          <div id="input-container-1" class="grid gap-6 mb-6 mt-6 md:grid-cols-3">
          <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
             <input type="text" id="company"
                name="company"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Company Name" />
          </div>      
          <div>
              <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
             <input type="text" id="position"
                name="position"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Position" />
          </div>
           <div>
              <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
             <input type="text" id="address"
                name="address"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Address" />
          </div>
          <div>
              <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
              <select id="country" name='country' autocomplete="country-name"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="" >
                 <option value="nepal">Nepal</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
              </select>
          </div>
          <div>
              <label for="dataFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date From</label>
              <input type="date" id="dateFrom"
                name="dateFrom"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="From Date" />
            </div>
          <div>
              <label for="dateTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date To</label>
              <input type="date" id="dateTo"
                name="dateTo"
                class="input-field-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="To Date" />
          </div>
          <div>
          <button 
          class="delete-button text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          id="show"
          onclick="deleteFnExperience(this)">Delete</button>
          </div>
          </div>
          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      `;
      divEle.appendChild(container);
  }
  // Function to delete Education fields
  export async function deleteFn(button:any) {
    const container = button.parentElement;
    const index = Array.from(container.parentElement.children).indexOf(
      container
    );
    container.remove();

    // Remove from array
    EducationFieldsArray.splice(index, 1);
    console.log("Updated array:", EducationFieldsArray);
  }

   // Function to delete Experience fields
   export async function deleteFnExperience(button:any) {
    const container = button.parentElement;
    const index = Array.from(container.parentElement.children).indexOf(
      container
    );
    container.remove();

    // Remove from array
    ExperienceFieldsArray.splice(index, 1);
    console.log("Updated array:", EducationFieldsArray);
  }

  // function is to preview image
  export async function previewImage(event:any) {
    var input:any = event.target;
    var image:any = document.getElementById('preview');
    if (input.files && input.files[0]) {
      const files = input.files[0];
      // await uploadFile(files);
       var reader = new FileReader();
       reader.onload = function(e:any) {
          image.src = e.target.result;
       }
       reader.readAsDataURL(input.files[0]);
    }
 }

 // function is to upload files
 export async function uploadFile(files: any) {
  let formdata = new FormData();
  formdata.append("image", files);

  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  const token = profileStorageData?.token;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(
    `${thetaBoommAPI}/api/Image/UploadImage`,
    {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }
  );
  if (!response.ok) {
    const errorData = await response.text()
    console.error(`${response.status} ${errorData}`)
    return null
  }
  const output = await response.json();

  attachmentValues = {
    name: files?.name, 
    size: files?.size,
    type: files?.type,
    url: output?.data
  }

  attachmentConcept = await createEntityInstance(
    "attachment",
    userId,
    attachmentValues
  );
  setTimeout(async () => {
    await showToast('success', 'Profile pic added successfully!', '', 'top-right', 5000)
  }, 100);
  console.log('attachmentConcept', attachmentConcept)
  
}

// Save profile details
export async function saveProfileDetails(e: Event) {
  e.preventDefault();

  let userId!: number
  let userConceptId!: number
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    userId = Number(profileData?.userId)
    userConceptId = Number(profileData?.userConcept)
  }

  const testProfile: Concept = await MakeTheInstanceConcept('test-profile', '', true, userId, 4, 0)

  const inputFirstName = <HTMLInputElement>(document.getElementById("first_name"));
  const firstNameValue = inputFirstName?.value;
  const firstNameConcept: Concept = await MakeTheInstanceConcept('firstName', firstNameValue, false, userId, 4, 0)
  CreateTheConnection(testProfile?.id, testProfile?.userId, firstNameConcept?.id, firstNameConcept?.userId, testProfile?.id, firstNameConcept?.sessionInformationId, firstNameConcept?.sessionInformationUserId)

  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  const lastNameValue = inputLastName?.value;
  const lastNameConcept: Concept = await MakeTheInstanceConcept('lastName', lastNameValue, false, userId, 4, 0)
  CreateTheConnection(testProfile?.id, testProfile?.userId, lastNameConcept?.id, lastNameConcept?.userId, testProfile?.id, lastNameConcept?.sessionInformationId, lastNameConcept?.sessionInformationUserId)

  const inputCompany = <HTMLInputElement>document.getElementById("company");
  const companyValue = inputCompany?.value;
  const companyConcept: Concept = await MakeTheInstanceConcept('company', companyValue, false, userId, 4, 0)
  CreateTheConnection(testProfile?.id, testProfile?.userId, companyConcept?.id, companyConcept?.userId, testProfile?.id, companyConcept?.sessionInformationId, companyConcept?.sessionInformationUserId)

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  const phoneValue = inputPhone?.value;
  const phoneConcept: Concept = await MakeTheInstanceConcept('phone', phoneValue, false, userId, 4, 0)
  CreateTheConnection(testProfile?.id, testProfile?.userId, phoneConcept?.id, phoneConcept?.userId, testProfile?.id, phoneConcept?.sessionInformationId, phoneConcept?.sessionInformationUserId)

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  const websiteValue = inputWebsite?.value;
  const websiteConcept: Concept = await MakeTheInstanceConcept('website', websiteValue, false, userId, 4, 0)
  CreateTheConnection(testProfile?.id, testProfile?.userId, websiteConcept?.id, websiteConcept?.userId, testProfile?.id, websiteConcept?.sessionInformationId, websiteConcept?.sessionInformationUserId)

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const emailValue = inputEmail?.value;
  const emailConcept: Concept = await MakeTheInstanceConcept('email', emailValue, false, userId, 4, 0)
  CreateTheConnection(testProfile?.id, testProfile?.userId, emailConcept?.id, emailConcept?.userId, testProfile?.id, emailConcept?.sessionInformationId, emailConcept?.sessionInformationUserId)

  await SyncData.SyncDataOnline()

  const tesProfileConcept = await GetTheConcept(testProfile?.id);

  const testProfileComp2 = await GetCompositionWithId(testProfile?.id)
  console.log('testProfileComp2', testProfileComp2)

  const userConcept: Concept = await GetTheConcept(userConceptId)
  await CreateConnectionBetweenTwoConcepts(userConcept, tesProfileConcept, 'hd_profile', true)
  await SyncData.SyncDataOnline()
  loadProfileDetails()

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
  let userId!: number
  let userConceptId!: number
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    userId = Number(profileData?.userId)
    userConceptId = Number(profileData?.userConcept)
  }

  const linkResponse = await GetLink(userConceptId, 'hd_profile_s', 10, 1)
  // console.log(linkResponse,"user concept id")
  const data = linkResponse?.[0]?.data?.['test-profile']

  const inputFirstName = <HTMLInputElement>(document.getElementById("first_name"));
  inputFirstName.value = data?.firstName || ''

  const inputLastName = <HTMLInputElement>document.getElementById("last_name"); 
  inputLastName.value = data?.lastName || ''

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  inputEmail.value = data?.email || ''

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  inputPhone.value = data?.phone || ''

  const inputDob = <HTMLInputElement>document.getElementById("dob");
  inputDob.value = data?.dob || 'dummy'

  const inputGender = <HTMLInputElement>document.getElementById("gender");
  inputGender.value = data?.gender || 'dummy'

  const inputMaritialStatus = <HTMLInputElement>document.getElementById("maritialStatus");
  inputMaritialStatus.value = data?.maritialStatus || 'dummy'

  const inputEducationLevel= <HTMLInputElement>document.getElementById("educationLevel");
  inputEducationLevel.value = data?.educationLevel || 'educationLevel'
  
  const inputDepartment= <HTMLInputElement>document.getElementById("department");
  inputDepartment.value = data?.department || 'educationLevel'

  const inputWorkExperience= <HTMLInputElement>document.getElementById("workExperience");
  inputWorkExperience.value = data?.workExperience || 'workExperience'

  const inputAddressType= <HTMLInputElement>document.getElementById("addressType");
  inputAddressType.value = data?.addressType || 'addressType'

  const inputStreetnumber= <HTMLInputElement>document.getElementById("streetnumber");
  inputStreetnumber.value = data?.streetnumber || 'streetnumber'

  const inputStreetAddress= <HTMLInputElement>document.getElementById("streetAddress");
  inputStreetAddress.value = data?.streetAddress || 'streetAddress'

  const inputUnit= <HTMLInputElement>document.getElementById("unit");
  inputUnit.value = data?.unit || 'unit'
  if(data?.company){
    await addExperience()
    const inputCompany = <HTMLInputElement>document.getElementById("company");
    inputCompany.value = data?.company || ''
    const divEle:any = document.getElementById("show");
    divEle.style.display = 'none';
    
    const inputPosition = <HTMLInputElement>document.getElementById("position");
    inputPosition.value = data?.position || 'dummy'

    const inputAddress = <HTMLInputElement>document.getElementById("address");
    inputAddress.value = data?.address || 'dummy'

    const inputCountry = <HTMLInputElement>document.getElementById("country");
    inputCountry.value = data?.country || 'nepal'

    const inputDateFrom = <HTMLInputElement>document.getElementById("dateFrom");
    inputDateFrom.value = data?.dateFrom || 'dummy'

    const inputDateTo = <HTMLInputElement>document.getElementById("dateTo");
    inputDateTo.value = data?.dateTo || 'dummy'
  }
  


  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  inputWebsite.value = data?.website || ''



}

export async function updateProfile(e: Event) {
  e.preventDefault()

  let userId!: number
  let userConceptId!: number
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    userId = Number(profileData?.userId)
    userConceptId = Number(profileData?.userConcept)
  }

  const linkResponse = await GetLink(userConceptId, 'profile', 10, 1)

  if (!linkResponse?.length) {
    saveProfileDetails(e)
  } else {
    submitUpdateProfile(linkResponse)
  }
  
}

export async function submitUpdateProfile(linkProfileData: any) {
  let userId!: number
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    userId = Number(profileData?.userId)
  }

  const profileCompositionId = linkProfileData?.[0]?.id

  const inputFirstName = <HTMLInputElement>(document.getElementById("first_name"));
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

  const patcherStructure = new PatcherStructure()
  patcherStructure.userId = userId
  patcherStructure.compositionId = profileCompositionId
  patcherStructure.ofTheCompositionId = profileCompositionId
  patcherStructure.patchObject = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    company: companyValue,
    phone: phoneValue,
    website: websiteValue,
    email: emailValue,
  }
  await UpdateComposition(patcherStructure)
  loadProfileDetails()
}

export async function submitAddProfileForm(e: any) {
  const eduContainers = document.querySelectorAll(".input-container");
  EducationFieldsArray.length = 0; // Clear the array

  eduContainers.forEach((container, index) => {
    const inputs:any = container.querySelectorAll(".input-field");
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

  expContainers.forEach((container1, index) => {
    const inputs:any = container1.querySelectorAll(".input-field-1");
    ExperienceFieldsArray.push({
      company: inputs[0].value,
      position: inputs[1].value,
      address: inputs[2].value,
      country: inputs[3].value,
      expdobFrom: inputs[4].value,
      expdobTo: inputs[5].value,
    });
  });
  // console.log("Updated array with values:", EducationFieldsArray);

  e.preventDefault();
  const formData: any = new FormData(e.target);
  formData.append('education', JSON.stringify(EducationFieldsArray));
  formData.append('experience', JSON.stringify(ExperienceFieldsArray));
  delete formData?.profilePic
  formData.image = attachmentValues?.url
  // output as an object
  const formValues: any = Object.fromEntries(formData);
  // console.log(formValues,"formvalues")
  // return;
  const profileConceptResponse = await createProfile(formValues);
}

export async function createProfile(formValues: any) {
  const eduName = JSON.parse(formValues?.education as string);
  const expName = JSON.parse(formValues?.experience as string)
  // console.log(eduName,"eduNAme")
  // console.log(expName,"eduNAme")
  const profileStorageData: any = await getLocalStorageData();
  const userId = profileStorageData?.userId;
  let profileNameConcept:any
  let eduNameConcept
  let expNameConcept
  for (const [key, value] of Object.entries(formValues)) {
    let ObjKey:any=key
    if(key!=="education" && key!=="experience"){
      // const keyConcept: LConcept = await MakeTheInstanceConceptLocal(
      //       `the_${ObjKey}`,
      //       `${value}`,
      //       true,
      //       userId,
      //       4,
      //       999
      //     );
      profileNameConcept= await createEntityInstance('profile', userId, {key:value})
      console.log(profileNameConcept,"profileNameConcept")
    }
    if(key==="education"){
      eduName.forEach(async function (items:any) {
        for (const [edukey, eduvalue] of Object.entries(items)) {
          eduNameConcept= await createEntityInstance('education', userId, {edukey:eduvalue})
          const eduConn= await CreateConnectionBetweenEntityLocal(
            profileNameConcept,
            eduNameConcept,
            "s_"+edukey
          );
          console.log(eduNameConcept,"items")
          } 
      })
    }else if(key==="experience"){
      expName.forEach(async function (item:any) {
        for (const [expkey, expvalue] of Object.entries(item)) {
          expNameConcept= await createEntityInstance('experience', userId, {expkey:expvalue})
          const expConn= await CreateConnectionBetweenEntityLocal(
            profileNameConcept,
            expNameConcept,
            "s_"+expkey
          );
          console.log(expNameConcept,"items2")
        }
      })
    }
}
  // const profileEntityConcept = await MakeTheInstanceConceptLocal(
  //   "the_profile",
  //   '',
  //   false,
  //   userId,
  //   4,
  //   999,
  // )
  // for (const [key, value] of Object.entries(formValues)) {
  //   let ObjKey = key;
  //   const keyConcept: LConcept = await MakeTheInstanceConceptLocal(
  //     `the_${ObjKey}`,
  //     `${value}`,
  //     true,
  //     userId,
  //     4,
  //     999
  //   );
  //   console.log(keyConcept,"keyConcept")
  //   await CreateConnectionBetweenEntityLocal(
  //     profileEntityConcept,
  //     keyConcept,
  //     ObjKey
  //   );
  //   if(key=="education"){
  //     const educationEntityConcept = await MakeTheInstanceConceptLocal(
  //       "the_education",
  //       '',
  //       false,
  //       userId,
  //       4,
  //       999,
  //     )
  //     const edu:any=JSON.parse(value as string)
  //     edu.forEach(async function (item:any) {
  //       for (const [key, value] of Object.entries(item)) {
  //         let linker = key;
  //         const keysConcept: LConcept = await MakeTheInstanceConceptLocal(
  //           `the_${linker}`,
  //           `${value}`,
  //           false,
  //           userId,
  //           4,
  //           999
  //         );
  //         await CreateConnectionBetweenEntityLocal(
  //           educationEntityConcept,
  //           keysConcept,
  //           linker
  //         );
  //       }
  //     });
  // }
  // }
  await LocalSyncData.SyncDataOnline()
  // console.log("itemEntityConcept ID ->", profileEntityConcept?.id);
  // return itemEntityConcept;
}