import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import users from './users/reducer'

const combinedReducer = combineReducers({
  users,
})

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      users: {
        connected: state.users.connected
      }
    }
    return nextState
  } else {
    return combinedReducer(state, action);
  }
}

const initStore = () => {
  return createStore(combinedReducer, composeWithDevTools(
    applyMiddleware()
  ))
}

export const wrapper = createWrapper(initStore)