import React from 'react'
import { shallow } from 'enzyme'

import AboutPage from '../index'

describe('<AboutPage />', () => {
  it('should render something', () => {
    const renderedComponent = shallow(<AboutPage />)
    expect(renderedComponent.isEmptyRender()).toBeFalsy()
  })
})
