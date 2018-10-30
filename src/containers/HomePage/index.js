import React from 'react'
import { connect } from 'react-redux'
import * as selfActions from './actions'
import * as appActions from '@/containers/App/actions'
import { bindActionCreators } from 'redux'
import Desktop from '@/components/Desktop'

export class HomePage extends React.Component {
  render () {
    return (
      <Desktop />
    )
  }
}

export const mapStateToProps = state => {
  return {
    isLoading: state.home.isLoading,
    resultGetArticles: state.home.resultGetArticles
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    selfActions: bindActionCreators(selfActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
