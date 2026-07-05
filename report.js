    const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "reports",
  reportPath: "reports/html",

  metadata: {
    browser: {
      name: "chromium",
      version: "latest"
    },
    device: "Local Machine",
    platform: {
      name: "Windows",
      version: "11"
    }
  },

  reportName: "Playwright Cucumber Automation Report",
  pageTitle: "Automation Execution Report",

  displayDuration: true,
  durationInMS: true,

  openReportInBrowser: true,

  hideMetadata: false,
  hideDuration: false,

  customData: {
    title: "Execution Information",
    data: [
      {
        label: "Project",
        value: "OrangeHRM"
      },
      {
        label: "Executed By",
        value: "Shashikant"
      },
      {
        label: "Framework",
        value: "Playwright + Cucumber + TypeScript"
      }
    ]
  }
});