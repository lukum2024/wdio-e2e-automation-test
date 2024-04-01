import { Then} from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../../helper/logger.ts"

Then(/^Inventory page should list(.*)$/,async function(NumberOfProducts:number){
   //logger.info(`${this.testid}:Price has following details`)
   // console.log(wdio) // Reference error
   try {
       console.log(`>>testid in Then:${this.testid}`)
       const numericNumberOfProducts = Number(NumberOfProducts);
        if(!numericNumberOfProducts) 
        {
         throw new Error(`Invalid product count provided ${NumberOfProducts}`);
        }
         
        let nop=await $$(".inventory_item_label")
        let total_products=nop.length;
        expect(total_products).to.equal(numericNumberOfProducts)
   } catch (err) {
        console.log(`The type of err ${typeof err}`)
        console.log(`The name of error ${err.name}`)
        console.log(`The message of the error ${err.message}`)
        err.message=`${this.testid} has failed while comparing the count with error message:${err.message}`
       throw err //failing
       logger.error(err.message)
   }
})

    Then(/^Validate all products have valid price$/,async function(){
        let eleList=await $$(".inventory_item_price")
        let priceList=[];
        for(let i=0;i<eleList.length;i++)
        {
            priceList.push(await eleList[i].getText())
        }
            console.log(priceList)

            let priceNumList=priceList.map(e => +e.replace("$", ""))
            console.log(`<<price in numbers>${priceNumList}`)
            let invalidPrice= priceNumList.filter(p=>p<=0);
            expect(invalidPrice.length).to.equal(0)
    })
