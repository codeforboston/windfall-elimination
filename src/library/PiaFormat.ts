import * as dayjs from "dayjs";
import data from "src/pages/data";

enum PIAGender {
  male = 0,
  female = 1,
}

class PIAData {
  ssn?: string;
  birthDate?: Date;
  sex?: PIAGender;

  assign(key: keyof PIAData, value: any) {
    switch (key) {
      case "ssn":
        this.ssn = value;
        break;
      case "birthDate":
        this.birthDate = value;
        break;
      case "sex":
        this.sex = value;
        break;
    }
  }
}

enum PIATypes {
  piaString = "string",
  piaGender = "piaGender",
  piaDate = "date",
  piaMonthYear = "monthyear",
  piaInt = "int",
  piaDecimal = "decimal",
  piaFloat = "float",
}

class PIAFieldFormat {
  name: keyof PIAData;
  start: number;
  end: number;
  type: PIATypes;
  constructor(name: keyof PIAData, start: number, end: number, type: PIATypes) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.type = type;
  }
}
const piaLineFormats: Record<string, PIAFieldFormat[]> = {
  "01": [
    new PIAFieldFormat("ssn", 3, 11, PIATypes.piaString),
    new PIAFieldFormat("sex", 12, 12, PIATypes.piaGender),
    new PIAFieldFormat("birthDate", 12, 14, PIATypes.piaDate),
  ],
};

function parsePiaLine(line: string, piaData: PIAData): PIAData {
  let lineType = line.slice(0, 2);
  console.error(lineType);
  let dataFormats = piaLineFormats[lineType];

  console.error(dataFormats);
  if (dataFormats != null) {
    dataFormats.forEach((fieldFormat) => {
      let dataStr = line.slice(fieldFormat.start, fieldFormat.end + 1);

      switch (fieldFormat.type) {
        case PIATypes.piaDate:
          let dateVal: Date = parsePiaDate(dataStr);
          piaData.assign(fieldFormat.name, dateVal);
          break;
        case PIATypes.piaGender:
          let gender: PIAGender = parsePiaGender(dataStr);
          piaData.assign(fieldFormat.name, gender);
          break;
        case PIATypes.piaInt:
          break;
        case PIATypes.piaDecimal:
          break;
        case PIATypes.piaFloat:
          break;
        case PIATypes.piaMonthYear:
          break;
        case PIATypes.piaString:
          piaData.assign(fieldFormat.name, dataStr);
          break;
      }
    });
  }
  return piaData;
}

// const constructPieceType = (value: string, ourType: PIATypesEnum) => {
//   switch (ourType) {
//     case PIATypesEnum.piaDate:
//       if (value.length !== 8) {
//         console.warn("piaFormat date is invalid length");
//       }
//       /* dayjs will use local timezone */
//       /* starts in mmddyyyy, dayjs takes yyyy-mm-dd */
//       return dayjs(
//         [value.slice(4, 8), value.slice(0, 2), value.slice(2, 4)].join("-")
//       ).toDate();
//       break;
//     case PIATypesEnum.piaInt:
//       return new Number(value);
//       break;
//     case PIATypesEnum.piaString:
//     default:
//       return value;
//       break;
//   }
//   return;
// };

export class PiaFormat {
  piaAll: string;
  piaData: PIAData;
  constructor(piaInput: string, fileName: string) {
    this.piaAll = piaInput;
    const lines = piaInput.split("\n");
    this.piaData = new PIAData();
    lines.forEach((line) => {
      this.piaData = parsePiaLine(line, this.piaData);
    });
  }

  outputPIA() {
    return [
      "01",
      this.piaData.assign,
      this.piaData.sex,
      dayjs(this.piaData.birthDate).format("MMDDYYYY"),
      "\n",
      //this.piaEverythingElse.join("\n"),
    ].join("");
  }
}

// export class PiaFormat {
//   constructor(piaInput: string, fileName: string) {
//     this.piaAll = piaInput;
//     const lines = piaInput
//       .split("\n")
//       .map((n) => [n.slice(0, 2), n.slice(2)])
//       .map((m) => piaLineParser(m[0], m[1]));

//     /* we should not index this array from zero
//     because the file format does not, just roll them
//     into one object for every '01', '03', etc. line
//     if it exists */
//     this.ssn = lines[0][1][0].value;
//     this.sex = lines[0][1][1].value;
//     this.birthDate = lines[0][1][2].value;
//     this.piaEverythingElse = lines.slice(1).map((n) => n.join(""));

//     console.log(fileName, lines, this.birthDate, this.piaEverythingElse);
//   }
//   piaAll: string | undefined;
//   piaEverythingElse: Array<string>;
//   ssn: string;
//   sex: Number;
//   birthDate: Date;

// }

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

function parsePiaGender(genderStr: string): PIAGender {
  let genInt = parseInt(genderStr);
  let gender: PIAGender = genInt;
  return gender;
}

function parsePiaDate(ymdStr: string): Date {
  var djs = dayjs();
  let year = ymdStr.slice(0, 2);
  let month = ymdStr.slice(2, 4);
  let day = ymdStr.slice(4);
  djs
    .set("month", parseInt(month, 10))
    .set("year", parseInt(year, 10))
    .set("date", parseInt(day, 10));
  return djs.toDate();
}

//Parces a pia currency values
function piaCurrency(val: string): Number {
  val = val.replace(".", "");
  return parseInt(val) / 100.0;
}

function piaFloat(val: string): Number {
  return parseFloat(val);
}
