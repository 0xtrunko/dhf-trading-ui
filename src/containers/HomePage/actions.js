import request from '@/utils/request'
import * as selfConstants from './constants'

const apiKey = '8e95d64e57b640259194c6d6491a20aa'

export const getArticles = (page = 0) => dispatch => {
  dispatch({ type: selfConstants.GET_ARTICLES })
  return request(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=singapore&page=${page}`,
    { method: 'GET' }
  )
    .then(response => {
      return dispatch({
        type: selfConstants.GET_ARTICLES_SUCCESS,
        payload: response
      })
    })
    .catch(error => {
      return dispatch({
        type: selfConstants.GET_ARTICLES_FAIL,
        payload: error
      })
    })
  //
  // dispatch({
  //   type: selfConstants.GET_ARTICLES,
  //   payload: {}
  // })
}
