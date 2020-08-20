import { PiaFormat } from "./pia-format";
import { UserProfile, EarningsRecord, EarningsMap } from "../user-state-context";
import { PiaYear, PiaEarnings } from "./pia-types";
import Module from '../anypiajs.mjs'

///////////////////////////////
// Final Calculation Display //
///////////////////////////////

export async function finalCalculation(
  birthDatePicked: string,
  retireDatePicked: string,
  userPension: number,
  earningsObj: EarningsRecord
) {

  //convert all keys and values to int's (keys in js objects always strings)
  const onlyIntsObject = Object.entries(earningsObj)
                            .map(n => n.map(m => parseInt(m+"", 10) ));

  const earningsRecords: EarningsMap = new Map<PiaYear, PiaEarnings>(
    onlyIntsObject
  )

  //const userFullRetireDate = getFullRetirementDate(new Date(birthDatePicked));

  const piaFormat = new PiaFormat('').setBirthDate(new Date(birthDatePicked))
    .setEntitlementDate(new Date(retireDatePicked))
    //set??Pension(userPension)
    .setOasdiEarnings(earningsRecords);
  console.warn("no pension passed yet")
  
  const piaOutput = piaFormat.outputPia();
  console.log(piaOutput)
  /*  const knownGood = `01          06221952
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
95 40 40`; */

  const AnyPIAJS = await new Module();
  const onePIADoc = new AnyPIAJS.PIADoc();

  const consoleOutput = onePIADoc.calculate(piaOutput);

  const resultString = onePIADoc.getResult();
  const resultObj = JSON.parse(resultString);

  //API typos: NoncoveredPosion;PIAAfterWindwfall 
  console.log("results:",consoleOutput, resultObj)
  const calculation = resultObj.Calculation;
  const userProfile: UserProfile = {
    "Standard PIA": calculation.InsuranceAmount,
    "WEP PIA": calculation["PIAAfterWindwfall"] && calculation["PIAAfterWindwfall"].Total,
    "WEP Diff": "" + (calculation.InsuranceAmount - (calculation["PIAAfterWindwfall"] && calculation["PIAAfterWindwfall"].Total)),
    "MPB": calculation.Benefit,
    "yearsSubstantialEarnings": calculation.YearsOfCoverageForWindfall,
    "pensionNonCoveredMonthly": calculation.NoncoveredPosion && calculation.NoncoveredPosion.MonthlyPension,
    "aime": calculation.AIME && calculation.AIME.AME,
    "fullRetireDate": new Date("2040-1-1").toLocaleDateString("en-US")

  }
  console.warn("DUMMY fullRetireDate until it can be added:")
  console.log(userProfile)


  return userProfile;
}