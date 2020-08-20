import { PiaFormat } from "../library/pia/pia-format";
import { delayedRetirementValues, fullRetirementValues, sample20RetirementValues } from "../library/testFiles";
import {
  getRawEarnings,
} from "../library/observable-functions"
import { PiaYear, PiaEarnings } from "src/library/pia/pia-types";
import { EarningsMap } from "src/library/user-state-context";

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

describe("Blank string instantiation of PiaFormat", () => {

  it("Deserializing empty pia results in error", async () => {
    expect.assertions(1);

    const throwAnError = () => {
      const emptyPiaInputter = new PiaFormat(``);
      emptyPiaInputter.outputPia()
    }
    expect(throwAnError).toThrowError("Cannot read property 'map' of undefined");
  });

  it("Deserializing empty pia, after a few setters results in a mocked serialization", async () => {
    expect.assertions(1);

    const earnings = fullRetirementValues['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
    const userDOB = new Date("1947-10-10");
    const userDOR = new Date("2013-10-10"); // 66 is their full retirement age
    const rawEarnings = getRawEarnings(earnings)
    const userPension = 0;

    //convert all keys and values to int's (keys in js objects always strings)
    const onlyIntsObject = Object.entries(rawEarnings).map((n) =>
      n.map((m) => parseInt(m + "", 10))
    );

    const earningsRecords: EarningsMap = new Map<PiaYear, PiaEarnings>(
      onlyIntsObject
    );
    console.log("in the test",userDOB.toISOString())

    const piaFormat = new PiaFormat(``)
      .setBirthDate(userDOB)
      .setEntitlementDate(userDOR)
      //set??Pension(userPension)
      .setOasdiEarnings(earningsRecords);

    expect(piaFormat.outputPia()).toBe(`01          10091947
031102013
0619632014
22      42.00     309.00     499.00     163.00      72.00    2104.00    6315.00    7158.00    6283.00    6784.00
23    6798.00    5280.00    3027.00    9357.00   10434.00   10981.00   12531.00   13766.00   15063.00   16125.00
24   17093.00   18573.00   21606.00   23354.00   25179.00   24951.00   27881.00   28613.00   30623.00   31064.00
25   31812.00   30913.00   32475.00   33553.00   34524.00   21552.00       0.00       0.00       0.00       0.00
26    7158.00       0.00    7158.00    8543.00    9776.00       0.00       0.00       0.00       0.00       0.00
27       0.00      -1.00`);
  });

});
