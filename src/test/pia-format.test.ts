/**
 * NOTE: to delete
 * Make tests for sample 25, 1, 2 (see bottomost test)
 * Make simplified version
 */

import { PiaFormat } from "../library/pia/pia-format";
import {
  delayedRetirementValues,
  fullRetirementValues,
  sample20RetirementValues,
  sample25RetirementValues,
  sample25RetirementValuesExplicit,
} from "../library/testFiles";
import { getRawEarnings } from "../library/observable-functions";
import { PiaYear, PiaEarnings } from "src/library/pia/pia-types";
import { EarningsMap } from "src/library/user-state-context";
import dayjs from "dayjs";

const sample1pia = `01123450001001151954
031012020
0619752019
071  0.002008
081  0.002008
16Sample 1
201
402017221
95 12 12`;

const sample20pia = `01123450020006221952
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

const sample25pia = `01123450025009021960
031092022
0619812020
072  0.001990
082  0.002011
12   1500.00102022
16Sample 25
22    2000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00
23    4000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00
24    6000.00    8000.00
402017551`;


/*
expected input: {
  1991: 50000,
  1992: 20000,
  1996: 20001
}
*/
const calculateMinMaxYears = (earningsObj: Object) => {

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

  const mapOasdiEarnings = mapMap(earningsRecords, (v, k) =>
    (v && v === -1) || v === "-1" ? 0 : v
  );
  const mapFirstEarningYear = Math.min(...Array.from(mapOasdiEarnings.keys()));
  const mapLastEarningYear = Math.max(...Array.from(mapOasdiEarnings.keys()));
  return {
    mapFirstEarningYear,
    mapLastEarningYear
  }
};

describe("Sample 1, 20 and 25 AnyPIA (Full Retirement)", () => {
  const pia1Inputter = new PiaFormat(sample1pia);
  const pia20Inputter = new PiaFormat(sample20pia);
  const pia25Inputter = new PiaFormat(sample25pia);

  it("Deserializing Sample1.pia results in the same serialization", async () => {
    expect.assertions(1);

    expect(pia1Inputter.outputPia()).toBe(sample1pia);
  });

  it("Deserializing Sample20.pia results in the same serialization", async () => {
    expect.assertions(1);

    expect(pia20Inputter.outputPia()).toBe(sample20pia);
  });

  it("Deserializing Sample25.pia results in the same serialization", async () => {
    expect.assertions(1);

    expect(pia25Inputter.outputPia()).toBe(sample25pia);
  });
});

/* 
  Simplified sample PIAs were created by running working PiaFormat
  on sample retirement values
  Changes between samplePia and simplified samplePia:
    no sex or social security number on 01,
    no month-yr on line 12.
    no name on line 16,
    no tax type on line 20,
    no line 95 
*/

// sample1PiaSimplified contains more data than sample1pia
// Original line 06: 19752019
const sample1PiaSimplified = `01          01151954
031012020
071  0.002008
081  0.002008
201
402017221
95 12 12
06`;

// Original line 06: 19752019
const sample2piaSimplified = `01          01151954
031012020
0619752019
071  0.002008
081  0.002008
201
402017551
95 12 12
06`;

const sample20piaSimplified = `01          06221952
031072014
0619662010
12   1500.00
22     800.00    4100.00    4000.00    3700.00    4600.00    7300.00    9000.00   10800.00   12000.00   11700.00
23   14100.00    6400.00   11600.00    5000.00       0.00       0.00       0.00       0.00       0.00       0.00
24       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00       0.00
25       0.00       0.00       0.00       0.00       0.00       0.00   20000.00  104400.00  105480.00  108000.00
26  113040.00  117000.00  122400.00  128160.00   35000.00`;

// Original line 06: 19812020
const sample25piaSimplifiedExplicit = `01          09021960
031092022
0619912011
12   1500.00
22    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00
23    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00
24    8000.00`;

// Original line 06: 19812020
// Original line 07: 072  0.001990
// note we edited several of the 22 - 24 lines in the copy above.
const sample25piaSimplifiedForward = `01          09021960
031092022
0619812020
082  0.002011
12   1500.00
22    2000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00    4000.00
23    4000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00    6000.00
24    6000.00    8000.00
402017551`;
// Generic function for creating full retirement sample PiaFormat
function createPiaSampleFormat(
  dob: string,
  dor: string,
  pension?: number,
  sampleRetirementValues?: any
) {
  const userDOB = dayjs(dob).toDate();
  const userDOR = dayjs(dor).toDate(); // 66yo is their full retirement age.
  //const year62 = "2014";

  const piaSampleFormat = new PiaFormat(``)
    .setBirthDate(userDOB)
    .setEntitlementDate(userDOR);

  if (pension) {
    // only sample 20 has pension
    piaSampleFormat.setMonthlyNoncoveredPensionAmount(pension);
  }

  // Background finance info for sample
  if (sampleRetirementValues) {
    // samples 1 and 2 don't include explicit earnings
    const earnings =
      sampleRetirementValues["osss:OnlineSocialSecurityStatementData"][
        "osss:EarningsRecord"
      ]["osss:Earnings"];

    const rawEarnings = getRawEarnings(earnings);
    //convert all keys and values to int's (keys in js objects always strings)
    const onlyIntsObject = Object.entries(rawEarnings).map((n) =>
      n.map((m) => parseInt(m + "", 10))
    );

    const earningsRecords: EarningsMap = new Map<PiaYear, PiaEarnings>(
      onlyIntsObject
    );
    const { mapFirstEarningYear, mapLastEarningYear } = calculateMinMaxYears(rawEarnings);

    piaSampleFormat.setOasdiEarnings(earningsRecords)
    .setLastEarningYear(mapLastEarningYear)
    .setFirstEarningYear(mapFirstEarningYear);
  }

  return piaSampleFormat;
}

describe("Blank string instantiation of PiaFormat", () => {
  it("Correctly calculate first and last year of a range earnings", async () => {
    const earnings =
    sample20RetirementValues["osss:OnlineSocialSecurityStatementData"][
      "osss:EarningsRecord"
    ]["osss:Earnings"];

    const rawEarnings = getRawEarnings(earnings);
    expect(calculateMinMaxYears(rawEarnings)).toStrictEqual({
      mapFirstEarningYear: 1966,
      mapLastEarningYear: 2010,
    });

  })

  it("Deserializing empty pia results in error", async () => {
    /* TODO: Do we still want this test that's been disabled? 
    Is the code below an important part of this restoring this test? */
    expect.assertions(1);

    const emptyPiaInputter = new PiaFormat(``);

    const throwAnError = () => {
      const emptyPiaInputter = new PiaFormat(``);
      emptyPiaInputter.outputPia();
    };


    //TODO: see above.
    // expect(throwAnError).toThrowError(
    //   "Cannot read property 'map' of undefined"
    // );

    expect(emptyPiaInputter.outputPia()).toBe(`01
031
06`);
  });

  it("Deserializing empty pia, after a few setters results in a mocked serialization", async () => {
    expect.assertions(1);

    const earnings =
      fullRetirementValues["osss:OnlineSocialSecurityStatementData"][
        "osss:EarningsRecord"
      ]["osss:Earnings"];

    /* Use dayjs constructor to avoid bug with test runner that generate UTC dates
       with new Date('1947-10-10') and then is confusing.
    */
    const userDOB = dayjs("1947-10-10").toDate();
    const userDOR = dayjs("2013-10-10").toDate(); // 66 is their full retirement age

    const rawEarnings = getRawEarnings(earnings);
    const userPension = 0;

    //convert all keys and values to int's (keys in js objects always strings)
    const onlyIntsObject = Object.entries(rawEarnings).map((n) =>
      n.map((m) => parseInt(m + "", 10))
    );

    const earningsRecords: EarningsMap = new Map<PiaYear, PiaEarnings>(
      onlyIntsObject
    );
    const { mapLastEarningYear, mapFirstEarningYear } = calculateMinMaxYears(rawEarnings)
    const piaFormat = new PiaFormat(``)
      .setBirthDate(userDOB)
      .setEntitlementDate(userDOR)
      .setMonthlyNoncoveredPensionAmount(userPension)
      .setFirstEarningYear(mapFirstEarningYear)
      .setLastEarningYear(mapLastEarningYear)
      .setOasdiEarnings(earningsRecords);

    expect(piaFormat.outputPia()).toBe(`01          10101947
031102013
0619632014
22      42.00     309.00     499.00     163.00      72.00    2104.00    6315.00    7158.00    6283.00    6784.00
23    6798.00    5280.00    3027.00    9357.00   10434.00   10981.00   12531.00   13766.00   15063.00   16125.00
24   17093.00   18573.00   21606.00   23354.00   25179.00   24951.00   27881.00   28613.00   30623.00   31064.00
25   31812.00   30913.00   32475.00   33553.00   34524.00   21552.00       0.00       0.00       0.00       0.00
26    7158.00       0.00    7158.00    8543.00    9776.00       0.00       0.00       0.00       0.00       0.00
27       0.00       0.00`);
  });
/* This should not equal sample1PiaSimplified because our library does not 
support backward extrapolation of earnings */
  it("Sample 1 AnyPIA (Full Retirement)", () => {
    const piaSample1Format = createPiaSampleFormat("1954-01-15", "2020-01-15");
    expect(piaSample1Format.outputPia()).not.toBe(sample1PiaSimplified);
  });
/* This should not equal sample2PiaSimplified because our library does not 
support backward extrapolation of earnings */
  it("Sample 2 AnyPIA (Full Retirement)", () => {
    const piaSample2Format = createPiaSampleFormat("1954-01-15", "2020-01-15");
    expect(piaSample2Format.outputPia()).not.toBe(sample2piaSimplified);
  });

  it("Sample 20 AnyPIA (Full Retirement)", () => {
    const piaSample20Format = createPiaSampleFormat(
      "1952-06-22",
      "2014-07-22",
      1500,
      sample20RetirementValues
    );
    expect(piaSample20Format.outputPia()).toBe(sample20piaSimplified);
  });

  it("Correctly calculate 1st and last year for sample 25", async () => {
    const earnings =
    sample25RetirementValuesExplicit["osss:OnlineSocialSecurityStatementData"][
      "osss:EarningsRecord"
    ]["osss:Earnings"];

    const rawEarnings = getRawEarnings(earnings);
    expect(calculateMinMaxYears(rawEarnings)).toStrictEqual({
      mapFirstEarningYear: 1991,
      mapLastEarningYear: 2011,
    });

  })
  it("Sample 25 AnyPIA explicit years only (Full Retirement)", () => {
    const piaSample25Format = createPiaSampleFormat(
      "1960-09-02",
      "2022-09-02",
      1500,
      sample25RetirementValuesExplicit
    );
    expect(piaSample25Format.outputPia()).toBe(sample25piaSimplifiedExplicit);
  });

  /* TODO write a test for sample25piaSimplifiedForward
    It should fill in line 07 of the output which specifies forward
    extrapolation. Note that the "explicit years only" test does not check this
    */
   /*
      it("Sample 25 AnyPIA with forward projection (Full Retirement)", () => {
    const piaSample25Format = createPiaSampleFormat(
      "1960-09-02",
      "2022-09-02",
      1500,
      sample25piaSimplifiedForward //TODO
    );
    expect(piaSample25Format.outputPia()).toBe(sample25piaSimplifiedForward);
  });
      */
});
