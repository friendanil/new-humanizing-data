import { Concept, CreateConnectionBetweenTwoConcepts, CreateTheConnection, GetCompositionWithId, GetLink, GetTheConcept, MakeTheInstanceConcept, PatcherStructure, SyncData, UpdateComposition } from "mftsccs-browser";
import { IUser } from "../../interfaces/IUser.interface";
// import { initTopNavigation } from "../../modules/top-nav/top-navigation.service";

// Save profile details
export async function saveProfileDetails(e: Event) {
  console.log("Hello", e);
  e.preventDefault();

  let userId!: number
  let userConceptId!: number
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    userId = Number(profileData?.userId)
    userConceptId = Number(profileData?.userConcept)
  }
  console.log('userId', userId)

  const testProfile: Concept = await MakeTheInstanceConcept('test-profile', '', true, userId, 4, 0)
  console.log('testProfile', testProfile)

  const inputFirstName = <HTMLInputElement>(document.getElementById("first_name"));
  const firstNameValue = inputFirstName?.value;
  console.log("firstNameValue", firstNameValue);
  const firstNameConcept: Concept = await MakeTheInstanceConcept('firstName', firstNameValue, false, userId, 4, 0)
  console.log('firstNameConcept', firstNameConcept)
  CreateTheConnection(testProfile?.id, testProfile?.userId, firstNameConcept?.id, firstNameConcept?.userId, testProfile?.id, firstNameConcept?.sessionInformationId, firstNameConcept?.sessionInformationUserId)

  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  const lastNameValue = inputLastName?.value;
  console.log("lastNameValue", lastNameValue);
  const lastNameConcept: Concept = await MakeTheInstanceConcept('lastName', lastNameValue, false, userId, 4, 0)
  console.log('lastNameConcept', lastNameConcept)
  CreateTheConnection(testProfile?.id, testProfile?.userId, lastNameConcept?.id, lastNameConcept?.userId, testProfile?.id, lastNameConcept?.sessionInformationId, lastNameConcept?.sessionInformationUserId)

  const inputCompany = <HTMLInputElement>document.getElementById("company");
  const companyValue = inputCompany?.value;
  console.log("companyValue", companyValue);
  const companyConcept: Concept = await MakeTheInstanceConcept('company', companyValue, false, userId, 4, 0)
  console.log('companyConcept', companyConcept)
  CreateTheConnection(testProfile?.id, testProfile?.userId, companyConcept?.id, companyConcept?.userId, testProfile?.id, companyConcept?.sessionInformationId, companyConcept?.sessionInformationUserId)

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  const phoneValue = inputPhone?.value;
  console.log("phoneValue", phoneValue);
  const phoneConcept: Concept = await MakeTheInstanceConcept('phone', phoneValue, false, userId, 4, 0)
  console.log('phoneConcept', phoneConcept)
  CreateTheConnection(testProfile?.id, testProfile?.userId, phoneConcept?.id, phoneConcept?.userId, testProfile?.id, phoneConcept?.sessionInformationId, phoneConcept?.sessionInformationUserId)

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  const websiteValue = inputWebsite?.value;
  console.log("websiteValue", websiteValue);
  const websiteConcept: Concept = await MakeTheInstanceConcept('website', websiteValue, false, userId, 4, 0)
  console.log('websiteConcept', websiteConcept)
  CreateTheConnection(testProfile?.id, testProfile?.userId, websiteConcept?.id, websiteConcept?.userId, testProfile?.id, websiteConcept?.sessionInformationId, websiteConcept?.sessionInformationUserId)

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const emailValue = inputEmail?.value;
  console.log("emailValue", emailValue);
  const emailConcept: Concept = await MakeTheInstanceConcept('email', emailValue, false, userId, 4, 0)
  console.log('emailConcept', emailConcept)
  CreateTheConnection(testProfile?.id, testProfile?.userId, emailConcept?.id, emailConcept?.userId, testProfile?.id, emailConcept?.sessionInformationId, emailConcept?.sessionInformationUserId)

  await SyncData.SyncDataOnline()

  const tesProfileConcept = await GetTheConcept(testProfile?.id);
  console.log('tesProfileConcept', tesProfileConcept)

  // const testProfileComp = await GetCompositionList('test-profile', userId)
  // console.log('testProfileComp', testProfileComp)

  const testProfileComp2 = await GetCompositionWithId(testProfile?.id)
  console.log('testProfileComp2', testProfileComp2)

  const userConcept: Concept = await GetTheConcept(userConceptId)
  await CreateConnectionBetweenTwoConcepts(userConcept, tesProfileConcept, 'hd_profile', true)
  await SyncData.SyncDataOnline()
  loadProfileDetails()

}

export async function getHTML() {
  try {
    console.log('PROFILE TRY')
    const response = await fetch(
      "/src/app/pages/profile/profile.component.html"
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

// export const loadHTML = await getHTML();
// export async function loadHTML() {
//   return await getHTML();
// }


// export async function initiateProfile() {
//   console.log("Profile page landed!!");
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

  console.log('userId', userId)

  // const userProfileDetails = await GetCompositionWithId(userConceptId)
  // console.log('userProfileDetails', userProfileDetails)

  const linkResponse = await GetLink(userConceptId, 'hd_profile_s', 10, 1)
  console.log('linkResponse', linkResponse)
  const data = linkResponse?.[0]?.data?.['test-profile']

  const inputFirstName = <HTMLInputElement>(document.getElementById("first_name"));
  inputFirstName.value = data?.firstName || ''

  const inputLastName = <HTMLInputElement>document.getElementById("last_name"); 
  inputLastName.value = data?.lastName || ''

  const inputCompany = <HTMLInputElement>document.getElementById("company");
  inputCompany.value = data?.company || ''

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  inputPhone.value = data?.phone || ''

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  inputWebsite.value = data?.website || ''

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  inputEmail.value = data?.email || ''

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
  console.log('userId', userId)

  const linkResponse = await GetLink(userConceptId, 'hd_profile_s', 10, 1)
  console.log('linkResponse', linkResponse)

  if (!linkResponse?.length) {
    saveProfileDetails(e)
  } else {
    submitUpdateProfile(linkResponse)
  }
  
}

export async function submitUpdateProfile(linkProfileData: any) {
  console.log('linkProfileData', linkProfileData)
  let userId!: number
  // let userConceptId!: number
  let dataFromLocalStorage: string = localStorage?.getItem("profile") || ''
  if (dataFromLocalStorage) {
    const profileData: IUser = JSON.parse(dataFromLocalStorage)
    userId = Number(profileData?.userId)
    // userConceptId = Number(profileData?.userConcept)
  }

  const profileCompositionId = linkProfileData?.[0]?.id

  const inputFirstName = <HTMLInputElement>(document.getElementById("first_name"));
  const firstNameValue = inputFirstName?.value;
  console.log("firstNameValue", firstNameValue);

  const inputLastName = <HTMLInputElement>document.getElementById("last_name");
  const lastNameValue = inputLastName?.value;
  console.log("lastNameValue", lastNameValue);

  const inputCompany = <HTMLInputElement>document.getElementById("company");
  const companyValue = inputCompany?.value;
  console.log("companyValue", companyValue);

  const inputPhone = <HTMLInputElement>document.getElementById("phone");
  const phoneValue = inputPhone?.value;
  console.log("phoneValue", phoneValue);

  const inputWebsite = <HTMLInputElement>document.getElementById("website");
  const websiteValue = inputWebsite?.value;
  console.log("websiteValue", websiteValue);

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const emailValue = inputEmail?.value;
  console.log("emailValue", emailValue);

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
  // patcherStructure.ofTheCompositionId = connectionId
  // patcherStructure.patchObject = { parent: compositionId }
  console.log('patcherStructure', patcherStructure)
  await UpdateComposition(patcherStructure)
  loadProfileDetails()
  console.log('COMPLETED')
}
