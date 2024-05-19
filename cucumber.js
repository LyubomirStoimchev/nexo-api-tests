export default {
  format: ["html:./reports/cucumber-report.html"],
  import: ["@babel/register", "./step_definitions/*.js", "./support/*.js"],
};
