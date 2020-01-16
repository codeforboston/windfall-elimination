import React, {useMemo} from 'react'
import createPersistedState from 'use-persisted-state';
import dayjs from 'dayjs'

import {UserStateContextProvider, UserState} from './user-state-context'
import {UserStateActions, UserStateActionsContextProvider} from './user-state-actions-context'

// Must use sessionStorage (not localStorage) or else it conflicts with other uses of sessionStorage within app
const useBirthDateState = createPersistedState('BirthDate', global.sessionStorage);
const useRetireDateState = createPersistedState('RetireDate', global.sessionStorage);

/**
 * Helper function to get a Date object equivalent to the start of the date given
 */
function startOfDay(date: Date): Date {
  return dayjs(date).startOf('day').toDate()
}

interface UserStateManagerProps {
  children: React.ReactNode
}

/**
 * Serve as a multi-context provider for descendent components, providing them with access to
 * the user state and a set of actions to mutate that state, while persisting it to session storage.
 */
export default function UserStateManager(props: UserStateManagerProps): JSX.Element {
  const {children} = props
  const [birthDate, setBirthDate] = useBirthDateState<Date | null>(null)
  const [retireDate, setRetireDate] = useRetireDateState<Date | null>(null)

  const actions: UserStateActions = useMemo(() => ({
    setBirthDate: date => setBirthDate(startOfDay(date)),
    setRetireDate: date => setRetireDate(startOfDay(date)),
  }), [setBirthDate, setRetireDate])

  const userState: UserState = useMemo(() => ({
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
