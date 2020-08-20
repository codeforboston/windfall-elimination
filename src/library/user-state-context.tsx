import * as React from 'react'
import { PiaYear, PiaEarnings } from './pia/pia-types'

export enum EarningsEnum {
  XML = "XML",
  PDF = "PDF",
  PDFPRINT = "PDFPRINT",
  PAPER = "PAPER"
}

export type EarningsMap = Map<PiaYear,PiaEarnings>;
export interface EarningsRecord {
  [year: string]: number
}

export enum PensionEnum {
  PENSION = "MONTHLYPENSION",
  LUMPSUM = "LUMPSUMRETIREMENTACCOUNT",
  NONEOFABOVE = "NONEOFABOVE"
}

// Calculated results for the user
export interface UserProfile {
  'Standard PIA': string
  'WEP PIA': string
  'WEP Diff': string
  MPB: string
  yearsSubstantialEarnings: number
  pensionNonCoveredMonthly: number | null | undefined
  aime: number
  fullRetireDate: string
}

export interface UserState {
  birthDate: Date | null
  retireDate: Date | null
  fullRetirementAge: number | null
  fullRetirementAgeYearsOnly: number | null
  fullRetirementAgeMonthsOnly: number | null
  year62: number | null
  haveEarnings: boolean | null
  earningsFormat: EarningsEnum | null
  earnings: EarningsRecord | null
  haveSSAAccount: boolean | null
  isEmploymentCovered: boolean | null
  pensionOrRetirementAccount: PensionEnum | null
  pensionAmount: number | null
  pensionDateAwarded: Date | null
  userProfile: UserProfile | null
}

const UserStateContext = React.createContext<UserState | null>(null)

export const UserStateContextProvider = UserStateContext.Provider

export function useUserState(): UserState {
  const userState = React.useContext(UserStateContext)
  if (!userState) {
    throw new Error('Cannot access user state outside of a `<UserStateManager>`.')
  }
  return userState
}
