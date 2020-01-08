import * as React from 'react'

export interface UserStateActions {
  setBirthDate: (date: Date) => void
}

const UserStateActionsContext = React.createContext<UserStateActions | null>(null)

export default UserStateActionsContext
