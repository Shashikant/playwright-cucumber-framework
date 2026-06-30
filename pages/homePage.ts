import { Page, expect } from "@playwright/test";
import { exec } from "child_process";

export class HomePage {
    page:Page;
    
    constructor(page:Page)
    {
        this.page = page;
    }

    loc_lnk_logout = '//a[text()="Logout"]';
    loc_lnk_newLead = '//a[text()="New Lead"]';
    loc_lnk_Leads = '(//a[text()="Leads"])[1]';
    loc_welcome_msg = "//strong[contains(normalize-space(),'Welcome admin')]";
    loc_lnk_showmenu = "a#showSubMenu";
    loc_lnk_myaccount = "//a[text()='My Account']";
    loc_lnk_newvendor = "//a[text()='New Vendor']";
    loc_btn_customise ='//input[@name="Customise"]';
    loc_lnk1 = '//td[@id="cl2"]';
    loc_lnk2 = '//td[@id="cl5"]';
    loc_txt_vendor = "//td[text()='Vendor Name:']";

    async clickLogout ():Promise<void>
    {
        await this.page.click(this.loc_lnk_logout);
    }
    
    async clickNewLead():Promise<void>
    {
        await this.page.click(this.loc_lnk_newLead);
    }

    async clickLeads():Promise<void>
    {
        await this.page.click(this.loc_lnk_Leads);
    }

    async isWelcomeMsgDisplayed():Promise<boolean>
    {
        return await this.page.isVisible(this.loc_welcome_msg);
    }

    async clickMyAccount()
    {
        await this.page.click(this.loc_lnk_myaccount);
    }

    async mouseHover():Promise<void>
    {
        const menu = this.page.locator(this.loc_lnk_showmenu);
        await menu.waitFor({state:"visible"});
        //console.log(`${menu} Element found`);
        await menu.hover();
    }

    async clickNewVendor()
    {
        let vendor = this.page.locator(this.loc_lnk_newvendor)
        //console.log(`${vendor} Element found`);
        await expect(vendor).toBeVisible();
        await expect(vendor).toBeEnabled();
        await this.page.click(this.loc_lnk_newvendor); 
    }

    async isNewVendorPageDisplayed():Promise<boolean|null>
    {
        let vendordetails = this.page.locator(this.loc_txt_vendor)
        //console.log(`${vendordetails} Element found`);
        await vendordetails.waitFor({state:"visible"});
        return await this.page.isVisible(this.loc_txt_vendor);
    }
    async clickCustomise()
    {
        await this.page.click(this.loc_btn_customise);
    }

    async dragDrop()
    {
        await this.page.dragAndDrop(this.loc_lnk1,this.loc_lnk2);
    }

    async validateDragandDrop():Promise<string|null>
    {
        return await this.page.locator(this.loc_lnk2).textContent();
    }

}