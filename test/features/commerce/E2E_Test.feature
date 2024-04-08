Feature: Customer Search
@demo @smoke @API
Scenario Outline: <TestID>: Search external customer
Given Get list of users from reqres.in
When As an ADMIN user login to nopcommerce site
Then Verify if all users exist in customers list

Examples:
|TestID|
|E2E_TC01|         
