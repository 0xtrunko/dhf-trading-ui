import React from 'react'
export default class Component extends React.Component {
  render () {
    const { data } = this.props;
    return (
      <div>
        {
          data.map((item, index) => {
            const { c1, c2, c3 } = item
            return (
              <div className="d-flex" key={index}>
                <div className="text-right number-font-size pr-2" style={{ flexBasis: '33.33%' }}>{c1()}</div>
                <div className="text-right number-font-size pr-2" style={{ flexBasis: '33.33%' }}>{c2()}</div>
                <div className="text-right number-font-size pr-2" style={{ flexBasis: '33.33%' }}>{c3()}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
