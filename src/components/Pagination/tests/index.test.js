import React from 'react'
import { mount } from 'enzyme'

import Pagination from '../index'

describe('<Pagination />', () => {
  // it('should have 3 buttons', () => {
  //   const renderedComponent = mount(<Pagination />)
  //   expect(renderedComponent.find('button')).toHaveLength(3)
  // })
  it('should handle all click events', () => {
    const onClickSpy = jest.fn()
    const renderedComponent = mount(<Pagination curPage={1} hasNextPage onChangePage={onClickSpy} />)
    renderedComponent.find('button').forEach(node => {
      node.simulate('click')
    })
    expect(onClickSpy).toHaveBeenCalledTimes(3)
  })
})
