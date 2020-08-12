import { PiaFormat } from "../library/pia/pia-format";

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
  const pia1Inputter = new PiaFormat(sample1pia, "sample1.pia");
  const pia20Inputter = new PiaFormat(sample20pia, "sample20.pia");
  const pia25Inputter = new PiaFormat(sample25pia, "sample25.pia");

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
