import { Then} from "@wdio/cucumber-framework";
import { expect } from "chai";


Then(/^Inventory page should list(.*)$/,async function(NumberOfProducts){
    if(! NumberOfProducts) throw Error(`Invalid product count ${NumberOfProducts}`)
    let nop=await $$(".inventory_item_label")
    let total_products=nop.length;
    expect(total_products).to.equal(parseInt(NumberOfProducts))
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
