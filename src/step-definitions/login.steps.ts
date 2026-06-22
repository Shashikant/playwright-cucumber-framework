import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';

import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

Before(async function () {
  this.browser = await chromium.launch({
    headless: false
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.browser.close();
});

Given('the user is on the login page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto('http://localhost:100');
 
});

When('the user enters valid username and password', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.locator('//input[@name="user_name"]').fill("admin");
  await this.page.locator('//input[@name="user_password"]').fill("admin");
  
});

When('clicks the login button', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.locator('//input[@name="Login"]').click();
  
});

Then('the user should be redirected to the home page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.waitForURL('http://localhost:100/index.php?action=index&module=Home');
  await expect(this.page.locator('//a[text()="Home"]').nth(0)).toBeVisible();  
});

When('the user enters invalid username or password', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.locator('//input[@name="user_name"]').fill("admin1");
  await this.page.locator('//input[@name="user_password"]').fill("password1");
  
});

Then('an error message should be displayed indicating invalid credentials', async function () {
  // Write code here that turns the phrase above into concrete actions
  await expect(
  this.page.locator(
    '//td[contains(text(),"You must specify a valid username and password.")]'
  )
).toBeVisible();
});
