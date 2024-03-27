import { Given } from "@wdio/cucumber-framework";
import * as dotenv from 'dotenv';
dotenv.config();

Given(/^As (a|an) (.*) user I Login to inventory web app$/, async function (prefix,usertype,dataTable) {
  
  //const weburl = await JSON.parse(process.env.WEBURL);
  let dt=dataTable.hashes()
  console.log(`>>type of dt:${typeof dt}`)
  console.log(`>>The type of dt:${dt.constructor}`)
  console.log(`>>values of dt:${JSON.stringify(dt)}`)
  console.log(`<<usertype:${usertype}`)
  console.log(`<<prefix:${prefix}`)
 //let weburl = process.env.WEBURL;
  await browser.url("https://www.saucedemo.com/");
  await browser.pause(2000)
  //await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  //@ts-ignore
  console.log(`<<brower inf:${JSON.stringify(browser.config)}`)
  
console.log(`<<Username:${process.env.TEST_APP_USERNAME}`)
  try {
    //let Username=String(process.env.TEST_APP_USERNAME)
  // await $("#user-name").setValue(Username)
   await $("#user-name").setValue(await dt[0].UserName)
   let pwd=String(process.env.TEST_APP_PASSWORD)
    await $("#password").setValue(pwd);
    await $("#login-button").click();
    await browser.pause(2000)
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
