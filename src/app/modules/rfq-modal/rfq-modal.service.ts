// import { environment } from "../../environments/environment.dev";
import { getAgents } from "../../services/agent.service";
import { getLocalStorageData } from "../../services/helper.service";

// const thetaBoommAPI = environment?.boomURL;

export async function getBuyerAgents() {
  const profileStorageData: any = await getLocalStorageData();
  const token = profileStorageData?.token;

  const buyerAgentList = await getAgents("buyerAgent_agent", token);
  console.log("buyerAgentList ->", buyerAgentList);

  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${token}`);

  // const queryData = [
  //   {
  //     type: "buyerAgent_agent",
  //     listLinkers: ["isAgent_by"],
  //     inpage: 100,
  //     page: 1,
  //     logic: "or",
  //     filterSearches: [],
  //   },
  // ];

  // const response = await fetch(
  //   `${thetaBoommAPI}/api/list-all-without-auth-with-linker`,
  //   {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: JSON.stringify(queryData),
  //     redirect: "follow",
  //   }
  // );
  // const output = await response.json();

  // const buyerAgentList = output?.[0]?.buyerAgent_agent?.buyerAgent_agent_s_isAgent_by

  const buyerAgentOptions = buyerAgentList?.map((buyerAgent: any) => {
    return `<option value="${buyerAgent?.the_user?.id}">${buyerAgent?.the_user?.data?.entity?.data?.person?.data?.first_name} ${buyerAgent?.the_user?.data?.entity?.data?.person?.data?.last_name}</option>`;
  });

  return buyerAgentOptions;
}
