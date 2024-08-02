import mainViewClass from "../../../default/mainView.class";
import topNavigation from "../../../modules/top-nav/top-navigation";
import { closeModal, openModal } from "../../../services/modal.service";
import { applyJob, getJobDetails, submitUpdateSKUForm } from "./job.service";

export default class extends mainViewClass {
  constructor(params: any) {
    super(params);
    this.setTitle("Job details | Humanizing Data");
  }

  async getHtml() {
    (window as any).openModal = openModal;
    (window as any).closeModal = closeModal;
    (window as any).submitUpdateSKUForm = submitUpdateSKUForm;
    (window as any).applyJob = applyJob;
    
    const jobDetails = await getJobDetails(this.params?.id);
    return `
      ${topNavigation}
      
      <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          ${jobDetails}
        </div>
      </section>
    `;
  }
}
