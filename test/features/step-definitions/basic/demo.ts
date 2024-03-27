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
  await browser.url("/inputs");
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

  let ele = await $(`input[type='number']`);
  //await ele.click();
  //await ele.moveTo()
  //await ele.scrollIntoView()
  let num=1234;
  let strnum= num.toString();
  await ele.click()
  for(let i=0;i<strnum.length;i++)
  {
    let ch= strnum.charAt(i)
    browser.pause(2000)
    await browser.keys(ch)
  }
  //await ele.setValue("1234")
  await browser.debug()
  //await browser.pause(5000)
});
