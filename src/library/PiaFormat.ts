import dayjs from "dayjs";

enum PIATypesEnum {
  piaString = "string",
  piaDate = "date",
  piaMonthYear = "monthyear",
  piaInt = "int",
}

const piaLineParsers = {
  "01": (contents: string) => {
    const endPositions = {
      socialSec: { start: 3, end: 11, type: PIATypesEnum.piaString },
      /* 0 is male, 1 is female, but we don't use it, just store it */
      sex: { start: 12, end: 12, type: PIATypesEnum.piaInt },
      birthDate: { start: 13, end: 20, type: PIATypesEnum.piaDate },
      /* birthMonth: [13,14], 
              // birthDay: [15,16],
              // birthYear: [17,20] */
    };
    return Object.keys(endPositions).map((piece) => ({
      key: piece,
      value: constructPieceType(
        contents.slice(
          endPositions[piece].start - 3,
          endPositions[piece].end - 2
        ),
        endPositions[piece].type
      ),
    }));

    return {};
  },
};

const constructPieceType = (value: string, ourType: PIATypesEnum) => {
  switch (ourType) {
    case PIATypesEnum.piaDate:
      if (value.length !== 8) {
        console.warn("piaFormat date is invalid length");
      }
      /* dayjs will use local timezone */
      /* starts in mmddyyyy, dayjs takes yyyy-mm-dd */
      return dayjs(
          [value.slice(4, 8), value.slice(0, 2), value.slice(2, 4)]
            .join("-")
          ).toDate();
      break;
    case PIATypesEnum.piaInt:
      return new Number(value);
      break;
    case PIATypesEnum.piaString:
    default:
      return value;
      break;
  }
  return;
};

const piaLineParser = (lineId: string, contents: string) =>
  [lineId, (lineId === "01" && piaLineParsers[lineId](contents)) || contents];

export class PiaFormat {
  constructor(piaInput: string, fileName: string) {
    this.piaAll = piaInput;
    const lines = piaInput
      .split("\n")
      .map((n) => [n.slice(0, 2), n.slice(2)])
      .map((m) => piaLineParser(m[0], m[1]));


    /* we should not index this array from zero
    because the file format does not, just roll them
    into one object for every '01', '03', etc. line
    if it exists */
    this.ssn = lines[0][1][0].value;
    this.sex = lines[0][1][1].value;
    this.birthDate = lines[0][1][2].value;
    this.piaEverythingElse = lines
      .slice(1)
      .map(n => n.join(''));

    console.log(fileName, lines, this.birthDate, this.piaEverythingElse);
  }
  piaAll: string | undefined;
  piaEverythingElse: Array<string>;
  ssn: string;
  sex: Number;
  birthDate: Date;

  outputPIA() {
    return ['01', this.ssn, this.sex, dayjs(this.birthDate).format("MMDDYYYY"),'\n', this.piaEverythingElse.join('\n')].join('');
  }
}
