//import {config as baseconfig} from "../wdio.conf.ts"
import baseconfig from "../wdio.conf.ts";

//const baseconfig = require("../wdio.conf");
 export const config=Object.assign(baseconfig,
    {
    MNC_URL:"https://mnc-qa-web-portal.azurewebsites.net/",
    environment:"Test",
    WEBURL:"https://www.saucedemo.com",
    reqresBaseURL:"https://reqres.in",   
    nopCommerceURL:"https://admin-demo.nopcommerce.com/admin",
    custURL:"https://admin-demo.nopcommerce.com/Admin/Customer/List"
});


export default config