<h1 align="center">
  Test automation for spaces management
</h1>

<p align="left" style="font-size: 1.2rem; color: orange;">
  This framework is made up of the following tools
</p>

```
1. Cypress: Framework used to automate the actions in the browser and locate elements.
2. Mocha: Testing framework that provides a BDD/TDD and easy-to-read syntax. 
3. Node.js: The Runtime environment that allows packaging and manage the dependencies.
4. Allure: Report generator tool that allows generating HTML report of test results.
```

<div align="center">
  <h2><a href="https://docs.cypress.io/guides/getting-started/installing-cypress">
  Documentation about Cypress</a></h2> 
</div>
<hr />

<p align="left" style="font-size: 1.2rem; color: orange;"> Framework Structure </p>

##
The relevant framework files are included in the following folders.

1. test cases and report: Contain all the test cases executed in this project along with the bugs report.
> Note: To see a more readable view, by using VSC, right click on the tab corresponding to each MD file and select "Open preview".
2. fixtures, plugins and support: Contain constants, libs and methods tha support the tests.
3. integration: Contains the test files that encompases the scenarios to be executed.
4. video: Contains video evidence in case something fails.
5. allure-report and allure-results: Contain the inputs and outputs about the test results.
> Note: video and allure folders are  generated after running the test.
##

<p align="left" style="font-size: 1.2rem; color: orange;"> Test coverage, reporting and expected result </p>

- Check files whose names start with "test_cases" within "test cases and report" folder.
- Check the file bugs_report.md to read the findings and find out which failed tests were as expected while running.
- Wait for the tests to finish completely to see the test result report opens automatically in your browser.

<p align="left" style="font-size: 1.2rem; color: orange;"> Requirements to run the test </p>

Open a terminal console and make sure you are in the root path of the project, and run the command below to install dependencies.
   - `npm i`
   - Make sure you have at least java 8 installed, it's required to generate the Allure report.

<p align="left" style="font-size: 1.2rem; color: orange;"> How to run the test </p>

- To run all the tests in headed mode (opening the web browser), so that run one after the other, with no pause, run
   - `npm test`
> Note: After finishing running the test in the web browser, also it's necessary to wait for completion in the terminal console, until the HTML report opens automatically with the test results.

- To run the test coresponding only to the REST API, run
   - `npm run api`

- To run the test by opening the Cypress UI and handle the test run at will, run
   - `npm run cy:open`

- To run the test in headless mode (without opening the web browser), run
   - `npm run cy:headless`

> Note (After running the tests):
- The last 3 options only generate report in terminal console (No HTML report).
- Review the bugs_report.md file in order to compare actual results against it.


For further information about the author, please consult
[Victor Caminero LinkedIn profile](https://www.linkedin.com/in/victor-caminero/)