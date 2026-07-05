module.exports = {
  default: {
    require: [
      "src/step-definitions/**/*.ts",
      "src/hooks/**/*.ts",
      'support/**/*.ts',
    ],
    paths: [
      'features/**/*.feature'
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],
    publishQuiet: true
  }
};