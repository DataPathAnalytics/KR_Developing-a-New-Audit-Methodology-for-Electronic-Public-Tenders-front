import { getLocalizationPropByKey, getMapByKey } from '../../utils/MappingUtils'
import _ from 'lodash'

export const BUYER_INSPECTION_FORM_NAME = 'BuyerInspectionFormName'
export const TENDER_INSPECTION_FORM_NAME = 'TenderInspectionFormName'

export const INDICATORS_BY_TENDER_TABLE = [
  {
    title: '',
    dataIndex: 'name',
    translateKey: 'indicator_name',
    sorter: false,
    // sorter: (a, b) => {
    //   return a.name.localeCompare(b.name)
    // },
    align: 'center',
    // width: '3%',
  },
  {
    title: '',
    dataIndex: 'description',
    translateKey: 'indicator_description_name',
    sorter: false,
    // sorter: (a, b) => {
    //   return a.description.localeCompare(b.description)
    // },
    align: 'left',
    width: '15%',
    className: 'header-text-align-center',
  },
  {
    title: '',
    dataIndex: 'risks',
    translateKey: 'indicator_risks',
    sorter: false,
    // sorter: (a, b) => {
    //   return a.risks.localeCompare(b.risks)
    // },
    align: 'left',
    width: '15%',
    className: 'header-text-align-center',
  },
  {
    title: '',
    dataIndex: 'lawViolation',
    translateKey: 'indicator_law_violation',
    sorter: false,
    // sorter: (a, b) => {
    //   return a.lawViolation.localeCompare(b.lawViolation)
    // },
    align: 'left',
    width: '25%',
    className: 'header-text-align-center',
  },
  {
    title: '',
    dataIndex: 'riskLevelText',
    translateKey: 'indicator_risk_level_text',
    sorter: false,
    // sorter: (a, b) => {
    //   return a.riskLevelText.localeCompare(b.riskLevelText)
    // },
    align: 'left',
    width: '7%',
    className: 'header-text-align-center',
  },
  {
    title: '',
    dataIndex: 'indicatorAnswers',
    translateKey: 'indicator_confirmed_by_testing',
    align: 'center',
    width: '10%',
  },
  {
    title: '',
    dataIndex: 'indicatorComment',
    translateKey: 'indicator_comment_text',
    align: 'center',
    width: '15%',
  },
  {
    title: '',
    dataIndex: 'componentImpacts',
    translateKey: 'indicator_component_impacts',
    align: 'center',
    width: '13%',
  },

]

export const CHECKLISTS_TABLE_COLUMNS = [
  {
    title: '',
    translate_key: 'checklist_for_table_name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: '30%',
    sorter: (a, b) => {
      return a.name.localeCompare(b.name)
    },
  },
  // {
  //   title: '',
  //   translate_key: 'checklist_audit_name',
  //   dataIndex: 'auditName',
  //   key: 'auditName',
  //   align: 'center',
  //   width: '15%',
  //   sorter: (a, b) => {
  //     if (a.auditName) {
  //       return b.auditName ? a.auditName.localeCompare(b.auditName) : 1
  //     } else if (b.auditName) {
  //       return a.auditName ? b.auditName.localeCompare(a.auditName) : -1
  //     }
  //   },
  // },
  {
    title: '',
    translate_key: 'checklist_template_name',
    dataIndex: 'templateName',
    align: 'center',
    width: '15%',
    sorter: (a, b) => {
      if (a.templateName) {
        return b.templateName ? a.templateName.localeCompare(b.templateName) : 1
      } else if (b.templateName) {
        return a.templateName ? b.templateName.localeCompare(a.templateName) : -1
      }
    },
  },
  {
    title: '',
    translate_key: 'checklist_document_number_name',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: '5%',
    sorter: (a, b) => {
      return a.id - b.id
    },
  },
  {
    title: '',
    translate_key: 'checklist_scores_result_name',
    dataIndex: 'manualScore.nameEn',
    align: 'center',
    width: '15%',
    sorter: (a, b) => {
      if (a.autoScore) {
        return b.autoScore ? a.autoScore.name.localeCompare(b.autoScore.name) : 1
      } else if (b.autoScore) {
        return a.autoScore ? b.autoScore.name.localeCompare(a.autoScore.name) : -1
      }
    },
    render: (text) => {
      if (text) {
        let checklistScores = getMapByKey('checklistScores')
        let checklistScoreKey = getLocalizationPropByKey('checklistScoreKey')
        return _.find(checklistScores, { nameEn: text })[checklistScoreKey]
      } else {
        return ''
      }
    },
  },
  {
    title: '',
    translate_key: 'checklist_date_of_completion_name',
    dataIndex: 'modifiedDate',
    align: 'center',
    width: '5%',
    sorter: (a, b) => {
      if (a.modifiedDate) {
        return b.modifiedDate ? a.modifiedDate.localeCompare(b.modifiedDate) : 1
      } else if (b.modifiedDate) {
        return a.modifiedDate ? b.modifiedDate.localeCompare(a.modifiedDate) : -1
      }
    },
  },
  {
    title: '',
    translate_key: 'checklist_status_name',
    dataIndex: 'status.nameEn',
    align: 'center',
    width: '5%',
    sorter: (a, b) => {
      if (a.status) {
        return b.status ? a.status.name.localeCompare(b.status.name) : 1
      } else if (b.status) {
        return a.status ? b.status.name.localeCompare(a.status.name) : -1
      }
    },
    render: (text) => {
      if (text) {
        let checklistStatuses = getMapByKey('checklistStatuses')
        let checklistStatusesKey = getLocalizationPropByKey('checklistStatusesKey')
        return _.find(checklistStatuses, { nameEn: text })[checklistStatusesKey]
      } else {
        return ''
      }
    },
  },
  {
    title: '',
    translate_key: 'checklist_Initiated_name',
    dataIndex: 'auditor.name',
    align: 'center',
    width: '5%',
    sorter: (a, b) => {
      if (a.auditor.name) {
        return b.auditor.name ? a.auditor.name.localeCompare(b.auditor.name) : 1
      } else if (b.auditor.name) {
        return a.auditor.name ? b.auditor.name.localeCompare(a.auditor.name) : -1
      }
    },
  },
  // {
  //   title: '',
  //   translate_key: 'date_start',
  //   dataIndex: 'startDate',
  //   key: 'startDate',
  //   width: '15%',
  //   sorter: (a, b) => {
  //     return a.startDate.localeCompare(b.startDate)
  //   },
  // }, {
  //   title: '',
  //   translate_key: 'date_end',
  //   dataIndex: 'endDate',
  //   key: 'endDate',
  //   width: '15%',
  //   sorter: (a, b) => {
  //     return a.endDate.localeCompare(b.endDate)
  //   },
  // },
  {
    title: '',
    translate_key: 'template_actions',
    dataIndex: 'editButton',
    key: 'editButton',
    align: 'center',
    width: '20%',
  },
]