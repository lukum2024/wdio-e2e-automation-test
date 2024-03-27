import { Given, When, Then, setDefaultTimeout } from "@wdio/cucumber-framework";
import { expect } from "chai";

Given(/^A web page is opened$/, async function () {
    await browser.url("https://the-internet.herokuapp.com/tables");
    await browser.setTimeout({ implicit: 15000, pageLoad: 1000 });
  });
  
  When(/^perform web interactions$/, async function () {
    let rows= await $$("//table[@id='table1']/tbody/tr")
    let cols=await $$("//table[@id='table1']/thead/tr/th")
    let arr=[]
    //case 1: print all rows from the table
    // for(let i=0;i<rows.length;i++)
    // {
    
    //     for(let j=0;j<cols.length;j++)
    //     {
    //         let cell= await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`).getText()
    //         arr.push(cell)
    //     }
        
    // }

 // case 2:  for a single row

    // for(let i=0; i<cols.length;i++)
    // {
    //     let cell= await $(`//table[@id='table1']/tbody/tr[3]/td[${i+1}]`).getText()
    //     arr.push(cell)
    // }

  //case 3:  for a row having matching first name
//   for(let i=0;i<rows.length;i++)
//    {
//       let firstname= await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[2]`).getText()
//       if(firstname==="Tim")
//     {
//       for(let j=0;j<cols.length;j++)
//       {
//           let cell= await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`).getText()
//           arr.push(cell)
//       }
//     }
//     }
//case4: print entrire column based on a conditional statement

for(let i=0;i<rows.length;i++)
   {
      let firstname= await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[2]`).getText()
      let price= await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[4]`).getText()
      if(+(price.replace("$",""))>50)
    {
          arr.push(firstname)
    }
    }
         console.log(arr)

  })