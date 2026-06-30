@all
Feature: Login Functionality

  Background:
    Given the user is on the login page

  Scenario: verify_valid_login_TC03
    When the user logs in with valid username and password
    Then the user should be redirected to the home page

  Scenario: verify_invalid_login_TC02
    When the user logs in with invalid username or password
    Then an error message should be displayed indicating invalid credentials

  Scenario Outline: Login Validation
    When the user logs in with username "<username>" and password "<password>"
    Then login result should be "<result>"

    Examples:
      | username | password | result  |
      | admin    | admin    | Home    |
      | admin1   | admin1   | /index.php |
