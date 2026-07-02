import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getExcelDataByTC } from '../../utilities/excelReader';



When('the user clicks on new lead link it navigates to new lead page', async function () {

    await this.homePage.clickNewLead();
})

When('enters lastname and company name and clicks on save button', async function () {
    await this.leadPage.createlead('Ajay', 'VTiger')
})

Then('lead gets created successfully', async function () {
    const isLeadDisplayed = await this.leadPage.isLeadDisplayed()

    expect(isLeadDisplayed).toBe(true);
})

When('the user searches for lead with last name <lastname>', async function () {
    await this.leadPage.clickLeadLink();
    const originalLastname = await this.data.lastname;
    console.log(originalLastname);
    await this.leadPage.findLastName(this.data.lastname)
    await this.leadPage.clickSearchButton()
})

Then('the lead should be displayed in the search results', async function () {
    const isLastNameAvailableInSearch = await this.leadPage.isLastNameAvailableInSearch(this.data.fullname);
    expect(isLastNameAvailableInSearch).toBe(true);
})

Then('the user opens the lead details', async function () {
    await this.leadPage.clickEditLink(this.data.fullname)
})

Then('the user updates the <lastname> and company name to <company>', async function () {
    await this.leadPage.setLastName("Ciara");
    await this.leadPage.setCompany("VTiger");
    await this.leadPage.clickSave();
})

Then('the updated lastname and company should be displayed', async function () {
    const isLastNameDisplayed = await this.leadPage.isLastNameDisplayed();
    expect(isLastNameDisplayed).toBe(true)

    const isCompanyDisplayed = await this.leadPage.isCompanyDisplayed();
    expect(isCompanyDisplayed).toBe(true)
})

When('the user searches for existing lead with last name', async function () {
    await this.leadPage.clickLeadLink();
    await this.leadPage.findLastName(this.data.lastname)
    await this.leadPage.clickSearchButton()

})

Then('matching leads should be displayed', async function () {

    const isLastNameAvailableInSearch = await this.leadPage.isLastNameAvailableInSearch(this.data.fullname);
    expect(isLastNameAvailableInSearch).toBe(true);
})

When('the user deletes the first matching lead', async function () {
    console.log("Step 1");
    const dialogPromise = this.leadPage.handleAcceptConfirm();
    await this.leadPage.clickDelete(this.data.fullname);
    await dialogPromise;
    console.log("Step 4");

})

Then('the lead should not appear in the search results', async function () {
    await this.leadPage.findFirstname(this.data.firstname);
    await this.leadPage.findLastName(this.data.lastname);
    await this.leadPage.findCompany(this.data.company);
    await this.leadPage.clickSearchButton();
    const isLeadDeleted = await this.leadPage.isLeadDeleted();
    expect(isLeadDeleted).toBe(true);
})