import React from 'react'
import { shallow } from 'enzyme'

import NotFoundPage from '../index'

describe('<NotFoundPage />', () => {
  it('should render something', () => {
    const renderedComponent = shallow(<NotFoundPage />)
    expect(renderedComponent.isEmptyRender()).toBeFalsy()
  })
})
