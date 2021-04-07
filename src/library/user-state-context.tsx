import * as React from "react";
import {
  PiaYear,
  PiaEarnings,
  PiaTypeOfBenefitIncreaseAssumption,
  PiaTypeOfWageIncreaseAssumption,
} from "../library/pia/pia-types";
export { PiaTypeOfBenefitIncreaseAssumption, PiaTypeOfWageIncreaseAssumption };

export enum EarningsEnum {
  XML = "XML",
  PDF = "PDF",
  PDFPRINT = "PDFPRINT",
  PAPER = "PAPER",
}

export type EarningsMap = Map<PiaYear, PiaEarnings>;
export interface EarningsRecord {
  [year: string]: number;
}

export enum PensionEnum {
  PENSION = "MONTHLYPENSION",
  LUMPSUM = "LUMPSUMRETIREMENTACCOUNT",
  NONEOFABOVE = "NONEOFABOVE",
}

export enum FutureAwiPredictionEnum {
  TREND = "TREND",
  MANUAL = "MANUAL",
  PERCENTAGE = "PERCENTAGE",
}

interface BendPoints {
  Amount: number;
  Percent: number;
}

// export enum FutureAwiTrendEnum {
//   INTERMEDIATE = "INTERMEDIATE",
//   LOW = "LOW",
//   HIGH = "HIGH",
// }

export interface CalculatorApp {
  Description: string;
  Name: string;
  Version: string;
}

// Calculated results for the user
export interface UserProfile {
  "Standard PIA": string;
  "WEP PIA": string;
  "WEP Diff": string;
  MPB: string;
  yearsSubstantialEarnings: number;
  pensionNonCoveredMonthly: number | null | undefined;
  aime: number;
  fullRetireDate: string;
  calculatorType: string;
  bendPoints?: BendPoints[] 
  calculatorApp?: CalculatorApp;
}

export interface UserState {
  birthDate: Date | null;
  retireDate: Date | null;
  fullRetirementAge: number | null;
  fullRetirementAgeYearsOnly: number | null;
  fullRetirementAgeMonthsOnly: number | null;
  year62: number | null;
  haveEarnings: boolean | null;
  earningsFormat: EarningsEnum | null;
  earnings: EarningsRecord | null;
  haveSSAAccount: boolean | null;
  isEmploymentCovered: boolean | null;
  pensionOrRetirementAccount: PensionEnum | null;
  pensionAmount: number | null;
  pensionDateAwarded: Date | null;
  userProfile: UserProfile | null;
  preferPiaUserCalc: boolean | null;
  expectedLastEarningYear: number | null;
  awiTrendOrManualPrediction: FutureAwiPredictionEnum | null;
  awiTrendSelection: PiaTypeOfWageIncreaseAssumption | null;
  expectedPercentageWageIncrease: number | null;
}

const UserStateContext = React.createContext<UserState | null>(null);

export const UserStateContextProvider = UserStateContext.Provider;

export function useUserState(): UserState {
  const userState = React.useContext(UserStateContext);
  if (!userState) {
    throw new Error(
      "Cannot access user state outside of a `<UserStateManager>`."
    );
  }
  return userState;
}
