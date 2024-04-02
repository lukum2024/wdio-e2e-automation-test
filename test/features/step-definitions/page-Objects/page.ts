export default class Page{
    constructor(){

    }

    async navigateTO(url :string)
    {
        await browser.url(url)
        await browser.maximizeWindow()
    }

    async click(ele:WebdriverIO.Element)
    {
        ele.waitForDisplayed({timeout:5000})
        if(!ele.elementId)
        {
            throw Error(ele.error.message)
        }
        await ele.click()
    }

    async typeInto(ele:WebdriverIO.Element,text:string)
    {
        await ele.waitForDisplayed({timeout:5000})
        if(!ele.elementId)
        {
            throw Error(ele.error.message)
        }
        await ele.setValue(text)
    }
}