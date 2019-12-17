import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTranslate } from 'react-redux-multilingual'
import _ from 'lodash'
import { hasPermission } from '../../../utils/Permissions'
import { PERMISSIONS } from '../../../components/secutiry/PermissionConstants'
import { Row, Col, Checkbox, Select } from 'antd'

class BuyerInspectionHistoryFilters extends Component {
  render() {
    const {
      translate,
      templateTypes,
      checklistStatuses,
      templateTypesKey,
      auditorSearchedNames,
      checklistStatusesKey,
    } = this.props
    return (
      <Row style={{ marginBottom: 15 }}>
        <Row>
          {(hasPermission(PERMISSIONS.auditorBase) || hasPermission(PERMISSIONS.auditorInitiator)) &&
          <Col span={3}> </Col>}
          {(hasPermission(PERMISSIONS.auditorBase) || hasPermission(PERMISSIONS.auditorInitiator)) &&
          <Col span={4}>{translate('checklist_status_name')}</Col>}
          <Col span={6}>{translate('checklist_template_type_name')}</Col>
          <Col span={11}>{translate('checklist_author_name')}</Col>
        </Row>
        <Row>
          {(hasPermission(PERMISSIONS.auditorBase) || hasPermission(PERMISSIONS.auditorInitiator)) && <Col span={3}>
            <Checkbox
              style={{ marginLeft: 15 }}
              onChange={this.props.changeOnlyMyStatus}
            >
              {translate('only_my_checklists_name')}
            </Checkbox>
          </Col>}
          {(hasPermission(PERMISSIONS.auditorBase) || hasPermission(PERMISSIONS.auditorInitiator)) && <Col span={4}>
            <Select
              allowClear={true}
              placeholder={translate('checklist_status_name')}
              style={{ width: '90%' }}
              onChange={this.props.handleChecklistStatusSelected}
            >
              {_.map(checklistStatuses, (checklistStatus) => (
                <Select.Option key={checklistStatus.id}>{checklistStatus[checklistStatusesKey]}</Select.Option>
              ))}
            </Select>
          </Col>}
          <Col span={6}>
            <Select
              allowClear={true}
              placeholder={translate('checklist_template_type_name')}
              style={{ width: '94%' }}
              onChange={this.props.handleTemplateSelected}
            >
              {_.map(templateTypes, (templateType) => (
                <Select.Option key={templateType.id}>{templateType[templateTypesKey]}</Select.Option>
              ))}
            </Select>
          </Col>

          <Col span={11}>
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
      </Row>
    )
  }
}

BuyerInspectionHistoryFilters.propTypes = {
  templateTypes: PropTypes.array,
  checklistStatuses: PropTypes.array,
  auditSearchedNames: PropTypes.array,
  auditorSearchedNames: PropTypes.array,
  checklistStatusesKey: PropTypes.string.isRequired,
  templateTypesKey: PropTypes.string.isRequired,

  changeOnlyMyStatus: PropTypes.func,
  handleTemplateSelected: PropTypes.func,
  handleChecklistStatusSelected: PropTypes.func,
  handleSearchAuditByName: PropTypes.func,
  handleSelectedAuditByName: PropTypes.func,
  handleSearchAuditorByName: PropTypes.func,
  handleSelectedAuditorByName: PropTypes.func,
}


export default withTranslate(BuyerInspectionHistoryFilters)