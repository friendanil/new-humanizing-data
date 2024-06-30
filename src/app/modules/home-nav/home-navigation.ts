import initNavigation from "./home-navigation.service";

export default `
  <nav class="relative px-4 py-4 flex justify-between items-center bg-white">
    <a class="text-3xl font-bold leading-none" href="#">
      <img src="./images/humanizing-data.png" alt="humanizing data logo" class="w-16 md:w-32 lg:w-48">
    </a>
    <div class="lg:hidden">
      <button class="navbar-burger flex items-center text-blue-600 p-3">
        <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
    </div>
    <div class="flex justify-end">
      <ul class="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:mr-8 justify-end lg:w-auto lg:space-x-6">
        <!-- <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Home</a></li>
            <li><a class="text-sm text-green-600 font-bold" href="#">About</a></li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Services</a></li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Blog</a></li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Contact</a></li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="#">Career</a></li> -->

        <router-link href="/" class="cursor-pointer text-sm text-green-600 font-bold">Home</router-link>
        <router-link href="/" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">About</router-link>
        <router-link href="/" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Services</router-link>
        <router-link href="/" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Blog</router-link>
        <router-link href="/" class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Contact</router-link>
        <router-link href="/dashboard"
          class="cursor-pointer text-sm text-gray-400 hover:text-gray-500">Career</router-link>
      </ul>
      <!-- <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-green-50 hover:bg-green-100 hover:text-green-900 text-sm text-green-900 font-bold rounded-xl transition duration-200" href="#">Sign In</a>
          <a class="hidden lg:inline-block py-2 px-6 bg-green-500 hover:bg-green-600 hover:text-white text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a> -->

      <router-link href="/login"
        class="block px-4 py-3 mb-2 mr-2 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer">Login</router-link>
      <router-link href="/signup"
        class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer">Signup</router-link>

    </div>
  </nav>
  <div class="navbar-menu relative z-50 hidden">
    <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
    <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
      <div class="flex items-center mb-8">
        <a class="mr-auto text-3xl font-bold leading-none" href="#">
          <img src="./images/humanizing-data.png" alt="humanizing data logo" class="w-16 md:w-32 lg:w-48">
        </a>
        <button class="navbar-close">
          <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div>
        <ul>
          <li class="mb-1">
            <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
              href="#">Home</a>
          </li>
          <li class="mb-1">
            <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-green-600 rounded"
              href="#">About</a>
          </li>
          <li class="mb-1">
            <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
              href="#">Services</a>
          </li>
          <li class="mb-1">
            <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
              href="#">Blog</a>
          </li>
          <li class="mb-1">
            <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
              href="#">Contact</a>
          </li>
          <li class="mb-1">
            <a class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
              href="#">Career</a>
          </li>
        </ul>
      </div>
      <div class="mt-auto">
        <div class="pt-6">
          <router-link href="/login"
            class="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-green-50 hover:bg-green-100 rounded-xl">Login</router-link>
          <router-link href="/signup"
            class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded-xl">Signup</router-link>
        </div>
      </div>
    </nav>
  </div>
`;

initNavigation();
