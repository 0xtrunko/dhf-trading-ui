import React from 'react'
import List from '@/components/List'
import RadioButton from '@/components/RadioButton'

function balloon (item, graph) {
  var txt
  if (graph.id == 'asks') {
    txt =
      'Ask: <strong>' +
      formatNumber(item.dataContext.value, graph.chart, 4) +
      '</strong><br />' +
      'Total volume: <strong>' +
      formatNumber(item.dataContext.askstotalvolume, graph.chart, 4) +
      '</strong><br />' +
      'Volume: <strong>' +
      formatNumber(item.dataContext.asksvolume, graph.chart, 4) +
      '</strong>'
  } else {
    txt =
      'Bid: <strong>' +
      formatNumber(item.dataContext.value, graph.chart, 4) +
      '</strong><br />' +
      'Total volume: <strong>' +
      formatNumber(item.dataContext.bidstotalvolume, graph.chart, 4) +
      '</strong><br />' +
      'Volume: <strong>' +
      formatNumber(item.dataContext.bidsvolume, graph.chart, 4) +
      '</strong>'
  }
  return txt
}

function formatNumber (val, chart, precision) {
  return AmCharts.formatNumber(val, {
    precision: precision || chart.precision,
    decimalSeparator: chart.decimalSeparator,
    thousandsSeparator: chart.thousandsSeparator
  })
}

export default class Component extends React.Component {
  componentDidMount () {
    var chart = AmCharts.makeChart('chartdiv', {
      type: 'serial',
      theme: 'light',
      dataLoader: {
        url:
          'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=50',
        format: 'json',
        reload: 30,
        postProcess: function (data) {
          // Function to process (sort and calculate cummulative volume)
          function processData (list, type, desc) {
            // Convert to data points
            for (var i = 0; i < list.length; i++) {
              list[i] = {
                value: Number(list[i][0]),
                volume: Number(list[i][1])
              }
            }

            // Sort list just in case
            list.sort(function (a, b) {
              if (a.value > b.value) {
                return 1
              } else if (a.value < b.value) {
                return -1
              } else {
                return 0
              }
            })

            // Calculate cummulative volume
            if (desc) {
              for (var i = list.length - 1; i >= 0; i--) {
                if (i < list.length - 1) {
                  list[i].totalvolume =
                    list[i + 1].totalvolume + list[i].volume
                } else {
                  list[i].totalvolume = list[i].volume
                }
                var dp = {}
                dp['value'] = list[i].value
                dp[type + 'volume'] = list[i].volume
                dp[type + 'totalvolume'] = list[i].totalvolume
                res.unshift(dp)
              }
            } else {
              for (var i = 0; i < list.length; i++) {
                if (i > 0) {
                  list[i].totalvolume =
                    list[i - 1].totalvolume + list[i].volume
                } else {
                  list[i].totalvolume = list[i].volume
                }
                var dp = {}
                dp['value'] = list[i].value
                dp[type + 'volume'] = list[i].volume
                dp[type + 'totalvolume'] = list[i].totalvolume
                res.push(dp)
              }
            }
          }

          // Init
          var res = []
          processData(data.bids, 'bids', true)
          processData(data.asks, 'asks', false)

          // console.log(res);
          return res
        }
      },
      graphs: [
        {
          id: 'bids',
          fillAlphas: 0.1,
          lineAlpha: 1,
          lineThickness: 2,
          lineColor: '#0f0',
          type: 'step',
          valueField: 'bidstotalvolume',
          balloonFunction: balloon
        },
        {
          id: 'asks',
          fillAlphas: 0.1,
          lineAlpha: 1,
          lineThickness: 2,
          lineColor: '#f00',
          type: 'step',
          valueField: 'askstotalvolume',
          balloonFunction: balloon
        },
        {
          lineAlpha: 0,
          fillAlphas: 0.2,
          lineColor: '#000',
          type: 'column',
          clustered: false,
          valueField: 'bidsvolume',
          showBalloon: false
        },
        {
          lineAlpha: 0,
          fillAlphas: 0.2,
          lineColor: '#000',
          type: 'column',
          clustered: false,
          valueField: 'asksvolume',
          showBalloon: false
        }
      ],
      categoryField: 'value',
      chartCursor: {},
      balloon: {
        textAlign: 'left'
      },
      valueAxes: [
        {
          title: 'Volume'
        }
      ],
      categoryAxis: {
        title: 'Price (BTC/ETH)',
        minHorizontalGap: 100,
        startOnAxis: true,
        showFirstLabel: false,
        showLastLabel: false
      },
      export: {
        enabled: true
      }
    })
  }

  render () {
    const data = [
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },,
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },,
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },,
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },,
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='grey'>21:55:05</span>
      }
    ]

    const orderSell = [
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='red'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      }
    ]

    const orderBuy = [
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      },
      {
        c1: () => <span className='light'>0.0125</span>,
        c2: () => <span className='green'>5752.01</span>,
        c3: () => <span className='light'>-</span>
      }
    ]
    return (
      <div className='position-absolute w-100 h-100 d-flex flex-column'>
        <div
          style={{ height: '46px', borderBottom: '1px solid rgb(20, 24, 28)' }}
          className='d-flex align-items-center px-2 flex-shrink-0'
        >
          <span>Trading UI</span>
        </div>
        <div className='flex-grow-1 d-flex flex-column'>
          <div
            className='d-flex flex-shrink-0'
            style={{
              height: '46px',
              borderBottom: '1px solid rgb(20, 24, 28)'
            }}
          >
            <div
              style={{
                width: '280px',
                borderRight: '1px solid rgb(20, 24, 28)'
              }}
              className='d-flex justify-content-between align-items-center px-2'
            >
              <div>BTC-EUR</div>
              <div>Select Market</div>
            </div>
            <div className='d-flex align-items-center px-2'>
            </div>
          </div>

          <div className='flex-grow-1 d-flex'>
            <div className='main-content flex-grow-1'>
              <div name='sidebar' className='d-flex flex-column'>
                <div className='header'>Order Form</div>
                <div className='flex-grow-1' role='content'>
                  <RadioButton
                    type='buy-sell'
                    value='buy'
                    onClick={value => console.log('valuue', value)}
                    buttons={[
                      { value: 'buy', text: 'BUY' },
                      { value: 'sell', text: 'SELL' }
                    ]}
                  />
                  <RadioButton
                    value='market'
                    className='my-3'
                    onClick={value => console.log('valuue', value)}
                    buttons={[
                      { value: 'market', text: 'MARKET' },
                      { value: 'limit', text: 'LIMIT' },
                      { value: 'stop', text: 'STOP' }
                    ]}
                  />
                  <div>
                    <span>Amount</span>
                    <div className='group-input'>
                      <input />
                      <span role='suffix'>EUR</span>
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex justify-content-between'>
                    <div>Fee ≈</div>
                    <div>0.00 EUR</div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div>Total ≈</div>
                    <div>0.0000000 BTC</div>
                  </div>
                  <div
                    role='button'
                    className='mt-3 btn-place-order'
                    data-type='buy'
                  >
                    PLACE BUY ORDER
                  </div>
                </div>
              </div>
              <div name='order-book' className='d-flex flex-column'>
                <div className='header'>Order Book</div>
                <div className='d-flex flex-column flex-grow-1'>
                  <div className='subHeader border-bottom'>
                    <div>Market Size</div>
                    <div>Price (EUR)</div>
                    <div>My Size</div>
                  </div>
                  <div className='flex-grow-1 scrollable'>
                    <div className='sell'>
                      <List data={orderSell} />
                    </div>
                    <div className='subHeader border-bottom border-top'>
                      <div>EUR Spread</div>
                      <div>0.01</div>
                    </div>
                    <div className='buy'>
                      <List data={orderBuy} />
                    </div>
                  </div>
                  <div className='subHeader border-bottom border-top'>
                    <div>Aggregation</div>
                    <div>1.00</div>
                    <div>[-] [+]</div>
                  </div>
                </div>
              </div>
              <div name='chart-tabbed' className='d-flex flex-column'>
                <div className='header'>Depth Chart</div>
                <div id='chartdiv' className='w-100 h-100' />
              </div>
              <div name='trading' className='d-flex flex-column'>
                <div className='header'>Open Orders</div>
                <div></div>
              </div>
              <div name='trade-history' className='d-flex flex-column'>
                <div className='header'>Trade History</div>
                <div className='d-flex flex-column flex-grow-1'>
                  <div className='subHeader border-bottom'>
                    <div>Trade Size</div>
                    <div>Price (EUR)</div>
                    <div>Time</div>
                  </div>
                  <div className='flex-grow-1 scrollable'>
                    <div style={{ minHeight: '1600px' }}>
                      <List data={data} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
