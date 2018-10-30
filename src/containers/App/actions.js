import request from '@/utils/request'
import * as selfConstants from './constants'

export const updateModal = payload => {
  return {
    type: selfConstants.UPDATE_MODAL,
    payload
  }
}
