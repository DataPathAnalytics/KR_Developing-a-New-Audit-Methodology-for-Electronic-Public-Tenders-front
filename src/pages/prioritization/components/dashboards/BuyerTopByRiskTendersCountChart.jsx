import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchBuyerTopByRiskTendersCount } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import shortid from 'shortid'
import { Spin } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { yAxisFormatter } from '../../../../utils/ChartYAxisFormater'
import { toNumberFormatWithPC } from '../../../../utils/NumberUtils'

class BuyerTopByRiskTendersCountChart extends Component {
  // componentDidMount() {
  //   this.props.fetchBuyerTopByRiskTendersCount()
  // }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.filterRequestBody, this.props.filterRequestBody)) {
  //     this.props.fetchBuyerTopByRiskTendersCount(this.props.filterRequestBody)
  //   }
  // }

  render() {
    const { translate, dashboardBuyerTopByRiskTendersCount, dashboardBuyerTopByRiskTendersCountIsFetching } = this.props

    return (
      <Spin spinning={dashboardBuyerTopByRiskTendersCountIsFetching} size="large">
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
              text: translate('chart_title_top_10_procurement_entities_with_risky_tenders'),
              align: 'left',
              x: 20,
              y: 20,
              style: {
                fontSize: 16,
                fontWeight: '700',
              },
            },
            xAxis: {
              categories: _.map(dashboardBuyerTopByRiskTendersCount, (item) => (item.name)),
              title: {
                text: translate('chart_axis_procuring_entity'),
              },
              tickPositions: [],
            },
            yAxis: {
              title: {
                text: translate('chart_axis_tenders_with_risk'),
              },
              labels: {
                formatter: function () {
                  return yAxisFormatter(this.value, 'count')
                },
              },
            },
            plotOptions: {
              series: {
                // groupPadding: 0.01,
                pointWidth: 30,
                stacking: 'normal',
              },
            },

            legend: {
              align: 'right',
              verticalAlign: 'middle',
              floating: false,
              itemStyle: {
                'word-wrap': 'break-word',
              },
              width: '50%',
              layout: 'vertical',
              itemMarginBottom: 10,
              symbolHeight: '0px',
              labelFormatter: function () {

                return (
                  '<b style="font-weight:600; font-size: 14px;">' + this.name + '</b>' +
                  '<br/>' +
                  '<span style="font-weight:100;font-size:14px;">' + translate('dashboard_buyer_tenders_with_risk') + ' </span>' +
                  '<b>' + this.yData[0] + '</b>. ' +
                  '<span style="font-weight:100;font-size:14px;">' + translate('dashboard_buyer_tenders_without_risk') + ' </span>' +
                  '<b>' + this.yData[1] + '</b>.'
                )
              },
            },
            tooltip: {
              shared: true,
              outside: true,
              formatter: function () {
                return `<b>${this.x}
                </b><br>${translate('dashboard_buyer_tenders_without_risk')} <b>${toNumberFormatWithPC(this.points[0].total - this.y)}</b>
                </b><br>${translate('dashboard_buyer_tenders_with_risk')} <b>${toNumberFormatWithPC(this.y)}</b>`
              },
            },
            credits: { enabled: false },
            series: _.map(dashboardBuyerTopByRiskTendersCount, (item, index) => {
              return {
                data: [{
                  y: Math.round(item.riskValue),
                  color: '#cc4748',
                  x: index,
                },
                  {
                    y: Math.round(item.value),
                    color: '#2f4074',
                    x: index,
                  }],
                name: item.name,

              }
            }),
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
    dashboardBuyerTopByRiskTendersCount: prioritizationStore.dashboardBuyerTopByRiskTendersCount,
    dashboardBuyerTopByRiskTendersCountIsFetching: prioritizationStore.dashboardBuyerTopByRiskTendersCountIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuyerTopByRiskTendersCount: bindActionCreators(fetchBuyerTopByRiskTendersCount, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(BuyerTopByRiskTendersCountChart))
