import React from 'react'
import { shallow } from 'enzyme'

import Loading from '../index'

describe('<Loading />', () => {
  it('should render something', () => {
    const renderedComponent = shallow(<Loading />)
    expect(renderedComponent.isEmptyRender()).toBeFalsy()
  })
})
