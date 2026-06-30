// browserManager.ts

import {
  chromium,
  firefox,
  Browser,
  BrowserType
} from "@playwright/test";

export class BrowserManager {

    static async getBrowser(): Promise<Browser> {

        const browserName = process.env.BROWSER || "chrome";

        let browserType: BrowserType;

        switch (browserName.toLowerCase()) {

            case "firefox":
                browserType = firefox;
                break;

            case "edge":
                browserType = chromium;
                break;

            default:
                browserType = chromium;
        }

        return await browserType.launch({
            headless: false,

            channel: browserName === "edge"
                ? "msedge"
                : browserName === "chrome"
                ? "chrome"
                : undefined
        });
    }
}