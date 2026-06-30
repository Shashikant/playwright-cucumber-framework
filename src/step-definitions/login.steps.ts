import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is on the login page', function () {
  // Write code here that turns the phrase above into concrete actions
  
});

When('the user logs in with valid username and password', async function () {
  // Write code here that turns the phrase above into concrete actions
  
  await this.loginPage.login("admin", "admin");

});

Then('the user should be redirected to the home page', async function () {

  await this.page.waitForURL('http://localhost:100/index.php?action=index&module=Home');
  await expect(this.page.locator('//a[text()="Home"]').first()).toBeVisible();

});

When('the user logs in with invalid username or password', async function () {
  
  await this.loginPage.login("admin", "admi1223");

});

Then('an error message should be displayed indicating invalid credentials', async function () {
  await expect(
    this.page.locator(
      '//td[contains(text(),"You must specify a valid username and password.")]'
    )
  ).toBeVisible();
});

When('the user logs in with username {string} and password {string}', async function (username: string, password: string) {
  
  await this.loginPage.login(username, password);
});

Then('login result should be {string}', async function (result: string) {
  await expect(this.page).toHaveURL(new RegExp(`.*${result}.*`));
});