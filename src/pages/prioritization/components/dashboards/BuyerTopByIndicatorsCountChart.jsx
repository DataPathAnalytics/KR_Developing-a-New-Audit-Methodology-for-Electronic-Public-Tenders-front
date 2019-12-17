import React, { Component } from 'react'
import { fetchBuyerTopByIndicatorsCount } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { Spin } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import shortid from 'shortid'
import { yAxisFormatter } from '../../../../utils/ChartYAxisFormater'
import { toNumberFormatWithPC } from '../../../../utils/NumberUtils'

class BuyerTopByIndicatorsCountChart extends Component {
  render() {
    const { translate, dashboardBuyerTopByIndicatorsCount, dashboardBuyerTopByIndicatorsCountIsFetching } = this.props

    return (
      <Spin spinning={dashboardBuyerTopByIndicatorsCountIsFetching} size="large">
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
              text: translate('chart_title_top_10_procurement_entitiesby_number_of_unique_risk_indicators_with_positive_results'),
              align: 'left',
              x: 20,
              y: 20,
              style: {
                fontSize: 16,
                fontWeight: '700',
              },
            },
            xAxis: {
              categories: _.map(dashboardBuyerTopByIndicatorsCount, (item, index) => (item.name)),
              title: {
                text: translate('chart_axis_procuring_entity'),
              },
              tickPositions: [],
            },
            yAxis: {
              title: {
                text: translate('chart_risk_tenders_by_count'),
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
                  '<span style="font-weight:100;font-size:14px;">' + translate('number_of_unique_triggered_indicators') + ' </span>' +
                  '<b>' + this.yData[0] + '</b>'
                )
              },
            },
            tooltip: {
              shared: true,
              outside: true,
              formatter: function () {
                return `<b>${this.x}</b><br>${translate('number_of_unique_triggered_indicators')} <b>${toNumberFormatWithPC(this.y)}</b>`
              },
            },
            credits: { enabled: false },
            series: _.map(dashboardBuyerTopByIndicatorsCount, (item, index) => {
              return {
                data: [{
                  y: Math.round(item.value),
                  // color: CHART_COLORS[index],
                  color: (index === 0) ? '#cc4748' : '#2f4074',
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
    dashboardBuyerTopByIndicatorsCount: prioritizationStore.dashboardBuyerTopByIndicatorsCount,
    dashboardBuyerTopByIndicatorsCountIsFetching: prioritizationStore.dashboardBuyerTopByIndicatorsCountIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBuyerTopByIndicatorsCount: bindActionCreators(fetchBuyerTopByIndicatorsCount, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(BuyerTopByIndicatorsCountChart))
