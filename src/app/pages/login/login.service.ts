import { updateContent } from "../../routes/renderRoute.service";

const signin = async () => {
  const raw = JSON.stringify({
    email: "anilmaharjan@mentorfriends.com",
    password: "freeschema",
  });
  let freeschemaRes: any = {
    message: "success",
    status: false,
    statusCode: 200,
    data: "",
  };
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const url = process.env.BASE_URL + '/auth/login'
  try {
    const response = await fetch(
      `https://theta.boomconcole.com/api/auth/login`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }
    );
    const output = await response.json();
    if (response.ok) {
      const dataObject = output?.data;
      freeschemaRes = {
        message: "success",
        status: true,
        statusCode: 200,
        data: dataObject,
      };
    } else {
      freeschemaRes = {
        message: "cannot authenticate",
        status: false,
        statusCode: response.status,
        data: "",
      };
    }
    return freeschemaRes;
  } catch (error) {
    console.log("Sign in api error", error);
    freeschemaRes = {
      message: "error",
      status: false,
      statusCode: 500,
      data: "",
    };
    return freeschemaRes;
  }
};

// const initListeners = () => {
//   const signupLinkButton = document.getElementById("signup-link");
//   signupLinkButton?.addEventListener("click", (e) => {
//     console.log("HEYYE");
//     updateContent('/signup', e)
//   });
// };

export function initiateLogin() {
  // export const initiateLogin = () => {
  console.log("login page landed!");
  // initListeners();

  // const loginButton = document.getElementById("login-btn");
  // console.log("loginButton", loginButton);
  // loginButton?.addEventListener("click", async (e) => {
  //   e.preventDefault();
  //   // alert("hello");
  //   console.log("login button clicked!");
  //   const signResponse = await signin();
  //   console.log("signResponse", signResponse);
  //   if (signResponse.statusCode === 200) {
  //     updateContent("/dashboard", e);
  //   }
  // });

  // const loginForm = document.getElementById("login-form");
  // loginForm?.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   console.log("login button clicked!");
  //   const signResponse = await signin();
  //   console.log("signResponse", signResponse);
  //   if (signResponse.statusCode === 200) {
  //     updateContent("/dashboard", e);
  //   }
  // });

  // const path = window.location.pathname;
  // console.log('path ->', path, path.indexOf("/login"))
  // if (path.indexOf("/login") !== -1) {
  //   // load css file
  //   const styles = document.createElement("link");
  //   styles.rel = "stylesheet";
  //   styles.type = "text/css";
  //   styles.href = "src/app/pages/login/login.style.css"; // your file's URL
  //   document.getElementsByTagName("head")[0].appendChild(styles);
  // }

}

export async function submitLoginForm(e: any) {
  e.preventDefault()
  alert('Are you sure to want to login?')
  const signResponse = await signin();
  console.log("signResponse", signResponse);
  if (signResponse.statusCode === 200) {
    updateContent("/dashboard", e);
  }
}
