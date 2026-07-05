import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, request } from '@playwright/test';

let responseBody: any = {};
let token: string;

Given('I have the API endpoint {string}', async function (endpoint: string) {
    this.url = endpoint;
    this.apiContext = await request.newContext();

})

When('I send a POST request to the endpoint', async function () {
    this.response = (await this.apiContext.post(this.url, {
        headers: {
            "Content-Type": "application/json"

        },
        data: {
            "username": this.data.username,
            "password": this.data.password
        }
    }));

    responseBody = await this.response.json();
    console.log(responseBody);
    token = responseBody.token;
    console.log("Token is : " + token);

});

Then('the response status code should be {int}', async function (statusCode: number) {
    expect(this.response.status()).toBe(statusCode);
});

Then('the response body should contain the expected data', async function () {
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).not.toBeNull();
});


When('I send a PUT request to the endpoint with the token', async function () {

    console.log("Token is : " + token);
    this.response = (await this.apiContext.put(this.url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: {
            "firstname": this.data.firstname,
            "lastname": this.data.lastname,
            "totalprice": this.data.totalprice,
            "depositpaid": this.data.depositpaid,
            "bookingdates": {
                "checkin": this.data.checkin,
                "checkout": this.data.checkout
            },
            "additionalneeds": this.data.additionalneeds
        }
    }));
    console.log(await this.response.json());
});