Feature: Web Interaction
@demo @smoke
Scenario Outline: Demo Web Interaction
Given Login to inventory web app
#Then Inventory page should list <NumberOfProducts>
#Then Validate all products have valid price

Examples:
|TestID|NumberOfProducts|
|web_TC03|6|
