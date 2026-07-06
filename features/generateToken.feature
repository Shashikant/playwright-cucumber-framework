Feature: API Generate Token Functionality


Scenario: Generate valid token
Given I have the valid token for the API requests

  @auth
  Scenario: Generate Token and check API Response
    Given I have the API endpoint "https://restful-booker.herokuapp.com/auth"
    When I send a POST request to the endpoint
    Then the response status code should be 200
    And the response body should contain the expected data

  @auth
  Scenario: Generate Token with invalid user details and check API Response
    Given I have the API endpoint "https://restful-booker.herokuapp.com/auth"
    When I send a POST request to the endpoint with invalid username
    Then the response status code should be 200
    And the response body should contain the expected error message

  @auth
  Scenario: Generate Token with invalid password details and check API Response
    Given I have the API endpoint "https://restful-booker.herokuapp.com/auth"
    When I send a POST request to the endpoint with invalid password
    Then the response status code should be 200
    And the response body should contain the expected error message

  @auth
  Scenario: Generate Token with blank username and check API Response
    Given I have the API endpoint "https://restful-booker.herokuapp.com/auth"
    When I send a POST request to the endpoint with blank username
    Then the response status code should be 200
    And the response body should contain the expected error message
