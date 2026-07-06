import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, request } from '@playwright/test';

When('I send a PUT request to the endpoint with the token', async function () {

    console.log("Token is : " + this.token);
    this.response = (await this.apiContext.put(this.url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${this.token}`
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


When('I send a PUT request to the endpoint with the token and lastname only', async function () {
    console.log("Token is : " + this.token);
    this.response = (await this.apiContext.put(this.url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${this.token}`
        },
        data: {
            "lastname": this.data.lastname
        }
    }));
    if (!this.response.ok()) {
        const body = await this.response.text();
        console.log(`Request failed as expected: ${this.response.status()} - ${body}`);
    } else {
        const responseBody = await this.response.json();
    }
});

When ('I send a PUT request to the endpoint with the token and firstname only', async function(){
    console.log("Token is : " + this.token);
    this.response = (await this.apiContext.put(this.url, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${this.token}`
        },
        data: {
            "firstname": this.data.firstname
        }
    }));
    if (!this.response.ok()) {
        const body = await this.response.text();
        console.log(`Request failed as expected: ${this.response.status()} - ${body}`);
    } else {
        const responseBody = await this.response.json();
    }
});