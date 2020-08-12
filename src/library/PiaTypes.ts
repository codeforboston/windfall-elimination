// Typescript's Record type assumes every key has a value, which is usually not true
export type Dictionary<K extends string | number, V> = Partial<Record<K, V>>;

// Map from line ID to full line string
export type PIALineMap = Dictionary<number, string>;

export class PIADate extends Date {}

export class PIAMonthYear extends Date {}

export class PIAYear extends Number {}
export class PIAEarnings extends Number {}

export enum PIASex {
  male = 0,
  female = 1,
}

export enum SSABenefitType {
  old_age = 1,
  survivor = 2,
  disability = 3,
}

/* http://thadk.net/anypiamac-docs/html/Forms/type_of_earnings.html */
export enum PIATypeOfEarnings {
  entered_earnings = 0,
  maximum = 1,
  high = 2,
  average = 3,
  low = 4,
}

export enum PIATypeOfTaxes {
  employee_taxes = 0,
  self_employed_taxes = 1,
}

export interface PIAData {
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

//Getter Setter Interface
export interface PIADataAdapter {
  getSSN(): string | undefined;
  setSSN(value: string | undefined): void;

  getBirthDate(): PIADate | undefined;
  setBirthDate(value: PIADate | undefined): void;

  getSex(): PIASex | undefined;
  setSex(value: PIASex | undefined): void;

  getDateOfDeath(): PIADate | undefined;
  setDateOfDeath(value: PIADate | undefined): void;

  getTypeOfBenefit(): SSABenefitType | undefined;
  setTypeOfBenefit(value: SSABenefitType | undefined): void;

  getMonthYearBenefit(): PIAMonthYear | undefined;
  setMonthYearBenefit(value: PIAMonthYear | undefined): void;

  getMonthYearEntitlement(): PIAMonthYear | undefined;
  setMonthYearEntitelemnt(value: PIAMonthYear | undefined): void;

  getFirstEarningYearActual(): PIAYear | undefined;
  setFirstEarningYearActual(value: PIAYear | undefined): void;

  getLastEarningYearActual(): PIAYear | undefined;
  setLastEarningYearActual(value: PIAYear | undefined): void;

  getTypeOfEarnings(): Map<PIAYear, PIATypeOfEarnings> | undefined;
  setTypeOfEarnings(value: Map<PIAYear, PIATypeOfEarnings> | undefined): void;

  getTypeOfTaxes(): Map<PIAYear, PIATypeOfTaxes> | undefined;
  setTypeOfTaxes(value: Map<PIAYear, PIATypeOfTaxes> | undefined): void;

  getOasdiEarnings(): Map<PIAYear, PIAEarnings> | undefined;
  setOasdiEarnings(value: Map<PIAYear, PIAEarnings> | undefined): void;

  getHiEarnings(): Map<PIAYear, PIAEarnings> | undefined;
  setHiEarnings(value: Map<PIAYear, PIAEarnings> | undefined): void;

  getMonthlyNoncoveredPensionAmount(): PIAEarnings | undefined;
  setMonthlyNoncoveredPensionAmount(value: PIAEarnings | undefined): void;

  getMonthYearEntitlementNoncoveredPension(): PIAMonthYear | undefined;
  setMonthYearEntitlementNoncoveredPension(
    value: PIAMonthYear | undefined
  ): void;

  getNameOfWorker(): string | undefined;
  setNameOfWorker(value: string | undefined): void;

  getOldQuartersOfCoverageStubString(): string | undefined;
  setOldQuartersOfCoverageStubString(value: string | undefined): void;

  getWageBaseStubString(): string | undefined;
  setWageBaseStubString(value: string | undefined): void;

  getPastProjectionStubString(): string | undefined;
  setPastProjectionStubString(value: string | undefined): void;

  getFutureProjectionStubString(): string | undefined;
  setFutureProjectionStubString(value: string | undefined): void;

  getPiaEverythingElse(): string | undefined;
  setPiaEverythingElse(value: string | undefined): void;
}
