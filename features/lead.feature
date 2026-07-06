Feature: Lead Functionality

  Background:
    Given the user is on the login page
    When the user logs in with valid username and password

  @lead
  Scenario: verify_create_lead_with_mandatory_fields_TC04
    When the user clicks on new lead link it navigates to new lead page
    And enters lastname and company name and clicks on save button
    Then lead gets created successfully

 
  Scenario: verify_search_and_update_of_existing_update_existing_lead_by_last_name_and_company
    When the user clicks on new lead link it navigates to new lead page
    When the user searches for lead with last name <lastname>
    Then the lead should be displayed in the search results
    When the user opens the lead details
    And the user updates the <lastname> and company name to <company>
    Then the updated lastname and company should be displayed

  @lead
  Scenario: verify_deletion_of_existing_lead
    When the user searches for existing lead with last name
    Then matching leads should be displayed
    When the user deletes the first matching lead
    Then the lead should not appear in the search results
