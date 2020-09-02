import { createStore } from 'redux'
import { rootReducer } from './rootReducer'

export const store = createStore(rootReducer)
export const dispatch = store.dispatch