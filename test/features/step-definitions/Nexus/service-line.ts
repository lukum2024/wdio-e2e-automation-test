import { Given, Then } from "@wdio/cucumber-framework";
//import { Then } from "@wdio/cucumber-framework";
import LoginPage from "../page-Objects/LoginPage.ts";
import { addAllureTestId, testStep } from "utils/allure/allure.wrapper";
import { expect } from "chai";
import {BrowserHelper} from "C:/UI_Automation/UITestAutomation/helpers/browser.helper"

//const { USER, PASSWORD } = environmentVariables().getEnvData();  
Given(/^MNC portal is opened Verify General Information Tab Appearance$/,async function(){     
    await LoginPage.open();
    await browser.pause(5000);
});

 Then(/^Login is successful (.*) (.*) and Homepage is displayed$/,async function(username: string, password: string){
//     await LoginPage.login(username, password);
        console.log(`<<username and password:${username} and ${password}`);
 });