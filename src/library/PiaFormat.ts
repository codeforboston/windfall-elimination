import * as dayjs from "dayjs";

// Typescript's Record type assumes every key has a value, which is usually not true
type Dictionary<K extends string | number, V> = Partial<Record<K, V>>

// Map from line ID to full line string
type PIALineMap = Dictionary<number, string>

interface PIASerializer {
  serialize: (data: Partial<PIAData>) => PIALineMap
  deserialize: (lineMap: PIALineMap) => Partial<PIAData>
}
/*
return ['01', this.ssn, this.sex, dayjs(this.birthDate).format("MMDDYYYY"),'\n', this.piaEverythingElse.join('\n')].join('');
*/
const basicInfoSerializer: PIASerializer = {
  serialize: (data) => {
    const line01 = {
      1: `01 ${data.ssn} ${data.sex} ${dayjs(data.birthDate).format("MMDDYYYY")}`
    }
    const line02 = !data.dateOfDeath ? {} : {
      2: `02 ${dayjs(data.dateOfDeath).format("MMDDYYYY")}`
    }

    return {...line01, ...line02}
  },
  deserialize: (lineMap) => {
    const line01Str = lineMap[1]
    const line02Str = lineMap[2]

    const line01Data = line01Str ? {
      ssn: parsePiaString(line01Str, 3, 11),
      birthDate: parsePiaDate(line01Str, 13, 20),
    } : {}

    const line02Data = line02Str ? {
      // Maybe don't even need the end index? If all dates have the same length
      dateOfDeath: parsePiaDate(line02Str, 3, 10),
    } : {}
    return {...line01Data, line02Data}
  }
}

const PIA_SERIALIZERS: PIASerializer[] = [
  basicInfoSerializer,
  // dateOfDeathSerializer,
  // disabilityDatesSerializer,
  //…
]

/**
 * Given a list of lines in the AnyPIA format, return a map from
 * line number to the line string itself.
 */
function createLineMap(lines: string[]): PIALineMap {
  return lines.reduce((lineMap, line) => {
    const lineNum = Number.parseInt(line.slice(0, 2))
    return Object.assign(lineMap, {[lineNum]: line})
  }, {})
}

function deserializePIAData(lines: string[]): Partial<PIAData> {
  const lineMap = createLineMap(lines)
  const deserializedData = PIA_SERIALIZERS.reduce((data, serializer) => (
    Object.assign(data, serializer.deserialize(lineMap))
  ), {})

  return deserializedData
}

function serializePIAData(data: PIAData): PIALineMap {
  const lines = PIA_SERIALIZERS.reduce((lineMap, serializer) => (
    Object.assign(lineMap, serializer.serialize(data))
  ), {})

  return lines
}


enum PIASex {
  male = 0,
  female = 1,
}

interface PIAData {
  ssn?: string;
  birthDate?: Date;
  sex?: PIASex;
  oasdiEarnings?: Array<number>;
  firstEarningYearActual?: number;
  lastEarningYearActual?: number;
  piaEverythingElse: string;
  
}

class PIAFieldFormat {
  name: keyof PIAData;
  start: number;
  end: number | undefined;
  pos: number | undefined;
  type: PIATypes;
  constructor(name: keyof PIAData,type: PIATypes, start: number, end: number | undefined = undefined,  pos: number | undefined = undefined) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.type = type;
    this.pos = pos;
  }
  
}

/* TODO: Iterate through all the possible lines number and generate an dictionary object for each line format. */
// const piaLineFormats: Record<string, PIAFieldFormat[]> = {
  // "01": [
  //   new PIAFieldFormat("ssn", PIATypes.piaString, 3, 11),
  //   new PIAFieldFormat("sex", PIATypes.piaGender, 12, 12),
  //   new PIAFieldFormat("birthDate",PIATypes.piaDate,12, 14),
  // ],
// };

function getPiaFieldFormats(lineNum:string):PIAFieldFormat[] {
  switch(lineNum) {
    case '01':
      return  [
      new PIAFieldFormat("ssn", PIATypes.piaString, 3, 11),
      new PIAFieldFormat("sex", PIATypes.piaSex, 12, 12),
      new PIAFieldFormat("birthDate", PIATypes.piaDate, 12, 14),
    ];
   
    case '06':
      return [
        new PIAFieldFormat("firstEarningYearActual", PIATypes.piaInt, 3, 6),
        new PIAFieldFormat("lastEarningYearActual", PIATypes.piaInt, 7, 10)
    ]
   
    // case '20':
    //   return [new PIAFieldFormat("int", 3, 14, 0)];
    //   break;
    // case '21':
    //   return [new PIAFieldFormat("int", 3, 14, 0)]
    //   break;
    case '22':
    case '23':
    case '24':
    case '25':
    case '26':
    case '27':
    case '28':
    case '29':
    //   let constEarningsWidth = 11;
    //   for (let i = 0; i*constEarningsWidth < line.length; i++) {
    //     new PIAFieldFormat("decimal", 3, 14, PIATypes.piaDecimal, i),
    //   }
    // return [
    //   new PIAFieldFormat("decimal", 3, 14, , PIATypes.piaDecimal, 0),
    // ]
    default:
      return [new PIAFieldFormat("piaEverythingElse", PIATypes.piaString, 0)];
  }

}

export class PiaFormat {
  piaAll: string;
  piaData: PIAData;
  constructor(piaInput: string, fileName: string) {
    this.piaAll = piaInput;
    const lines = piaInput.split("\n");
    this.piaData = <PIAData>{};
    lines.forEach((line) => {
      Object.assign(this.piaData, parsePiaLine(line));
    });

    // this.piaEverythingElse = lines
    // .slice(1)
    // .map(n => n.join(''));
  }

  outputPIA() {

    serializePIAData(this.piaData)

    //TODO: save result from getPiaFieldFormats() at an earlier point.
    //it is a template for parsing lines. Should be the same for every
    // line passed in.
    // return [
    //   "01",
    //   JSON.stringify(this.piaData),
    //   this.piaData.sex,
    //   dayjs(this.piaData.birthDate).format("MMDDYYYY"),
    //   "\n",
    //   // this.piaEverythingElse.join("\n"),
    // ].join("");
  }
}

function parsePiaString(str:string):string {
  return str;
}

function parsePiaMonth(ymStr: string): Date {
  var djs = dayjs();
  let year = ymStr.slice(0, 2);
  let month = ymStr.slice(2);
  djs
    .set("month", parseInt(month, 10))
    .set("year", parseInt(year, 10))
    .set("day", 1);
  return djs.toDate();
}

function parsePiaSex(genderStr: string): PIASex {
  let genInt = parseInt(genderStr);
  let sex: PIASex = genInt;
  return sex;
}

function parsePiaDate(ymdStr: string): Date {
  var djs = dayjs();
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