import { Given } from "@wdio/cucumber-framework";
import * as dotenv from 'dotenv';
dotenv.config();

import HomePage from "../page-Objects/sause.home.page.ts"
Given(/^As (a|an) (.*) user I Login to inventory web app$/, async function (prefix,usertype,dataTable) {
  
  //const weburl = await JSON.parse(process.env.WEBURL);
  let dt=await dataTable.hashes()
  
 try {
  //@ts-ignore
   await HomePage.navigateTOawait(await browser.config.WEBURL)
    await HomePage.loginToSauceApp(this.testid,process.env.standard_user,process.env.secret_sauce)
 } catch (err) {
   throw err.message
 }
 
});
