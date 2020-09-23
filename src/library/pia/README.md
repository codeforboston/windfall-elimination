# PiaFormat and AnyPIAJS documentation

- See: https://www.ssa.gov/OACT/anypia/anypia.html
- and: https://github.com/codeforboston/anypia-js
- [General Introduction](./README-nontechnical.md) and [main project details](../../)

Written and maintained since the early 2000s, the official Social Security Administration's **Detailed Calculator (AnyPIA)** is a comprehensive benefit calculator which is designed to compute historical benefits as well as estimate future benefits. 

For short, it is known as `AnyPIA.exe` (Windows) and `AnyPIAb.exe` (command line console app).

The Windfall project's own calculator could not determine future benefit for people more than a year or so away from retirement eligible age—62 years old. That calculation requires synthesizing predictions from the annual Social Security Trustee report, locating details such as: anticipated economic trends, changes in the trust fund, and adjustments in cost of living.  

Rather than maintain these details, we decided our efforts were best spent on extending the existing AnyPIA Windows tool to work as part of this browser-based tool as well. For this, 6 volunteers from Code for Boston and Congressman Seth Moulton's caseworkers created [AnyPIAJS](https://github.com/codeforboston/anypia-js) in early/mid 2020 ([Alex J](https://github.com/alexjcode/), [Alex M](https://github.com/mrpippy), [Anne Meeker](https://www.linkedin.com/in/anne-meeker-60837b123), [Thad K](https://github.com/thadk), [Paavan B](https://github.com/paavanb), [Tony Dean](https://github.com/tdean1991/), and [Brendan S](https://github.com/mrpippy)).

<p><img alt="Screenshot of the Windows version of AnyPIA" src="https://user-images.githubusercontent.com/283343/82394467-1d04ca80-9a17-11ea-841f-fd651352024a.png" width="400" /></p>

_Screenshot of the Linux/Windows `anypiab` console (left) and desktop Mac/Windows versions of AnyPIA (right). Output is more specific in the Mac/Windows version at right._

The [My SocialSecurity.gov](https://www.ssa.gov/myaccount/) website allows Social Security card holders to download all their earnings records at once, as a PDF or XML file. The information is sourced from the card holder's tax filings. One challenge for card holders who want to plan ahead for their retirement is that the current AnyPIA Detailed Calculator can only load a [text file format](http://thadk.net/anypiamac-docs/html/General/structure.html) called `.pia`, but it cannot load either the XML or the PDF file. This means that the best tools for planners are out of sync with each other. Basically, with existing official tools, retirees always have to track down and manually type in their entire career earnings.

To solve this problem Code for Boston volunteers and Congressman Seth Moulton's office case workers built AnyPIAJS. It can do the best calculations and take the card holders' most convenient data, so that they can get the most accurate benefits calculation. We also provide other helpful contextual information from caseworkers's interviews with 300 constituents.  

This technical document is broken into the two parts used to support the social security detailed calculator: 
1. the text manipulator for text in the `.pia` format which allows us to pass in parsed earnings read from XML or PDF from SSA.gov, and 
2. the C++ actual policy logic which opens the text file and provides calculations.

## 1. PiaFormat.ts text utility

- Implemented by [Code for Boston](https://codeforboston.org) in this folder.
- Written in TypeScript to read (deserialize) and write (serialize) the AnyPIA multi-line string format specified in documentation
- Based on http://thadk.net/anypiamac-docs/html/General/structure.html copied from SSA AnyPIA package
- only a subset of the possible ~97 lines are implemented, but class is designed to support the whole format.
- We selected earnings, personal details, pension, and entitlement date as first lines implemented
- A few less important lines are stubbed so can be deserialized and re-serialized
- The next lines to support will be around future calculations for https://github.com/codeforboston/windfall-elimination/issues/190
- This class does not interact with the C++ policy logic. That needs glue code in `index.ts` as shown in the next major section.

### Example of deserializing and re-serializing AnyPIA format string

This file is the [sample20.pia (details)](http://thadk.net/anypiamac-docs/html/Samples/sample_22.html) provided with official AnyPIA app:

```
const piaFormatExample = new piaFormat(`01          06221952
031072014
0619662010
12   1500.00062010
16Sample 20
20000000000000000000000000000000000000011111110
22     800.00    4100.00    4000.00    3700.00    4600.00    7300.00    9000.00   10800.00   12000.00   11700.00
23   14100.00    6400.00   11600.00    5000.00       0.00       0.00       0.00       0.00       0.00       0.00
24       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00
25       0.00       0.00       0.00       0.00       0.00       0.00   20000.00  104400.00  105480.00  108000.00
26  113040.00  117000.00  122400.00  128160.00   35000.00
95 40 40`)
const piaOutput = piaFormatExample.outputPIA();
```

[outputs the same string]

### Example of starting with blank AnyPIA file and specifying details

Generate the AnyPIA format string like the known good one but based on the personalized user input

```
    const piaBlankFormatExample = new PiaFormat("")
    .setBirthDate(new Date(birthDatePicked))
    .setEntitlementDate(new Date(retireDatePicked))
    .setMonthlyNoncoveredPensionAmount(userPension)
    .setOasdiEarnings(earningsRecords);
    const piaOutput = piaBlankFormatExample.outputPIA();
```

[outputs similar to format shown above starting with `01`]

## 2. AnyPIAJS Policy Logic and Detailed Social Security Calculator

- Based on public domain code at: https://www.ssa.gov/OACT/anypia/anypia.html
- Implemented at: https://github.com/codeforboston/anypia-js
- Conversion to Javascript from Windows, using [Emscripten](https://emscripten.org/) tool.
- `AnyPIAJS` is a C++ class wrapper which is exported using Emscripten, around the original `anypiab` console API. The wrapper should continue to support future AnyPIA releases by the SSA without major changes.
- `AnyPIAJS` offers a new results API that replicates many of the features of the Windows/Mac output with JSON structure.
- The wrapper should be compatible with new annual versions of AnyPIA.

![Using AnyPIAJS in the javascript console](https://user-images.githubusercontent.com/1923962/89358966-b183de00-d692-11ea-87f8-4018b4e5bbff.png)
_Using AnyPIAJS in the javascript console_

The C++ policy logic is interpreted into a JavaScript module using the Emscripten tool from the latest SSA.gov open source C++ AnyPIA code base. It can then be brought in to a React or other app using an ES6 module.

`import Module from "../anypiajs.mjs";`

It requires a 2mb wasm file in the folder specified in an early line of the mjs file. WASM is Web Assembly file in binary and represents the same Social Security policy logic as the executable built from the C++ would have in Windows.

Fetch the WASM file with the C++ policy logic, with a promise.

`const AnyPIAJS = await new Module();`

Instantiate AnyPIAJS C++ class we wrapped the original SSA AnyPIAB class with.

`const onePIADoc = new AnyPIAJS.PIADoc();`

If you forget to send a newline at the end, AnyPIAJS seems to ignore the last line.

`const consoleOutput = onePIADoc.calculate(piaOutput + "\n");`

Request a JSON dump from AnyPIAJS

`const resultString = onePIADoc.getResult(); const resultObj = JSON.parse(resultString);`
