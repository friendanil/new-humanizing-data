import { updateContent } from "../../routes/renderRoute.service";

export async function logout() {
  localStorage.removeItem("profile");
  updateContent("/");
  location.reload()
}

export async function initTopNavigation() {
  console.log('INIT NAVIGATION')
  const nav = document.getElementById('top-nav')
  const navLinks: any = nav?.querySelectorAll('router-link')
  navLinks?.forEach((navlink: any) => {
    // const routeName = navlink.getAttribute("href");
    // if (location.pathname === routeName) {
    //   navlink.classList.add("active");
    // }
    navlink?.addEventListener('click', (e: any) => {
      // initTopNavigation()
      console.log('e ->', e)
      console.log('navlink ->', navlink)
      navlink.classList.add("active");
    })
  })
}