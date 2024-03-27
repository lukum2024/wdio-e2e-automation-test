import { Given } from "@wdio/cucumber-framework";
//import dotenv.config()
//import {dotenv} from "config" 
import * as dotenv from 'dotenv';
dotenv.config();

Given(/^Login to inventory web app$/, async function () {
  
 // const weburl = await JSON.parse(process.env.WEBURL);
 let weburl = process.env.WEBURL;
  await browser.url(`"${weburl}"`);
  await browser.pause(2000)
  //await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  //@ts-ignore
  console.log(`<<brower inf:${JSON.stringify(browser.config)}`)
  
console.log(`<<Username:${process.env.TEST_APP_USERNAME}`)
  try {
    let Username=process.env.TEST_APP_USERNAME.toString()
    let pwd=process.env.PASSWORD.toString()
    await $("#user-name").setValue(Username);
    await $("#password").setValue(pwd);
    await $("#login-button").click();
  } catch (err) {
    console.log("Error in loging Retrying....");
     await browser.refresh();
     await browser.pause(2000);
    await $("#user-name").setValue(process.env.TEST_APP_USERNAME);
    await $("#password").setValue(process.env.PASSWORD);
    await $("#login-button").click();
    await browser.pause(2000);
  }

  await browser.back()
  await browser.pause(2000)
  await browser.forward()
  await browser.pause(2000)
  // await browser.pause(2000)
  // await browser.reloadSession()
  // await browser.url("https://www.saucedemo.com/")
  // await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  // await $("#user-name").setValue("problem_user");
  // await $("#password").setValue("secret_sauce");
  // await $("#login-button").click();
  // await browser.pause(2000)
});
