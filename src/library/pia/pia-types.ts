// Typescript's Record type assumes every key has a value, which is usually not true
export type Dictionary<K extends string | number, V> = Partial<Record<K, V>>;

// Map from line ID to full line string
export type PiaLineMap = Dictionary<number, string>;

export class PiaDate extends Date {}

export class PiaMonthYear extends Date {}

export class PiaYear extends Number {}
export class PiaEarnings extends Number {}
export class PiaFloat extends Number {}
export enum PiaSex {
  male = 0,
  female = 1,
}

export enum SSABenefitType {
  oldAge = 1,
  survivor = 2,
  disability = 3,
}

/* http://thadk.net/anypiamac-docs/html/Forms/type_of_earnings.html */
export enum PiaTypeOfEarnings {
  enteredEarnings = 0,
  maximum = 1,
  high = 2,
  average = 3,
  low = 4,
}

// Line 8
export enum PiaTypeOfProjections {
  noProjection = 0,
  projectionRelatedToAverageWageIncrease = 1,
  projectionByAConstantPercentage = 2,
}

//Line 40
export enum PiaTypeOfBenefitIncreaseAssumption {
  alternative1Optimistic = 1,
  alternative2Intermediate = 2,
  alternative3Pessimistic = 3,
  noFutureIncreases = 4,
  other = 5,
}

//Line 40
export enum PiaTypeOfWageIncreaseAssumption {
  alternative1Optimistic = 1,
  alternative2Intermediate = 2,
  alternative3Pessimistic = 3,
  noFutureIncreases = 4,
  other = 5,
}

//Line 40,
export enum PiaTypeOfMaxWageBaseProjection {
  alternative1Optimistic = 1,
  alternative2Intermediate = 2,
  alternative3Pessimistic = 3,
  noFutureIncreases = 4,
  other = 5,
}

export enum PiaTypeOfTaxes {
  employeeTaxes = 0,
  selfEmployedTaxes = 1,
}

export interface PiaData {
  ssn?: string; //line1
  birthDate?: PiaDate;
  sex?: PiaSex;
  dateOfDeath?: PiaDate; //line2
  typeOfBenefit?: SSABenefitType; //line 4
  monthYearBenefit?: PiaMonthYear;
  monthYearEntitlement?: PiaMonthYear;
  firstEarningYear?: PiaYear; //line6 //first year of projected and inputed earnings
  lastEarningYear?: PiaYear; //end of projected and inputed earnings
  typeOfEarnings?: Map<PiaYear, PiaTypeOfEarnings>; //line20
  typeOfTaxes?: Map<PiaYear, PiaTypeOfTaxes>; //line21
  oasdiEarnings?: Map<PiaYear, PiaEarnings>; //line22-29
  hiEarnings?: Map<PiaYear, PiaEarnings>;
  monthlyNoncoveredPensionAmount?: PiaEarnings; //line12
  monthYearEntitlementNoncoveredPension?: PiaMonthYear;
  nameOfWorker?: string; //line16
  oldQuartersOfCoverageStubString?: string;
  //wageBaseStubString?: string; //line 40
  pastProjectionStubString?: string;
  //futureProjectionStubString?: string;
  forwardProjectionType?: PiaTypeOfProjections; //line 8
  forwardProjectionPercentage?: PiaFloat; //line 8
  firstYearForwardEarningsProjections?: PiaYear; //line 8
  firstYearProjectedEarningsForQC?: PiaYear; //line 40
  earningsForQCIncreaseAssumption?: PiaTypeOfBenefitIncreaseAssumption; //line 40
  avgWageIncreaseAssumption?: PiaTypeOfWageIncreaseAssumption; //line 40
  maxWageBaseProjectionInd?: PiaTypeOfMaxWageBaseProjection; //line 40

  piaEverythingElse?: string;
}

//Getter Setter Interface
export interface PiaDataAdapter {
  getSSN(): string | undefined;
  setSSN(value: string | undefined): void;

  getBirthDate(): PiaDate | undefined;
  setBirthDate(value: PiaDate | undefined): void;

  getSex(): PiaSex | undefined;
  setSex(value: PiaSex | undefined): void;

  getDateOfDeath(): PiaDate | undefined;
  setDateOfDeath(value: PiaDate | undefined): void;

  getTypeOfBenefit(): SSABenefitType | undefined;
  setTypeOfBenefit(value: SSABenefitType | undefined): void;

  getMonthYearBenefit(): PiaMonthYear | undefined;
  setMonthYearBenefit(value: PiaMonthYear | undefined): void;

  getMonthYearEntitlement(): PiaMonthYear | undefined;
  setMonthYearEntitelemnt(value: PiaMonthYear | undefined): void;

  getFirstEarningYear(): PiaYear | undefined;
  setFirstEarningYear(value: PiaYear | undefined): void;

  getLastEarningYear(): PiaYear | undefined;
  setLastEarningYear(value: PiaYear | undefined): void;

  getTypeOfEarnings(): Map<PiaYear, PiaTypeOfEarnings> | undefined;
  setTypeOfEarnings(value: Map<PiaYear, PiaTypeOfEarnings> | undefined): void;

  getTypeOfTaxes(): Map<PiaYear, PiaTypeOfTaxes> | undefined;
  setTypeOfTaxes(value: Map<PiaYear, PiaTypeOfTaxes> | undefined): void;

  getOasdiEarnings(): Map<PiaYear, PiaEarnings> | undefined;
  setOasdiEarnings(value: Map<PiaYear, PiaEarnings> | undefined): void;

  getHiEarnings(): Map<PiaYear, PiaEarnings> | undefined;
  setHiEarnings(value: Map<PiaYear, PiaEarnings> | undefined): void;

  getMonthlyNoncoveredPensionAmount(): PiaEarnings | undefined;
  setMonthlyNoncoveredPensionAmount(value: PiaEarnings | undefined): void;

  getMonthYearEntitlementNoncoveredPension(): PiaMonthYear | undefined;
  setMonthYearEntitlementNoncoveredPension(
    value: PiaMonthYear | undefined
  ): void;

  getNameOfWorker(): string | undefined;
  setNameOfWorker(value: string | undefined): void;

  getOldQuartersOfCoverageStubString(): string | undefined;
  setOldQuartersOfCoverageStubString(value: string | undefined): void;

  getPastProjectionStubString(): string | undefined;
  setPastProjectionStubString(value: string | undefined): void;

  getPiaEverythingElse(): string | undefined;
  setPiaEverythingElse(value: string | undefined): void;
}
