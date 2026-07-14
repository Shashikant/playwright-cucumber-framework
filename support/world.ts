import { Browser, chromium, expect, Page, APIRequestContext, APIResponse } from '@playwright/test';
import { BrowserManager } from '../utilities/browserManager';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';

import { Before, After, BeforeAll, Status } from '@cucumber/cucumber';
import { LeadPage } from '../pages/leadPage';
import { loadExcel, getExcelDataByTC } from '../utilities/excelReader';

let browser: Browser;
let page: Page;
let context: any;

let loginPage: LoginPage;
let homePage: HomePage;
let leadPage: LeadPage;

let TCName: string;
let data: any;

let response: APIResponse;
let url: string;
let apiContext: APIRequestContext;
let token: string;

BeforeAll(async function () {
    loadExcel('src/testdata/data.xlsx');

});

Before(async function (scenario) {

    this.TCName = scenario.pickle.name;
    const tags = scenario.pickle.tags.map(t => t.name);
    if (tags.includes("@auth")) {
        this.sheetName = "Auth";
    }
    else if (tags.includes("@bookingapi")) {
        this.sheetName = "Booking";
    }
    else if (tags.includes("@lead" ) || tags.includes("@all")) {
        this.sheetName = "UI";
    }

    try {
        this.data = await getExcelDataByTC(this.TCName, this.sheetName);
    } catch (e) {
        console.error(e);
    }

    console.log("Scenario Name:", scenario.pickle.name);
    console.log("Scenario Tags:", tags);

    this.browser = await BrowserManager.getBrowser();

    this.context = await this.browser.newContext();
      
    this.page = await this.context.newPage();
     // Start tracing
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    await this.page.goto('http://localhost:100');

    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.leadPage = new LeadPage(this.page);

});

After(async function ({ result }) {

    if (result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(screenshot, "image/png");
    }
    
    
    await this.context.tracing.stop({ path: `trace-${this.TCname}.zip` });
    await this.page.close();
    await this.context.close();
    await this.browser.close();

});