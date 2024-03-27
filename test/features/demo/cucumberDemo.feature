@cucumber
Feature: Cucumber Demo

Background:
Given Google Page is opened

Scenario: Run first demo feature
When Search with "webdriverio"
Then Click on the first search result
* URL should match https://webdriver.io/

Scenario: Run first demo feature
When Search with webdriver
Then Click on the first search result
* URL should match https://www.selenium.dev/documentation/webdriver/
