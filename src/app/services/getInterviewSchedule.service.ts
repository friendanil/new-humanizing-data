import { SearchLinkMultipleAll, SearchQuery } from "mftsccs-browser";
import { getLocalStorageData } from "./helper.service";

export const listOfOneInterviewSchedule=async(usrConceptId:number)=>{
      let userConceptId: any = Number(usrConceptId);
      console.log(userConceptId,"101073204")
      const profileStorageData: any = await getLocalStorageData();
      const token = profileStorageData?.token;
      let searchfirst = new SearchQuery();
      searchfirst.composition = userConceptId;
      searchfirst.fullLinkers = ["the_user_interViewSchedule"];
      searchfirst.inpage = 100;
  
      let searchsecond: any = new SearchQuery();
      searchsecond.fullLinkers = [
      'the_interViewSchedule_status',
      'the_interViewSchedule_interviewDate',
      'the_interViewSchedule_interviewTime',
      'the_interViewSchedule_personality',
      'the_interViewSchedule_skillKnowledge',
      'the_interViewSchedule_characterFlow',
      'the_interViewSchedule_template',
      'the_interViewSchedule_heading',
      'the_interViewSchedule_body'
      ];
      searchsecond.inpage = 100;
  
     
      const queryParams = [searchfirst, searchsecond];
      const interviewSchedule = await SearchLinkMultipleAll(queryParams,token);
      const interviewScheduleid=interviewSchedule?.data?.the_user?.the_user_interViewSchedule?.[0]?.id || ''
      const interviewScheduleFormatData=interviewSchedule?.data?.the_user?.the_user_interViewSchedule?.[0]?.data?.the_interViewSchedule || ''
      console.log(interviewScheduleid,"interviewSchedule",interviewSchedule)
    return {interviewScheduleid,interviewScheduleFormatData};
}