import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, request } from '@playwright/test';

let responseBody: any = {};
//let token: string;

Given('I have the valid token for the API requests', async function () {
     const authContext = await request.newContext();   // its own context, not this.apiContext

  const response = await authContext.post('https://restful-booker.herokuapp.com/auth', {
    headers: { "Content-Type": "application/json" },
    data: {
      username: 'admin',
      password: 'password123',
    },
  });

  const body = await response.json();
  if (!body.token) {
    throw new Error(`Failed to generate token: ${JSON.stringify(body)}`);
  }

  this.token = body.token;
  console.log("Token is :", this.token);

  await authContext.dispose();   // clean up the throwaway context
});

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
    this.token = responseBody.token;
    console.log("Token is : " + this.token);

});

Then('the response status code should be {int}', async function (statusCode: number) {
    expect(this.response.status()).toBe(statusCode);
});

Then('the response body should contain the expected data', async function () {
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).not.toBeNull();
});

When('I send a POST request to the endpoint with invalid credentials', async function () {
    this.response = (await this.apiContext.post(this.url, {
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "username": this.data.username,
            "password": this.data.password
        }
    }));
});

Then('the response body should contain the expected error message', async function () {
    const responseBody = await this.response.json();
    expect(responseBody).toHaveProperty('reason');
    expect(responseBody.reason).toBe('Bad credentials');
});

When('I send a POST request to the endpoint with invalid username', async function () {
    this.response = (await this.apiContext.post(this.url, {
        headers: { "content-type": 'application/json' },
        data: {
            "username": this.data.username,
            "password": this.data.password
        }
    }));
});

When('I send a POST request to the endpoint with invalid password', async function () {
    this.response = (await this.apiContext.post(this.url, {
        headers: { "content-type": 'application/json' },
        data: {
            "username": this.data.username,
            "password": this.data.password
        }
    }));
});

When('I send a POST request to the endpoint with blank username', async function () {
    this.response = (await this.apiContext.post(this.url, {
        headers: { "content-type": 'application/json' },
        data: {
            "username": this.data.username,
            "password": this.data.password
        }
    }));
});