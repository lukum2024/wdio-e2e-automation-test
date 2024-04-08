Feature: Web Interaction
@demo @smoke
Scenario Outline: <TestID>: Demo Inventory
#Given Login to inventory web app
Given As a standard user I Login to inventory web app
|UserType|UserName|
|stdUsr|standard_user|
|PrbUsr|problem_user|
|PerfUsr|performance_glitch_user|
Then Inventory page should list <NumberOfProducts>
Then Validate all products have valid price

Examples:
|TestID|NumberOfProducts|
|web_TC03|            |
