import * as React from 'react'

export interface UserState {
  birthDate: Date | null
  retireDate: Date | null
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
