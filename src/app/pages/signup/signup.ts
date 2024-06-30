export default `
  <div class="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
    <div class="grid bg-green-900 h-screen place-content-center">
      <img alt="humanzing logo" src="/images/humanizing-data-icon.png">
    </div>

    <div class="h-screen p-10">
      <h2 class="text-2xl mb-4">Sign Up</h2>
      <!-- <p>Don't have an account? <span id="signin-link">Sign in</span></p>-->
      <p>Don't have an accountcha? <router-link href="/login">Sign in</router-link></p>
      

      <!--  uses radio buttons -->
      <section class="flex flex-row flex-wrap mt-8">

  <input id="tab-one" type="radio" name="tabs" class="peer/tab-one opacity-0 absolute" checked />
  <label for="tab-one" class="w-full md:w-1/4 bg-slate-300 hover:bg-slate-200 peer-checked/tab-one:bg-amber-200 cursor-default p-4 rounded-t-lg block">
    <p>Employer</p>
    <p><small>(Join Our team)</small></p>
  </label>

  <input id="tab-two" type="radio" name="tabs" class="peer/tab-two opacity-0 absolute" />
  <label for="tab-two" class="w-full md:w-1/4 bg-slate-300 hover:bg-slate-200 peer-checked/tab-two:bg-amber-200 cursor-default p-4 rounded-t-lg block">
    <p>Employee</p>
    <p><small>(Join Our team)</small></p>
  </label>

  <div class="basis-full h-0"></div>

  <div class="bg-amber-200 hidden peer-checked/tab-one:block p-4 w-full md:w-1/2">
    <form method="post" action="/">
      <label for="email" class="block w-full">Email Address</label>
      <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />

      <label for="password" class="block w-full mt-5">Password</label>
      <input type="password" name="password" id="password" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="******" />

      <div class="block w-full mt-5">
        <button id="login-btn" type="submit" class="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-md w-full">Submit</button>
      </div>
    </form>
  </div>
  <div class="bg-amber-200 hidden peer-checked/tab-two:block p-4 w-full md:w-1/2">
    <p>Employee Tab</p>
  </div>
  

</section>
      
    </div>
  </div>
`;
