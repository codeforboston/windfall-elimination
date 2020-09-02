import { PiaFormat } from "./pia-format";
import {
  UserProfile,
  EarningsRecord,
  EarningsMap,
} from "../user-state-context";
import { PiaYear, PiaEarnings } from "./pia-types";
import Module from "../anypiajs.mjs"; //remember https://stackoverflow.com/a/63592692/272018

///////////////////////////////
// Final Calculation Display //
///////////////////////////////

const emptyUserProfile: UserProfile = {
  "Standard PIA": "",
  "WEP PIA": "",
  "WEP Diff":
    "",
  MPB: "",
  yearsSubstantialEarnings: 0,
  pensionNonCoveredMonthly: 0,
  aime: 0,
  fullRetireDate: new Date("2040-1-1").toLocaleDateString("en-US"),
}

export async function finalCalculation (
  birthDatePicked: string,
  retireDatePicked: Date,
  userPension: number | null | undefined,
  earningsObj: EarningsRecord | null
) {

  // quit out if earningsObj is null, it is meaningless
  if (earningsObj === null) {
    return emptyUserProfile ; 
  }
  //convert all keys and values to int's (keys in js objects always strings)
  const onlyIntsObject = Object.entries(earningsObj).map((n) =>
    n.map((m) => parseInt(m + "", 10))
  );

  const earningsRecords: EarningsMap = new Map<PiaYear, PiaEarnings>(
    onlyIntsObject
  );

  //const userFullRetireDate = getFullRetirementDate(new Date(birthDatePicked));

  const piaFormat = new PiaFormat("")
    .setBirthDate(new Date(birthDatePicked))
    .setEntitlementDate(new Date(retireDatePicked))
    .setMonthlyNoncoveredPensionAmount(userPension)
    .setOasdiEarnings(earningsRecords);

  const piaOutput = piaFormat.outputPia();
  console.log(piaOutput);
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

  const AnyPIAJS = await new Module();
  const onePIADoc = new AnyPIAJS.PIADoc();

  //If you forget to send a newline at the end, AnyPIAJS seems to ignore the last line.
  const consoleOutput = onePIADoc.calculate(piaOutput + "\n");

  const resultString = onePIADoc.getResult();
  const resultObj = JSON.parse(resultString);
  const knownGoodPIADoc = new AnyPIAJS.PIADoc();
  const consoleOutputKnownGood = knownGoodPIADoc.calculate(knownGood + "\n");

  const resultStringKnownGood = knownGoodPIADoc.getResult();
  const resultObjKnownGood = JSON.parse(resultStringKnownGood);

  //API typos: NoncoveredPosion;PIAAfterWindwfall
  console.log("results:", consoleOutput, resultObj);
  console.error("knownGood:", consoleOutputKnownGood, resultObjKnownGood);
  const calculation = resultObj.Calculation;
  const userProfile: UserProfile = {
    "Standard PIA": calculation.InsuranceAmount,
    "WEP PIA":
      calculation["PIAAfterWindwfall"] &&
      calculation["PIAAfterWindwfall"].Total,
    "WEP Diff":
      "" +
      (calculation.InsuranceAmount -
        (calculation["PIAAfterWindwfall"] &&
          calculation["PIAAfterWindwfall"].Total)),
    MPB: calculation.Benefit,
    yearsSubstantialEarnings: calculation.YearsOfCoverageForWindfall,
    pensionNonCoveredMonthly:
      calculation.NoncoveredPosion &&
      calculation.NoncoveredPosion.MonthlyPension,
    aime: calculation.AIME && calculation.AIME.AME,
    fullRetireDate: new Date("2040-1-1").toLocaleDateString("en-US"),
  };
  console.warn("DUMMY fullRetireDate until it can be added:");
  console.log(userProfile);

  return userProfile;
}
