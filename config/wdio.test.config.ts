//import {config as baseconfig} from "../wdio.conf.ts"
import baseconfig from "../wdio.conf.ts";

//const baseconfig = require("../wdio.conf");
 export const config=Object.assign(baseconfig,
    {
    environment:"Test",
    WEBURL:"https://www.saucedemo.com",   
});


export default config