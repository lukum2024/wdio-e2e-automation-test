import { Given, When } from "@wdio/cucumber-framework";

Given(/^A web page is opened$/, async function () {
  await browser.url("https://partners.myntrainfo.com/");
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
});

When(/^perform web interactions$/, async function () {
  let ele=await $("//button[@type='button']")
  console.log(browser)
  console.log(ele);
});
