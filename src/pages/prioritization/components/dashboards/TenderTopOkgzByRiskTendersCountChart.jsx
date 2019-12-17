import React, { Component } from 'react'
import { fetchTenderTopOkgzByRiskTendersCount } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import shortid from 'shortid'
import { Spin } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { TREE_CHART_COLORS } from '../../../../common/GlobalConstants'
import { toNumberFormatWithPC } from '../../../../utils/NumberUtils'
import { yAxisFormatter } from '../../../../utils/ChartYAxisFormater'

class TenderTopOkgzByRiskTendersCountChart extends Component {
  constructor() {
    super()

    if (typeof Highcharts === 'object') {
      // HighchartsMap(Highcharts)
    }
  }

  componentDidMount() {
    // this.props.fetchTenderTopOkgzByRiskTendersCount()
  }

  render() {
    const { translate, dashboardTenderTopOkgzByRiskTendersCount, dashboardTenderTopOkgzByRiskTendersCountIsFetching, allMappings: { okgz }, okgzKey } = this.props

    // if (_.isEmpty(dashboardTenderTopOkgzByRiskTendersCount)) {
    //   return null
    // }

    let chartData = {
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      levels: [{
        level: 1,
        layoutAlgorithm: 'sliceAndDice',
      }],
      legendType: 'point',
      showInLegend: true,
      data: [],
    }
    chartData.data = _.map(dashboardTenderTopOkgzByRiskTendersCount, (item, index) => {
      return {
        value: Math.round(item.value),
        name: _.find(okgz, { code: item.cpv }).name,
        color: TREE_CHART_COLORS[index],
      }
    })

    return (
      <Spin spinning={dashboardTenderTopOkgzByRiskTendersCountIsFetching} size="large">
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
              text: translate('chart_title_top_10_cpv_sections_by_number_of_tenders_with_risks'),
              align: 'left',
              x: 20,
              y: 20,
              style: {
                fontSize: 16,
                fontWeight: '700',
              },
            },
            xAxis: {
              categories: _.map(dashboardTenderTopOkgzByRiskTendersCount, (item, index) => (item.description)),
              title: {
                text: translate('tender_cpv_section'),
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
                </b><br>${translate('dashboard_tender_top_okgz_by_risk_tenders_count')} <b>${toNumberFormatWithPC(this.y)}</b>`
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
                return (
                  '<b style="font-weight:600; font-size: 14px;">' + this.name + '</b>' +
                  '<br/>' +
                  '<span style="font-weight:100; font-size: 14px;">' +
                  translate('dashboard_tender_top_okgz_by_risk_tenders_count') +
                  ' </span>' +
                  '<b>' + toNumberFormatWithPC(this.yData[0]) + '</b>'
                )
              },
            },
            credits: { enabled: false },
            series: _.map(dashboardTenderTopOkgzByRiskTendersCount, (item, index) => {
              return {
                data: [{
                  y: Math.round(item.value),
                  // color: CHART_COLORS[index],
                  color: (index === 0) ? '#cc4748' : '#2f4074',
                  ownLink: item.link,
                  x: index,
                  name: _.find(okgz, { code: item.cpv })[okgzKey],
                }],
                name: _.find(okgz, { code: item.cpv })[okgzKey],
              }
            }),
          }}
        />
      </Spin>
    )

    // return (
    //   <Spin spinning={dashboardTenderTopOkgzByRiskTendersCountIsFetching} size="large">
    //     <HighchartsReact
    //       key={shortid.generate()}
    //       highcharts={Highcharts}
    //       options={{
    //         chart: {
    //           //inverted: true,
    //           // height: 550,
    //           type: 'column',
    //           height: 550,
    //           spacing: [0, 0, 0, 0],
    //         },
    //         title: {
    //           text: translate('chart_title_top_10_cpv_sections_by_number_of_tenders_with_risks'),
    //           align: 'left',
    //           x: 10,
    //           y: 20,
    //           style: {
    //             fontSize: 16,
    //             fontWeight: '700',
    //           },
    //         },
    //         legend: {
    //           align: 'right',
    //           verticalAlign: 'middle',
    //           floating: false,
    //           itemStyle: {
    //             'word-wrap': 'break-word',
    //           },
    //           width: '60%',
    //           layout: 'vertical',
    //           itemMarginBottom: 10,
    //           symbolHeight: '0px',
    //           labelFormatter: function () {
    //             let styles = this.visible ? 'fill: #0000FF;' : ''
    //             return (
    //               '<b style="font-weight:600; font-size: 14px;">' + this.name + '</b>' +
    //               '<br/>' +
    //               '<span style="font-weight:100; font-size: 14px;">' +
    //               translate('dashboard_tender_top_okgz_by_risk_tenders_count') +
    //               ' </span>' +
    //               '<b>' + this.value + '</b>'
    //             )
    //           },
    //         },
    //         credits: { enabled: false },
    //         series: [chartData],
    //       }}
    //     />
    //   </Spin>
    // )
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
    dashboardTenderTopOkgzByRiskTendersCount: prioritizationStore.dashboardTenderTopOkgzByRiskTendersCount,
    dashboardTenderTopOkgzByRiskTendersCountIsFetching: prioritizationStore.dashboardTenderTopOkgzByRiskTendersCountIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
    okgzKey: localizationStore.okgzKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTenderTopOkgzByRiskTendersCount: bindActionCreators(fetchTenderTopOkgzByRiskTendersCount, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(TenderTopOkgzByRiskTendersCountChart))
