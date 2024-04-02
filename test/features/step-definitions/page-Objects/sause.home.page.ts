import page from "../page-Objects/page.ts";
import report from "../../../helper/reporter.ts";

class HomePage extends page {
  constructor() {
    super();
  }

  get usernameInputBox() {
    return $("#user-name");
  }

  get userpasswordInputBox() {
    return $("#password");
  }

  get clickButton() {
    return $("#login-button");
  }

  async enterUserName(testid: string, username: string) {
    if (!username) throw Error(`Given Username ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      report.addStep(
        testid,
        "info",
        `username ${username} entered successfully`
      );
    } catch (err) {
      err.message = `Entering username ${username}: ${err.message}`;
      throw err;
    }
  }

  async enterUserPassword(testid: string, password: string) {
    if (!password) throw Error(`Given password ${password} is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.userpasswordInputBox, password);
      report.addStep(
        testid,
        "info",
        `username ${password} entered successfully`
      );
    } catch (err) {
      err.message = `Entering password ${password}: ${err.message}`;
      throw err;
    }
  }

  async enterClicButton(testid: string) {
    try {
      await this.click(await this.clickButton);
      report.addStep(testid, "info", `Login Button Clicked`);
    } catch (err) {
      err.message = `Error in clicking login button: ${err.message}`;
      throw err;
    }
  }

  async loginToSauceApp(testid: string, username: string, password) {
    try {
      await this.enterUserName(testid, username);
      await this.enterUserPassword(testid, password);
      await this.enterClicButton(testid);
    } catch (err) {
      throw err;
    }
  }
}

export default new HomePage() 