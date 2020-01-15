import * as React from 'react'

export interface UserStateActions {
  setBirthDate: (date: Date) => void
  setRetireDate: (date: Date) => void
  setYear62: (year: number) => void
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
