import { logout } from "./top-navigation.service"
import { initTopNavigation } from "./top-navigation.service";

import './top-navigation.style.css'

// Attach the function to the global window object
(window as any).logout = logout;

export default `
  <!-- <link rel="stylesheet" href="src/app/modules/top-nav/top-navigation.style.css"> -->
  <div class="flex items-center justify-around shadow-md">
    <router-link href="/" class="cursor-pointer">
      <img src="./images/humanizing-data.png" alt="humanizing data logo" class="w-16 md:w-32 lg:w-48">
    </router-link>
    <ul id="top-nav" class="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:mr-8 justify-end lg:w-auto lg:space-x-6">
      <li><router-link href="/dashboard" class="cursor-pointer text-sm text-gray-600 hover:text-gray-500">Dashboard</router-link></li>
      <li><router-link href="/listing" class="cursor-pointer text-sm text-gray-600 hover:text-gray-500">Listing</router-link></li>
      <li><router-link href="/profile" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Profile</router-link></li>
      <li><button type="button" class="cursor-pointer text-sm text-red-400 hover:text-red-700" onclick="logout()">Log out</button></li>
    </ul>
  </div>
`

setTimeout(() => {
  initTopNavigation();
}, 100);