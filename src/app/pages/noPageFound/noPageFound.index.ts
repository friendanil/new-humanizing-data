import mainViewClass from "../../default/mainView.class";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("404 | Humanizing Data");
  }

  async getHtml(): Promise<string> {
    return `
      <div class="grid place-content-center h-screen text-center dark:text-white">
        <h1>404</h1>
        <h4>No page found</h4>
        <router-link href='/' class="cursor-pointer text-sm text-green-600 font-bold mt-4">Go Home</router-link>
      </div>
    `;
  }
}
