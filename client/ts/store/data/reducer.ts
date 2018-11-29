import { combineReducers, Action } from 'redux'
import { ActionTypes, Actions } from './action';

const json = (

    state = [] as string[],
    action: Actions
    ): typeof state => {
    switch (action.type) {
      case ActionTypes.SET_RECIEVED_JSON:
        return action.json
      default:
        return state
    }
    
}

export default combineReducers({
  json
})