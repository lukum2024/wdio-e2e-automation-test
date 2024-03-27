import { Given, When, Then, setDefaultTimeout } from "@wdio/cucumber-framework";
import { expect } from "chai";

Given(/^Google Page is opened$/, async function () {
  await browser.url("https://www.google.com/");
  await browser.maximizeWindow()
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
  await browser.waitUntil(async function(){
     return await browser.getTitle()==="WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    , {timeout:10000,interval:5000,message:`The Page is not found:${browser.getTitle()}`}
    })
  let actualLink = await browser.getUrl();
  let elink: string = ExpectedURL.trim();
  expect(actualLink).to.equals(elink);
});


