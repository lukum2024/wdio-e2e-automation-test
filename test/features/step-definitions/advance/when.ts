import { When } from "@wdio/cucumber-framework";
import report from "../../../helper/reporter.ts"
import nopCommerce from "../page-Objects/nopCommerce.home.page.ts"
import config from "../../../../config/wdio.test.config.ts"

When(/^As an (.*) user login to nopcommerce site$/,async function(user){
    if(!user) throw Error(`Given ${user} is not valid`)
    user=user.trim().toUpperCase()
    try {
        report.addStep(this.testid,"info",`Login to nopcommerce demo site`)
       await  nopCommerce.loginTonopCommerceWeb(this.testid,config.nopCommerceURL,process.env[`NOP_${user}_USERNAME`],process.env[`NOP_${user}_PASSWORD`])
        
    } catch (err) {
        err.message=`${this.testid}:failed at login step,${err.message}`
        throw err
    }
})