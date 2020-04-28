import React, { useMemo } from 'react'
import createPersistedState from 'use-persisted-state';
import dayjs from 'dayjs'

import {
  UserStateContextProvider,
  UserState,
  EarningsEnum,
  EarningsRecord,
  PensionEnum,
  UserProfile
} from './user-state-context'
import { UserStateActions, UserStateActionsContextProvider } from './user-state-actions-context'

// Must use sessionStorage (not localStorage) or else it conflicts with other uses of sessionStorage within app
const useBirthDateState = createPersistedState('BirthDate', global.sessionStorage);
const useHaveEarningsState = createPersistedState('haveEarnings', global.sessionStorage);
const useEarningsFormatState = createPersistedState('earningsFormat', global.sessionStorage);
const useHaveSSAAccountState = createPersistedState('haveSSAAccount', global.sessionStorage);
const useEarningsState = createPersistedState('earnings', global.sessionStorage);
const useIsEmploymentCoveredState = createPersistedState('coveredEmployment', global.sessionStorage);
const usePensionOrRetirementAccountState = createPersistedState('pensionOrRetirementAccount', global.sessionStorage)
const usePensionAmountState = createPersistedState('pensionAmount', global.sessionStorage)
const usePensionDateAwarded = createPersistedState('dateAwarded', global.sessionStorage)
const useUserProfile = createPersistedState('UserProfile', global.sessionStorage);
const useAwiTrendOrManualPrediction = createPersistedState("awiTrendOrManualPrediction", global.sessionStorage);
const useAwiTrendSelection = createPersistedState("awiTrendSelection", global.sessionStorage);

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
  const { children } = props
  const [birthDate, setBirthDate] = useBirthDateState<Date | null>(null)
  const [retireDate, setRetireDate] = useRetireDateState<Date | null>(null)
  const [year62, setYear62] = useYear62State<number | null>(null)
  const [haveEarnings, setHaveEarnings] = useHaveEarningsState<boolean | null>(null)
  const [earnings, setEarnings] = useEarningsState<EarningsRecord | null>(null)
  const [earningsFormat, setEarningsFormat] = useEarningsFormatState<EarningsEnum | null>(null)
  const [haveSSAAccount, setHaveSSAAccount] = useHaveSSAAccountState<boolean | null>(null)
  const [isEmploymentCovered, setIsEmploymentCovered] = useIsEmploymentCoveredState<boolean | null>(null)
  const [pensionOrRetirementAccount, setPensionOrRetirementAccount] = usePensionOrRetirementAccountState<PensionEnum | null>(null)
  const [pensionAmount, setPensionAmount] = usePensionAmountState<number | null>(null)
  const [pensionDateAwarded, setPensionDateAwarded] = usePensionDateAwarded<Date | null>(null)
  const [userProfile, setUserProfile] = useUserProfile<UserProfile | null>(null)
  const [awiTrendOrManualPrediction, setAwiTrendOrManualPrediction] = useAwiTrendOrManualPrediction<FuturePredictionEnum | null>(null)
  const [awiTrendSelection, setAwiTrendSelection] = useAwiTrendSelection<FutureTrendEnum | null>(null)

  const userState: UserState = useMemo(() => ({
    birthDate: birthDate ? new Date(birthDate) : null,
    retireDate: retireDate ? new Date(retireDate) : null,
    fullRetirementAge: (birthDate && retireDate) ? dayjs(retireDate).diff(birthDate, 'year', true) : null,
    fullRetirementAgeYearsOnly: (birthDate && retireDate) ? dayjs(retireDate).diff(birthDate, 'year', false) : null,
    fullRetirementAgeMonthsOnly: (birthDate && retireDate) ? dayjs(retireDate).diff(birthDate, 'month', false) % 12 : null,
    year62,
    haveEarnings,
    earnings,
    earningsFormat,
    haveSSAAccount,
    isEmploymentCovered,
    pensionOrRetirementAccount,
    pensionAmount,
    pensionDateAwarded,
    userProfile,
    awiTrendOrManualPrediction,
    awiTrendSelection,
  }), [birthDate, earnings, earningsFormat, haveEarnings, haveSSAAccount, isEmploymentCovered, pensionAmount, pensionDateAwarded, pensionOrRetirementAccount, retireDate, userProfile, year62, awiTrendOrManualPrediction, awiTrendSelection])

  const actions: UserStateActions = useMemo(() => ({
    setBirthDate: date => setBirthDate(startOfDay(date)),
    setRetireDate: date => setRetireDate(startOfDay(date)),
    setYear62,
    setHaveEarnings,
    setEarnings,
    setEarningsFormat,
    setHaveSSAAccount,
    setIsEmploymentCovered,
    setPensionOrRetirementAccount,
    setPensionAmount,
    setPensionDateAwarded,
    setUserProfile,
    setAwiTrendOrManualPrediction,
    setAwiTrendSelection,
  }), [setBirthDate, setEarnings, setEarningsFormat, setHaveEarnings, setHaveSSAAccount, setIsEmploymentCovered, setPensionAmount, setPensionDateAwarded, setPensionOrRetirementAccount, setRetireDate, setUserProfile, setYear62, setAwiTrendOrManualPrediction, setAwiTrendSelection])

  return (
    <UserStateContextProvider value={userState}>
      <UserStateActionsContextProvider value={actions}>
        {children}
      </UserStateActionsContextProvider>
    </UserStateContextProvider>
  )
}
