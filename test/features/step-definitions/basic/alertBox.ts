import { Given, When, Then, setDefaultTimeout } from "@wdio/cucumber-framework";
import { expect } from "chai";

Given(/^Google Page is opened$/, async function () {
  await browser.url("https://www.google.com/");
  await browser.pause(7000);
});

When(/^Search with(.*)$/, async function (SearchItem) {
  await console.log(`<<SearchItem:${SearchItem}`);
  let item = await $("[name=q]");
  await item.setValue(SearchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let link = await $("<h3>");
  await link.click();
});

Then(/^URL should match(.*)$/, async function (ExpectedURL: string) {
  let actualLink = await browser.getUrl();
  let elink: string = ExpectedURL.trim();
  expect(actualLink).to.equals(elink);
});

Given(/^A web page is opened$/, async function () {
  await browser.url("/javascript_alerts");
  await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
});

When(/^perform web interactions$/, async function () {
  /*
*input box action
1. Type into input box
2. clear the field and add or just type into the field
3. click and type
4. slow typing 
*/
 let jsAlert=await $("//button[text()='Click for JS Alert']")
 let jsConfirm=await $("//button[text()='Click for JS Confirm']")
 let jsPrompt=await $("//button[text()='Click for JS Prompt']")
 await jsAlert.click();
 await browser.pause(2000)
 await browser.acceptAlert()
 await jsConfirm.click()
 await browser.pause(2000)
 await browser.dismissAlert()
 await jsPrompt.click()
 await browser.pause(2000)
 let text= await browser.getAlertText()
 await browser.sendAlertText("Test Alert....")
 await browser.pause(5000)
 await browser.acceptAlert()
  await browser.debug();

  await expect(text).to.equal("I am a JS prompt")
});


