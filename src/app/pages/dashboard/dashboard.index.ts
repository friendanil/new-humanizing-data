import mainViewClass from '../../default/mainView.class.ts';
import topNavigation from '../../modules/top-nav/top-navigation.ts';

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle('Dashboard | Humanizing Data');
  }

  async getHtml() {
    return `
      ${topNavigation}

      <div class="mx-auto text-center pt-20">
        <h1>Dashboard page</h1>
      </div>
    `
  }
}
