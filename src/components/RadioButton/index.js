import React from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  & > div {
    flex: 1;
  }
  font-size: 10px;

  ${props =>
    props.type === 'buy-sell'
      ? `
    font-weight: bold;
    background: rgb(92, 101, 107);
    height: 25px;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      &[data-active="true"][data-value="buy"] {
        background: rgb(68, 190, 36);
      }
      &[data-active="true"][data-value="sell"] {
        background: rgb(239, 79, 27);
      }
    }
  `
      : `
    & > div {
      text-align: center;
      color: rgba(233, 233, 233, 0.4);
      border-bottom: 2px solid rgba(233, 233, 233, 0.4);
      font-weight: bold;
      padding-bottom: 4px;
      &[data-active="true"] {
        color: white;
        border-color: white;
      }
    }
  `};
`

export default class Component extends React.Component {
  render () {
    const { buttons, type, value, onClick, className = '' } = this.props
    return (
      <Wrapper type={type} className={className}>
        {buttons.map((button, index) => {
          const { value: itemValue, text } = button
          return (
            <div
              key={index}
              role='button'
              data-active={value === itemValue}
              data-value={itemValue}
              onClick={() => onClick(itemValue)}
            >
              {text}
            </div>
          )
        })}
      </Wrapper>
    )
  }
}
