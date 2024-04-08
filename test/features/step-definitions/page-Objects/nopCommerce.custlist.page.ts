import report from "../../../helper/reporter.ts"
import page from "../page-Objects/page.ts"

class CustList extends page{
    constructor()
    {
        super()
    }
    get searchFirstName()
    {
        return $("#SearchFirstName")
    }

    get searchLastName()
    {
        return $("#SearchLastName")
    }

    get searchButton()
    {
        return $("#search-customers")
    }

    get noResultMessage()
    {
        return $("//td[text()='No data available in table']")
    }

    async searchNameAndConfirm(testid:string,firstName:string,lastName:string):Promise<boolean>
    {
        if(!firstName ||!lastName) throw Error(`${firstName} and ${lastName} are not valid`)
        let nameNotExist=false
    firstName=firstName.trim()
    lastName=lastName.trim()
    report.addStep(testid,"info",`searching user ${firstName} and ${lastName}`)
        try {
            await this.typeInto(await this.searchFirstName,firstName)
            await this.typeInto(await this.searchLastName,lastName)
            await this.click(await this.searchButton)
            let isNotDisplayed=await  this.noResultMessage.isDisplayed()
            if(isNotDisplayed)
            nameNotExist=true
        } catch (err) {
            err.message=`Failed in searching ${firstName} and ${lastName} on page, ${err}`
            throw err
        }
        return nameNotExist
    }

}

export default new CustList()