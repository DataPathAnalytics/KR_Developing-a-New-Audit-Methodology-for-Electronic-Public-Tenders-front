import React from 'react'
import { toISOFormat } from '../../utils/DateUtils'
import { toCurrencyFormat, toCurrencyWithPostfix, toNumberFormat } from '../../utils/NumberUtils'
import { getMapByKey, getLocalizationPropByKey } from '../../utils/MappingUtils'
import _ from 'lodash'
import { ReactComponent as magnifyingGlassIcon } from '../../common/img/magnifying-glass.svg'
import { ReactComponent as cautionSignIcon } from '../../common/img/caution-sign.svg'
import { ReactComponent as pieChartIcon } from '../../common/img/pie-chart.svg'
import { ReactComponent as maleAvatarIcon } from '../../common/img/male-avatar.svg'

export const BUYER_STATUS_CARD_OPTIONS = [
  {
    titleKey: 'dashboard_buyer_info_tenders_title',
    valueCountKey: 'tendersCount',
    valueCountTranslateKey: 'dashboard_buyer_info_tenders_count',
    valueCountFormatFunction: 'toNumberFormat',
    valueAmountKey: 'tendersAmount',
    valueAmountTranslateKey: 'dashboard_buyer_info_tenders_amount',
    valueAmountFormatFunction: 'toCurrencyWithPostfix',
    iconType: 'info-circle',
    iconTypeComponent: magnifyingGlassIcon,
    colorStyle: 'tile-white',
    pClass: (window.innerWidth <= 1440) ? '' : 'margin-top-first-block',
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_title',
    valueCountKey: 'riskTendersCount',
    valueCountTranslateKey: 'dashboard_buyer_info_risk_tenders_count',
    valueCountFormatFunction: 'toNumberFormat',
    valueAmountKey: 'riskTendersAmount',
    valueAmountTranslateKey: 'dashboard_buyer_info_risk_tenders_amount',
    valueAmountFormatFunction: 'toCurrencyWithPostfix',
    iconType: 'info-circle',
    iconTypeComponent: cautionSignIcon,
    colorStyle: 'tile-white',
    pClass: 'margin-top-second-block',
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_percent_title',
    valueCountKey: 'riskTendersPercent',
    valueCountTranslateKey: 'dashboard_buyer_info_risk_tenders_percent',
    valueCountFormatFunction: 'toPercentFormat',
    valueAmountKey: 'riskTendersAmountPercent',
    valueAmountTranslateKey: 'dashboard_buyer_info_risk_tenders_amount_percent',
    valueAmountFormatFunction: 'toPercentFormat',
    iconType: 'info-circle',
    iconTypeComponent: pieChartIcon,
    colorStyle: 'tile-white',
    pClass: (window.innerWidth <= 1440) ? '' : 'margin-top-third-block',
  },
  {
    titleKey: 'dashboard_buyer_info_risk_buyers_title',
    valueCountKey: 'buyersCount',
    valueCountTranslateKey: 'dashboard_buyer_info_risk_buyers_amount',
    valueCountFormatFunction: 'toNumberFormat',
    valueAmountKey: 'riskBuyersCount',
    valueAmountTranslateKey: 'dashboard_buyer_info_risk_buyers_with_risk',
    valueAmountFormatFunction: 'toNumberFormat',
    iconType: 'info-circle',
    iconTypeComponent: maleAvatarIcon,
    colorStyle: 'tile-white',
    pClass: 'margin-top-fourth-block',
  },
]


export const BUYER_CARDS_OPTIONS = [
  {
    titleKey: 'dashboard_buyer_info_tenders_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_tenders_count',
        valueKey: 'tendersCount',
        numberFormat: 'number',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_tenders_amount',
        valueKey: 'tendersAmount',
        numberFormat: 'currency_with_postfix',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_count',
        valueKey: 'riskTendersCount',
        numberFormat: 'number',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_amount',
        valueKey: 'riskTendersAmount',
        numberFormat: 'currency_with_postfix',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_percent_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_percent',
        valueKey: 'riskTendersPercent',
        numberFormat: 'percent',
        valueGridStyle: {
          width: '30%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '70%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_amount_percent',
        valueKey: 'riskTendersAmountPercent',
        numberFormat: 'percent',
        valueGridStyle: {
          width: '34%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '66%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
  {
    titleKey: 'dashboard_buyer_info_risk_buyers_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_risk_buyers_amount',
        valueKey: 'buyersCount',
        numberFormat: 'number',
        valueGridStyle: {
          width: '34%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '66%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_risk_buyers_with_risk',
        valueKey: 'riskBuyersCount',
        numberFormat: 'number',
        valueGridStyle: {
          width: '34%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '66%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
]

export const TENDER_STATUS_CARD_OPTIONS = [
  {
    titleKey: 'dashboard_buyer_info_tenders_title',
    valueCountKey: 'tendersCount',
    valueCountTranslateKey: 'dashboard_buyer_info_tenders_count',
    valueCountFormatFunction: 'toNumberFormat',
    valueAmountKey: 'tendersAmount',
    valueAmountTranslateKey: 'dashboard_buyer_info_tenders_amount',
    valueAmountFormatFunction: 'toCurrencyWithPostfix',
    iconType: 'info-circle',
    iconTypeComponent: magnifyingGlassIcon,
    colorStyle: 'tile-white',
    pClass: 'margin-top-first-block',
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_title',
    valueCountKey: 'riskTendersCount',
    valueCountTranslateKey: 'dashboard_buyer_info_risk_tenders_count',
    valueCountFormatFunction: 'toNumberFormat',
    valueAmountKey: 'riskTendersAmount',
    valueAmountTranslateKey: 'dashboard_buyer_info_risk_tenders_amount',
    valueAmountFormatFunction: 'toCurrencyWithPostfix',
    iconType: 'info-circle',
    iconTypeComponent: cautionSignIcon,
    colorStyle: 'tile-white',
    pClass: 'margin-top-second-block',
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_percent_title',
    valueCountKey: 'riskTendersPercent',
    valueCountTranslateKey: 'dashboard_buyer_info_risk_tenders_percent',
    valueCountFormatFunction: 'toPercentFormat',
    valueAmountKey: 'riskTendersAmountPercent',
    valueAmountTranslateKey: 'dashboard_buyer_info_risk_tenders_amount_percent',
    valueAmountFormatFunction: 'toPercentFormat',
    iconType: 'info-circle',
    iconTypeComponent: pieChartIcon,
    colorStyle: 'tile-white',
    pClass: 'margin-top-third-block',
  },
]

export const TENDER_CARDS_OPTIONS = [
  {
    titleKey: 'dashboard_buyer_info_tenders_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_tenders_count',
        valueKey: 'tendersCount',
        numberFormat: 'number',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_tenders_amount',
        valueKey: 'tendersAmount',
        numberFormat: 'currency_with_postfix',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_count',
        valueKey: 'riskTendersCount',
        numberFormat: 'number',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_amount',
        valueKey: 'riskTendersAmount',
        numberFormat: 'currency_with_postfix',
        valueGridStyle: {
          width: '60%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '40%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
  {
    titleKey: 'dashboard_buyer_info_risk_tenders_percent_title',
    cardData: [
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_percent',
        valueKey: 'riskTendersPercent',
        numberFormat: 'percent',
        valueGridStyle: {
          width: '35%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '65%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
      {
        translateKey: 'dashboard_buyer_info_risk_tenders_amount_percent',
        valueKey: 'riskTendersAmountPercent',
        numberFormat: 'percent',
        valueGridStyle: {
          width: '35%',
          textAlign: 'right',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
        textGridStyle: {
          width: '65%',
          textAlign: 'left',
          boxShadow: 'unset',
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 15,
          paddingTop: 15,
        },
      },
    ],
  },
]

export const PRIORITIZATION_TENDER_TABLE_COLUMNS = [
  {
    title: '',
    dataIndex: 'id',
    translateKey: 'tender_procedure_identifier',
    align: 'center',
    width: '150px',
    sorter: false,
    customSort: true,
    sortOrder: null,
    onHeaderCell: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    fixed: 'left',
    // render: (text) => (<a href={`http://zakupki.gov.kg/popp/view/order/view.xhtml?id=${text}`} target="_blank">{text}</a> )
  },
  {
    title: '',
    dataIndex: 'procedureExpectedValue',
    translateKey: 'tender_procedure_expected_value',
    align: 'right',
    width: '4%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toCurrencyFormat(text)),
  },
  {
    title: '',
    dataIndex: 'completedLotValue',
    translateKey: 'tender_completed_lot_value',
    align: 'right',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toCurrencyFormat(text)),
  },
  {
    title: '',
    dataIndex: 'procurementMethodDetails',
    translateKey: 'tender_procurement_method_details',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => {
      if (text) {
        let riskDictionary = getMapByKey('procurementMethodDetails')
        let procurementMethodDetailsKey = getLocalizationPropByKey('procurementMethodDetailsKey')
        return _.find(riskDictionary, { nameEn: text })[procurementMethodDetailsKey]
      } else {
        return ''
      }
    },
  },
  {
    title: '',
    dataIndex: 'datePublished',
    translateKey: 'tender_public_date',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toISOFormat(text)),
  },
  // {
  //   title: '',
  //   dataIndex: 'contractSigningDate',
  //   translateKey: 'tender_signing_date',
  //   align: 'center',
  //   // width: '25%',
  //   sorter: false,
  //   customSort: true,
  //   sortOrder: null,
  //   className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
  //   onHeaderCell: null,
  //   render: (text) => (toISOFormat(text)),
  // },
  {
    title: '',
    dataIndex: 'contractDate',
    translateKey: 'tender_contract_date',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toISOFormat(text)),
  },
  {
    title: '',
    dataIndex: 'completedLotsCount',
    translateKey: 'tender_completed_lots_count',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'tenderersCount',
    translateKey: 'tender_tenderers_count',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'disqualifiedsCount',
    translateKey: 'tender_disqualifieds_count',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'suppliersCount',
    translateKey: 'tender_suppliers_count',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'passedIndicatorNameList',
    translateKey: 'tender_passed_indicator_name_list',
    align: 'center',
    // width: '25%',,
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'passedIndicatorsCount',
    translateKey: 'tender_passed_indicators_count',
    align: 'center',
    // width: '25%',,
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'cpvCount',
    translateKey: 'tender_cpv_count',
    align: 'center',
    // width: '25%',,
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'riskLevel',
    translateKey: 'tender_procedure_risk_level',
    align: 'center',
    // width: '25%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => {
      if (text) {
        let riskDictionary = getMapByKey('riskLevels')
        let riskLevelsKey = getLocalizationPropByKey('riskLevelsKey')
        return _.find(riskDictionary, { id: text })[riskLevelsKey]
      } else {
        return ''
      }
    },
  },
  {
    title: '',
    dataIndex: 'identifierId',
    translateKey: 'tender_identifier_id_name',
    align: 'center',
    // width: '25%',,
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'identifierLegalNameRu',
    translateKey: 'tender_legal_name_identifier',
    align: 'left',
    // width: '40%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'weightedRank',
    translateKey: 'tender_weighted_rank',
    align: 'center',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'checklistName',
    translateKey: 'tender_checklist_name',
    align: 'center',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'checklistStatus',
    translateKey: 'tender_checklist_status_name',
    align: 'center',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => {
      if (text) {
        let checklistStatuses = getMapByKey('checklistStatuses')
        let checklistStatusesKey = getLocalizationPropByKey('checklistStatusesKey')
        return _.find(checklistStatuses, { id: text })[checklistStatusesKey]
      } else {
        return ''
      }
    },
  },
  {
    title: '',
    dataIndex: 'checklistAuditorName',
    translateKey: 'tender_checklist_auditor_name',
    align: 'center',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
]

export const PRIORITIZATION_TENDER_TABLE_COLUMNS_FOR_EXPORT = [
  {
    dataIndex: 'id',
    translateKey: 'tender_procedure_identifier_name_for_export',
  },
  {
    dataIndex: 'datePublished',
    translateKey: 'tender_public_date_name_for_export',
  },
  {
    dataIndex: 'guaranteeAmount',
    translateKey: 'tender_guarantee_amount_name_for_export',
  },
  {
    dataIndex: 'procurementMethodDetails',
    translateKey: 'tender_procurement_method_details_name_for_export',
  },
  {
    dataIndex: 'currentStage',
    translateKey: 'tender_current_stage_name_for_export',
  },
  {
    dataIndex: 'tenderersCount',
    translateKey: 'tender_tenderers_count_name_for_export',
  },
  {
    dataIndex: 'disqualifiedsCount',
    translateKey: 'tender_disqualifieds_count_name_for_export',
  },
  {
    dataIndex: 'suppliersCount',
    translateKey: 'tender_suppliers_count_name_for_export',
  },
  {
    dataIndex: 'completedLotsCount',
    translateKey: 'tender_completed_lots_count_name_for_export',
  },
  {
    dataIndex: 'procedureExpectedValue',
    translateKey: 'tender_procedure_expected_value_name_for_export',
  },
  {
    dataIndex: 'procedureCurrency',
    translateKey: 'tender_procedure_currency_name_for_export',
  },
  {
    dataIndex: 'identifierId',
    translateKey: 'tender_identifier_id_name_for_export',
  },
  {
    dataIndex: 'identifierLegalNameRu',
    translateKey: 'tender_identifier_legal_name_ru_name_for_export',
  },
  {
    dataIndex: 'lotsCount',
    translateKey: 'tender_count_of_lots_name_for_export',
  },
  {
    dataIndex: 'completedLotValue',
    translateKey: 'tender_completed_lot_value_name_for_export',
  },
  {
    dataIndex: 'okgzList',
    translateKey: 'tender_okgz_list_name_for_export',
  },
  {
    dataIndex: 'okgzNameList',
    translateKey: 'tender_okgz_name_for_export',
  },
  // {
  //   dataIndex: 'contractSigningDate',
  //   translateKey: 'tender_signing_date_name_for_export',
  // },
  {
    dataIndex: 'contractDate',
    translateKey: 'tender_contract_date_name_for_export',
  },
  {
    dataIndex: 'complaintsCount',
    translateKey: 'tender_complaints_count_name_for_export',
  },
  {
    dataIndex: 'passedIndicatorsCount',
    translateKey: 'tender_passed_indicators_count_name_for_export',
  },
  {
    dataIndex: 'passedIndicatorNameList',
    translateKey: 'tender_cpv_count_name_for_export',
  },
  {
    dataIndex: 'riskLevel',
    translateKey: 'tender_procedure_risk_level_name_for_export',
  },
  {
    dataIndex: 'weightedRank',
    translateKey: 'tender_weighted_rank_name_for_export',
  },
  {
    dataIndex: 'checklistName',
    translateKey: 'tender_checklist_name_for_export',
  },
  {
    dataIndex: 'checklistStatus',
    translateKey: 'tender_checklist_status_name_for_export',
  },
  {
    dataIndex: 'checklistAuditorName',
    translateKey: 'tender_checklist_auditor_name_for_export',
  },
]

export const PRIORITIZATION_BUYER_TABLE_COLUMNS = [
  {
    title: '',
    dataIndex: 'identifierId',
    translateKey: 'buyer_identifier',
    align: 'center',
    width: '150px',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    fixed: 'left',
  },
  {
    title: '',
    dataIndex: 'identifierLegalNameRu',
    translateKey: 'buyer_legal_name_identifier',
    align: 'left',
    width: '300px',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    fixed: 'left',
  },
  {
    title: '',
    dataIndex: 'riskLevel',
    translateKey: 'buyer_risk_level',
    align: 'center',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => {
      if (text) {
        let riskDictionary = getMapByKey('riskLevels')
        let riskLevelsKey = getLocalizationPropByKey('riskLevelsKey')
        return _.find(riskDictionary, { id: text })[riskLevelsKey]
      } else {
        return ''
      }
    },
  },
  {
    title: '',
    dataIndex: 'procedureNumber',
    translateKey: 'buyer_procedure_number',
    align: 'center',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'proceduresExpectedValue',
    translateKey: 'buyer_procedures_expected_value',
    align: 'right',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toCurrencyFormat(text)),
  },
  {
    title: '',
    dataIndex: 'contractsAmount',
    translateKey: 'buyer_contracts_amount',
    align: 'right',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toCurrencyFormat(text)),
  },
  {
    title: '',
    dataIndex: 'riskedProcedures',
    translateKey: 'buyer_risked_procedures',
    align: 'center',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'riskedProceduresWithContract',
    translateKey: 'buyer_risked_procedures_with_contract',
    align: 'center',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'riskedProceduresExpectedValue',
    translateKey: 'buyer_risked_procedures_expected_value',
    align: 'right',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toCurrencyFormat(text)),
  },
  {
    title: '',
    dataIndex: 'passedIndicators',
    translateKey: 'buyer_passed_indicator_name_list',
    align: 'center',
    // width: '25%',,
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'passedIndicatorsCount',
    translateKey: 'buyer_passed_indicators_count',
    align: 'center',
    // width: '25%',,
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'riskedProceduresExpectedValueWithContract',
    translateKey: 'buyer_risked_procedures_expected_value_with_contract',
    align: 'right',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
    render: (text) => (toCurrencyFormat(text)),
  },
  {
    title: '',
    dataIndex: 'proceduresWithBadData',
    translateKey: 'buyer_procedures_with_bad_data',
    align: 'center',
    width: '5%',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  {
    title: '',
    dataIndex: 'weightedRank',
    translateKey: 'buyer_weighted_rank',
    align: 'center',
    sorter: false,
    customSort: true,
    sortOrder: null,
    className: 'header-text-align-center ant-table-column-has-actions ant-table-column-has-sorters',
    onHeaderCell: null,
  },
  // {
  //   title: '',
  //   dataIndex: 'weightedRank',
  //   translateKey: 'buyer_weight_rank',
  //   sorter: (a, b) => {
  //     return a.weightedRank - b.weightedRank
  //   },
  //   align: 'center',
  //   // width: '20%',
  // },
]

export const PRIORITIZATION_BUYER_TABLE_COLUMNS_FOR_EXPORT = [
  {
    dataIndex: 'identifierId',
    translateKey: 'buyer_identifier_name_for_export',
  },
  {
    dataIndex: 'identifierLegalNameRu',
    translateKey: 'buyer_legal_name_identifier_name_for_export',
  },
  {
    dataIndex: 'riskLevel',
    translateKey: 'buyer_risk_level_name_for_export',
  },
  {
    dataIndex: 'region',
    translateKey: 'buyer_default_column_region_name_name_for_export',
  },
  {
    dataIndex: 'procedureNumber',
    translateKey: 'buyer_procedure_number_name_for_export',
  },
  {
    dataIndex: 'completedLotsCount',
    translateKey: 'buyer_default_column_completed_lots_count_name_for_export',
  },
  {
    dataIndex: 'contractsCount',
    translateKey: 'buyer_default_column_contracts_count_name_for_export',
  },
  {
    dataIndex: 'proceduresExpectedValue',
    translateKey: 'buyer_procedures_expected_value_name_for_export',
  },
  {
    dataIndex: 'winnerBidsValue',
    translateKey: 'buyer_default_column_winner_bids_value_name_for_export',
  },
  {
    dataIndex: 'contractsAmount',
    translateKey: 'buyer_contracts_amount_name_for_export',
  },
  {
    dataIndex: 'riskedProcedures',
    translateKey: 'buyer_risked_procedures_name_for_export',
  },
  {
    dataIndex: 'riskedProceduresWithContract',
    translateKey: 'buyer_risked_procedures_with_contract_name_for_export',
  },
  {
    dataIndex: 'riskedProceduresExpectedValue',
    translateKey: 'buyer_risked_procedures_expected_value_name_for_export',
  },
  {
    dataIndex: 'passedIndicators',
    translateKey: 'buyer_passed_indicator_name_list_for_export',
  },
  {
    dataIndex: 'passedIndicatorsCount',
    translateKey: 'buyer_default_column_passed_indicators_count_name_for_export',
  },
  {
    dataIndex: 'riskedProceduresExpectedValueWithContract',
    translateKey: 'buyer_risked_procedures_expected_value_with_contract_name_for_export',
  },
  // {
  //   dataIndex: 'passedIndicators',
  //   translateKey: 'buyer_default_column_passed_indicators_name_for_export',
  // },
  {
    dataIndex: 'proceduresWithBadData',
    translateKey: 'buyer_procedures_with_bad_data_name_for_export',
  },
  {
    dataIndex: 'weightedRank',
    translateKey: 'buyer_weighted_rank_name_for_export',
  },
]

export const DASHBOARD_INDICATORS_TABLE_COLUMNS = [
  {
    title: '',
    dataIndex: 'name',
    translateKey: 'indicator_method_name',
    align: 'left',
    width: '25%',
    sorter: false,
    render: data => {
      let splitedData = data.split('%separator%')
      return (
        <>
        <b>{splitedData[0]}</b>
        <span> - </span>
        <span>{splitedData[1]}</span>
        </>
      )
    },
  },
  {
    title: '',
    dataIndex: 'oneStage',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.oneStage - b.oneStage
    },
    render: (value) => (
      (value === -1) ? '0' : toCurrencyWithPostfix(value)
    ),
  },
  {
    title: '',
    dataIndex: 'singleSource',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.singleSource - b.singleSource
    },
    render: (value) => (
      (value === -1) ? 'X' : toCurrencyWithPostfix(value)
    ),
  },
  {
    title: '',
    dataIndex: 'simplicated',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.simplicated - b.simplicated
    },
    render: (value) => (
      (value === -1) ? 'X' : toCurrencyWithPostfix(value)
    ),
  },
  {
    title: '',
    dataIndex: 'downgrade',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.downgrade - b.downgrade
    },
    render: (value) => (
      (value === -1) ? 'X' : toCurrencyWithPostfix(value)
    ),
  },
]

export const DASHBOARD_INDICATORS_TABLE_COUNT_COLUMNS = [
  {
    title: '',
    dataIndex: 'name',
    translateKey: 'indicator_method_name',
    align: 'left',
    width: '25%',
    sorter: false,
    render: data => {
      let splitedData = data.split('%separator%')
      return (
        <>
        <b>{splitedData[0]}</b>
        <span> - </span>
        <span>{splitedData[1]}</span>
        </>
      )
    },
  },
  {
    title: '',
    dataIndex: 'oneStage',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.oneStage - b.oneStage
    },
    render: (value) => (
      (value === -1) ? 'X' : toNumberFormat(value)
    ),
  },
  {
    title: '',
    dataIndex: 'singleSource',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.singleSource - b.singleSource
    },
    render: (value) => (
      (value === -1) ? 'X' : toNumberFormat(value)
    ),
  },
  {
    title: '',
    dataIndex: 'simplicated',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.simplicated - b.simplicated
    },
    render: (value) => (
      (value === -1) ? 'X' : toNumberFormat(value)
    ),
  },
  {
    title: '',
    dataIndex: 'downgrade',
    align: 'center',
    // width: '25%',
    sorter: (a, b) => {
      return a.downgrade - b.downgrade
    },
    render: (value) => (
      (value === -1) ? 'X' : toNumberFormat(value)
    ),
  },
]