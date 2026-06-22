module.exports = {
  default: {
    require: [
      "src/step-definitions/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ]
  }
};