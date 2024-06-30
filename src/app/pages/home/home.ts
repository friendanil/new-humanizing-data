import homeNavigation from "../../modules/home-nav/home-navigation"

export default `
  ${homeNavigation}
  <h1>Home page</h1>
  <router-link href="/login"
    class="bg-green-600 hover:bg-green-900 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Login</router-link>
  <router-link href="/signup"
    class="bg-green-600 hover:bg-green-900 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Signup</router-link>
  <router-link href="/dashboard"
    class="bg-green-600 hover:bg-green-900 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Dashboard</router-link>
`