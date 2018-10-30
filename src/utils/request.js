import 'isomorphic-fetch'

const fetch2 = (url, options = {}) => {
  // eslint-disable-next-line
  options = {
    // your default options
    // credentials: 'same-origin',
    // redirect: 'error',
    headers: {},
    ...options
  }
  // eslint-disable-next-line
  return fetch(url, options);
}

const parseJSON = response => {
  return response.json()
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const request = (url, options) => {
  return fetch2(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export default request
