import { expect } from "chai"
import * as allureWrapper from "C:/Users/MJain/Documents/wdio-e2e-automation-test/utils/allure/allure.wrapper.ts"
import { BrowserHelper } from "../../../helper/browser.helper.ts";
import config from "../../../../config/wdio.test.config.ts";
const EMAIL_INPUT_LOCATOR = "input#signInName";
const PASSWORD_INPUT_LOCATOR = "input#password";
const SIGNIN_BUTTON_LOCATOR = "button#next";
const SIGN_UP_LOCATOR = "#signup a#createAccount";
const RESET_PWD_LOCATOR = "#signup a#customResetPassword";
const REMEMBER_ME_LOCATOR = "input#rememberMe";
const LOGO_LINK_LOCATOR = "a .w-full";
const MYNEXUS_EMPLOYEE_BUTTON = "button#AzureADExchangeWithAADtoken";
const RESET_EMAIL_LOCATOR = "input#email";
const CONTINUE_BUTTON_LOCATOR = "button#continue";
const INCORRECT_PASSWORD = "//p[contains(text(),'password is incorrect')]";
 export class LoginPage{
    
  get incorrectPassword()
  {
        return $(INCORRECT_PASSWORD)
}
    
     get  resetEmailInput() {
        return  $(RESET_EMAIL_LOCATOR)
      }
    
      get emailInput() {
        return  $(EMAIL_INPUT_LOCATOR)
      }
    
      get passwordInput() {
        return  $(PASSWORD_INPUT_LOCATOR)
      }
    
      get rememberMeInput() {
       
           return $(REMEMBER_ME_LOCATOR)
          
        
      }
    
      get continueButton() {
        return $(CONTINUE_BUTTON_LOCATOR)
          
        
      }
    
      get signInButton() {
        return  $(SIGNIN_BUTTON_LOCATOR)
      }
    
      get logoLink() {
        return $(LOGO_LINK_LOCATOR)

      }
    
      get signUpLink() {
        return  $(SIGN_UP_LOCATOR)
      }
    
      get resetPwdLink() {
        return  $(RESET_PWD_LOCATOR)
      }
    
      get myNexusEmployeeButton() {
        return  $(MYNEXUS_EMPLOYEE_BUTTON)       
      }
    
      // action methods
      async open(): Promise<LoginPage> {
     //  allureWrapper.addAllureStep(`Open Login page with url: ${this.baseUrl}`);\
     let url=config.MNC_URL
        await BrowserHelper.navigateTo(url);
        return this;
      }
    
      async login(email: string, password: string) {
        allureWrapper.addAllureStep(`Login with user name: ${email}`);
    
        await (await this.emailInput).waitForClickable();
        await (await this.emailInput).setValue(email);
        await (await this.passwordInput).setValue(password);
        await (await this.signInButton).click();
        //TODO Investigate why login doesn't work properly on Stage
        if (!(await mainPage.isLogoDisplayed)) {
          await (await this.emailInput()).setValue(email);
          await (await this.passwordInput()).setValue(password, false);
          await (await this.signInButton()).click();
        }
    
        this.isLoggedIn = true;
    
        return mainPage;
      }
    
    //   async softLogin(email: string, password: string) {
    //     allureWrapper.addAllureStep(`Login with user name: ${email}`);
    //     console.info("Logged in: " + this.isLoggedIn);
    //     if (!this.getLoggedIn() || !(await mainPage.isLogoDisplayed())) {
    //       await (await this.open()).waitForPageAvailable();
    //       await this.clickMyNexusEmployee();
    //       await ADLoginPage.waitForPageAvailable();
    //       await this.loginViaAD(email, password);
    //       this.isLoggedIn = true;
    //     } else {
    //       console.info("Soft login - skip login as user is logged");
    //     }
    //     return mainPage;
    //   }
    
    //   async loginViaAD(email: string, password: string) {
    //     this.isLoggedIn = true;
    
    //     let loginWorkaround = async () => {
    //       await browser.pause(500);
    //       if (await (await ADLoginPage.logoImage()).isExisting()) {
    //         await ADLoginPage.login(email, password);
    //       } else if (await (await this.myNexusEmployeeButton()).isExisting()) {
    //         await this.clickMyNexusEmployee();
    //         await ADLoginPage.waitForPageAvailable();
    //         await loginWorkaround();
    //       } else {
    //         throw new Error(
    //           "Neither 'MyNexus Employee' nor 'AD Login' page are displayed",
    //         );
    //       }
    //     };
    
    //     await loginWorkaround();
    //     if (!(await mainPage.isLogoDisplayed())) {
    //       await this.clickMyNexusEmployee();
    //       await this.softLogin(email, password);
    //     }
    //     return await mainPage.waitForPageAvailable();
    //   }
    
    //   async logout(): Promise<LoginPage> {
    //     allureWrapper.addAllureStep(`Log out`);
    //     await mainPage.headerComponent().logout();
    //     this.isLoggedIn = false;
    
    //     return this;
    //   }
    
    //   async isLogoLinkDisplayed(): Promise<boolean> {
    //     return await (await this.logoLink()).isDisplayed();
    //   }
    
    //   async waitForPageAvailable(): Promise<LoginPage> {
    //     allureWrapper.addAllureStep(`Wait for Login page available`);
    //     await (await this.signInButton()).waitForDisplayed();
    //     await (await this.logoLink()).waitForDisplayed();
    
    //     return this;
    //   }
    
    //   getLoggedIn() {
    //     return this.isLoggedIn;
    //   }
    
    //   async clickSignUp() {
    //     allureWrapper.addAllureStep(`Sign up`);
    //     await (await this.signUpLink()).click();
    //   }
    
    //   async clickMyNexusEmployee() {
    //     allureWrapper.addAllureStep(`Click on my nexus employee`);
    //     await (await this.myNexusEmployeeButton()).waitForClickable();
    //     await (await this.myNexusEmployeeButton()).click();
    //   }
    
    //   async clickResetLink() {
    //     allureWrapper.addAllureStep(`Click reset link`);
    //     await (await this.resetPwdLink()).click();
    
    //     await (await this.resetEmailInput()).waitForDisplayed();
    //     await (await this.continueButton()).waitForDisplayed();
    
    //     return this;
    //   }
    
    //   async verifyEmailFieldDisplayed() {
    //     expect(
    //       await (await this.emailInput()).isDisplayed(),
    //       `Check that email input is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifyPasswordFieldDisplayed() {
    //     expect(
    //       await (await this.passwordInput()).isDisplayed(),
    //       `Check that password input is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifyIncorrectPasswordDisplayed() {
    //     expect(
    //       await (await this.incorrectPassword()).isDisplayed(),
    //       `Check that incorrect password field is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifyMyNexusButtonDisplayed() {
    //     expect(
    //       await (await this.myNexusEmployeeButton()).isDisplayed(),
    //       `My Nexus employee button is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifySignInButtonDisplayed() {
    //     expect(
    //       await (await this.signInButton()).isDisplayed(),
    //       `Sign in button is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifyRememberMeDisplayed() {
    //     expect(
    //       await (await this.rememberMeInput()).isDisplayed(),
    //       `Remember me checkbox is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifySignUpDisplayed() {
    //     expect(
    //       await (await this.signUpLink()).isDisplayed(),
    //       `Sign Up line is visible`,
    //     ).to.equal(true);
    //   }
    
    //   async verifyResetPasswordDisplayed() {
    //     expect(
    //       await (await this.resetPwdLink()).isDisplayed(),
    //       `Reset password link is visible`,
    //     ).to.equal(true);
    //   }
    }
    export default new LoginPage();
