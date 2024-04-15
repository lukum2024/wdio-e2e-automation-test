import { Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../../helper/logger.ts";
import reporter from "../../../helper/reporter.ts";
import config from "../../../../config/wdio.test.config.ts";
import fs from "fs";
import nop from "../page-Objects/nopCommerce.custlist.page.ts";

Then(
  /^Inventory page should list(.*)$/,
  async function (NumberOfProducts: number) {
    //logger.info(`${this.testid}:Price has following details`)
    // console.log(wdio) // Reference error
    try {
      console.log(`>>testid in Then:${this.testid}`);
      const numericNumberOfProducts = Number(NumberOfProducts);
      if (!numericNumberOfProducts) {
        throw new Error(`Invalid product count provided ${NumberOfProducts}`);
      }

      let nop = await $$(".inventory_item_label");
      let total_products = nop.length;
      try {
        expect(total_products).to.equal(numericNumberOfProducts);
      } catch (err) {
        reporter.addStep(
          this.testid,
          "error",
          "This is a known issue in production environment",
          true,
          "Jira132"
        );
      }
    } catch (err) {
      console.log(`The type of err ${typeof err}`);
      console.log(`The name of error ${err.name}`);
      console.log(`The message of the error ${err.message}`);
      err.message = `${this.testid} has failed while comparing the count with error message:${err.message}`;
      throw err; //failing
      logger.error(err.message);
    }
  }
);

Then(/^Validate all products have valid price$/, async function () {
  let eleList = await $$(".inventory_item_price");
  let priceList = [];
  for (let i = 0; i < eleList.length; i++) {
    priceList.push(await eleList[i].getText());
  }
  console.log(priceList);

  let priceNumList = priceList.map((e) => +e.replace("$", ""));
  console.log(`<<price in numbers>${priceNumList}`);
  let invalidPrice = priceNumList.filter((p) => p <= 0);
  expect(invalidPrice.length).to.equal(0);
});

/**Verify if all users exist in customers list
 * Sub Steps
 * 1. Navigate/select customer options from left menu
 * 2. Read API Response from API folder
 * 3. for each user object in api response
 * - Enter first name and last name
 * - search and confirm if user exist on page
 * 4. if user does not exist , write error on file
 */

Then(/^Verify if all users exist in customers list$/, async function () {
  //1. Navigate/select customer options from left menu
  try {
    // await browser.url(`${config.custURL}/Admin/Customer/List`)
    await browser.url(config.custURL);
    reporter.addStep(this.testid, "info", `Navigated to customerSearch screen`);
    //2. Read API Response from API folder
    let filename = `${process.cwd()}/data/api-rest/apiUsers.json`;
    let data = fs.readFileSync(filename, "utf8");
    let dataObj = JSON.parse(data);

    let nob = dataObj.data.length;
    let arr = [];

    //3. for each user object in api response
    for (let i = 0; i < nob; i++) {
      let obj = {};
      let fname = dataObj.data[i].first_name;
      let lname = dataObj.data[i].last_name;
      let custNotFound = await nop.searchNameAndConfirm(
        this.testid,
        fname,
        lname
      );
      if (custNotFound) {
        obj["firstname"] = fname;
        obj["lastname"] = lname;
        arr.push(obj);
      }
    }
    //4. if user does not exist , write error on file
    if (arr.length > 1) {
      let data = JSON.stringify(arr, undefined, 4);
      let filepath = `${process.cwd()}/results/custNotFoundList.json`;
      fs.writeFileSync(filepath, data);
    }
  } catch (err) {
    err.message = `Failed at checking users at nopcommerce site, ${err}`;
    throw err;
  }
});
