import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import App from '@/containers/App'
import Root from '../index'

const mockStore = configureMockStore()

describe('<Root />', () => {
  it('should render all required components', () => {
    const store = mockStore({})
    const history = { listen: () => {} }
    const renderedComponent = shallow(<Root store={store} history={history} />)

    expect(
      renderedComponent.contains(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      )
    ).toBeTruthy()
  })
})
