import React from 'react'
import createPersistedState from 'use-persisted-state';
import dayjs from 'dayjs'

import {UserStateContextProvider, UserState} from './user-state-context'
import {UserStateActions, UserStateActionsContextProvider} from './user-state-actions-context'

// Must use sessionStorage (not localStorage) or else it conflicts with other uses of sessionStorage within app
const useBirthDateState = createPersistedState('BirthDate', window.sessionStorage);
const useRetireDateState = createPersistedState('RetireDate', window.sessionStorage);

function startOfDay(date: Date): Date {
  return dayjs(date).startOf('day').toDate()
}

interface UserStateManagerProps {
  children: React.ReactNode
}

export default function UserStateManager(props: UserStateManagerProps): JSX.Element {
  const {children} = props
  const [birthDate, setBirthDate] = useBirthDateState<Date | null>(null)
  const [retireDate, setRetireDate] = useRetireDateState<Date | null>(null)

  const actions: UserStateActions = {
    setBirthDate: date => setBirthDate(startOfDay(date)),
    setRetireDate: date => setRetireDate(startOfDay(date)),
  }

  const userState: UserState = React.useMemo(() => ({
    birthDate: birthDate ? new Date(birthDate) : null,
    retireDate: retireDate ? new Date(retireDate) : null,
  }), [birthDate, retireDate])

  return (
    <UserStateContextProvider value={userState}>
      <UserStateActionsContextProvider value={actions}>
        {children}
      </UserStateActionsContextProvider>
    </UserStateContextProvider>
  )
}
