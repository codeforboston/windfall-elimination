import React, {useMemo} from 'react'
import createPersistedState from 'use-persisted-state';
import dayjs from 'dayjs'

import {UserStateContextProvider, UserState, EarningsEnum, EarningsData } from './user-state-context'
import {UserStateActions, UserStateActionsContextProvider} from './user-state-actions-context'

// Must use sessionStorage (not localStorage) or else it conflicts with other uses of sessionStorage within app
const useBirthDateState = createPersistedState('BirthDate', global.sessionStorage);
const useHaveEarningsState = createPersistedState('haveEarnings', global.sessionStorage);
const useEarningsFormatState = createPersistedState('earningsFormat', global.sessionStorage);
const useHaveSSAAccountState = createPersistedState('haveSSAAccount', global.sessionStorage);
const useEarningsState = createPersistedState('earnings', global.sessionStorage);

// TODO The following should eventually be derived from the state values persisted to storage
const useRetireDateState = createPersistedState('RetireDate', global.sessionStorage);
const useYear62State = createPersistedState('Year62', global.sessionStorage);

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
  const [year62, setYear62] = useYear62State<number | null>(null)
  const [haveEarnings, setHaveEarnings] = useHaveEarningsState<boolean | null>(null)
  const [earningsFormat, setEarningsFormat] = useEarningsFormatState<EarningsEnum | null>(null)
  const [haveSSAAccount, setHaveSSAAccount] = useHaveSSAAccountState<boolean | null>(null)

  const userState: UserState = useMemo(() => ({
    birthDate: birthDate ? new Date(birthDate) : null,
    retireDate: retireDate ? new Date(retireDate) : null,
    fullRetirementAge: (birthDate && retireDate) ? dayjs(retireDate).diff(birthDate, 'year', true): null,
    year62,
    haveEarnings,
    earningsFormat,
    haveSSAAccount,
  }), [birthDate, earningsFormat, haveEarnings, haveSSAAccount, retireDate, year62])

  const actions: UserStateActions = useMemo(() => ({
    setBirthDate: date => setBirthDate(startOfDay(date)),
    setRetireDate: date => setRetireDate(startOfDay(date)),
    setYear62,
    setHaveEarnings,
    setEarningsFormat,
    setHaveSSAAccount,
  }), [setBirthDate, setEarningsFormat, setHaveEarnings, setHaveSSAAccount, setRetireDate, setYear62])

  return (
    <UserStateContextProvider value={userState}>
      <UserStateActionsContextProvider value={actions}>
        {children}
      </UserStateActionsContextProvider>
    </UserStateContextProvider>
  )
}
