import { logout } from "./top-navigation.service"

// Attach the function to the global window object
(window as any).logout = logout;

export default `
  <div class="flex items-center justify-around">
    <router-link href="/" class="cursor-pointer">
      <img src="./images/humanizing-data.png" alt="humanizing data logo" class="w-16 md:w-32 lg:w-48">
    </router-link>
    <ul class="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:mr-8 justify-end lg:w-auto lg:space-x-6">
      <router-link href="/dashboard" class="cursor-pointer text-sm text-green-600 font-bold">Dashboard</router-link>
      <router-link href="/profile" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Profile</router-link>
      <button type="button" class="cursor-pointer text-sm text-red-400 hover:text-red-700" onclick="logout()">Log out</button>
    </ul>
  </div>
`