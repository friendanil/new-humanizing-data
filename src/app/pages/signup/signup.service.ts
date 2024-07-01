import { updateContent } from "../../routes/renderRoute.service";

export async function submitSignupForm(e: any) {
  e.preventDefault();
  // alert("Are you sure to want to signup?");

  // const signResponse = await signin();
  // console.log("signResponse", signResponse);
  // if (signResponse.statusCode === 200) {
  //   updateContent("/dashboard", e);
  // }

  const inputType = <HTMLInputElement>document.getElementById("type");
  const typeValue = inputType?.value;

  const inputUsername = <HTMLInputElement>document.getElementById("username");
  const usernameValue = inputUsername?.value;

  const inputEmail = <HTMLInputElement>document.getElementById("email");
  const emailValue = inputEmail?.value;

  const inputGender = <HTMLInputElement>document.getElementById("gender");
  const genderValue = inputGender?.value;

  const inputFirstName = <HTMLInputElement>document.getElementById("firstName");
  const firstNameValue = inputFirstName?.value;

  const inputLastName = <HTMLInputElement>document.getElementById("lastName");
  const lastNameValue = inputLastName?.value;

  const inputPassword = <HTMLInputElement>document.getElementById("password");
  const passwordValue = inputPassword?.value;
  console.log("passwordValue", passwordValue);

  const inputConfirmPassword = <HTMLInputElement>(
    document.getElementById("confirmPassword")
  );
  const confirmPasswordValue = inputConfirmPassword?.value;
  console.log("confirmPasswordValue", confirmPasswordValue);

  const signupData: any = {
    type: typeValue,
    username: usernameValue,
    title: genderValue,
    email: emailValue,
    password: passwordValue,
    timestamp: new Date().toISOString(),
    fname: firstNameValue,
    lname: lastNameValue,
  };

  console.log("signupData", signupData);
  const signupResponse = await signup(signupData);
  console.log("signupResponse ->", signupResponse);

  if (!signupResponse?.error && signupResponse?.data) {
    updateContent("/login");
  }
}

export async function signup(signupData: any) {
  const baseURL = "http://localhost:5000/api/v1";

  const response: any = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  });

  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 404) throw new Error("404, Not found");
    if (response.status === 500) throw new Error("500, internal server error");
    throw new Error(response.status);
  }
}
