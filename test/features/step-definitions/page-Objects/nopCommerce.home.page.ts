import report from "../../../helper/reporter.ts";
import page from "../page-Objects/page.ts";

class HomePage extends page {
  constructor() {
    super();
  }

  get userEmail() {
    return $("#Email");
  }

  get userPassword() {
    return $("#Password");
  }
  get clickButton() {
    return $(".login-button");
  }

  async loginTonopCommerceWeb(
    testid: string,
    url: string,
    username: string,
    password: string
  ) {
    if (!username || !password || !url) {
      throw Error(`Given data, ${url},${username},${password} are not valid`);
    }
    url = url.trim();
    username = username.trim();
    try {
      report.addStep(testid, "info", `Login to ${url} with ${username}`);
      await this.navigateTO(url);
      await this.typeInto(await this.userEmail, username);
      await this.typeInto(await this.userPassword, password);
      await this.click(await this.clickButton);
      report.addStep(
        testid,
        "info",
        `Login to ${url} with ${username} is successful`
      );
    } catch (err) {
      err.message = `failed to login to ${url} with username: ${username}`;
      throw err;
    }
  }
}
export default new HomePage()