import * as dayjs from "dayjs";

// Typescript's Record type assumes every key has a value, which is usually not true
type Dictionary<K extends string | number, V> = Partial<Record<K, V>>;

// Map from line ID to full line string
type PIALineMap = Dictionary<number, string>;

interface PIASerializer {
  field_formats: Record<string, PIAFieldMeta>;
  serialize: (data: Partial<PIAData>) => PIALineMap;
  deserialize: (lineMap: PIALineMap) => Partial<PIAData>;
}

class PIAFieldMeta {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
  getBlank(): string {
    let len = this.end - this.start + 1;
    return " ".repeat(len);
  }
}

/*
return ['01', this.ssn, this.sex, dayjs(this.birthDate).format("MMDDYYYY"),'\n', this.piaEverythingElse.join('\n')].join('');
*/
const basicInfoSerializer: PIASerializer = new (class {
  field_formats: Record<string, PIAFieldMeta>;
  constructor() {
    this.field_formats = {
      ssn: new PIAFieldMeta(3, 11),
      birthDate: new PIAFieldMeta(13, 20),
      dateOfDeath: new PIAFieldMeta(3, 10),
      sex: new PIAFieldMeta(12, 12),
    };
  }

  serialize(data: Partial<PIAData>): PIALineMap {
    const line01 = {
      1: `01${
        data.ssn != undefined ? data.ssn : this.field_formats.ssn.getBlank()
      }${data.sex != undefined ? data.sex : " "}${
        data.birthDate != undefined
          ? dayjs(data.birthDate).format("MMDDYYYY")
          : this.field_formats.birthDate.getBlank()
      }`,
    };
    const line02 = {
      2: `02${
        data.dateOfDeath != undefined
          ? dayjs(data.dateOfDeath).format("MMDDYYYY")
          : this.field_formats.dateOfDeath.getBlank()
      }`,
    };

    return { ...line01, ...line02 };
  }
  deserialize(lineMap: PIALineMap, data: Partial<PIAData>): Partial<PIAData> {
    const line01Str = lineMap[1];
    const line02Str = lineMap[2];

    const line01Data = line01Str
      ? {
          ssn: parsePiaString(
            line01Str,
            this.field_formats.ssn.start,
            this.field_formats.ssn.end
          ),
          birthDate: parsePiaDate(
            line01Str,
            this.field_formats.birthDate.start,
            this.field_formats.birthDate.end
          ),
          sex: parsePiaSex(
            line01Str,
            this.field_formats.sex.start,
            this.field_formats.sex.end
          ),
        }
      : {};

    const line02Data = line02Str
      ? {
          // Maybe don't even need the end index? If all dates have the same length
          dateOfDeath: parsePiaDate(line02Str, 3, 10),
        }
      : {};
    return { ...line01Data, line02Data };
  }
})();

const PIA_SERIALIZERS: PIASerializer[] = [
  basicInfoSerializer,
  // dateOfDeathSerializer,
  // disabilityDatesSerializer,
  //…
];

/**
 * Given a list of lines in the AnyPIA format, return a map from
 * line number to the line string itself.
 */
function createLineMap(lines: string[]): PIALineMap {
  return lines.reduce((lineMap, line) => {
    const lineNum = Number.parseInt(line.slice(0, 2));
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
  return lines;
}

enum PIASex {
  male = 0,
  female = 1,
}

interface PIAData {
  ssn?: string;
  birthDate?: Date;
  dateOfDeath?: Date;
  sex?: PIASex;
  oasdiEarnings?: Array<number>;
  firstEarningYearActual?: number;
  lastEarningYearActual?: number;
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
    var lines = serializePIAData(this.piaData);

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

function parsePiaMonth(lineStr: string, start: number, end: number): Date {
  let ymStr = piaSubstr(lineStr, start, end);
  var djs = dayjs();
  let year = ymStr.slice(0, 2);
  let month = ymStr.slice(2);
  djs
    .set("month", parseInt(month, 10))
    .set("year", parseInt(year, 10))
    .set("day", 1);
  return djs.toDate();
}

function parsePiaSex(lineStr: string, start: number, end: number): PIASex {
  let genderStr = piaSubstr(lineStr, start, end);
  let genInt = parseInt(genderStr);
  let sex: PIASex = genInt;
  return sex;
}

function parsePiaDate(lineStr: string, start: number, end: number): Date {
  var djs = dayjs();
  let ymdStr = piaSubstr(lineStr, start, end);
  let year = ymdStr.slice(0, 2);
  let month = ymdStr.slice(2, 4);
  let day = ymdStr.slice(4);
  /* dayjs will use local timezone */
  /* starts in mmddyyyy */
  djs
    .set("month", parseInt(month, 10))
    .set("year", parseInt(year, 10))
    .set("date", parseInt(day, 10));
  return djs.toDate();
}

//Parces a pia currency values
function parsePiaCurrency(val: string): Number {
  val = val.replace(".", "");
  return parseInt(val) / 100.0;
}

function parsePiaFloat(val: string): Number {
  return parseFloat(val);
}
