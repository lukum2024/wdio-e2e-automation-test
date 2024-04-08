import { Given } from "@wdio/cucumber-framework";
import chai, { expect } from "chai";
import config from "../../../../config/wdio.test.config.ts";
import HomePage from "../page-Objects/sause.home.page.ts";
import report from "../../../helper/reporter.ts";
//import constant from "../../../../data/constants.json"
import constants from "../../../../data/constants.json" assert { type: "json" };
import apiHelper from "../../../helper/apiHelper.ts";
import fs from "fs";

Given(
  /^As (a|an) (.*) user I Login to inventory web app$/,
  async function (prefix, usertype, dataTable) {
    // let dt=await dataTable.hashes()
    try {
      //@ts-ignore
      let url = config.WEBURL;
      await HomePage.navigateTO(url);
      await HomePage.loginToSauceApp(
        this.testid,
        process.env.TEST_APP_USERNAME,
        process.env.TEST_APP_PASSWORD
      );
    } catch (err) {
      throw err.message;
    }
  }
);
/**Sub-Steps:
 * 1. Get PayLoad Data
 * 2. Make get call by using api helper
 * 3. store results
 * **/
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef)
    throw Error(`Given Endpoint Ref: ${endpointRef} is not valid`);
  try {
    report.addStep(
      this.testid,
      "info",
      `Getting the payload data for ${endpointRef}`
    );
    let endpoint = "";
    //const constants = JSON.parse(fs.readFileSync('../../../../data/constants.json', 'utf8'));
    if (endpointRef.trim().toUpperCase() === "USERS")
      endpoint = constants.Reqres.Get_Users;

    if (!endpoint)
      throw Error(
        `Error in getting Endpoint ${endpoint} from constants.json file`
      );

    let rest;
    let parsedResponse;
    let newText
    const testid = this.testid;
    await browser.call(async function () {
      rest = await apiHelper.GET(
        testid,
        config.reqresBaseURL,
        endpoint,
        undefined,
        constants.Reqres.query_param
      );
      rest = JSON.stringify(rest,undefined,4);
      parsedResponse = JSON.parse(rest); // Parse the JSON string back into an object
      let status = parsedResponse.status; // Access the status property from the parsed JSON object
      
     newText=await parsedResponse.text.replace(/\\/g, '');
      console.log(`Text:${newText}`)
      console.log(status);

      if ((await status) !== 200)
        expect.fail(
          `Failed in getting users from ${config.reqresBaseURL}${endpoint}`
        );
    });

    report.addStep(this.testid, "info", `API response received, Data:${rest}`);

    //**Store Results */

    let filename = `${process.cwd()}\\data\\api-rest\\apiUsers.json`;

    // Convert the string to an ArrayBuffer
    fs.writeFileSync(filename, newText, undefined);
    report.addStep(
      this.testid,
      "info",
      `Response from ${endpoint} stored in ${filename}`
    );
  } catch (err) {
    err.message = `${this.testid}: failed at getting API users from reqres, ${err.message}`;
    throw err;
  }
});
