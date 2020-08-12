import * as PiaTypes from "./pia-types";
import dayjs from "dayjs";

export function piaSubstr(str: string, start: number, end: number): string {
  let start_pos = start - 1;
  let str_len = end - start + 1;
  return str.substr(start_pos, str_len);
}

export function parsePiaString(
  str: string,
  start: number,
  end: number
): string {
  return piaSubstr(str, start, end);
}
export function parsePiaMonthYear(
  lineStr: string,
  start: number,
  end: number
): PiaTypes.PiaMonthYear {
  let moyrStr = piaSubstr(lineStr, start, end);
  let month = moyrStr.slice(0, 2);
  let year = moyrStr.slice(2);
  // console.log(moyrStr, "month", month, "year", year);
  /* starts in mmyyyy, dayjs takes yyyy-mm-dd */
  var piaMonth: PiaTypes.PiaMonthYear = dayjs(
    [parseInt(year, 10), parseInt(month, 10), 1].join("-")
  ).toDate();
  return piaMonth;
}

export function parsePiaSex(
  lineStr: string,
  start: number,
  end: number
): PiaTypes.PiaSex {
  let genderStr = piaSubstr(lineStr, start, end);
  let genInt = parseInt(genderStr, 10);
  let sex: PiaTypes.PiaSex = genInt;
  return sex;
}

export function parseSSABenefitType(
  lineStr: string,
  start: number,
  end: number
): PiaTypes.SSABenefitType {
  let benStr = piaSubstr(lineStr, start, end);
  let benInt = parseInt(benStr, 10);
  let ssaBen: PiaTypes.SSABenefitType = benInt;
  return ssaBen;
}

export function parseYearEarningsLineString(
  lineStr: string,
  startCharacter: number,
  startYear: PiaTypes.PiaYear,
  dataEntryLength: number
): Map<PiaTypes.PiaYear, PiaTypes.PiaEarnings> {
  let yrDataMap = new Map<PiaTypes.PiaYear, PiaTypes.PiaEarnings>();
  const zeroIndexStartChar = startCharacter - 1;
  let currentYear = Number(startYear);
  for (var i = zeroIndexStartChar; i < lineStr.length; i += dataEntryLength) {
    let val: PiaTypes.PiaEarnings = parsePiaCurrency(
      lineStr.substr(i, dataEntryLength)
    );
    yrDataMap.set(currentYear, val);
    currentYear = currentYear + 1;
  }
  return yrDataMap;
}

export function parsePiaTypeOfEarningsString(
  lineStr: string,
  startCharacter: number,
  startYear: PiaTypes.PiaYear
): Map<PiaTypes.PiaYear, PiaTypes.PiaTypeOfEarnings> {
  let toeMap = new Map<PiaTypes.PiaYear, PiaTypes.PiaTypeOfEarnings>();
  const zeroIndexStartCharacter = startCharacter - 1;

  let currentYear = Number(startYear);
  for (var i = zeroIndexStartCharacter; i < lineStr.length; i++) {
    let val: PiaTypes.PiaTypeOfEarnings = parseInt(lineStr.charAt(i), 10);
    toeMap.set(currentYear, val);
    currentYear = currentYear + 1;
  }
  return toeMap;
}

export function parsePiaDate(
  lineStr: string,
  start: number,
  end: number
): PiaTypes.PiaDate {
  let mdyStr = piaSubstr(lineStr, start, end);
  let month = mdyStr.slice(0, 2);
  let day = mdyStr.slice(2, 4);
  let year = mdyStr.slice(4);
  /* dayjs will use local timezone */
  /* starts in mmddyyyy, dayjs takes yyyy-mm-dd */
  let piaDate: PiaTypes.PiaDate = dayjs(
    [parseInt(year, 10), parseInt(month, 10), parseInt(day, 10)].join("-")
  ).toDate();
  return piaDate;
}

//Parces a pia currency values
export function parsePiaCurrency(val: string): Number {
  val = val.replace(".", "");
  return parseInt(val) / 100.0;
}

export function parsePiaFloat(val: string): Number {
  return parseFloat(val);
}

export function formatPiaDateStr(date: PiaTypes.PiaDate): string {
  return dayjs(date).format("MMDDYYYY");
}

export function formatPiaMonthStr(monthYear: PiaTypes.PiaMonthYear): string {
  return dayjs(monthYear).format("MMYYYY");
}
