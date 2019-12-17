import React, { Component } from 'react'
import { fetchTenderMethodIndicatorAmount } from '../../../../redux/action/prioritization/PrioritizationActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { Table } from 'antd'
import { DASHBOARD_INDICATORS_TABLE_COLUMNS } from '../../PrioritizationConstants'

class TenderRiskTendersAmountInfoByMethodTable extends Component {
  componentDidMount() {
    // this.props.fetchTenderMethodIndicatorAmount()
  }

  prepareTableColumns = () => {
    const { translate, datePickerLocaleTitle, allMappings: { procurementMethodDetails }, procurementMethodDetailsKey } = this.props
    let tableColumns = _.cloneDeep(DASHBOARD_INDICATORS_TABLE_COLUMNS)

    return _.map(tableColumns, (column) => {
      if (column.hasOwnProperty('translateKey')) {
        column.title = translate(column.translateKey)
      } else {
        let elementIndex = _.findIndex(procurementMethodDetails, { nameEn: column.dataIndex })
        let uppercaseFirstLetter = datePickerLocaleTitle.charAt(0).toUpperCase() + datePickerLocaleTitle.slice(1)
        column.title = procurementMethodDetails[elementIndex][procurementMethodDetailsKey]
      }

      return column
    })
  }

  prepareTableData = () => {
    const { translate, dashboardTenderMethodIndicatorAmount, allMappings: { indicators, procurementMethodDetails }, indicatorsKey } = this.props
    let tableData = []
    let dataTemplate = {}
    let sortedIndicators = _.orderBy(indicators, 'id', 'asc')

    _.forEach(procurementMethodDetails, (item) => {
      dataTemplate = _.merge({}, dataTemplate, {
        [item.nameEn]: -1,
      })
    })

    let chainedData = _.chain(_.cloneDeep(dashboardTenderMethodIndicatorAmount))
      .groupBy('indicatorId')
      .map((values, key) => {
        return {
          indicatorId: parseInt(key, 10),
          data: values,
        }
      })
      .value()

    _.forEach(sortedIndicators, (indicator, index) => {
      let elementIndex = _.findIndex(chainedData, { indicatorId: indicator.id })
      if (elementIndex !== -1) {
        let copyTemplateOfData = _.cloneDeep(dataTemplate)
        copyTemplateOfData = _.merge({}, copyTemplateOfData, {
          id: index,
          name: `${indicator.name}%separator%${indicator[indicatorsKey]}`,
        })
        _.forEach(chainedData[elementIndex].data, (elementItem) => {
          copyTemplateOfData[elementItem.description] = elementItem.value
        })
        tableData.push(copyTemplateOfData)
      }
    })

    return tableData
  }

  render() {
    const { translate, dashboardTenderMethodIndicatorAmount, dashboardTenderMethodIndicatorAmountIsFetching, allMappings: { indicators } } = this.props

    // if (_.isEmpty(dashboardTenderMethodIndicatorAmount)) {
    //   return null
    // }

    return (
      <Spin spinning={dashboardTenderMethodIndicatorAmountIsFetching} size="large">
        <Table
          rowKey='id'
          columns={this.prepareTableColumns()}
          dataSource={this.prepareTableData()}
          pagination={false}
          title={() => translate('chart_title_tenders_with_risk_procurement_method')}
          scroll={{ x: true }}
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
    dashboardTenderMethodIndicatorAmount: prioritizationStore.dashboardTenderMethodIndicatorAmount,
    dashboardTenderMethodIndicatorAmountIsFetching: prioritizationStore.dashboardTenderMethodIndicatorAmountIsFetching,
    allMappings: mappingsStore.allMappings,
    buyersBySearch: buyerStore.buyersBySearch,
    cpvBySearch: tenderStore.cpvBySearch,
    templatesData: templatesStore.templatesData,
    datePickerLocaleTitle: localizationStore.datePickerLocaleTitle,
    procurementMethodDetailsKey: localizationStore.procurementMethodDetailsKey,
    indicatorsKey: localizationStore.indicatorsKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTenderMethodIndicatorAmount: bindActionCreators(fetchTenderMethodIndicatorAmount, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(TenderRiskTendersAmountInfoByMethodTable))
