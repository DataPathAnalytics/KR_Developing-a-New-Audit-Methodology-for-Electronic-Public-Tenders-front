import React, { Component } from 'react'
import { fetchTenderRiskTendersCountInfoByMethod } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import shortid from 'shortid'
import { Spin } from 'antd'
import { PIE_CHART_COLORS } from '../../../../common/GlobalConstants'
import { toNumberFormatWithPC, toPercentFormat } from '../../../../utils/NumberUtils'

class TenderRiskTendersCountInfoByMethodChart extends Component {
  componentDidMount() {
    // this.props.fetchTenderRiskTendersCountInfoByMethod()
  }

  render() {
    const { translate, dashboardTenderRiskTendersCountInfoByMethod, dashboardTenderRiskTendersCountInfoByMethodIsFetching, allMappings: { procurementMethodDetails } } = this.props
    let sortedData = _.orderBy(dashboardTenderRiskTendersCountInfoByMethod, 'value', 'desc')
    return (
      <Spin spinning={dashboardTenderRiskTendersCountInfoByMethodIsFetching} size="large">
        <HighchartsReact
          key={shortid.generate()}
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'pie',
              spacing: [0, 0, 0, 0],
            },
            title: {
              text: translate('chart_title_tenders_with_risk_procurement_method_value_amount'),
              x: 20,
              y: 20,
              style: {
                fontSize: 16,
                fontWeight: '700',
              },
            },
            xAxis: {
              visible: false,
              minPadding: 0,
              maxPadding: 0,
            },
            plotOptions: {
              pie: {
                innerSize: (window.innerWidth / 10) * 0.4,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false,
                },
                showInLegend: true,
                borderWidth: 0,
              },
            },
            yAxis: { visible: false },
            tooltip: {
              shared: true,
              outside: true,
              formatter: function () {
                return `<b>${this.key}
                </b><br>${translate('dashboard_tender_pie_tenders_with_risk_count')} <b>${toNumberFormatWithPC(this.y)}</b>
                </b><br>${translate('dashboard_tender_pie_amount_percent')} <b>${toPercentFormat(this.point.pointPercent)}</b>`
              },
            },
            legend: {
              enabled: true,
              align: 'right',
              verticalAlign: 'top',
              layout: 'vertical',
              x: 0,
              y: 100,
              itemMarginBottom: 50,
              itemStyle: {
                fontWeight: 400,
              },
              labelFormatter: function () {
                return (
                  '<span style="font-size: 14px;">' + this.name + '</span>'
                )
              },
            },
            credits: { enabled: false },
            series: [
              {
                data: _.map(sortedData, (item, index) => {
                  return {
                    name: _.find(procurementMethodDetails, { nameEn: item.method })[this.props.procurementMethodDetailsKey],
                    y: Math.round(item.value),
                    color: PIE_CHART_COLORS[index],
                    pointPercent: item.percent,
                    dataLabels: {
                      verticalAlign: 'top',
                      enabled: true,
                      color: '#000000',
                      connectorWidth: 1,
                      // distance: -60,
                      connectorColor: '#000000',
                      style: {
                        fontWeight: 400,
                      },
                      formatter: function () {
                        return item.percent + ' %'
                      },
                    },
                  }
                }),
              },
            ],
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
    dashboardTenderRiskTendersCountInfoByMethod: prioritizationStore.dashboardTenderRiskTendersCountInfoByMethod,
    dashboardTenderRiskTendersCountInfoByMethodIsFetching: prioritizationStore.dashboardTenderRiskTendersCountInfoByMethodIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
    procurementMethodDetailsKey: localizationStore.procurementMethodDetailsKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTenderRiskTendersCountInfoByMethod: bindActionCreators(fetchTenderRiskTendersCountInfoByMethod, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(TenderRiskTendersCountInfoByMethodChart))
