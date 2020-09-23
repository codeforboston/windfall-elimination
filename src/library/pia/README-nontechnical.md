# AnyPIA-JS subproject of Windfall Awareness

- See: https://www.ssa.gov/OACT/anypia/anypia.html
- and: https://github.com/codeforboston/anypia-js repository
- [Technical details](./README.md) and [main project details](../../)

Written and maintained since the early 2000s, the official Social Security Administration's **Detailed Calculator (AnyPIA)** is a comprehensive benefit calculator which is designed to compute historical benefits as well as estimate future benefits. 

For short, it is known as `AnyPIA.exe` (Windows) and `AnyPIAb.exe` (command line app).

The Windfall project's own calculator could not determine future benefit for people more than a year or so away from retirement eligible age—62 years old. That calculation requires synthesizing predictions from the annual Social Security Trustee report, locating details such as: anticipated economic trends, changes in the trust fund, and adjustments in cost of living.  

Rather than maintain these details, we decided our efforts were best spent on extending the existing AnyPIA Windows tool to work as part of this browser-based tool as well. For this, 6 volunteers from Code for Boston and Congressman Seth Moulton's caseworkers created [AnyPIAJS](https://github.com/codeforboston/anypia-js) in early/mid 2020 ([Alex J](https://github.com/alexjcode/), [Alex M](https://github.com/mrpippy), [Anne Meeker](https://www.linkedin.com/in/anne-meeker-60837b123), [Thad K](https://github.com/thadk), [Paavan B](https://github.com/paavanb), [Tony Dean](https://github.com/tdean1991/), and [Brendan S](https://github.com/mrpippy)).

<p><img alt="Screenshot of the Windows version of AnyPIA" src="https://user-images.githubusercontent.com/283343/94048036-e8c46080-fda0-11ea-907b-2a3f295a2976.png" height="300" /></p>

_Screenshot of original desktop Windows version of AnyPIA._

The [My SocialSecurity.gov](https://www.ssa.gov/myaccount/) website allows Social Security card holders to download all their earnings records at once, as a PDF or XML file. The information is sourced from the card holder's tax filings. One challenge for card holders who want to plan ahead for their retirement is that the current AnyPIA Detailed Calculator can only load a [text file format](http://thadk.net/anypiamac-docs/html/General/structure.html) called `.pia`, but it cannot load either the XML or the PDF file. This means that the best tools for planners are out of sync with each other. Basically, with existing official tools, retirees always have to track down and manually type in their entire career earnings.

To solve this problem Code for Boston volunteers and Congressman Seth Moulton's office case workers built AnyPIAJS. It can do the best calculations and take the card holders' most convenient data, so that they can get the most accurate benefits calculation. We also provide other helpful contextual information from caseworkers's interviews with 300 constituents.  

<img width="477" src="https://user-images.githubusercontent.com/283343/94049006-52913a00-fda2-11ea-8060-5fdbfaf2a077.png" alt="Screenshot from ssacalculator.org: Which calculator would you like to see results of?"/>

## Browser-based Policy Logic: AnyPIAJS extends the AnyPIA Detailed Social Security Calculator

This is a utility that reads the data files provided by the My SSA.gov site and allows the user to edit them with their situation. Its output can be passed into the official detailed SSA Calculator (`AnyPIAJS`) which we extended to work in the browser.

- Based on public domain open source code at: https://www.ssa.gov/OACT/anypia/anypia.html
- Half is implemented at: https://github.com/codeforboston/anypia-js
- Conversion to Javascript from Windows.
- Implemented by [Code for Boston](https://codeforboston.org) in this folder.
- Written in TypeScript to read (deserialize) and write (serialize) the AnyPIA text file format specified in documentation
- Based on http://thadk.net/anypiamac-docs/html/General/structure.html copied from SSA AnyPIA package
- Not all the data in the AnyPIA format is considered in the SSA calculation.
- We selected earnings, personal details, pension, and entitlement date as first lines implemented
- A few less important lines are stubbed so can be deserialized and re-serialized
- The next lines to support will be around future calculations for https://github.com/codeforboston/windfall-elimination/issues/190
- This utility does not interact with the policy logic. 