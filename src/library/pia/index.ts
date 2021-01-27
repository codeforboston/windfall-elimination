import { PiaFormat } from "./pia-format";
import {
  UserProfile,
  EarningsRecord,
  EarningsMap,
  FutureAwiPredictionEnum,
} from "../user-state-context";
import {
  PiaYear,
  PiaEarnings,
  PiaTypeOfWageIncreaseAssumption,
  PiaTypeOfProjections,
  PiaTypeOfBenefitIncreaseAssumption,
  PiaTypeOfMaxWageBaseProjection,
  PiaFloat,
} from "./pia-types";
import dayjs from "dayjs";

import Module from "../anypiajs.mjs"; //remember https://stackoverflow.com/a/63592692/272018
import { bendpoints } from "src/static/json";
// The above ES6 module is built from SSA.gov open source C++ AnyPIA by
// https://github.com/codeforboston/anypia-js and requires the wasm file too.

///////////////////////////////
// Final Calculation Display //
///////////////////////////////

const emptyUserProfile: UserProfile = {
  "Standard PIA": "",
  "WEP PIA": "",
  "WEP Diff": "",
  MPB: "",
  yearsSubstantialEarnings: 0,
  pensionNonCoveredMonthly: 0,
  aime: 0,
  fullRetireDate: new Date("2040-1-1").toLocaleDateString("en-US"),
  calculatorType: "blank",
};

export async function finalCalculation(
  birthDatePicked: string,
  retireDatePicked: Date,
  userPension: number | null | undefined,
  earningsObj: EarningsRecord | null,
  expectedLastEarningYear: number | null,
  awiTrendOrManualPrediction: FutureAwiPredictionEnum | null,
  awiTrendSelection: PiaTypeOfWageIncreaseAssumption | null,
  expectedPercentageWageIncrease: PiaFloat | null
) {
  // quit out if earningsObj is null
  if (earningsObj === null) {
    return emptyUserProfile;
  }

  //convert all keys and values to int's (keys in js objects always strings)
  const onlyIntsObject = Object.entries(earningsObj).map((n) =>
    n.map((m) => parseInt(m + "", 10))
  );

  const earningsRecords: EarningsMap = new Map<PiaYear, PiaEarnings>(
    onlyIntsObject
  );

  function mapMap(
    map: EarningsMap,
    fn: (v: PiaEarnings | "-1", k: PiaYear, map: EarningsMap) => any
  ) {
    return new Map(
      Array.from(map, ([key, value]) => [key.valueOf(), fn(value, key, map)])
    );
  }

  //todo

  const mapOasdiEarnings = mapMap(earningsRecords, (v, k) =>
    (v && v === -1) || v === "-1" ? 0 : v
  );
  const mapFirstEarningYear = Math.min(...Array.from(mapOasdiEarnings.keys()));
  const mapLastEarningYear = Math.max(...Array.from(mapOasdiEarnings.keys()));

  /* TODO: we know from observing AnyPIA that the "Assumptions..."
   menu appears when date of entitlement aka retirement month/year is after the current month.
  */
  const weNeedAssumptions = dayjs().diff(dayjs(birthDatePicked), "year") < 70;

  // Generate the AnyPIA format string like the known good one but
  //  based on the personalized user input
  const piaFormat = new PiaFormat("")
    .setBirthDate(new Date(birthDatePicked))
    .setEntitlementDate(new Date(retireDatePicked))
    .setMonthlyNoncoveredPensionAmount(userPension)
    .setOasdiEarnings(earningsRecords)
    .setFirstEarningYear(mapFirstEarningYear) //Required since we added line8 and line40 support
    .setLastEarningYear(expectedLastEarningYear || mapLastEarningYear) //Required since we added line8 and line40 support

  const showFutureEarningsPage = process.env.GATSBY_SHOW_FUTURE_EARNINGS_PAGE;
  if (showFutureEarningsPage === "true") {
    // console.log('Show future earnings');
    piaFormat
      .setAvgWageIncreaseAssumption(awiTrendSelection ?? undefined)
      .setFirstYearForwardEarningsProjection(2014);

    if (weNeedAssumptions) {
      // console.log('weNeedAssumptions block');
      piaFormat
        .setEarningsForQCIncreaseAssumption(
          PiaTypeOfBenefitIncreaseAssumption.noFutureIncreases
        )
        .setMaxWageBaseProjectionInd(
          PiaTypeOfMaxWageBaseProjection.alternative1Optimistic
        )
        .setFirstYearProjectedEarningsForQC(2020)
        .setFirstYearForwardEarningsProjection(2014)
        .setForwardProjectionType(
          PiaTypeOfProjections.projectionRelatedToAverageWageIncrease
        )
        .setForwardProjectionPercentage(
          expectedPercentageWageIncrease ?? undefined
        );
    }
  }

  const piaOutput = piaFormat.outputPia();
  console.log(piaOutput);

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

  //Download the 2mb WASM file with the C++ policy logic, with a promise.
  const AnyPIAJS = await new Module();

  //Instantiate AnyPIAJS C++ class we wrapped the original SSA AnyPIAB class with.
  const onePIADoc = new AnyPIAJS.PIADoc();
  //If you forget to send a newline at the end, AnyPIAJS seems to ignore the last line.
  const consoleOutput = onePIADoc.calculate(piaOutput + "\n");

  //Request a JSON dump from AnyPIAJS
  const resultString = onePIADoc.getResult();
  const resultObj = JSON.parse(resultString);

  //Cross check with known good value via new instance of same API.
  const knownGoodPIADoc = new AnyPIAJS.PIADoc();
  const consoleOutputKnownGood = knownGoodPIADoc.calculate(knownGood + "\n");
  const resultStringKnownGood = knownGoodPIADoc.getResult();
  const resultObjKnownGood = JSON.parse(resultStringKnownGood);

  //TODO: fix C++ JSON API typos: NoncoveredPosion;PIAAfterWindwfall
  console.log("results:", consoleOutput, resultObj);
  console.error("knownGood:", consoleOutputKnownGood, resultObjKnownGood);

  //TODO: add fullRetirementDate to C++ JSON API instead of stub date 2040-1-1
  //const userFullRetireDate = getFullRetirementDate(new Date(birthDatePicked));

  // Convert to web calculator display UserProfile format
  const calculation = resultObj.Calculation;
  const usePIAAfterWindwfall = calculation.YearsOfCoverageForWindfall
                            && calculation.YearsOfCoverageForWindfall > 0
                            && calculation.YearsOfCoverageForWindfall < 30
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
    calculatorType: 'anypia',
    bendPoints: usePIAAfterWindwfall ? calculation.PIAAfterWindwfall : calculation.PIAEligibility
  };
  console.log("usePIAAfterWindwfall", usePIAAfterWindwfall);
  console.warn("DUMMY fullRetireDate until it can be added:");

  return userProfile;
}
