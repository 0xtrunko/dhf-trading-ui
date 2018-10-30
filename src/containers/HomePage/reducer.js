import * as selfConstants from './constants'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case selfConstants.GET_ARTICLES:
      return {
        ...state,
        isLoading: true
      }
    case selfConstants.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        resultGetArticles: action.payload.response,
        isLoading: false
      }
    case selfConstants.GET_ARTICLES_FAIL:
      return {
        ...state,
        errorGetArticles: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
export default reducer
