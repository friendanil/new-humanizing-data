import { logout } from "./top-navigation.service"

// Attach the function to the global window object
(window as any).logout = logout;

export default `
  <h4>top nav</h4>
  <ul class="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:mr-8 justify-end lg:w-auto lg:space-x-6">
    <router-link href="/" class="cursor-pointer text-sm text-green-600 font-bold">Home</router-link>
    <router-link href="/" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Notification</router-link>
    <router-link href="/dashboard" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Profile</router-link>
    <button type="button" class="cursor-pointer text-sm text-red-400 hover:text-red-700" onclick="logout()">Log out</button>
  </ul>
`