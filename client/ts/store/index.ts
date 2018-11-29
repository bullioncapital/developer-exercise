import { combineReducers } from 'redux'

import data from './data/reducer'


let reducers = {
    data
}

// This provides typings for the state
export type RootState = {
  [P in keyof typeof reducers]: ReturnType<typeof reducers[P]>
}

export default combineReducers(reducers)