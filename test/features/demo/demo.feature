Feature: Demo feature

Feature Description
 
 @demo
Scenario Outline: Run first demo feature
Given Google Page is opened
When Search with <SearchItem>
Then Click on the first search result
Then URL should match <ExpectedURL>

Examples:
|TestID|SearchItem|ExpectedURL|
|Demo_TC01|webdriverio|https://webdriver.io/|


