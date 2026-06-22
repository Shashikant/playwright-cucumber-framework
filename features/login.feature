Feature: Login Functionality

Background:
  Given the user is on the login page

  Scenario: Successful login with valid credentials
    
    When the user enters valid username and password
    And clicks the login button
    Then the user should be redirected to the home page

  Scenario: Unsuccessful login with invalid credentials
    
    When the user enters invalid username or password
    And clicks the login button
    Then an error message should be displayed indicating invalid credentials
