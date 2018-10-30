import { combineReducers } from 'redux'
import homeReducer from '@/containers/HomePage/reducer'
import appReducer from '@/containers/App/reducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
  home: homeReducer
})

export default rootReducer
