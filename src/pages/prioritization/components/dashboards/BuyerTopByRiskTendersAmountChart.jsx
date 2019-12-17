import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { fetchBuyerTopByRiskTendersAmount } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { Spin } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import shortid from 'shortid'
import { toCurrencyWithPostfix } from '../../../../utils/NumberUtils'
import { yAxisFormatter } from '../../../../utils/ChartYAxisFormater'

class BuyerTopByRiskTendersAmountChart extends Component {
  // componentDidMount() {
  //   this.props.fetchBuyerTopByRiskTendersAmount()
  // }

  componentDidUpdate(prevProps) {
    // if (!_.isEqual(prevProps.filterRequestBody, this.props.filterRequestBody)) {
    //   this.props.fetchBuyerTopByRiskTendersAmount(this.props.filterRequestBody)
    // }

    let temp = ReactDOM.findDOMNode(this).getElementsByClassName('not-padding-left')
    _.forEach(temp, (reactItem) => {
      reactItem.x.baseVal.value = reactItem.x.baseVal.value + 3
    })
  }

  render() {
    const { translate, dashboardBuyerTopByRiskTendersAmount, dashboardBuyerTopByRiskTendersAmountIsFetching } = this.props
    let xAxisPosition = 0
    let seriesData = _.map(dashboardBuyerTopByRiskTendersAmount, (item, index) => {
      return {
        name: item.name,
        data: [{
          name: item.name,
          y: Math.round(item.riskValue),
          color: '#cc4748',
          x: xAxisPosition++,
          withRisk: true,
          description: false,
          className: 'not-padding-left',
        }, {
          name: item.name,
          y: Math.round(item.value),
          color: '#2f4074',
          x: xAxisPosition++,
          withRisk: false,
          description: true,
        },],
      }
    })

    return (
      <Spin spinning={dashboardBuyerTopByRiskTendersAmountIsFetching} size="large">
        <HighchartsReact
          key={shortid.generate()}
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'column',
              height: 550,
              spacing: [0, 0, 0, 0],
            },
            title: {
              text: translate('chart_title_top_10_procurement_entities_by_value_of_tenders_with_risks'),
              align: 'left',
              x: 20,
              y: 20,
              style: {
                fontSize: 16,
                fontWeight: '700',
              },
            },
            xAxis: {
              categories: _.map(dashboardBuyerTopByRiskTendersAmount, (item) => (item.name)),
              title: {
                text: translate('chart_axis_procuring_entity'),
              },
              tickPositions: [],
            },
            yAxis: {
              title: {
                text: translate('chart_bids_value'),
              },
              labels: {
                formatter: function () {
                  return yAxisFormatter(this.value, 'amount')
                },
              },
            },
            plotOptions: {
              series: {
                groupPadding: 0.2,
                pointWidth: window.innerWidth < 1450 ? 15 : 20,
                //stacking: 'normal'
              },
              column: {
                grouping: true,
                shadow: false,
              },
            },

            legend: {
              enabled: true,
              width: '50%',
              align: 'right',
              verticalAlign: 'middle',
              layout: 'vertical',
              itemMarginBottom: 10,
              symbolHeight: '0px',
              labelFormatter: function () {
                return (
                  '<b style="font-weight:600;font-size:14px;">' + this.name + '</b>' +
                  '<br/>' +
                  '<span style="font-weight:100; font-size: 14px;">' + translate('dashboard_buyer_sum_of_offers_with_risk') + ' </span>' +
                  '<b>' + toCurrencyWithPostfix(this.yData[0]) + '</b>' +
                  '<span style="font-weight:100;font-size: 14px;"> ' + translate('dashboard_buyer_sum_of_offers_without_risk') + ' </span>' +
                  '<b>' + toCurrencyWithPostfix(this.yData[1]) + '</b>'
                )
              },
            },
            tooltip: {
              shared: true,
              outside: true,
              formatter: function () {
                return (
                  '<b>' + this.points[0].key + '</b>' +
                  '<br>' +
                  '<span>' + (this.points[0].point.withRisk ? translate('dashboard_buyer_sum_of_offers_with_risk') : translate('dashboard_buyer_sum_of_offers_without_risk')) + ' </span>' +
                  '<b>' + toCurrencyWithPostfix(this.y) + '</b>'
                )
                // return `<b>${this.points[0].key}
                // </b><br>${this.points[0].point.withRisk ? translate('dashboard_buyer_sum_of_offers_with_risk') : translate('dashboard_buyer_sum_of_offers_without_risk')}
                // <b>${toCurrencyWithPostfix(this.y)}</b>`
              },
            },
            credits: { enabled: false },
            series: seriesData,
          }}
        />
      </Spin>
    )
  }
}

function mapStateToProps({
                           prioritizationStore,
                           mappingsStore,
                           buyerStore,
                           tenderStore,
                           templatesStore,
                         }) {
  return {
    filterRequestBody: prioritizationStore.filterRequestBody,
    dashboardBuyerTopByRiskTendersAmount: prioritizationStore.dashboardBuyerTopByRiskTendersAmount,
    dashboardBuyerTopByRiskTendersAmountIsFetching: prioritizationStore.dashboardBuyerTopByRiskTendersAmountIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuyerTopByRiskTendersAmount: bindActionCreators(fetchBuyerTopByRiskTendersAmount, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(BuyerTopByRiskTendersAmountChart))
