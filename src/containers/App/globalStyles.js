import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(21, 35, 44);
    color: rgb(255, 255, 255);
    
    font-family: atlas, sans-serif;
    -webkit-font-smoothing: antialiased;
  }  
  
  .scrollable {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .border-bottom {
    border-bottom: 1px solid rgb(20, 24, 28) !important;
  }
  .border-top {
    border-top: 1px solid rgb(20, 24, 28) !important;
  }
  
  .number-font-size {
    font-size: 11px;
  }
  .green {
    color: #79F65B;
  }
  .red {
    color: #FF5D32;
  }
  .light {
    color: #CBCDCF;
  }
  .grey {
    color: #676E72;
  }
  
  hr {
    border-top: 2px solid rgb(92, 101, 107);
  }
  
  [role="button"] {
    cursor: pointer;
  }
  
  .group-input {
    display: flex;
    height: 40px;
    background: rgb(92, 101, 107);
    border: 1px solid rgb(20, 24, 28);
    & > input {
      background: transparent;
      border: none;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(255, 255, 255);
      font-weight: bold;
      font-size: 13px;
      text-align: right;
      padding-right: 10px;
      &:focus {
        outline: none;
      }
    }
    & > [role="suffix"] {
      width: 55px;
      border-left: 1px solid rgb(20, 24, 28);
      font-weight: bold;
      font-size: 11px;
      color: rgb(233, 233, 233);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .main-content {
    display: grid;
    gap: 1px 1px;
    background: rgb(20, 24, 28);
    
    @media (min-width: 786px) and (max-width: 1024px) {
      grid-template-columns: 279px 1fr 1fr;
      grid-template-rows: 1fr 1fr 220px;
      grid-template-areas: "sidebar chart-tabbed chart-tabbed"
                           "sidebar order-book trade-history"
                           "sidebar trading trading";
    }
    
    @media (min-width: 1024px) and (max-width: 1365px) {
      grid-template-columns: 259px 300px 1fr;
      grid-template-rows: 1fr 220px;
      grid-template-areas: "sidebar order-book chart-tabbed"
                           "sidebar trading trading";
                           
      [name="trade-history"] {
        display: none !important;
      }
    }
    @media (min-width: 1365px) {
      grid-template-columns: 279px 300px 1fr 285px;
      grid-template-rows: 1fr 1fr 280px;
      grid-template-areas: "sidebar order-book chart-tabbed trade-history"
                           "sidebar order-book chart-tabbed trade-history"
                           "sidebar order-book trading trade-history";
    }
    
    & > div {
      background: rgb(21, 35, 44);
      min-width: 0px;
      min-height: 0px;
    }
    .header {
      height: 46px;
      font-weight: bold;
      font-size: 12px;
      padding: 0 28px;
      display: flex;
      flex-shrink: 0;
      -webkit-box-align: center;
      align-items: center;
      border-bottom: 1px solid rgb(20, 24, 28);
      background: rgb(47, 61, 69);
    }
    .subHeader {
      height: 31px;
      font-size: 11px;
      color: rgb(233, 233, 233);
      background: rgb(21, 35, 44);
      display: flex;
      flex-shrink: 0;
      & > div {
        flex-basis: 33.33%;
        justify-content: flex-end;
        padding-right: 6px;
        align-items: center;
        display: flex;
      }
    }
    [name="sidebar"] {
      grid-area: sidebar;
      & > div[role="content"] {
        font-size: 11px;
        color: rgb(233, 233, 233);
        padding: 20px 28px;
      }
      .btn-place-order {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 10px;
        background: rgb(82, 195, 53);
        color: white;
        &[data-type="sell"] {
          background: rgb(239, 79, 27);
        }
      }
    }
    
    [name="order-book"] {
      grid-area: order-book;
      .sell {
        // min-height: 800px;
        height: 50%;
      }
      .buy {
        // min-height: 800px;
        height: 50%;
      }
    }
    
    [name="chart-tabbed"] {
      grid-area: chart-tabbed;
      background: #dbdbdb;
    }
    
    [name="trading"] {
      grid-area: trading;
    }
    
    [name="trade-history"] {
      grid-area: trade-history;
    }

  }
`

export default GlobalStyle
