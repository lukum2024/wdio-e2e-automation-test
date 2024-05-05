Feature: Verify Urgent Notification Tab
#Background:

@API
Scenario Outline:
Given MNC portal is opened Verify General Information Tab Appearance
Then Login is successful <username> <password> and Homepage is displayed

Examples:
|username|password|
|sdohinternal@yopmail.com|Onlyiknow#456|

