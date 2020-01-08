import React from 'react'
import createPersistedState from 'use-persisted-state';

import {UserStateContextProvider, UserState} from './user-state-context'
import {UserStateActions, UserStateActionsContextProvider} from './user-state-actions-context'

// Must use sessionStorage (not localStorage) or else it conflicts with other uses of sessionStorage within app
const useBirthDateState = createPersistedState<Date | null>('BirthDate', global.sessionStorage);
const useRetireDateState = createPersistedState<Date | null>('RetireDate', global.sessionStorage);

interface UserStateManagerProps {
  children: React.ReactNode
}

interface UserStateManagerState {
  userState: UserState
}

/**
 * Return a date-setting function which, when given a Date, calls the provided set function with
 * the ISO8601 string representing the start of the day.
 */
function createDateSetter(setFn: (dateStr: string) => void): ((d: Date) => void) {
  return (date: Date): void => {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    setFn(startOfDay.toISOString())
  }
}

export default function UserStateManager(props: UserStateManagerProps): JSX.Element {
  const {children} = props
  const [birthDate, setBirthDate] = useBirthDateState(null)
  const [retireDate, setRetireDate] = useRetireDateState(null)

  const actions: UserStateActions = {
    setBirthDate: createDateSetter(setBirthDate),
    setRetireDate: createDateSetter(setRetireDate)
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
