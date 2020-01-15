import * as React from 'react'

export enum EarningsEnum {
  XML = "XML",
  PDF = "PDF",
  PDFPRINT = "PDFPRINT",
  PAPER = "PAPER"
}

export interface EarningsData {
  [year: string]: number
}

export interface UserState {
  birthDate: Date | null
  retireDate: Date | null
  fullRetirementAge: number | null
  year62: number | null
  haveEarnings: boolean | null
  earningsFormat: EarningsEnum | null
  haveSSAAccount: boolean | null
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
