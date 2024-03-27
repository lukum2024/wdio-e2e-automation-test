import { Given, When } from "@wdio/cucumber-framework";

Given(/^A web page is opened$/, async function () {
  await browser.url("https://partners.myntrainfo.com/");
  await browser.maximizeWindow();
  await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
});

When(/^perform web interactions$/, async function () {
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });
  await browser.pause(2000);
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });
  await browser.pause(2000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await browser.pause(2000);

  await browser.execute(() => {
    window.scrollTo(0, document.body.scrollTop);
  });
  await browser.pause(2000);
});
