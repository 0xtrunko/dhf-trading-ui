import React from 'react'
// import PropTypes from 'prop-types'
export default class Component extends React.Component {
  render () {
    const { curPage, hasNextPage, onChangePage, ...rest } = this.props
    const isFirstPage = curPage === 0
    const curPageDisplayed = curPage + 1 // one-based
    return (
      <span {...rest}>
        <button
          className='btn btn-light'
          disabled={isFirstPage}
          onClick={() => onChangePage(0)}
        >
          {'|<'} First
        </button>
        <button
          className='btn btn-light ml-2'
          disabled={isFirstPage}
          onClick={() => onChangePage(curPage - 1)}
        >
          {'<'} Previous
        </button>
        <span className='ml-2 align-middle'>Page {curPageDisplayed}</span>
        <button
          disabled={!hasNextPage}
          className='btn btn-light ml-2'
          onClick={() => onChangePage(curPage + 1)}
        >
          Next {'>'}
        </button>
      </span>
    )
  }
}
