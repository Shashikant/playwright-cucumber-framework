import { Page } from "@playwright/test";

export class LeadPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    loc_tb_lastname = '//input[@name="lastname"]';
    loc_tb_company = '//input[@name="company"]';
    loc_btn_save = '(//input[@name="button"])[1]';
    loc_txt_lastName = '//td[contains(text(),"Last Name")]/following::td[1]';
    loc_txt_company = '//td[contains(text(),"Company")]/following::td[1]';
    loc_btn_search = '//input[@title="Search [Alt+Q]"]';
    loc_lnk_delete = '//tr[@class="oddListRow"]/td/a[text()="del"]';
    loc_lead_name = '//td[contains(text(),"Lead:")]';
    loc_lnk_lead = '';

    async clickLeadLink() {
        await this.page.getByRole('link', { name: 'Leads', exact: true }).first().click();
    }
    async createlead(lastname: string, company: string): Promise<void> {
        await this.setLastName(lastname);
        await this.setCompany(company);
        await this.clickSave();
    }

    async setLastName(lastname: string): Promise<void> {
        await this.page.fill(this.loc_tb_lastname, lastname);
    }

    async setCompany(company: string): Promise<void> {
        await this.page.fill(this.loc_tb_company, company);
    }

    async clickSave(): Promise<void> {
        await this.page.click(this.loc_btn_save);
    }

    async isLastNameDisplayed(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');
        return this.page.isVisible(this.loc_txt_lastName);
    }

    async isCompanyDisplayed(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');
        return this.page.isVisible(this.loc_txt_company);
    }

    async isLeadDisplayed(): Promise<boolean> {
        const result = await this.page.locator(this.loc_lead_name).textContent();
        console.log(result);
        return await this.page.locator(this.loc_lead_name).isVisible();

    }
    async findLastName(lastname: string) {
        await this.page.locator(this.loc_tb_lastname).nth(1).fill(lastname)
    }

    async isLastNameAvailableInSearch(lastname: string): Promise<boolean | null> {
        //await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('networkidle');
        const rows = await this.page.locator('//table[@class="FormBorder"]/tbody/tr').count();
        console.log("Total Rows =", rows);
        for (let i = 5; i <= rows; i++) {
            const actualLastname = await this.page.locator(`//table[@class="FormBorder"]/tbody/tr[${i}]/td[4]`).textContent();
            // console.log(actualLastname);
            // console.log(`Expected: ${lastname}`);
            // console.log(`Actual Row ${i}: ${actualLastname}`);
            if (actualLastname?.trim() === lastname) {
                return true;
            }
            break;
        }
        return false;
    }

    async clickEditLink(lastname: string) {
        await this.page.waitForLoadState('networkidle');
        const rows = await this.page.locator('//table[@class="FormBorder"]/tbody/tr').count();

        for (let i = 5; i <= rows; i++) {
            const actualLastname = await this.page.locator(`//table[@class="FormBorder"]/tbody/tr[${i}]/td[4]`).textContent();
            console.log(`Expected: ${lastname}`);
            console.log(`Actual Row ${i}: ${actualLastname}`);
            if (actualLastname?.trim() === lastname) {
                await this.page.getByRole('link', { name: 'edit' }).click();
            }
            break;
        }
    }

    async clickSearchButton() {
        await this.page.click(this.loc_btn_search);
    }

    async clickDelete() {
        await this.page.locator(this.loc_lnk_delete).nth(0).click();
    }

    async handleVerifyDialogue(): Promise<string> {

        return new Promise((resolve) => {
            this.page.once('dialog', async dialog => {
                console.log(dialog.message());
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        })
    }

    async handleDismissConfirm(): Promise<string> {

        return new Promise((resolve) => {
            this.page.once('dialog', async dialog => {
                console.log(dialog.message());
                const message = dialog.message();
                await dialog.dismiss();
                resolve(message);
            });
        })
    }

    async handleAcceptConfirm(): Promise<string> {

        return new Promise((resolve) => {
            this.page.once('dialog', async dialog => {
                console.log(dialog.message());
                const message = dialog.message();
                await dialog.accept();
                resolve(message);
            });
        })
    }

}