/**
 * Created by evilcode on 2017/12/1.
 */
import { NavigationActions } from 'react-navigation'
import NavigationStack from './Routes'

const INITIAL_STATE = NavigationStack.router.getStateForAction(NavigationActions.init())

// if yes => update the stack
// if no => pass current stack through
export default (state = INITIAL_STATE, action) => {
    const nextState = NavigationStack.router.getStateForAction(action, state)

    return nextState || state
}