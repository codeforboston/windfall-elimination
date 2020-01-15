import * as React from 'react'

import {EarningsEnum, EarningsData} from './user-state-context'

export interface UserStateActions {
  setBirthDate: (date: Date) => void
  setRetireDate: (date: Date) => void
  setYear62: (year: number) => void
  setHaveEarnings: (hasEarnings: boolean) => void
  setEarningsFormat: (format: EarningsEnum) => void
  setHaveSSAAccount: (hasSSAAccount: boolean) => void
  setEarnings: (earnings: EarningsData) => void
}

const UserStateActionsContext = React.createContext<UserStateActions | null>(null)

export const UserStateActionsContextProvider = UserStateActionsContext.Provider

export function useUserStateActions(): UserStateActions {
  const actions = React.useContext(UserStateActionsContext)
  if (!actions) {
    throw new Error('Cannot access user state actions outside of a `<UserStateManager>`.')
  }
  return actions
}
