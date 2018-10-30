import * as selfConstants from './constants'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case selfConstants.UPDATE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload
        }
      }
    default:
      return state
  }
}
export default reducer
