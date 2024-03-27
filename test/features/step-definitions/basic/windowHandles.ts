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
  await browser.url("/windows");
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

  let link1 = await $("=Click Here");
  let link2 = await $("=Elemental Selenium");
  await link1.click();
  await link2.click();
  let parentWin = await browser.getWindowHandle();
  let windows = await browser.getWindowHandles();
  let currentPageTitle = "The Internet";
  expect(currentPageTitle).to.equals("The Internet");

  for (let i = 0; i < windows.length; i++) {
    await browser.switchToWindow(windows[i]);
    console.log(await browser.getTitle());
  }
  await browser.switchToWindow(parentWin);
  console.log(await browser.getTitle());

  await browser.debug();
});
