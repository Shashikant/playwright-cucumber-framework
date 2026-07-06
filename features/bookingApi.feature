Feature: Booking API Functionality

Background:
Given I have the valid token for the API requests


@bookingapi
Scenario: Verify updating booking with token
    Given I have the API endpoint "https://restful-booker.herokuapp.com/booking/1"
    When I send a PUT request to the endpoint with the token
    Then the response status code should be 200

@bookingapi
Scenario: Verify updating booking with lastname only
    Given I have the API endpoint "https://restful-booker.herokuapp.com/booking/1"
    When I send a PUT request to the endpoint with the token and lastname only
    Then the response status code should be 400

Scenario: Verify updating booking with firstname only
    Given I have the API endpoint "https://restful-booker.herokuapp.com/booking/1"
    When I send a PUT request to the endpoint with the token and firstname only
    Then the response status code should be 400