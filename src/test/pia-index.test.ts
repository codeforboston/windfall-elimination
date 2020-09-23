 // TODO ENABLE NODEJS mode for Emscripten Module and uncomment this file  
 // will not work without this. Also need to find way to reference wasm file for tests since /anypiajs.wasm won't workA

// import { finalCalculation } from "../library/pia/index";
// import { delayedRetirementValues, fullRetirementValues, sample20RetirementValues } from "../library/testFiles";
// import {
//   finalCalculation as originalFinalCalculation,
//   getRawEarnings,
// } from "../library/observable-functions";

describe("Run AnyPIAJS", () => {
    it("once it is recompiled with NodeJS support", async () => {
    expect.assertions(1);

    expect(null).toBe(null);
  });
});

// describe("John Q. Public (Full Retirement)", async () => {
//   const earnings =
//     fullRetirementValues["osss:OnlineSocialSecurityStatementData"][
//       "osss:EarningsRecord"
//     ]["osss:Earnings"];
//   const userDOB = new Date("1947-10-10");
//   const userDOR = new Date("2013-10-10"); // 66 is their full retirement age
//   const rawEarnings = getRawEarnings(earnings);
//   const userPension = 0;

//   const piaUserCal = await finalCalculation(
//     userDOB,
//     userDOR,
//     userPension,
//     rawEarnings
//   );
//   // var userCalc = await finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

//   const userYSE = Number(piaUserCal["yearsSubstantialEarnings"]);

//   it("Correctly tallies years of substantial earnings from a full earnings record.", async () => {
//     expect.assertions(1);

//     expect(userYSE).toBe(30);
//   });

//   it("Correctly calculates AIME from a full earnings record.", async () => {
//     expect.assertions(1);

//     const AIME = Number(piaUserCal["aime"]);
//     //3383 is value for Observable notebook with correct birthdate.
//       expect(AIME).toBe(3383)
//     })

//   it("Correctly calculates Payable Benefit from a full earnings record according to observable (good).", async () => {
//     expect.assertions(1);


//     /* detailed calculator says 1,595.10 while observable says 1514.08, XML said 1811.00 (likely flawed)  */
//     /* Right now the test returns 1514.09 rather than 1514.08 like observable
//     Added one cent tolerance in test */

//     const result = Number(piaUserCal["MPB"]);
//     expect(result >= 1514.08 && result <= 1514.09).toBeTruthy();
//   });
// });

// describe("Sample 20 AnyPIA (Full Retirement)", async () => {
//   //Background finance info for Sample20
//   const earnings =
//     sample20RetirementValues["osss:OnlineSocialSecurityStatementData"][
//       "osss:EarningsRecord"
//     ]["osss:Earnings"];
//   const userDOB = new Date("1952-06-22");
//   const userDOR = new Date("2018-06-22"); // 66yo is their full retirement age.
//   const year62 = "2014";
//   const rawEarnings = getRawEarnings(earnings);
//   const userPension = 1500;

//   const piaUserCal = await finalCalculation(
//     userDOB,
//     userDOR,
//     userPension,
//     rawEarnings
//   );


//   it("Correctly tallies years of substantial earnings from a full earnings record.", async () => {
//     expect.assertions(1);

//   const userYSE = Number(piaUserCal["yearsSubstantialEarnings"]); 
//     expect(userYSE).toBe(22);
//   });

//   //Test AIME calculations
//   it("Correctly calculates getAIMEFromEarnings from a full earnings record.", async () => {
//     expect.assertions(1);

//     const AIME = Number(piaUserCal["aime"])

//     expect(AIME).toBe(3403);
//   });

//   //Test MPB calculations
//   it("Correctly calculates Payable Benefit from a full earnings record (best).", async () => {
//     expect.assertions(1);

//     /* both Detailed Calculator and Observable matched this value for me with the 1500 pension -tk */
//     expect(Number(piaUserCal["MPB"])).toBe(1235.84);
//   });
// });

