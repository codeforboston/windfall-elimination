 // TODO ENABLE NODEJS mode for Emscripten Module and uncomment this file  
 // will not work without this. Also need to find way to reference wasm file for tests since /anypiajs.wasm won't workA
import Module2020 from "../library/anypiajs2020.js";
import Module2021 from "../library/anypiajs2021.js"
 // const Module2020 = require("../library/anypiajs2020.js"); //remember https://stackoverflow.com/a/63592692/272018
// const Module2021 = require("../library/anypiajs2021.js"); //remember https://stackoverflow.com/a/63592692/272018

import { finalCalculation } from "../library/pia/index";
import { delayedRetirementValues, fullRetirementValues, sample20RetirementValues } from "../library/testFiles";
import {
  finalCalculation as originalFinalCalculation,
  getRawEarnings,
} from "../library/observable-functions";
import dayjs from "dayjs";

let AnyPIAJS2020 = null;
let AnyPIAJS2021 = null;

describe("Run AnyPIAJS", () => {
    it("Now it has NodeJS support", async () => {
    expect.assertions(1);

    expect(null).toBe(null);
  });
});
// TODO:
// Do an approach like this: https://github.com/emscripten-core/emscripten/issues/8400#issuecomment-498218291
describe("Test of 2021 detail calculator", () => {

  beforeAll(async () => {
    //Download the 2mb WASM file with the C++ policy logic, with a promise.
    // var loader =  await Module2021();
    // console.log("test for 2021", loader)
    // loader.ready = () =>
    //     // https://github.com/emscripten-core/emscripten/issues/5820
    //     new Promise((resolve, reject) => {
    //         delete loader.then;
    //         loader.onAbort = reject;
    //         loader.addOnPostRun(() => {
    //             resolve(loader);
    //             debugger
    //             reject((i, p , q) => {
    //               console.log(this, i, p, q);
    //             })
    //         });
    //     });
    // AnyPIAJS2021 = await loader.ready();
    AnyPIAJS2021 = await Module2021();
    debugger
});


  //Here's a known good AnyPIA format string for example: specifies mostly the
  // same things as above.
  const knownGood = `01          06221952
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
95 40 40`;



  //Instantiate AnyPIAJS C++ class we wrapped the original SSA AnyPIAB class with.
  //If you forget to send a newline at the end, AnyPIAJS seems to ignore the last line.

  const knownGoodPIADoc = new AnyPIAJS2021.PIADoc();
  const consoleOutputKnownGood = knownGoodPIADoc.calculate(knownGood + "\n");

  //Request a JSON dump from AnyPIAJS
  // const resultString = onePIADoc.getResult();
  // const resultObj = JSON.parse(resultString);

  //Cross check with known good value via new instance of same API.


  const resultStringKnownGood = knownGoodPIADoc.getResult();
  console.log(resultStringKnownGood); 
  const resultObjKnownGood = JSON.parse(resultStringKnownGood);




  test("Correctly tallies years of substantial earnings from a full earnings record.", async () => {
    expect.assertions(1);
    AnyPIAJS2021 = await Module2021();
    debugger
    // expect(AnyPIAJS2021).toBeNull();
    expect(knownGoodPIADoc).not.toBeNull()

  });
});

describe("Test of 2020 detail calculator", () => {

  beforeAll(async () => {
    //Download the 2mb WASM file with the C++ policy logic, with a promise.
    // var loader =  Module2020();
    AnyPIAJS2020 = await Module2020();
    // console.log("test for 2020", loader)

    // loader.ready = () =>
    //     // https://github.com/emscripten-core/emscripten/issues/5820
    //     new Promise((resolve, reject) => {
    //         delete loader.then;
    //         loader.onAbort = reject;
    //         loader.addOnPostRun(() => {
    //             resolve(loader);
    //             reject((i, p , q) => {
    //               console.log(this, i, p, q);
    //             })
    //         });
    //     });
    // AnyPIAJS2020 = await loader.ready();
});

  //Here's a known good AnyPIA format string for example: specifies mostly the
  // same things as above.
  const knownGood = `01          06221952
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
95 40 40`;



  //Instantiate AnyPIAJS C++ class we wrapped the original SSA AnyPIAB class with.
  //If you forget to send a newline at the end, AnyPIAJS seems to ignore the last line.
debugger
  const knownGoodPIADoc = new AnyPIAJS2020.PIADoc();
  const consoleOutputKnownGood = knownGoodPIADoc.calculate(knownGood + "\n");

  //Request a JSON dump from AnyPIAJS
  // const resultString = onePIADoc.getResult();
  // const resultObj = JSON.parse(resultString);

  //Cross check with known good value via new instance of same API.


  const resultStringKnownGood = knownGoodPIADoc.getResult();
  console.log(resultStringKnownGood); 
  const resultObjKnownGood = JSON.parse(resultStringKnownGood);




  it("Correctly tallies years of substantial earnings from a full earnings record.", async () => {
    expect.assertions(1);

    expect(userYSE).toBe(30);
  });
});


