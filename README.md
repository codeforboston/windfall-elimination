## Windfall Elimination Provision, USA Social Security

This is a tool to help retirees affected by the Social Security Windfall Elimination Provision (WEP). WEP mostly affects public servants like teachers and firefighters, and can mean a reduction in SSA benefits of up to 50%. This tool will help affected workers, and anyone with a social security card, better plan retirement and self-advocate with the Social Security administration.

## What is inside?
* [SSACalculator.org App](https://ssacalculator.org) for best user experience on tablets, ideally pursued with a case worker.
* Official MySocialSecurity.org earnings record PDF scraping using `PDF.js` (and official XML format parsing)
* Typescript type checking to ensure matching types between replicated SSA algorithms and Gatsby/React.
* Tests to compare output of known [documented](http://thadk.net/anypiamac-docs/html/) [examples](http://thadk.net/anypiamac-docs/) to the Microsoft Windows-based Social Security Detailed Calculator.
* [AnyPIAJS and PiaFormat.ts](https://github.com/codeforboston/windfall-elimination/tree/develop/src/library/pia) allowing use of the (originally Windows-based) Social Security [Detailed Calculator](https://ssa.gov/OACT/anypia/anypia.html) from within this app, without any sending data away from the user's browser.
* [Observable WEP calculation Prototype](https://observablehq.com/@thadk/windfall-awareness-notebook-prototype) - The earlier, alpha version of the calculator's math: from Feb 2019.

Join the Slack channel [#windfall-elimination](https://www.codeforboston.org/) for more information.

## Installation

Use git clone command with SSH.
Run `npm install && npm start` to launch the project.

- To turn on feature toggle that enables features.  
   - In Windows PowerShell(not cmd), run `$env:<feature keyword> = 'true'; npm start` 
   - In Mac and Linux, run `<feature keyword>=true npm start`

- Feature keyword list
   - `GATSBY_SHOW_FUTURE_EARNINGS_PAGE` : show future earnings page in left side bar and main page
   - `GATSBY_SCROLL_WHEN_FINISH` : scroll down when finish each step in prescreen-1b
