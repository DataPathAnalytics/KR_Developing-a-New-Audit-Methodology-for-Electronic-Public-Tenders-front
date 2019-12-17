import React, { Component } from 'react'
import { fetchTenderTopTendersByIndicatorCount } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import shortid from 'shortid'
import { Spin } from 'antd'
import { toNumberFormatWithPC } from '../../../../utils/NumberUtils'
import { yAxisFormatter } from '../../../../utils/ChartYAxisFormater'

class TenderTopTendersByIndicatorCountChart extends Component {
  render() {
    const {
      translate,
      dashboardTenderTopTendersByIndicatorCount,
      dashboardTenderTopTendersByIndicatorCountIsFetching,
      okgzKey,
      allMappings: { okgz },
    } = this.props

    return (
      <Spin spinning={dashboardTenderTopTendersByIndicatorCountIsFetching} size="large">
        <HighchartsReact
          highcharts={Highcharts}
          key={shortid.generate()}
          options={{
            chart: {
              type: 'column',
              height: 550,
              spacing: [0, 0, 0, 0],
            },
            title: {
              text: translate('chart_title_top_10_tenders_by_number_of_risk_indicators_with_positive_results'),
              align: 'left',
              x: 20,
              y: 20,
              style: {
                fontSize: 16,
                fontWeight: '700',
              },
            },
            xAxis: {
              categories: _.map(dashboardTenderTopTendersByIndicatorCount, (item, index) => (item.description)),
              title: {
                text: translate('chart_legend_tender'),
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
                events: {
                  legendItemClick: function (event) {
                    if (event.browserEvent.path[0].innerHTML === translate('chart_legend_review')) {
                      event.preventDefault()
                      window.open(this.points[0].ownLink)
                    }
                  },
                },
              },
            },
            tooltip: {
              shared: true,
              outside: true,
              formatter: function () {
                return `<b>${this.points[0].key}
                </b><br>${translate('dashboard_tender_top_risk_tenders_by_count')} <b>${toNumberFormatWithPC(this.y)}</b>`
              },
            },
            legend: {
              align: 'right',
              verticalAlign: 'middle',
              floating: false,
              itemStyle: {
                'word-wrap': 'break-word',
              },
              width: '60%',
              layout: 'vertical',
              itemMarginBottom: 10,
              symbolHeight: '0px',
              labelFormatter: function () {
                let styles = this.visible ? 'fill: #0000FF;' : ''
                return (
                  '<b style="font-weight:600;font-size:14px;">' + this.name + '</b>' +
                  '<br/>' +
                  '<span style="font-weight:100;font-size:14px;">' + translate('dashboard_tender_top_risk_tenders_by_count') + ' </span>' +
                  '<b>' + this.yData[0] + '</b>.' +
                  '<span id="linkContainer">  <a target="_blank" style="' + styles + '">' + translate('chart_legend_review') + '</a></span>'
                )
              },
            },
            credits: { enabled: false },
            series: _.map(dashboardTenderTopTendersByIndicatorCount, (item, index) => {
              return {
                data: [{
                  y: Math.round(item.result),
                  color: (index === 0) ? '#cc4748' : '#2f4074',
                  // color: CHART_COLORS[index],
                  ownLink: item.link,
                  x: index,
                  name: item.code ? _.find(okgz, { code: item.code })[okgzKey] : translate('procurement_of_different_goods_services_works'),
                }],
                // name: item.description,
                name: item.code ? _.find(okgz, { code: item.code })[okgzKey] : translate('procurement_of_different_goods_services_works'),

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
                           localizationStore,
                         }) {
  return {
    dashboardTenderTopTendersByIndicatorCount: prioritizationStore.dashboardTenderTopTendersByIndicatorCount,
    dashboardTenderTopTendersByIndicatorCountIsFetching: prioritizationStore.dashboardTenderTopTendersByIndicatorCountIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
    okgzKey: localizationStore.okgzKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTenderTopTendersByIndicatorCount: bindActionCreators(fetchTenderTopTendersByIndicatorCount, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(TenderTopTendersByIndicatorCountChart))
