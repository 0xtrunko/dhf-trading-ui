import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import AboutPage from '@/containers/AboutPage'
import HomePage from '@/containers/HomePage'
import NotFoundPage from '@/containers/NotFoundPage'
import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import * as selfActions from './actions'
import { bindActionCreators } from 'redux'

import GlobalStyles from './globalStyles'

const activeStyle = { fontWeight: 'bolder' }

export class App extends React.Component {
  closeModal = () => {
    const { selfActions } = this.props
    selfActions.updateModal({ show: false })
  }

  render () {
    const {
      modal: { show, body }
    } = this.props

    return (
      <React.Fragment>
        {/*
        <div className='mb-3'>
          <NavLink exact to='/' activeStyle={activeStyle}>
            Home
          </NavLink>
          {' | '}
          <NavLink to='/about' activeStyle={activeStyle}>
            About
          </NavLink>
        </div>
        */}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Modal isOpen={show} toggle={this.closeModal}>
          <ModalHeader toggle={this.closeModal} />
          <ModalBody>{body}</ModalBody>
        </Modal>
        <GlobalStyles />
      </React.Fragment>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export const mapStateToProps = state => {
  return state.app
}

export const mapDispatchToProps = dispatch => {
  return {
    selfActions: bindActionCreators(selfActions, dispatch)
  }
}

export default hot(module)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
)
