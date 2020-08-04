import dayjs from "dayjs";

/* based on http://thadk.net/anypiamac-docs/html/General/structure.html 
copied from SSA AnyPIA downloadable package */

// Typescript's Record type assumes every key has a value, which is usually not true
type Dictionary<K extends string | number, V> = Partial<Record<K, V>>;

// Map from line ID to full line string
type PIALineMap = Dictionary<number, string>;

class PIADate extends Date {}

class PIAMonthYear extends Date {}

class PIAYear extends Number {}
class PIAEarnings extends Number {}

interface PIASerializer {
  fieldFormats: Record<string, PIAFieldMeta>;
  serialize: (data: Partial<PIAData>) => PIALineMap;
  deserialize: (lineMap: PIALineMap) => Partial<PIAData>;
}

class PIAFieldMeta {
  startChar: number;
  endChar: number;
  startLine: number;
  endLine: number;
  fieldCharLength: number;
  constructor() {
    this.startChar = -1;
    this.endChar = -1;
    this.startLine = -1;
    this.endLine = -1;
    this.fieldCharLength = -1;
  }
  setStartChar(start: number): PIAFieldMeta {
    this.startChar = start;
    return this;
  }

  setEndChar(end: number): PIAFieldMeta {
    this.endChar = end;
    return this;
  }

  setStartLine(start: number): PIAFieldMeta {
    this.startLine = start;
    return this;
  }
  setEndLine(end: number): PIAFieldMeta {
    this.endLine = end;
    return this;
  }

  setFieldCharLength(len: number): PIAFieldMeta {
    this.fieldCharLength = len;
    return this;
  }
  getBlank(): string {
    let len = this.endChar === -1 ? 0 : this.endChar - this.startChar + 1;
    return " ".repeat(len);
  }
}

/*TODO: for deserializing, do not put out lines where all the variables
that make up the line are null. e.g. see how dataOfDeath handled in sample20 */

/*
return ['01', this.ssn, this.sex, dayjs(this.birthDate).format("MMDDYYYY"),'\n', this.piaEverythingElse.join('\n')].join('');
*/
const basicInfoSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      ssn: new PIAFieldMeta().setStartChar(3).setEndChar(11),
      birthDate: new PIAFieldMeta().setStartChar(13).setEndChar(20),
      dateOfDeath: new PIAFieldMeta().setStartChar(3).setEndChar(10),
      sex: new PIAFieldMeta().setStartChar(12).setEndChar(12),
    };
  }

  serialize(data: Partial<PIAData>): PIALineMap {
    const line01 = {
      1: `01${
        data.ssn != undefined ? data.ssn : this.fieldFormats.ssn.getBlank()
      }${data.sex != undefined ? data.sex : " "}${
        data.birthDate != undefined
          ? formatPIADateStr(data.birthDate)
          : this.fieldFormats.birthDate.getBlank()
      }`,
    };
    const line02 = {
      2: `02${
        data.dateOfDeath != undefined
          ? formatPIADateStr(data.dateOfDeath)
          : this.fieldFormats.dateOfDeath.getBlank()
      }`,
    };

    return { ...line01, ...(data.dateOfDeath && line02) };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    const line01Str = lineMap[1];
    const line02Str = lineMap[2];

    const line01Data = line01Str
      ? {
          ssn: parsePiaString(
            line01Str,
            this.fieldFormats.ssn.startChar,
            this.fieldFormats.ssn.endChar
          ),
          birthDate: parsePiaDate(
            line01Str,
            this.fieldFormats.birthDate.startChar,
            this.fieldFormats.birthDate.endChar
          ),
          sex: parsePiaSex(
            line01Str,
            this.fieldFormats.sex.startChar,
            this.fieldFormats.sex.endChar
          ),
        }
      : {};

    const line02Data = line02Str
      ? {
          // Maybe don't even need the end index? If all dates have the same length
          dateOfDeath: parsePiaDate(line02Str, 3, 10),
        }
      : {};
    return { ...line01Data, ...line02Data };
  }
})();

const benefitSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      typeOfBenefit: new PIAFieldMeta().setStartChar(3).setEndChar(3),
      monthYearEntitlement: new PIAFieldMeta().setStartChar(4).setEndChar(9),
      monthYearBenefit: new PIAFieldMeta().setStartChar(3).setEndChar(8),
    };
  }
  serialize(data: Partial<PIAData>): PIALineMap {
    const line03 = {
      3: `03${
        data.typeOfBenefit != undefined
          ? data.typeOfBenefit
          : this.fieldFormats.typeOfBenefit.getBlank()
      }${
        data.monthYearEntitlement != undefined
          ? formatPIAMonthStr(data.monthYearEntitlement)
          : this.fieldFormats.monthYearEntitlement.getBlank()
      }`,
    };
    const line04 = {
      4: `04${
        data.monthYearBenefit != undefined
          ? formatPIAMonthStr(data.monthYearBenefit)
          : this.fieldFormats.monthYearBenefit.getBlank()
      }`,
    };

    return { ...line03, ...(data.monthYearBenefit && line04) };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    let line03 = lineMap[3];
    let line04 = lineMap[4];

    let line03Data = line03
      ? {
          typeOfBenefit: parseSSABenefitType(
            line03,
            this.fieldFormats.typeOfBenefit.startChar,
            this.fieldFormats.typeOfBenefit.endChar
          ),
          monthYearEntitlement: parsePiaMonthYear(
            line03,
            this.fieldFormats.monthYearEntitlement.startChar,
            this.fieldFormats.monthYearEntitlement.endChar
          ),
        }
      : {};
    let line04Data = line04
      ? {
          monthYearEntitlement: parsePiaMonthYear(
            line04,
            this.fieldFormats.monthYearEntitlement.startChar,
            this.fieldFormats.monthYearEntitlement.endChar
          ),
        }
      : {};
    return { ...line03Data, ...line04Data };
  }
})();

/*
OASDI stands for old age, survivors, and disability insurance tax,
and the money that your employer collects goes to the federal government
 in order to fund the Social Security program.
return 
*/
const oasdiEarningsSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;

  // all start at 3 and continue for number of entries based on other values.
  constructor() {
    this.fieldFormats = {
      firstEarningYearActual: new PIAFieldMeta().setStartChar(3).setEndChar(6),
      lastEarningYearActual: new PIAFieldMeta().setStartChar(7).setEndChar(10),
      typeOfEarnings: new PIAFieldMeta().setStartChar(3).setFieldCharLength(1), //TODO: use fieldCharLength with generic
      typeOfTaxes: new PIAFieldMeta().setStartChar(3), //line21
      oasdiEarnings: new PIAFieldMeta()
        .setStartChar(3)
        .setStartLine(22)
        .setEndLine(29)
        .setFieldCharLength(11),
      hiEarnings: new PIAFieldMeta()
        .setStartChar(3)
        .setStartLine(30)
        .setEndLine(37)
        .setFieldCharLength(11),
    };
  }

  serialize(data: Partial<PIAData>): PIALineMap {
    const line6 = {
      6: `06${
        data.firstEarningYearActual != undefined
          ? data.firstEarningYearActual
          : this.fieldFormats.firstEarningYearActual.getBlank()
      }${
        data.lastEarningYearActual != undefined
          ? data.lastEarningYearActual
          : this.fieldFormats.lastEarningYearActual.getBlank()
      }`,
    };

    //TODO: line20, line2
    const line20 = {
      20: `20${
        data.typeOfEarnings != undefined
          ? Array.from(data.typeOfEarnings.entries())
              .sort((a: Array<any>, b: Array<any>) => a[0] - b[0])
              .map((entry) => entry[1])
              .join("")
          : this.fieldFormats.typeOfEarnings.getBlank()
      }
      `,
    };

    const chunkArray = (chunkSize: number) => (array: Array<any>) => {
      return array.reduce((acc, each, index, src) => {
        if (!(index % chunkSize)) {
          return [...acc, src.slice(index, index + chunkSize)];
        }
        return acc;
      }, []);
    };

    //returns a function that can make array of arrays of length 10
    const chunkIncome = chunkArray(10);

    // returns array of arrays of length 10, we are disregarding the year keys()
    const chunkedIncome =
      data.oasdiEarnings &&
      chunkIncome(
        Array.from(data.oasdiEarnings.entries()).sort(
          (a: Array<any>, b: Array<any>) => a[0] - b[0]
        )
      );

    const line22to29 = chunkedIncome
      .map((pageOfEarnings: Array<Array<any>>, i: number) => ({
        //variable obj key for the 9 lines, template with 10 entries of page
        [i + 22]: `${i + 22}${
          //if page not empty, then loop over each earning year
          // processing the tuple [year,earning] to
          // padded strings of length 11
          pageOfEarnings && pageOfEarnings.length > 0
            ? pageOfEarnings
                .map((tupleYrOfEarnings) =>
                  (tupleYrOfEarnings[1].toFixed(2) + "").padStart(
                    this.fieldFormats.oasdiEarnings.fieldCharLength,
                    " "
                  )
                )
                .join("") //join is converting the array to a string with "" as a separator
            : this.fieldFormats.oasdiEarnings.getBlank()
        }`,
      }))
      .reduce((o: any, p: any) => Object.assign({}, o, p), {}); //combine objects inside array

    return {
      ...line6,
      //...line7,
      //...line8,
      ...(data.typeOfEarnings && line20),
      //...line21,
      ...line22to29,
    };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    const line6Str = lineMap[6];
    const line20Str = lineMap[20];
    const line21Str = lineMap[21];
    var oasdiLine: string = "";

    const line6Data = line6Str
      ? {
          firstEarningYearActual: parseInt(
            piaSubstr(
              line6Str,
              this.fieldFormats.firstEarningYearActual.startChar,
              this.fieldFormats.firstEarningYearActual.endChar || 0 //TODO: handle undefined
            ),
            10
          ),
          lastEarningYearActual: parseInt(
            piaSubstr(
              line6Str,
              this.fieldFormats.lastEarningYearActual.startChar,
              this.fieldFormats.lastEarningYearActual.endChar || 0 //TODO: handle undefined
            ),
            10
          ),
        }
      : {};

    /* TODO deserialize line 7 (backward projections of income)
        and 8 (forward projection of income)
        8 is more useful than 7 but sample25 sort of has examples of both*/

    /* process line 22-29 for lifetime OASDI earnings */
    var lineYear = line6Data.firstEarningYearActual || 1950; //TODO: remove stub, calculate from line7 AND line 6.
    let oasdiData: Map<PIAYear, PIAEarnings> = new Map<PIAYear, PIAEarnings>();
    for (
      var i = this.fieldFormats.oasdiEarnings.startLine;
      i <= this.fieldFormats.oasdiEarnings.endLine;
      i++
    ) {
      if (lineMap[i] == "") {
        break;
      } else {
        oasdiLine = lineMap[i] || "";
        oasdiLine = oasdiLine.trim();
        const parsedLine = parseYearEarningsLineString(
          oasdiLine,
          this.fieldFormats.oasdiEarnings.startChar,
          lineYear,
          this.fieldFormats.oasdiEarnings.fieldCharLength
        );
        oasdiData = new Map<PIAYear, PIAEarnings>([
          ...Array.from(oasdiData.entries()),
          ...Array.from(parsedLine.entries()),
        ]);
        // ([...oasdiData, ...parsedLine ]);
        lineYear = lineYear += Math.floor(
          oasdiLine.length / this.fieldFormats.oasdiEarnings.fieldCharLength
        );
      }
    }

    lineYear = line6Data.firstEarningYearActual || 1950; //TODO: remove stub, calculate from line7 AND line 6.
    var hiData: Map<PIAYear, PIAEarnings> = new Map<PIAYear, PIAEarnings>();
    var hiLine: string;
    for (
      var i = this.fieldFormats.hiEarnings.startLine;
      i <= this.fieldFormats.hiEarnings.endLine;
      i++
    ) {
      if (lineMap[i] == "") {
        break;
      } else {
        hiLine = lineMap[i] || "";
        hiLine = hiLine.trim();
        const parsedLine = parseYearEarningsLineString(
          hiLine,
          this.fieldFormats.hiEarnings.startChar,
          lineYear,
          this.fieldFormats.hiEarnings.fieldCharLength
        );
        hiData = new Map<PIAYear, PIAEarnings>([
          ...Array.from(hiData.entries()),
          ...Array.from(parsedLine.entries()),
        ]);
        lineYear = lineYear += Math.floor(
          hiLine.length / this.fieldFormats.hiEarnings.fieldCharLength
        );
      }
    }

    /* Earnings on lines 22-29 are for same years for which type of earnings
    were specified on line 20. Each earnings amount takes 11 positions, with
     two decimal places and leading blanks if required, e.g. "  100000.00"
      for $100,000.00 in earnings.
    */
    let line22To29Data: Partial<PIAData> = {
      oasdiEarnings: oasdiData,
    };

    /*Earnings on lines 30-37 are for period starting with maximum of 1983
     and first year specified on line 6 and ending with last year on line 6.
      Each earnings amount takes 11 positions, with two decimal places and
       leading blanks if required, e.g. "  100000.00" for $100,000.00 in earnings.
       */
    /*TODO: handle only 1983 range */
    var line30To37Data: Partial<PIAData> = {
      hiEarnings: hiData,
    };

    const line20Data = line20Str
      ? {
          typeOfEarnings: parsePiaTypeOfEarningsString(
            line20Str,
            this.fieldFormats.typeOfEarnings.startChar,
            line6Data.firstEarningYearActual || 1950 //TODO: remove stub, calculate from line7 AND line 6.
          ),
        }
      : {};

    console.log({
      ...line6Data,
      ...line20Data,
      ...line22To29Data,
      ...line30To37Data,
    });

    return {
      ...line6Data,
      //...line7,
      //...line8,
      ...line20Data,
      ...line22To29Data,
      ...line30To37Data,
    };
  }
})();

const monthlyNoncoveredPensionSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      monthlyNoncoveredPensionAmount: new PIAFieldMeta()
        .setStartChar(3)
        .setEndChar(12)
        .setFieldCharLength(10),
      monthYearEntitlementNoncoveredPension: new PIAFieldMeta()
        .setStartChar(13)
        .setEndChar(18),
    };
  }
  serialize(data: Partial<PIAData>): PIALineMap {
    const line12 = {
      12: `12${
        data.monthlyNoncoveredPensionAmount != undefined
          ? data.monthlyNoncoveredPensionAmount
              .toFixed(2)
              .padStart(
                this.fieldFormats.monthlyNoncoveredPensionAmount
                  .fieldCharLength,
                " "
              )
          : this.fieldFormats.monthlyNoncoveredPensionAmount.getBlank()
      }${
        data.monthYearEntitlementNoncoveredPension != undefined
          ? formatPIAMonthStr(data.monthYearEntitlementNoncoveredPension)
          : this.fieldFormats.monthYearEntitlementNoncoveredPension.getBlank()
      }`,
    };

    return { ...(data.monthlyNoncoveredPensionAmount && line12) };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    let line12 = lineMap[12];

    let line12Data = line12
      ? {
          monthlyNoncoveredPensionAmount: parsePiaFloat(
            piaSubstr(
              line12,
              this.fieldFormats.monthlyNoncoveredPensionAmount.startChar,
              this.fieldFormats.monthlyNoncoveredPensionAmount.endChar
            )
          ),
          monthYearEntitlementNoncoveredPension: parsePiaMonthYear(
            line12,
            this.fieldFormats.monthYearEntitlementNoncoveredPension.startChar,
            this.fieldFormats.monthYearEntitlementNoncoveredPension.endChar
          ),
        }
      : {};
    return { ...line12Data };
  }
})();

const nameOfWorkerSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      nameOfWorker: new PIAFieldMeta().setStartChar(3).setEndChar(37), //TODO truncate to spec
    };
  }
  serialize(data: Partial<PIAData>): PIALineMap {
    const line16 = {
      16: `16${
        data.nameOfWorker != undefined
          ? data.nameOfWorker
          : this.fieldFormats.nameOfWorker.getBlank()
      }`,
    };

    return { ...(data.nameOfWorker && line16) };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    let line16 = lineMap[16];

    let line16Data = line16
      ? {
          nameOfWorker: piaSubstr(
            line16,
            this.fieldFormats.nameOfWorker.startChar,
            this.fieldFormats.nameOfWorker.endChar
          ),
        }
      : {};
    return { ...line16Data };
  }
})();

/* STUB: TODO figure out this documentation and implement this properly
does not seem to apply to years relevant for WEP.
http://thadk.net/anypiamac-docs/html/Forms/quarters_37_77.html
http://thadk.net/anypiamac-docs/html/Forms/quarters_51_77.html
 */
const oldQuartersOfCoverageSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      oldQuartersOfCoverageStubString: new PIAFieldMeta()
        .setStartChar(3)
        .setEndChar(8),
    };
  }
  serialize(data: Partial<PIAData>): PIALineMap {
    const line95 = {
      95: `95${
        data.oldQuartersOfCoverageStubString != undefined
          ? data.oldQuartersOfCoverageStubString
          : this.fieldFormats.oldQuartersOfCoverageStubString.getBlank()
      }`,
    };

    return { ...(data.oldQuartersOfCoverageStubString && line95) };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    let line95 = lineMap[95];

    let line95Data = line95
      ? {
          oldQuartersOfCoverageStubString: piaSubstr(
            line95,
            this.fieldFormats.oldQuartersOfCoverageStubString.startChar,
            this.fieldFormats.oldQuartersOfCoverageStubString.endChar
          ),
        }
      : {};
    return { ...line95Data };
  }
})();

/* TODO line 40, 41-55 if we want to support custom "wage base"
First year of benefit increase projection
Benefit increase assumption indicator
Average wage increase assumption indicator
Maximum wage base projection indicator
1 for automatic projection
2 for ad hoc bases
*/
const wageBaseSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      wageBaseStubString: new PIAFieldMeta().setStartChar(3).setEndChar(9),
    };
  }
  serialize(data: Partial<PIAData>): PIALineMap {
    const line40 = {
      40: `40${
        data.wageBaseStubString != undefined
          ? data.wageBaseStubString
          : this.fieldFormats.wageBaseStubString.getBlank()
      }`,
    };

    return { ...(data.wageBaseStubString && line40) };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    let line40 = lineMap[40];

    let line40Data = line40
      ? {
          wageBaseStubString: piaSubstr(
            line40,
            this.fieldFormats.wageBaseStubString.startChar,
            this.fieldFormats.wageBaseStubString.endChar
          ),
        }
      : {};
    return { ...line40Data };
  }
})();

/* implement lines 7 and 8, and related lines, in oasdiEarningsSerializer and delete this */
const earningsProjectionStubSerializer: PIASerializer = new (class {
  fieldFormats: Record<string, PIAFieldMeta>;
  constructor() {
    this.fieldFormats = {
      pastProjectionStubString: new PIAFieldMeta()
        .setStartChar(3)
        .setEndChar(13),
      futureProjectionStubString: new PIAFieldMeta()
        .setStartChar(3)
        .setEndChar(13),
    };
  }
  serialize(data: Partial<PIAData>): PIALineMap {
    const line7 = {
      7: `07${
        data.pastProjectionStubString != undefined
          ? data.pastProjectionStubString
          : this.fieldFormats.pastProjectionStubString.getBlank()
      }`,
    };

    const line8 = {
      8: `08${
        data.futureProjectionStubString != undefined
          ? data.futureProjectionStubString
          : this.fieldFormats.futureProjectionStubString.getBlank()
      }`,
    };

    return {
      ...(data.pastProjectionStubString && line7),
      ...(data.futureProjectionStubString && line8),
    };
  }
  deserialize(lineMap: PIALineMap): Partial<PIAData> {
    let line7 = lineMap[7];
    let line8 = lineMap[8];

    let line7Data = line7
      ? {
          pastProjectionStubString: piaSubstr(
            line7,
            this.fieldFormats.pastProjectionStubString.startChar,
            this.fieldFormats.pastProjectionStubString.endChar
          ),
        }
      : {};
    let line8Data = line8
      ? {
          futureProjectionStubString: piaSubstr(
            line8,
            this.fieldFormats.futureProjectionStubString.startChar,
            this.fieldFormats.futureProjectionStubString.endChar
          ),
        }
      : {};
    return { ...line7Data, ...line8Data };
  }
})();

const PIA_SERIALIZERS: PIASerializer[] = [
  basicInfoSerializer,
  benefitSerializer,
  oasdiEarningsSerializer,
  monthlyNoncoveredPensionSerializer,
  nameOfWorkerSerializer,
  oldQuartersOfCoverageSerializer,
  wageBaseSerializer,
  earningsProjectionStubSerializer, //remove me as soon as implemented in oasdiEarningSerializer
  // disabilityDatesSerializer,
  //…
];

/**
 * Given a list of lines in the AnyPIA format, return a map from
 * line number to the line string itself.
 */
function createLineMap(lines: string[]): PIALineMap {
  return lines.reduce((lineMap, line) => {
    const lineNum = parseInt(line.slice(0, 2), 10);
    return Object.assign(lineMap, { [lineNum]: line });
  }, {});
}

function deserializePIAData(lines: string[]): PIAData {
  const lineMap = createLineMap(lines);
  const deserializedData = PIA_SERIALIZERS.reduce(
    (data, serializer) => Object.assign(data, serializer.deserialize(lineMap)),
    {}
  );

  return deserializedData;
}

function serializePIAData(data: PIAData): PIALineMap {
  const lines = PIA_SERIALIZERS.reduce(
    (lineMap, serializer) => Object.assign(lineMap, serializer.serialize(data)),
    {}
  );
  console.log(data);
  return lines;
}

enum PIASex {
  male = 0,
  female = 1,
}

enum SSABenefitType {
  old_age = 1,
  survivor = 2,
  disability = 3,
}

/* http://thadk.net/anypiamac-docs/html/Forms/type_of_earnings.html */
enum PIATypeOfEarnings {
  entered_earnings = 0,
  maximum = 1,
  high = 2,
  average = 3,
  low = 4,
}

enum PIATypeOfTaxes {
  employee_taxes = 0,
  self_employed_taxes = 1,
}

interface PIAData {
  ssn?: string; //line1
  birthDate?: PIADate;
  sex?: PIASex;
  dateOfDeath?: PIADate; //line2
  typeOfBenefit?: SSABenefitType; //line 4
  monthYearBenefit?: PIAMonthYear;
  monthYearEntitlement?: PIAMonthYear;
  firstEarningYearActual?: PIAYear; //line6
  lastEarningYearActual?: PIAYear;
  typeOfEarnings?: Map<PIAYear, PIATypeOfEarnings>; //line20
  typeOfTaxes?: Map<PIAYear, PIATypeOfTaxes>; //line21
  oasdiEarnings?: Map<PIAYear, PIAEarnings>; //line22-29
  hiEarnings?: Map<PIAYear, PIAEarnings>;
  monthlyNoncoveredPensionAmount?: PIAEarnings; //line12
  monthYearEntitlementNoncoveredPension?: PIAMonthYear;
  nameOfWorker?: string; //line16
  oldQuartersOfCoverageStubString?: string;
  wageBaseStubString?: string;
  pastProjectionStubString?: string;
  futureProjectionStubString?: string;
  piaEverythingElse?: string;
}

export class PiaFormat {
  piaAll: string;
  piaData: PIAData;
  constructor(piaInput: string, fileName: string) {
    this.piaAll = piaInput;
    const lines = piaInput.split("\n");
    this.piaData = deserializePIAData(lines);
  }

  outputPIA() {
    var linesRecords = serializePIAData(this.piaData);
    const lines = Object.entries(linesRecords)
      .sort((a: Array<any>, b: Array<any>) => {
        if (a[0] === b[0]) {
          console.warn(a[0], "line is serialized more than once");
        }
        return parseInt(a[0], 10) - parseInt(b[0], 10);
      }) //make sure lines ordered
      .map((m) => m[1]) //remove line numbers
      .reduce((n, acc) => [n, acc].join("\n").trim(), ""); //add newlines

    return lines;
  }
}
function piaSubstr(str: string, start: number, end: number): string {
  let start_pos = start - 1;
  let str_len = end - start + 1;
  return str.substr(start_pos, str_len);
}

function parsePiaString(str: string, start: number, end: number): string {
  return piaSubstr(str, start, end);
}

function parsePiaMonthYear(
  lineStr: string,
  start: number,
  end: number
): PIAMonthYear {
  let moyrStr = piaSubstr(lineStr, start, end);
  let month = moyrStr.slice(0, 2);
  let year = moyrStr.slice(2);
  // console.log(moyrStr, "month", month, "year", year);
  /* starts in mmyyyy, dayjs takes yyyy-mm-dd */
  var piaMonth: PIAMonthYear = dayjs(
    [parseInt(year, 10), parseInt(month, 10), 1].join("-")
  ).toDate();
  return piaMonth;
}

function parsePiaSex(lineStr: string, start: number, end: number): PIASex {
  let genderStr = piaSubstr(lineStr, start, end);
  let genInt = parseInt(genderStr, 10);
  let sex: PIASex = genInt;
  return sex;
}

function parseSSABenefitType(
  lineStr: string,
  start: number,
  end: number
): SSABenefitType {
  let benStr = piaSubstr(lineStr, start, end);
  let benInt = parseInt(benStr, 10);
  let ssaBen: SSABenefitType = benInt;
  return ssaBen;
}

function parseYearEarningsLineString(
  lineStr: string,
  startCharacter: number,
  startYear: PIAYear,
  dataEntryLength: number
): Map<PIAYear, PIAEarnings> {
  let yrDataMap = new Map<PIAYear, PIAEarnings>();
  const zeroIndexStartChar = startCharacter - 1;
  let currentYear = Number(startYear);
  for (var i = zeroIndexStartChar; i < lineStr.length; i += dataEntryLength) {
    let val: PIAEarnings = parsePiaCurrency(lineStr.substr(i, dataEntryLength));
    yrDataMap.set(currentYear, val);
    currentYear = currentYear + 1;
  }
  return yrDataMap;
}

function parsePiaTypeOfEarningsString(
  lineStr: string,
  startCharacter: number,
  startYear: PIAYear
): Map<PIAYear, PIATypeOfEarnings> {
  let toeMap = new Map<PIAYear, PIATypeOfEarnings>();
  const zeroIndexStartCharacter = startCharacter - 1;

  let currentYear = Number(startYear);
  for (var i = zeroIndexStartCharacter; i < lineStr.length; i++) {
    let val: PIATypeOfEarnings = parseInt(lineStr.charAt(i), 10);
    toeMap.set(currentYear, val);
    currentYear = currentYear + 1;
  }
  return toeMap;
}

function parsePiaDate(lineStr: string, start: number, end: number): PIADate {
  let mdyStr = piaSubstr(lineStr, start, end);
  let month = mdyStr.slice(0, 2);
  let day = mdyStr.slice(2, 4);
  let year = mdyStr.slice(4);
  /* dayjs will use local timezone */
  /* starts in mmddyyyy, dayjs takes yyyy-mm-dd */
  let piaDate: PIADate = dayjs(
    [parseInt(year, 10), parseInt(month, 10), parseInt(day, 10)].join("-")
  );
  return piaDate;
}

//Parces a pia currency values
function parsePiaCurrency(val: string): Number {
  val = val.replace(".", "");
  return parseInt(val) / 100.0;
}

function parsePiaFloat(val: string): Number {
  return parseFloat(val);
}

function formatPIADateStr(date: PiaDate): string {
  return dayjs(date).format("MMDDYYYY");
}

function formatPIAMonthStr(monthYear: PIAMonthYear): string {
  return dayjs(monthYear).format("MMYYYY");
}
