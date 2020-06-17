import * as dayjs from "dayjs";

enum PIASex {
  male = 0,
  female = 1,
}

interface PIAData {
  ssn?: string;
  birthDate?: Date;
  sex?: PIASex;
  oasdiEarnings: Array<number>;
  firstEarningYearActual: number;
  lastEarningYearActual: number;
  piaEverythingElse: string;
  
}

enum PIATypes {
  piaString = "string",
  piaSex = "piaSex",
  piaDate = "date",
  piaMonthYear = "monthyear",
  piaInt = "int",
  piaDecimal = "decimal",
  piaFloat = "float",
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

function parsePiaLine(line: string): Partial<PIAData> {
  let lineType = line.slice(0, 2);
  console.log("lineType",lineType);
  let dataFormats = getPiaFieldFormats(lineType);
  let piaData:Partial<PIAData> = <Partial<PIAData>>{};
  console.log("dataFormats",dataFormats);
  if (dataFormats != null) {
    dataFormats.forEach((fieldFormat) => {
      let endPos:number = line.length
      if (fieldFormat.end != undefined){endPos = fieldFormat.end;}
      let dataStr = line.slice(fieldFormat.start - 1, endPos);

      switch (fieldFormat.type) {
        case PIATypes.piaDate:
          let dateVal: Date = parsePiaDate(dataStr);
          Object.assign(piaData,{[fieldFormat.name]:dateVal});
          break;
        case PIATypes.piaSex:
          let gender: PIASex = parsePiaSex(dataStr);
          Object.assign(piaData,{[fieldFormat.name]:gender});
          break;
        case PIATypes.piaInt:
          let dataNum = parseInt(dataStr, 10);
          piaData = Object.assign(piaData, {
            [fieldFormat.name]: dataNum
          });
          break;
        case PIATypes.piaDecimal:
          break;
        case PIATypes.piaFloat:
          break;
        case PIATypes.piaMonthYear:
          break;
        case PIATypes.piaString:
          console.log(piaData)
          piaData = Object.assign(piaData, {
            [fieldFormat.name]: dataStr
          });
          break;
      }
    });
  }
  return piaData;
}

export class PiaFormat {
  piaAll: string;
  piaData: PIAData;
  constructor(piaInput: string, fileName: string) {
    this.piaAll = piaInput;
    const lines = piaInput.split("\n");
    this.piaData = <PIAData>{};
    lines.forEach((line) => {
      Object.assign(this.piaData,parsePiaLine(line));
    });

    // this.piaEverythingElse = lines
    // .slice(1)
    // .map(n => n.join(''));
  }

  outputPIA() {

    //TODO: save result from getPiaFieldFormats() at an earlier point.
    //it is a template for parsing lines. Should be the same for every
    // line passed in.
    return [
      "01",
      JSON.stringify(this.piaData),
      this.piaData.sex,
      dayjs(this.piaData.birthDate).format("MMDDYYYY"),
      "\n",
      // this.piaEverythingElse.join("\n"),
    ].join("");
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



//   }
//     new PIAFieldFormat("ssn", 3, 11, PIATypes.piaString),
//     new PIAFieldFormat("sex", 12, 12, PIATypes.piaGender),
//     new PIAFieldFormat("birthDate", 12, 14, PIATypes.piaDate),
//   ],
// };
/*
  const lines = piaInput.split("\n").map((line) => [line.slice(0, 2), line])

  let piaData: Partial<PiaData> = {}
  let everythingElse = ""
  lines.forEach(line => {
    const [lineCode, strLine] = line
    const parser = lineParsers[lineCode]
    if (parser) {
      Object.assign(piaData, parser(strLine))
    }
    else everythingElse = `${everythingElse}\n${strLine}`
  })
*/


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

/* "01": (contents: string): Partial<PiaData> => {
  return {
    ssn: parsePiaString(contents.slice(3, 11)),
    birthDate: parsePiaData(contents.slice(13, 20)),
    sex: parsePiaSex(contents.slice(12, 13)),
  }
}*/

// const piaOut = {
//   "01": (contents:PiaData): string => {
//     return 
//       [writePiaString(ssn),
//       writePiaDate(birthDate),
//       writePiaGender(gender), 
//       writePadding(2)
//     ].join('')
//   }
// }


// const piaLineFormats =  {
//   "01": (contents: string): Partial<PiaData> => {
//     return {
//       ssn: parsePiaString(contents.slice(3,11)),
//       birthDate: parsePiaDate(contents.slice(13,20)),
//       sex: parsePiaGender(contents.slice(12,13))
//     }
//   }

//     console.log(fileName, lines, this.birthDate, this.piaEverythingElse);
//   }
//   piaAll: string | undefined;
//   piaEverythingElse: Array<string>;
//   ssn: string;
//   sex: Number;
//   birthDate: Date;

// }

/* "01": (contents: string): Partial<PiaData> => {
  return {
    ssn: parsePiaString(contents.slice(3, 11)),
    birthDate: parsePiaData(contents.slice(13, 20)),
    sex: parsePiaSex(contents.slice(12, 13)),
  }
}*/

// const piaOut = {
//   "01": (contents:PiaData): string => {
//     return 
//       [writePiaString(ssn),
//       writePiaDate(birthDate),
//       writePiaGender(gender), 
//       writePadding(2)
//     ].join('')
//   }
// }


// const piaLineFormats =  {
//   "01": (contents: string): Partial<PiaData> => {
//     return {
//       ssn: parsePiaString(contents.slice(3,11)),
//       birthDate: parsePiaDate(contents.slice(13,20)),
//       sex: parsePiaGender(contents.slice(12,13))
//     }
//   }
