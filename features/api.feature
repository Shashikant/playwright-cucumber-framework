Feature: API Functionality
@api
  Scenario: Generate Token and check API Response
    Given I have the API endpoint "https://restful-booker.herokuapp.com/auth"
    When I send a POST request to the endpoint
    Then the response status code should be 200
    And the response body should contain the expected data
@api
Scenario: Verify updating booking with token
    Given I have the API endpoint "https://restful-booker.herokuapp.com/booking/1"
    When I send a PUT request to the endpoint with the token
    Then the response status code should be 200