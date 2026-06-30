import { Given, When, Then } from '@cucumber/cucumber';
import { expect} from '@playwright/test';
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

When('the user searches for lead with last name <lastname>',async function () {
    await this.leadPage.clickLeadLink();
    const data = await getExcelDataByTC('verify_search_and_update_of_existing_update_existing_lead_by_last_name_and_company')
    const originalLastname  = await data.lastname;
    console.log(originalLastname);
    await this.leadPage.findLastName(data.lastname)
    await this.leadPage.clickSearchButton()
})

Then('the lead should be displayed in the search results', async function(){
    const data = await getExcelDataByTC('verify_search_and_update_of_existing_update_existing_lead_by_last_name_and_company')
    const isLastNameAvailableInSearch = await this.leadPage.isLastNameAvailableInSearch(data.actualLastname);
    expect(isLastNameAvailableInSearch).toBe(true);
})

Then('the user opens the lead details',async function(){
    const data = await getExcelDataByTC('verify_search_and_update_of_existing_update_existing_lead_by_last_name_and_company')
    await this.leadPage.clickEditLink(data.actualLastname)
})

Then('the user updates the <lastname> and company name to <company>', async function(){
    await this.leadPage.setLastName("Ciara");
    await this.leadPage.setCompany("VTiger");
    await this.leadPage.clickSave();
})

Then('the updated lastname and company should be displayed', async function(){
    const isLastNameDisplayed = await this.leadPage.isLastNameDisplayed();
    expect(isLastNameDisplayed).toBe(true)

    const isCompanyDisplayed = await this.leadPage.isCompanyDisplayed();
    expect(isCompanyDisplayed).toBe(true)
})