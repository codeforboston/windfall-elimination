import * as React from 'react'

export interface UserState {
  birthDate?: Date | null
  retireDate?: Date | null
}

const UserStateContext = React.createContext<UserState>({})

export const UserStateContextProvider = UserStateContext.Provider

export function useUserState(): UserState {
  const userState = React.useContext(UserStateContext)
  if (!userState) {
    throw new Error('Cannot access user state actions outside of a `<UserStateManager>`.')
  }
  return userState
}
