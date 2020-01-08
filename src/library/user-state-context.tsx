import * as React from 'react'

export interface UserState {
  birthDate: Date
}

const UserStateContext = React.createContext<UserState | null>(null)

export default UserStateContext
