import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import App from '@/containers/App'

export default class Index extends Component {
  render () {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}

Index.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
