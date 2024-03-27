import {config as baseconfig} from "../wdio.conf.ts"
export const config=Object.assign(baseconfig,{
    environment:"Test",
    WEBURL:"https://www.saucedemo.com"
})