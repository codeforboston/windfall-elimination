import UserStateContext from './user-state-context'
import UserStateActionsContext from './user-state-actions-context'
//import createPersistedState from 'use-persisted-state';

//const useBirthDateState = createPersistedState<Date>('birthDate');

interface UserStateManagerProps {
  children: React.ReactNode
}

interface UserStateManagerState {
  appState: AppState
}

export default function UserStateManager(props: UserStateManagerProps) {
  const {children} = props
  const [birthDate, setBirthDate] = useBirthDateState()

  const actions: GlobalStateManagerState = {
    setBirthDate,
  }

  const appState = {
    birthDate,
  }

  return (
    <UserStateContext.Provider value={appState}>
      <GlobalStateActionsContext.Provider value={actions}>
        {children}
      </GlobalStateActionsContext.Provider>
    </UserStateContext.Provider>
  )
}
