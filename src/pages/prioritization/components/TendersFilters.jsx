import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTranslate } from 'react-redux-multilingual'
import { Row, Col, DatePicker, Select, Button, Input, InputNumber } from 'antd'
import _ from 'lodash'
import moment from 'moment'

import './Filters.css'

class TendersFilters extends Component {
  componentDidMount() {
//    this.disableInput()
  }

  disableInput = () => {
    const selects = document.getElementsByClassName('select_search_okgz_filter')[0].getElementsByClassName('ant-select-search__field')
    for (let el of selects) {
      el.setAttribute(`maxlength`, 2)
    }
  }

  getChecklistStatusName = (checklistStatus) => {
    const { checklistStatuses, checklistStatusesKey } = this.props
    return _.find(checklistStatuses, { id: checklistStatus })[checklistStatusesKey]
  }

  getChecklistTypeDescription = (checklistType) => {
    const { dashboardTenderChecklistFilter, dashboardTenderChecklistFilterKey } = this.props
    return _.find(dashboardTenderChecklistFilter, { id: checklistType })[dashboardTenderChecklistFilterKey]
  }

  render() {
    const {
      translate,
      methodsData,
      indicatorsData,
      buyersData,
      OKGZData,
      riskLevels,
      allSelectedData,
      checklistStatuses,
      dashboardTenderChecklistFilter,
      auditorSearchedNames,
      procurementMethodDetailsKey,
      indicatorsKey,
      checklistStatusesKey,
      dashboardTenderChecklistFilterKey,
      riskLevelsKey,
      okgzKey,
    } = this.props

    return (
      <Row style={{ marginBottom: 15 }}>
        <Col span={24}>
          <Row>
            <Col span={8}>
              {translate('tender_filter_select_organization')}:
            </Col>
            <Col span={8}></Col>
            <Col span={4}>
              {translate('tender_filter_start_date_period')}:
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: '5%' }}>{translate('tender_filter_end_date_period')}:</span>
            </Col>
          </Row>
          <Row style={{ marginBottom: 15 }}>
            <Col span={8}>
              <Select
                showSearch
                allowClear
                maxTagCount={30}
                placeholder={translate('tender_filter_select_organization')}
                style={{ width: '95%' }}
                filterOption={false}
                onSearch={this.props.handleSearchBuyers}
                onChange={this.props.handleSelectedBuyer}
                value={allSelectedData.hasOwnProperty('buyerId') ? allSelectedData.buyerId : []}
              >
                {_.map(buyersData, (buyer) => (
                  <Select.Option
                    key={buyer.identifierLegalNameRu}
                    value={buyer.id}
                  >
                    {`${buyer.identifierId} - ${buyer.identifierLegalNameRu}`}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={8}></Col>
            <Col span={4}>
              <DatePicker
                style={{ width: '95%' }}
                placeholder={translate('start_data')}
                onChange={this.props.handleStartDateSelected}
                value={allSelectedData.hasOwnProperty('contractStartDate') ? moment(allSelectedData.contractStartDate) : null}
              />
            </Col>
            <Col span={4}>
              <DatePicker
                style={{ width: '95%', marginLeft: '5%' }}
                placeholder={translate('end_date')}
                onChange={this.props.handleEndDateSelected}
                value={allSelectedData.hasOwnProperty('contractEndDate') ? moment(allSelectedData.contractEndDate) : null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              {translate('tender_filter_concurs_number_name')}:
            </Col>
            <Col span={8}>
              {translate('tender_filter_sum_from_to_name')}:
            </Col>
            <Col span={8}>
              {translate('tender_filter_method_name')}:
            </Col>
          </Row>
          <Row style={{ marginBottom: 15 }}>
            <Col span={8}>
              <Input.Search
                style={{ width: '95%' }}
                placeholder={translate('tender_filter_concurs_number_name')}
                onSearch={this.props.handleSearchBuCompetitionId}
                onChange={this.props.handleChangeTenderId}
                value={allSelectedData.hasOwnProperty('tenderId') ? allSelectedData.tenderId : ''}
                enterButton
              />
            </Col>
            <Col span={8}>
              <InputNumber
                style={{ width: '45%' }}
                placeholder={translate('tender_filter_sum_from_name')}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                parser={value => value.replace(/\D/g, '')}
                // type="number"
                // onChange={(e) => this.props.handleChangeSumFrom(e.target.value)}
                onChange={this.props.handleChangeSumFrom}
                value={allSelectedData.hasOwnProperty('completedLotValueMin') ? allSelectedData.completedLotValueMin : ''}
              />
              <span style={{ position: 'relative', left: '2%' }}>-</span>
              <InputNumber
                style={{ width: '45%', float: 'right', marginRight: '5%' }}
                placeholder={translate('tender_filter_sum_to_name')}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                parser={value => value.replace(/\D/g, '')}
                // type="number"
                // onChange={(e) => this.props.handleChangeSumTo(e.target.value)}
                onChange={this.props.handleChangeSumTo}
                value={allSelectedData.hasOwnProperty('completedLotValueMax') ? allSelectedData.completedLotValueMax : ''}
              />
            </Col>
            <Col span={8}>
              <Select
                showArrow
                mode="multiple"
                placeholder={translate('tender_filter_method_name')}
                style={{ width: '100%' }}
                onChange={this.props.handleMethodSelected}
                value={allSelectedData.hasOwnProperty('procurementMethodDetails') ? allSelectedData.procurementMethodDetails : []}
              >
                {_.map(methodsData, (method) => (
                  <Select.Option key={method.nameEn}>{method[procurementMethodDetailsKey]}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              {translate('tender_filter_indicator_name')}:
            </Col>
            <Col span={8}>
              {translate('tender_filter_OKGZ_section_name')}:
            </Col>
            <Col span={8}>
              {translate('tender_filter_risk_level_name')}:
            </Col>
          </Row>
          <Row style={{ marginBottom: 15 }}>
            <Col span={8}>
              <Select
                showArrow
                mode="multiple"
                optionLabelProp='title'
                placeholder={translate('tender_filter_indicator_name')}
                style={{ width: '95%' }}
                onChange={this.props.handleIndicatorSelected}
                value={allSelectedData.hasOwnProperty('indicators') ? allSelectedData.indicators : []}
              >
                {_.map(indicatorsData, (indicator) => (
                  <Select.Option
                    key={indicator.id}
                    title={indicator.name}
                    value={indicator.id}
                  >
                    {`${indicator.name} - ${indicator[indicatorsKey]}`}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <div className="select_search_okgz_filter">
                <Select
                  showArrow
                  mode="multiple"
                  optionLabelProp='title'
                  maxTagCount={30}
                  placeholder={translate('tender_filter_OKGZ_section_name')}
                  style={{ width: '95%' }}
                  filterOption={false}
                  onSearch={this.props.handleSearchOKGZ}
                  onChange={this.props.handleSelectedOKGZ}
                  value={allSelectedData.hasOwnProperty('cpv') ? allSelectedData.cpv : []}
                >
                  {_.map(OKGZData, (okgz) => (
                    <Select.Option
                      key={okgz.code}
                      title={okgz.originalCode}
                      value={okgz.code}
                    >
                      {`"${okgz.originalCode}" -- ${okgz[okgzKey]}`}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col span={8}>
              <Select
                showArrow
                mode="multiple"
                placeholder={translate('tender_filter_risk_level_name')}
                style={{ width: '100%' }}
                onChange={this.props.handleRiskLevelSelected}
                value={allSelectedData.hasOwnProperty('riskLevel') ? allSelectedData.riskLevel : []}
              >
                {_.map(riskLevels, (risk) => (
                  <Select.Option
                    key={risk.id}
                    value={risk.id}
                  >
                    {risk[riskLevelsKey]}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              {translate('checklist_initiated_name')}
            </Col>
            <Col span={8}>
              {translate('checklist_status_name')}
            </Col>
            <Col span={8}>
              {translate('checklist_author_name')}
            </Col>
          </Row>
          <Row style={{ marginBottom: 15 }}>
            <Col span={8}>
              <Select
                showArrow
                allowClear={true}
                placeholder={translate('checklist_initiated_placeholder_name')}
                style={{ width: '95%' }}
                onChange={this.props.handleChecklistFilterStatusSelected}
                value={allSelectedData.hasOwnProperty('checklistType') ? this.getChecklistTypeDescription(allSelectedData.checklistType) : []}
              >
                {_.map(dashboardTenderChecklistFilter, (checklistFilterItem) => (
                  <Select.Option
                    key={checklistFilterItem.id}>{checklistFilterItem[dashboardTenderChecklistFilterKey]}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                showArrow
                allowClear={true}
                placeholder={translate('checklist_status_placeholder_name')}
                style={{ width: '95%' }}
                onChange={this.props.handleChecklistStatusSelected}
                value={allSelectedData.hasOwnProperty('checklistStatus') ? this.getChecklistStatusName(allSelectedData.checklistStatus) : []}
              >
                {_.map(checklistStatuses, (checklistStatus) => (
                  <Select.Option key={checklistStatus.id}>{checklistStatus[checklistStatusesKey]}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              {/*<Select*/}
              {/*showArrow*/}
              {/*allowClear={true}*/}
              {/*placeholder={translate('checklist_author_placeholder_name')}*/}
              {/*style={{ width: '100%' }}*/}
              {/*onChange={this.props.handleChecklistAuthorSelected}*/}
              {/*value={allSelectedData.hasOwnProperty('myChecklist') && translate('only_my_checklists_name')}*/}
              {/*>*/}
              {/*{_.map([{*/}
              {/*id: 1,*/}
              {/*value: true,*/}
              {/*name: translate('only_my_checklists_name'),*/}
              {/*}], (checklistAuthor) => (*/}
              {/*<Select.Option key={checklistAuthor.value}>{checklistAuthor.name}</Select.Option>*/}
              {/*))}*/}
              {/*</Select>*/}
              <Select
                showArrow
                allowClear={true}
                showSearch
                mode="multiple"
                optionLabelProp='title'
                maxTagCount={30}
                placeholder={translate('checklist_author_name')}
                style={{ width: '100%' }}
                filterOption={false}
                onSearch={this.props.handleSearchAuditorByName}
                onChange={this.props.handleSelectedAuditorByName}
              >
                {_.map(auditorSearchedNames, (auditorName) => (
                  <Select.Option
                    key={auditorName.id}
                    title={auditorName.name}
                  >
                    {auditorName.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: 15 }}>
            <Col span={4}>
              <Button
                type="primary"
                onClick={this.props.handleResetAllFilters}
              >
                {translate('reset_filters_button_name')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

TendersFilters.propTypes = {
  methodsData: PropTypes.array,
  indicatorsData: PropTypes.array,
  buyersData: PropTypes.array,
  OKGZData: PropTypes.array,
  riskLevels: PropTypes.array,
  checklistStatuses: PropTypes.array,
  dashboardTenderChecklistFilter: PropTypes.array,
  auditorSearchedNames: PropTypes.array,
  procurementMethodDetailsKey: PropTypes.string.isRequired,
  indicatorsKey: PropTypes.string.isRequired,
  checklistStatusesKey: PropTypes.string.isRequired,
  dashboardTenderChecklistFilterKey: PropTypes.string.isRequired,
  riskLevelsKey: PropTypes.string.isRequired,
  okgzKey: PropTypes.string.isRequired,

  handleStartDateSelected: PropTypes.func,
  handleEndDateSelected: PropTypes.func,
  handleMethodSelected: PropTypes.func,
  handleIndicatorSelected: PropTypes.func,
  handleSearchBuyers: PropTypes.func,
  handleSelectedBuyer: PropTypes.func,
  handleSearchOKGZ: PropTypes.func,
  handleSelectedOKGZ: PropTypes.func,
  handleChangeSumFrom: PropTypes.func,
  handleChangeSumTo: PropTypes.func,
  handleRiskLevelSelected: PropTypes.func,
  handleChangeTenderId: PropTypes.func,
  handleSearchBuCompetitionId: PropTypes.func,
  handleChecklistStatusSelected: PropTypes.func,
  handleChecklistFilterStatusSelected: PropTypes.func,
  handleChecklistAuthorSelected: PropTypes.func,
  handleResetAllFilters: PropTypes.func,
  handleSearchAuditorByName: PropTypes.func,
  handleSelectedAuditorByName: PropTypes.func,
}


export default withTranslate(TendersFilters)