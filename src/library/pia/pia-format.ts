import * as PiaTypes from "./pia-types";
import * as PiaUtils from "./pia-utils";

/* based on http://thadk.net/anypiamac-docs/html/General/structure.html 
copied from SSA AnyPia downloadable package */

interface PiaSerializer {
  fieldFormats: Record<string, PiaFieldMeta>;
  serialize: (data: Partial<PiaTypes.PiaData>) => PiaTypes.PiaLineMap;
  deserialize: (lineMap: PiaTypes.PiaLineMap) => Partial<PiaTypes.PiaData>;
}

class PiaFieldMeta {
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
  setStartChar(start: number): PiaFieldMeta {
    this.startChar = start;
    return this;
  }

  setEndChar(end: number): PiaFieldMeta {
    this.endChar = end;
    return this;
  }

  setStartLine(start: number): PiaFieldMeta {
    this.startLine = start;
    return this;
  }
  setEndLine(end: number): PiaFieldMeta {
    this.endLine = end;
    return this;
  }

  setFieldCharLength(len: number): PiaFieldMeta {
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
const basicInfoSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      ssn: new PiaFieldMeta().setStartChar(3).setEndChar(11),
      birthDate: new PiaFieldMeta().setStartChar(13).setEndChar(20),
      dateOfDeath: new PiaFieldMeta().setStartChar(3).setEndChar(10),
      sex: new PiaFieldMeta().setStartChar(12).setEndChar(12),
    };
  }

  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
    const line01 = {
      1: `01${
        data.ssn != undefined ? data.ssn : this.fieldFormats.ssn.getBlank()
      }${data.sex != undefined ? data.sex : " "}${
        data.birthDate != undefined
          ? PiaUtils.formatPiaDateStr(data.birthDate)
          : this.fieldFormats.birthDate.getBlank()
      }`,
    };
    const line02 = {
      2: `02${
        data.dateOfDeath != undefined
          ? PiaUtils.formatPiaDateStr(data.dateOfDeath)
          : this.fieldFormats.dateOfDeath.getBlank()
      }`,
    };

    return { ...line01, ...(data.dateOfDeath && line02) };
  }
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    const line01Str = lineMap[1];
    const line02Str = lineMap[2];

    const line01Data = line01Str
      ? {
          ssn: PiaUtils.parsePiaString(
            line01Str,
            this.fieldFormats.ssn.startChar,
            this.fieldFormats.ssn.endChar
          ),
          birthDate: PiaUtils.parsePiaDate(
            line01Str,
            this.fieldFormats.birthDate.startChar,
            this.fieldFormats.birthDate.endChar
          ),
          sex: PiaUtils.parsePiaSex(
            line01Str,
            this.fieldFormats.sex.startChar,
            this.fieldFormats.sex.endChar
          ),
        }
      : {};

    const line02Data = line02Str
      ? {
          // Maybe don't even need the end index? If all dates have the same length
          dateOfDeath: PiaUtils.parsePiaDate(line02Str, 3, 10),
        }
      : {};
    return { ...line01Data, ...line02Data };
  }
})();

const benefitSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      typeOfBenefit: new PiaFieldMeta().setStartChar(3).setEndChar(3),
      monthYearEntitlement: new PiaFieldMeta().setStartChar(4).setEndChar(9),
      monthYearBenefit: new PiaFieldMeta().setStartChar(3).setEndChar(8),
    };
  }
  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
    const line03 = {
      3: `03${
        data.typeOfBenefit != undefined
          ? data.typeOfBenefit
          : this.fieldFormats.typeOfBenefit.getBlank()
      }${
        data.monthYearEntitlement != undefined
          ? PiaUtils.formatPiaMonthStr(data.monthYearEntitlement)
          : this.fieldFormats.monthYearEntitlement.getBlank()
      }`,
    };
    const line04 = {
      4: `04${
        data.monthYearBenefit != undefined
          ? PiaUtils.formatPiaMonthStr(data.monthYearBenefit)
          : this.fieldFormats.monthYearBenefit.getBlank()
      }`,
    };

    return { ...line03, ...(data.monthYearBenefit && line04) };
  }
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    let line03 = lineMap[3];
    let line04 = lineMap[4];

    let line03Data = line03
      ? {
          typeOfBenefit: PiaUtils.parseSSABenefitType(
            line03,
            this.fieldFormats.typeOfBenefit.startChar,
            this.fieldFormats.typeOfBenefit.endChar
          ),
          monthYearEntitlement: PiaUtils.parsePiaMonthYear(
            line03,
            this.fieldFormats.monthYearEntitlement.startChar,
            this.fieldFormats.monthYearEntitlement.endChar
          ),
        }
      : {};
    let line04Data = line04
      ? {
          monthYearEntitlement: PiaUtils.parsePiaMonthYear(
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
const oasdiEarningsSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;

  // all start at 3 and continue for number of entries based on other values.
  constructor() {
    this.fieldFormats = {
      firstEarningYearActual: new PiaFieldMeta().setStartChar(3).setEndChar(6),
      lastEarningYearActual: new PiaFieldMeta().setStartChar(7).setEndChar(10),
      typeOfEarnings: new PiaFieldMeta().setStartChar(3).setFieldCharLength(1), //TODO: use fieldCharLength with generic
      typeOfTaxes: new PiaFieldMeta().setStartChar(3), //line21
      oasdiEarnings: new PiaFieldMeta()
        .setStartChar(3)
        .setStartLine(22)
        .setEndLine(29)
        .setFieldCharLength(11),
      hiEarnings: new PiaFieldMeta()
        .setStartChar(3)
        .setStartLine(30)
        .setEndLine(37)
        .setFieldCharLength(11),
    };
  }

  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
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
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    const line6Str = lineMap[6];
    const line20Str = lineMap[20];
    // const line21Str = lineMap[21];
    var oasdiLine: string = "";

    const line6Data = line6Str
      ? {
          firstEarningYearActual: parseInt(
            PiaUtils.piaSubstr(
              line6Str,
              this.fieldFormats.firstEarningYearActual.startChar,
              this.fieldFormats.firstEarningYearActual.endChar || 0 //TODO: handle undefined
            ),
            10
          ),
          lastEarningYearActual: parseInt(
            PiaUtils.piaSubstr(
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
    let oasdiData: Map<PiaTypes.PiaYear, PiaTypes.PiaEarnings> = new Map<
      PiaTypes.PiaYear,
      PiaTypes.PiaEarnings
    >();
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
        const parsedLine = PiaUtils.parseYearEarningsLineString(
          oasdiLine,
          this.fieldFormats.oasdiEarnings.startChar,
          lineYear,
          this.fieldFormats.oasdiEarnings.fieldCharLength
        );
        oasdiData = new Map<PiaTypes.PiaYear, PiaTypes.PiaEarnings>([
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
    var hiData: Map<PiaTypes.PiaYear, PiaTypes.PiaEarnings> = new Map<
      PiaTypes.PiaYear,
      PiaTypes.PiaEarnings
    >();
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
        const parsedLine = PiaUtils.parseYearEarningsLineString(
          hiLine,
          this.fieldFormats.hiEarnings.startChar,
          lineYear,
          this.fieldFormats.hiEarnings.fieldCharLength
        );
        hiData = new Map<PiaTypes.PiaYear, PiaTypes.PiaEarnings>([
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
    let line22To29Data: Partial<PiaTypes.PiaData> = {
      oasdiEarnings: oasdiData,
    };

    /*Earnings on lines 30-37 are for period starting with maximum of 1983
     and first year specified on line 6 and ending with last year on line 6.
      Each earnings amount takes 11 positions, with two decimal places and
       leading blanks if required, e.g. "  100000.00" for $100,000.00 in earnings.
       */
    /*TODO: handle only 1983 range */
    var line30To37Data: Partial<PiaTypes.PiaData> = {
      hiEarnings: hiData,
    };

    const line20Data = line20Str
      ? {
          typeOfEarnings: PiaUtils.parsePiaTypeOfEarningsString(
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

const monthlyNoncoveredPensionSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      monthlyNoncoveredPensionAmount: new PiaFieldMeta()
        .setStartChar(3)
        .setEndChar(12)
        .setFieldCharLength(10),
      monthYearEntitlementNoncoveredPension: new PiaFieldMeta()
        .setStartChar(13)
        .setEndChar(18),
    };
  }
  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
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
          ? PiaUtils.formatPiaMonthStr(
              data.monthYearEntitlementNoncoveredPension
            )
          : this.fieldFormats.monthYearEntitlementNoncoveredPension.getBlank()
      }`,
    };

    return { ...(data.monthlyNoncoveredPensionAmount && line12) };
  }
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    let line12 = lineMap[12];

    let line12Data = line12
      ? {
          monthlyNoncoveredPensionAmount: PiaUtils.parsePiaFloat(
            PiaUtils.piaSubstr(
              line12,
              this.fieldFormats.monthlyNoncoveredPensionAmount.startChar,
              this.fieldFormats.monthlyNoncoveredPensionAmount.endChar
            )
          ),
          monthYearEntitlementNoncoveredPension: PiaUtils.parsePiaMonthYear(
            line12,
            this.fieldFormats.monthYearEntitlementNoncoveredPension.startChar,
            this.fieldFormats.monthYearEntitlementNoncoveredPension.endChar
          ),
        }
      : {};
    return { ...line12Data };
  }
})();

const nameOfWorkerSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      nameOfWorker: new PiaFieldMeta().setStartChar(3).setEndChar(37), //TODO truncate to spec
    };
  }
  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
    const line16 = {
      16: `16${
        data.nameOfWorker != undefined
          ? data.nameOfWorker
          : this.fieldFormats.nameOfWorker.getBlank()
      }`,
    };

    return { ...(data.nameOfWorker && line16) };
  }
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    let line16 = lineMap[16];

    let line16Data = line16
      ? {
          nameOfWorker: PiaUtils.piaSubstr(
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
const oldQuartersOfCoverageSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      oldQuartersOfCoverageStubString: new PiaFieldMeta()
        .setStartChar(3)
        .setEndChar(8),
    };
  }
  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
    const line95 = {
      95: `95${
        data.oldQuartersOfCoverageStubString != undefined
          ? data.oldQuartersOfCoverageStubString
          : this.fieldFormats.oldQuartersOfCoverageStubString.getBlank()
      }`,
    };

    return { ...(data.oldQuartersOfCoverageStubString && line95) };
  }
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    let line95 = lineMap[95];

    let line95Data = line95
      ? {
          oldQuartersOfCoverageStubString: PiaUtils.piaSubstr(
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
const wageBaseSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      wageBaseStubString: new PiaFieldMeta().setStartChar(3).setEndChar(9),
    };
  }
  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
    const line40 = {
      40: `40${
        data.wageBaseStubString != undefined
          ? data.wageBaseStubString
          : this.fieldFormats.wageBaseStubString.getBlank()
      }`,
    };

    return { ...(data.wageBaseStubString && line40) };
  }
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    let line40 = lineMap[40];

    let line40Data = line40
      ? {
          wageBaseStubString: PiaUtils.piaSubstr(
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
const earningsProjectionStubSerializer: PiaSerializer = new (class {
  fieldFormats: Record<string, PiaFieldMeta>;
  constructor() {
    this.fieldFormats = {
      pastProjectionStubString: new PiaFieldMeta()
        .setStartChar(3)
        .setEndChar(13),
      futureProjectionStubString: new PiaFieldMeta()
        .setStartChar(3)
        .setEndChar(13),
    };
  }
  serialize(data: Partial<PiaTypes.PiaData>): PiaTypes.PiaLineMap {
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
  deserialize(lineMap: PiaTypes.PiaLineMap): Partial<PiaTypes.PiaData> {
    let line7 = lineMap[7];
    let line8 = lineMap[8];

    let line7Data = line7
      ? {
          pastProjectionStubString: PiaUtils.piaSubstr(
            line7,
            this.fieldFormats.pastProjectionStubString.startChar,
            this.fieldFormats.pastProjectionStubString.endChar
          ),
        }
      : {};
    let line8Data = line8
      ? {
          futureProjectionStubString: PiaUtils.piaSubstr(
            line8,
            this.fieldFormats.futureProjectionStubString.startChar,
            this.fieldFormats.futureProjectionStubString.endChar
          ),
        }
      : {};
    return { ...line7Data, ...line8Data };
  }
})();

const Pia_SERIALIZERS: PiaSerializer[] = [
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
 * Given a list of lines in the AnyPia format, return a map from
 * line number to the line string itself.
 */
function createLineMap(lines: string[]): PiaTypes.PiaLineMap {
  return lines.reduce((lineMap, line) => {
    const lineNum = parseInt(line.slice(0, 2), 10);
    return Object.assign(lineMap, { [lineNum]: line });
  }, {});
}

function deserializePiaData(lines: string[]): PiaTypes.PiaData {
  const lineMap = createLineMap(lines);
  const piaDataInit = initializePiaData();
  const deserializedData = Pia_SERIALIZERS.reduce(
    (data, serializer) => Object.assign(data, serializer.deserialize(lineMap)),
    piaDataInit
  );

  return deserializedData;
}

function serializePiaData(data: PiaTypes.PiaData): PiaTypes.PiaLineMap {
  const lines = Pia_SERIALIZERS.reduce(
    (lineMap, serializer) => Object.assign(lineMap, serializer.serialize(data)),
    {}
  );
  console.log(data);
  return lines;
}

function initializePiaData(): PiaTypes.PiaData & PiaTypes.PiaDataAdapter {
  const piaData: PiaTypes.PiaData & PiaTypes.PiaDataAdapter = {
    ssn: undefined,
    birthDate: undefined,
    sex: undefined,
    dateOfDeath: undefined,
    typeOfBenefit: undefined,
    monthYearBenefit: undefined,
    monthYearEntitlement: undefined,
    firstEarningYearActual: undefined,
    lastEarningYearActual: undefined,
    typeOfEarnings: undefined,
    typeOfTaxes: undefined,
    oasdiEarnings: undefined,
    hiEarnings: undefined,
    monthlyNoncoveredPensionAmount: undefined,
    monthYearEntitlementNoncoveredPension: undefined,
    nameOfWorker: undefined,
    oldQuartersOfCoverageStubString: undefined,
    wageBaseStubString: undefined,
    pastProjectionStubString: undefined,
    futureProjectionStubString: undefined,
    piaEverythingElse: undefined,

    getSSN() {
      return this.ssn;
    },
    setSSN(value) {
      this.ssn = value;
    },
    getBirthDate() {
      return this.birthDate;
    },
    setBirthDate(value) {
      this.birthDate = value;
    },
    getSex() {
      return this.sex;
    },
    setSex(value) {
      this.sex = value;
    },
    getDateOfDeath() {
      return this.dateOfDeath;
    },
    setDateOfDeath(value) {
      this.dateOfDeath = value;
    },
    getTypeOfBenefit() {
      return this.typeOfBenefit;
    },
    setTypeOfBenefit(value) {
      this.typeOfBenefit = value;
    },
    getMonthYearBenefit() {
      return this.monthYearBenefit;
    },
    setMonthYearBenefit(value) {
      this.monthYearBenefit = value;
    },
    getMonthYearEntitlement() {
      return this.monthYearEntitlement;
    },
    setMonthYearEntitelemnt(value) {
      this.monthYearEntitlement = value;
    },
    getFirstEarningYearActual() {
      return this.firstEarningYearActual;
    },
    setFirstEarningYearActual(value) {
      this.firstEarningYearActual = value;
    },
    getLastEarningYearActual() {
      return this.lastEarningYearActual;
    },
    setLastEarningYearActual(value) {
      this.lastEarningYearActual = value;
    },
    getTypeOfEarnings() {
      return this.typeOfEarnings;
    },
    setTypeOfEarnings(value) {
      this.typeOfEarnings = value;
    },
    getTypeOfTaxes() {
      return this.typeOfTaxes;
    },
    setTypeOfTaxes(value) {
      this.typeOfTaxes = value;
    },
    getOasdiEarnings() {
      return this.oasdiEarnings;
    },
    setOasdiEarnings(value) {
      this.oasdiEarnings = value;
    },
    getHiEarnings() {
      return this.hiEarnings;
    },
    setHiEarnings(value) {
      this.hiEarnings = value;
    },
    getMonthlyNoncoveredPensionAmount() {
      return this.monthlyNoncoveredPensionAmount;
    },
    setMonthlyNoncoveredPensionAmount(value) {
      this.monthlyNoncoveredPensionAmount = value;
    },
    getMonthYearEntitlementNoncoveredPension() {
      return this.monthYearEntitlementNoncoveredPension;
    },
    setMonthYearEntitlementNoncoveredPension(value) {
      this.monthYearEntitlementNoncoveredPension = value;
    },
    getNameOfWorker() {
      return this.nameOfWorker;
    },
    setNameOfWorker(value) {
      this.nameOfWorker = value;
    },
    getOldQuartersOfCoverageStubString() {
      return this.oldQuartersOfCoverageStubString;
    },
    setOldQuartersOfCoverageStubString(value) {
      this.oldQuartersOfCoverageStubString = value;
    },
    getWageBaseStubString() {
      return this.wageBaseStubString;
    },
    setWageBaseStubString(value) {
      this.wageBaseStubString = value;
    },
    getPastProjectionStubString() {
      return this.pastProjectionStubString;
    },
    setPastProjectionStubString(value) {
      this.pastProjectionStubString = value;
    },
    getFutureProjectionStubString() {
      return this.futureProjectionStubString;
    },
    setFutureProjectionStubString(value) {
      this.futureProjectionStubString = value;
    },
    getPiaEverythingElse() {
      return this.piaEverythingElse;
    },
    setPiaEverythingElse(value) {
      this.piaEverythingElse = value;
    },
  };
  return piaData;
}

export class PiaFormat {
  piaAll: string;
  piaData: PiaTypes.PiaData;
  constructor(piaInput: string, fileName: string) {
    this.piaAll = piaInput;
    const lines = piaInput.split("\n");
    this.piaData = deserializePiaData(lines);
  }
  //TODO - getters and setters for retire date, birthdate and earnings.
  setBirthDate(date: PiaTypes.PiaDate) {
    this.piaData.birthDate = date;
    return this;
  }

  getBirthDate() {
    return this.piaData.birthDate;
  }

  setEntitlementDate(monthYear: PiaTypes.PiaMonthYear) {
    this.piaData.monthYearBenefit = monthYear;
    return this;
  }

  getEntitlementDate() {
    return this.piaData.monthYearBenefit;
  }

  setOsdiEarnings(year: Number, earnings: Number) {
    this.piaData.oasdiEarnings?.set(year, earnings);
    return this;
  }

  outputPia() {
    var linesRecords = serializePiaData(this.piaData);
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
