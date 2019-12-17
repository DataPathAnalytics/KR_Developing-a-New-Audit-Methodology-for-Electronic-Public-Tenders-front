import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { withTranslate } from 'react-redux-multilingual'
import {
  Button,
  Form,
  Input,
  Alert,
  Table,
  Divider,
  Select,
  Icon,
  message,
  Row,
  Col,
  AutoComplete,
  DatePicker,
  InputNumber,
  Badge,
} from 'antd'
import { connect } from 'react-redux'
import BuyerInspectionForm from './components/BuyerInspectionForm'
import { fetchTemplateById, getCategoriesOfTemplateById } from '../../redux/action/templates/TemplatesActions'
import {
  saveNewBuyerChecklist,
  calculateChecklistScore,
  ClearCalculatedChecklistScore,
  getChecklistsDataById,
  fetchPrioritizationTenderTableForChecklistData,
} from '../../redux/action/checklists/ChecklistActions'
import {
  fetchPrioritizationTenderTableData,
  fetchPrioritizationTenderTableDataByBuyerId,
  fetchIndicatorsDataByTenderId,
} from '../../redux/action/prioritization/PrioritizationActions'
import { saveNewTemplateFromDefault } from '../../redux/action/templates/TemplatesActions'
import { getBuyersBySearch } from '../../redux/action/buyer/BuyerActions'
import { changeChecklistQuestionsData } from '../../redux/action/checklists/ChecklistActions'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import moment from 'moment'
import shortId from 'shortid'
import TenderInformationComponent from './components/TenderInformationComponent'
import PrioritizationBaseTable from '../prioritization/components/PrioritizationBaseTable'
import { PRIORITIZATION_TENDER_TABLE_COLUMNS } from '../prioritization/PrioritizationConstants'
import { INDICATORS_BY_TENDER_TABLE, TENDER_INSPECTION_FORM_NAME } from './InspectionConstants'
import AddNewTemplateFromDefaultForm from '../templates/components/AddNewTemplateFromDefaultForm'
import { toISOFormat } from '../../utils/DateUtils'
import { getLocalizationPropByKey } from '../../utils/MappingUtils'

class TenderInspection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      auditName: '',
      summary: '',
      contractNumber: '',
      supplier: '',
      contractAmount: null,
      contractDescription: '',
      modifiedDate: moment().format('YYYY-MM-DD'),
      startValue: null,
      endValue: null,
      collapsed: true,
      buyers: [],
      selectedBuyer: null,
      checklist: {},
      checklistChanged: false,
      startDate: null,
      endDate: null,
      checklistName: null,
      selectedTemplateId: null,
      showTendersTable: false,
      tenderTableData: [],
      selectedTender: null,
      indicatorsByTenderId: [],
      indicatorAnswers: [],
      editableChecklistId: null,
      responseBody: {
        answers: [],
        indicators: [],
        statusId: 1,
      },
      selectedChecklistScore: {},
      calculateAlertOptions: {
        showMessage: false,
        message: '',
      },
      templateTypeId: null,
      calculatedScore: {},
      needToRecalculateScore: false,
      noAnswersToCalculateScore: false,
      editableMode: false,
      previewOnly: false,
      waitLoadData: true,
      defaultAnswered: [],
      defaultIndicators: [],
      templateByIdData: props.templateByIdData,
      templateName: '',
      notFoundTenderById: false,
      disableSearchTenderById: false,
      showAddNewTemplateFromDefaultForm: false,
      portalInformation: null,
    }

    this._buyerElementRef = React.createRef()
    this._tenderElementRef = React.createRef()
    this._indicatorsElementRef = React.createRef()
    this._answersElementRef = React.createRef()
    this._manualCommentElementRef = React.createRef()
    this._manualScoreElementRef = React.createRef()

    this.handleSearch = _.debounce(this.handleSearch, 400)
    this.handleUnload = this.handleUnload.bind(this)

  }

  componentDidMount() {
    // const { templateId, templateType, checklistId, previewOnly } = this.props.history.location.state
    const { templateId, templateType, checklistId, previewOnly, selectedBuyerIdentifierId, selectedTenderData } = this.props.sectionProps

    if (!previewOnly) {
      window.addEventListener('beforeunload', (event) => this.handleUnload(event))
      document.addEventListener('mousedown', this.handleClickOutside, false)
    }

    if (checklistId) {
      let { defaultAnswered, indicatorAnswers, responseBody, templateByIdData } = this.state
      this.props.getChecklistsDataById(checklistId).then(() => {
        const { checklistDataById, allMappings } = this.props
        // this.props.fetchTemplateById(checklistDataById.template.id).then(() => {
        defaultAnswered = checklistDataById.answers

        this.props.fetchPrioritizationTenderTableForChecklistData({
          tenderId: _.toNumber(checklistDataById.tender.id),
        }).then(() => {

          this.props.getBuyersBySearch(checklistDataById.buyer.identifierLegalNameRu).then(() => {
            responseBody.statusId = checklistDataById.status.id
            this.setState({
              buyers: this.props.buyersBySearch,
              disableSearchTenderById: true,
            }, () => {
              _.forEach(checklistDataById.indicators, (indicatorAnswer) => {
                indicatorAnswers.push({
                  id: indicatorAnswer.id,
                  answerTypeId: indicatorAnswer.answerType ? indicatorAnswer.answerType.id : indicatorAnswer.answerType,
                  comment: indicatorAnswer.comment,
                  indicatorData: indicatorAnswer.indicator,
                  componentImpactId: indicatorAnswer.componentImpact ? indicatorAnswer.componentImpact.id : indicatorAnswer.componentImpact,
                })
              })

              if (!_.isEmpty(indicatorAnswers)) {
                responseBody.indicators = _.map(_.cloneDeep(indicatorAnswers), (indicatorAnswer) => {
                  return {
                    id: indicatorAnswer.id,
                    answerTypeId: indicatorAnswer.answerTypeId,
                    comment: indicatorAnswer.comment,
                    componentImpactId: indicatorAnswer.componentImpactId,
                    indicatorId: indicatorAnswer.indicatorData.id,
                  }
                })
              }

              const { indicators } = this.props.allMappings
              let indicatorsByTenderId = _.map(indicatorAnswers, (indicatorData) => {
                return _.find(indicators, { id: indicatorData.indicatorData.id })
              })

              templateByIdData = {
                name: checklistDataById.templateName,
                type: _.find(allMappings.templateTypes, { id: checklistDataById.templateTypeId }),
              }

              this.setState({
                checklistName: checklistDataById.name,
                // selectedTemplateId: checklistDataById.template.id,
                startDate: checklistDataById.startDate,
                endDate: checklistDataById.endDate,
                selectedBuyer: checklistDataById.buyer,
                templateTypeId: checklistDataById.templateTypeId,
                templateName: checklistDataById.templateName,
                editableChecklistId: checklistDataById.id,
                calculatedScore: checklistDataById.autoScore ? checklistDataById.autoScore : {},
                selectedChecklistScore: checklistDataById.manualScore ? checklistDataById.manualScore : {},
                auditName: checklistDataById.auditName,
                summary: checklistDataById.summary,
                modifiedDate: checklistDataById.modifiedDate,
                contractNumber: checklistDataById.contractNumber,
                contractAmount: checklistDataById.contractAmount,
                contractDescription: checklistDataById.contractDescription,
                supplier: checklistDataById.supplier,
                indicatorsByTenderId: indicatorsByTenderId,
                tenderTableData: this.props.tenderTableDataByBuyerId,
                showTendersTable: true,
                editableMode: true,
                waitLoadData: false,
                previewOnly: previewOnly ? previewOnly : false,
                indicatorAnswers: indicatorAnswers,
                defaultAnswered: defaultAnswered,
                // indicatorsByTenderId: this.props.indicatorsByTenderIdData,
                responseBody: responseBody,
                templateByIdData: templateByIdData,
                selectedTender: this.props.tenderDataForChecklist[0],
              })
            })
          })
        })
      })
    } else {
      this.props.fetchTemplateById(templateId).then(() => {
        if (selectedTenderData) {
          this.props.fetchPrioritizationTenderTableForChecklistData({
            tenderId: _.toNumber(selectedTenderData.id),
          }).then(() => {
            let tenderData = this.props.tenderDataForChecklist[0]
            this.props.getBuyersBySearch(tenderData.identifierId).then(() => {
              this.setState({
                buyers: this.props.buyersBySearch,
                selectedTender: tenderData,
                selectedTemplateId: templateId,
                showTendersTable: true,
                templateTypeId: this.props.templateByIdData.type.id,
                templateName: this.props.templateByIdData.name,
                waitLoadData: false,
                templateByIdData: this.props.templateByIdData,
              }, () => {
                this.setState({
                  selectedBuyer: this.props.buyersBySearch[0],
                }, () => {
                  this.props.fetchIndicatorsDataByTenderId(tenderData.id).then(() => {
                    let { responseBody } = this.state
                    let { indicators } = this.props.allMappings
                    let indicatorAnswers = []

                    _.forEach(this.props.indicatorsByTenderIdData, (indicatorByTender) => {
                      indicatorAnswers.push({
                        id: null,
                        answerTypeId: null,
                        comment: '',
                        indicatorData: _.find(indicators, { id: indicatorByTender.id }),
                        componentImpactId: null,
                      })
                    })

                    responseBody.indicators = _.map(_.cloneDeep(this.props.indicatorsByTenderIdData), (indicatorByTenderId) => {
                      return {
                        id: null,
                        answerTypeId: null,
                        comment: '',
                        componentImpactId: null,
                        indicatorId: indicatorByTenderId.id,
                      }
                    })

                    this.setState({
                      indicatorsByTenderId: this.props.indicatorsByTenderIdData,
                      responseBody: responseBody,
                      indicatorAnswers: indicatorAnswers,
                    })
                  })
                })
              })
            })
          })
        } else {
          this.setState({
            selectedTemplateId: templateId,
            showTendersTable: true,
            templateTypeId: this.props.templateByIdData.type.id,
            templateName: this.props.templateByIdData.name,
            waitLoadData: false,
            templateByIdData: this.props.templateByIdData,
          })
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state) && this.state.calculateAlertOptions.showMessage) {
      message.destroy()
      this.setState({
        calculateAlertOptions: {
          showMessage: false,
          message: '',
        },
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUnload)
    document.removeEventListener('mousedown', this.handleClickOutside, false)
  }

  handleUnload = (event) => {
    window.removeEventListener('beforeunload', this.handleUnload)
    document.removeEventListener('mousedown', this.handleClickOutside, false)
    event.returnValue = '\0/'
  }

  handleClickOutside = (event) => {
    const { translate } = this.props

    if ((_.some(event.path, { className: 'ant-menu-item ant-menu-item-active' }) || _.some(event.path, { className: 'ant-menu-item ant-menu-item-active ant-menu-item-selected' })) && !this.state.previewOnly) {
      if (window.confirm(translate('changes_you_made_may_not_be_saved'))) {
        window.removeEventListener('beforeunload', this.handleUnload)
        document.removeEventListener('mousedown', this.handleClickOutside, false)
        this.props.history.push({
          pathname: event.target.pathname,
          state: {},
        })
      }
    }
  }

  handleSearch = (value) => {
    if (value) {
      this.props.getBuyersBySearch(value).then(() => {
        this.setState({
          buyers: this.props.buyersBySearch,
        })
      })
      // axios.get(`/buyers/search?value=` + value)
      //   .then(response => {
      //     this.setState({
      //       buyers: response.data.buyers,
      //     })
      //   })
    } else {
      this.setState({
        buyers: [],
        selectedBuyer: null,
      })
    }
  }

  handleSelectBuyer = (value, option) => {
    let selectedBuyer = this.state.buyers.find(buyer => buyer.identifierLegalNameRu === value)
    this.setState({
      selectedBuyer: selectedBuyer,
      selectedTender: null,
    }, () => {
      // this.props.ClearCalculatedChecklistScore()
      this.props.fetchPrioritizationTenderTableDataByBuyerId(selectedBuyer.id).then(() => {
        this.setState({
          tenderTableData: this.props.tenderTableDataByBuyerId,
        })
      })
    })
  }

  handleQuestionChange = (checklist) => {
    let { responseBody } = this.state
    responseBody.answers = this.prepareAnswersArray()

    this.setState({
      responseBody: responseBody,
      checklist: checklist,
      checklistChanged: true,
    })
  }

  getTenderIndicators = (tenderId) => {
    this.props.fetchIndicatorsDataByTenderId(tenderId).then(() => {
      let { responseBody } = this.state
      let { indicators } = this.props.allMappings
      let indicatorAnswers = []

      _.forEach(this.props.indicatorsByTenderIdData, (indicatorByTender) => {
        indicatorAnswers.push({
          id: null,
          answerTypeId: null,
          comment: '',
          indicatorData: _.find(indicators, { id: indicatorByTender.id }),
          componentImpactId: null,
        })
      })

      responseBody.indicators = _.map(_.cloneDeep(this.props.indicatorsByTenderIdData), (indicatorByTenderId) => {
        return {
          id: null,
          answerTypeId: null,
          comment: '',
          componentImpactId: null,
          indicatorId: indicatorByTenderId.id,
        }
      })

      this.setState({
        indicatorsByTenderId: this.props.indicatorsByTenderIdData,
        responseBody: responseBody,
        indicatorAnswers: indicatorAnswers,
      })
    })
  }

  handleTenderSelected = (tenderData) => {
    if (!_.isEqual(this.state.selectedTender, tenderData)) {
      let { responseBody, indicatorAnswers } = this.state

      responseBody.indicators = []
      indicatorAnswers = []

      this.setState({
        selectedTender: tenderData,
        indicatorAnswers: indicatorAnswers,
        responseBody: responseBody,
        kpiTableKey: shortId.generate(),
        needToRecalculateScore: true,
      }, () => {
        this.getTenderIndicators(tenderData.id)
      })
    }
  }

  prepareAnswersArray = () => {
    let temp = []

    _.forEach(this.props.checklistQuestionsData.categories, (category) => {
      _.forEach(category.questions, (question) => {
        temp.push({
          answerTypeId: question.answerTypeId,
          comment: question.comment,
          npa: question.npa,
          componentImpactId: question.componentImpactId,
          baseQuestion: question.base,
          categoryName: category.name,
          questionDescription: question.description,
          questionNumber: question.number,
          categoryNumber: category.number,
        })
      })
    })

    return temp
  }

  handleSaveBuyerInspection = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { selectedTender, selectedChecklistScore, templateByIdData, templateTypeId, templateName } = this.state
        let buyer = this.state.buyers.find(buyer => buyer.identifierLegalNameRu === values.buyerName)
        values.startDate = moment(values.startDate).format('YYYY-MM-DD')
        values.endDate = moment(values.endDate).format('YYYY-MM-DD')
        delete values.buyerName
        values = _.merge({}, values, {
          buyerId: buyer.id,
          templateName: templateName,
          templateTypeId: templateTypeId,
          // answers: answers,
          answers: this.prepareAnswersArray(),
          indicators: this.state.responseBody.indicators,
          // tenderId: selectedTender ? selectedTender.id : null,
          statusId: this.state.responseBody.statusId,
          id: this.state.editableChecklistId,
          manualScoreId: selectedChecklistScore.hasOwnProperty('id') ? selectedChecklistScore.id : null,
          startDate: toISOFormat(new Date()),
          endDate: toISOFormat(new Date()),
        })

        Promise.resolve(this.props.saveNewBuyerChecklist(values)).then(() => {
          this.props.history.push({
            pathname: '/inspections/buyer',
            state: {},
          })
        })
      }
    })
  }

  handleSaveAsTemplate = () => {
    this.setState({
      showAddNewTemplateFromDefaultForm: true,
    })
  }

  handleFormClickCancelCreateFromDefaultTemplate = () => {
    this.setState({
      showAddNewTemplateFromDefaultForm: false,
    })
  }

  handleFormClickCreateFromDefaultTemplate = (formInstance) => {
    const { translate } = this.props
    formInstance.validateFields((err, values) => {
      if (err) {
        return
      }

      let responseBody = {
        name: values.name,
        typeId: this.state.templateByIdData.type.id,
        categories: this.props.checklistQuestionsData.categories,
      }

      this.props.saveNewTemplateFromDefault(responseBody).then(() => {
        if (this.props.saveAuditorTemplateErrorStatus) {
          message.error(translate('checklist_save_as_template_error_message'))
        } else {
          message.success(translate('checklist_save_as_template_success_message'))
        }

        formInstance.resetFields()
        this.setState({
          showAddNewTemplateFromDefaultForm: false,
        })
      })
    })
  }

  handleSaveAndCompleteBuyerInspection = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          noAnswersToCalculateScore,
          selectedChecklistScore,
          responseBody,
          selectedBuyer,
          indicatorAnswers,
          templateTypeId,
          templateName,
        } = this.state
        const { translate } = this.props

        let amountOfQuestions = 0
        let amountOfIndicatorsAnswers = 0
        let preparedAnswers = this.prepareAnswersArray()
        // _.forEach(this.props.checklistQuestionsData.categories, (category) => {
        //   amountOfQuestions += category.questions.length
        // })
        _.forEach(preparedAnswers, (answer) => {
          answer.answerTypeId && amountOfQuestions++
        })

        _.forEach(indicatorAnswers, (indicatorData) => {
          indicatorData.answerTypeId && amountOfIndicatorsAnswers++
        })

        // console.log('-=amountOfIndicatorsAnswers=-', amountOfIndicatorsAnswers)
        // if (!selectedTender ||
        //   (_.isEmpty(responseBody.indicators) || (!_.isEqual(responseBody.indicators.length, amountOfIndicatorsAnswers))) ||
        //   (_.isEmpty(preparedAnswers) || (!_.isEqual(preparedAnswers.length, amountOfQuestions)))
        // ) {


        // if ((_.isEmpty(responseBody.indicators) || (!_.isEqual(responseBody.indicators.length, amountOfIndicatorsAnswers)))) {
        if (!_.isEqual(responseBody.indicators.length, amountOfIndicatorsAnswers) && !_.isEmpty(responseBody.indicators)) {
          this.setState({
            calculateAlertOptions: {
              showMessage: true,
              message: translate('not_complete_checklist_indicator_message'),
            },
          }, () => {
            this.scrollToMyRef('_indicatorsElementRef')
          })
        } else if (_.isEmpty(preparedAnswers) || (!_.isEqual(preparedAnswers.length, amountOfQuestions))) {
          this.setState({
            calculateAlertOptions: {
              showMessage: true,
              message: translate('not_complete_checklist_questions_message'),
            },
          }, () => {
            this.scrollToMyRef('_answersElementRef')
          })
        } else if (noAnswersToCalculateScore) {
          this.setState({
            calculateAlertOptions: {
              showMessage: true,
              message: translate('not_complete_checklist_questions_message'),
            },
          }, () => {
            this.scrollToMyRef('_answersElementRef')
          })
        } else if (_.isEmpty(selectedChecklistScore)) {
          this.setState({
            calculateAlertOptions: {
              showMessage: true,
              message: translate('not_complete_checklist_manual_score_message'),
            },
          }, () => {
            this.scrollToMyRef('_manualScoreElementRef')
          })
        } else if (_.isEmpty(values.summary)) {
          this.setState({
            calculateAlertOptions: {
              showMessage: true,
              message: translate('not_complete_checklist_summary_comment_message'),
            },
          }, () => {
            this.scrollToMyRef('_manualCommentElementRef')
          })
        } else {
          let buyer = this.state.buyers.find(buyer => buyer.identifierLegalNameRu === values.buyerName)
          values.startDate = moment(values.startDate).format('YYYY-MM-DD')
          values.endDate = moment(values.endDate).format('YYYY-MM-DD')
          delete values.buyerName
          values = _.merge({}, values, {
            buyerId: buyer.id,
            templateName: templateName,
            templateTypeId: templateTypeId,
            // answers: answers,
            answers: preparedAnswers,
            indicators: this.state.responseBody.indicators,
            // tenderId: selectedTender ? selectedTender.id : null,
            statusId: 2,
            id: this.state.editableChecklistId,
            manualScoreId: selectedChecklistScore.hasOwnProperty('id') ? selectedChecklistScore.id : null,
            startDate: toISOFormat(new Date()),
            endDate: toISOFormat(new Date()),
          })

          Promise.resolve(this.props.saveNewBuyerChecklist(values)).then(() => {
            this.props.history.push({
              pathname: '/inspections/buyer',
              state: {},
            })
          })
        }
      }
    })
  }

  validateSelectBuyer = (rule, value, callback) => {
    (!this.state.buyers.find(buyer => buyer.identifierLegalNameRu === value)) ? callback(true) : callback()
  }

  getComponentImpactByAnswer = (indicatorHasAnswer, componentImpactsForKPI) => {
    if (_.isEmpty(indicatorHasAnswer)) {
      return {
        disabled: true,
        value: null,
      }
    } else {
      if (indicatorHasAnswer.answerTypeId) {
        if (indicatorHasAnswer.answerTypeId === 2) {
          return {
            disabled: true,
            value: componentImpactsForKPI[0].id,
          }
        } else {
          return {
            disabled: false,
            value: indicatorHasAnswer.componentImpactId,
          }
        }
      } else {
        return {
          disabled: true,
          value: null,
        }
      }
    }
  }

  onChangeIndicatorAnswer = (value, option, indicatorData) => {
    let { indicatorAnswers, responseBody } = this.state
    const responseBodyIndicators = _.cloneDeep(responseBody.indicators)

    _.forEach(indicatorAnswers, (indicatorAnswer) => {
      if (indicatorAnswer.indicatorData.id === indicatorData.id) {
        indicatorAnswer.answerTypeId = value.key
        if (indicatorAnswer.answerTypeId === 2) {
          indicatorAnswer.componentImpactId = 2
        }

        if (!indicatorAnswer.componentImpactId) {
          indicatorAnswer.componentImpactId = 2
        }
      }

      return indicatorAnswer
    })

    responseBody.indicators = _.map(_.cloneDeep(indicatorAnswers), (indicatorAnswer) => {
      return {
        id: indicatorAnswer.id,
        answerTypeId: indicatorAnswer.answerTypeId,
        comment: indicatorAnswer.comment,
        componentImpactId: indicatorAnswer.componentImpactId,
        indicatorId: indicatorAnswer.indicatorData.id,
      }
    })

    this.setState({
      indicatorAnswers: indicatorAnswers,
      responseBody: responseBody,
      needToRecalculateScore: !_.isEqual(responseBodyIndicators, responseBody.indicators),
    })
  }

  onChangeComponentImpacts = (value, option, indicatorData) => {
    let { indicatorAnswers, responseBody } = this.state
    const responseBodyIndicators = _.cloneDeep(responseBody.indicators)
    let indicatorHasAnswer = _.map(indicatorAnswers, (indicatorAnswer) => {
      if (indicatorAnswer.indicatorData.id === indicatorData.id) {
        indicatorAnswer.componentImpactId = value.key
      }

      return indicatorAnswer
    })

    responseBody.indicators = _.map(_.cloneDeep(indicatorHasAnswer), (indicatorAnswer) => {
      return {
        id: indicatorAnswer.id,
        answerTypeId: indicatorAnswer.answerTypeId,
        comment: indicatorAnswer.comment,
        componentImpactId: indicatorAnswer.componentImpactId,
        indicatorId: indicatorAnswer.indicatorData.id,
      }
    })

    this.setState({
      indicatorAnswers: indicatorHasAnswer,
      responseBody: responseBody,
      needToRecalculateScore: !_.isEqual(responseBodyIndicators, responseBody.indicators),
    })
  }

  onChangeImpactComment = (event, indicatorData) => {

    let { indicatorAnswers, responseBody } = this.state
    const responseBodyIndicators = _.cloneDeep(responseBody.indicators)

    let indicatorHasAnswer = _.map(indicatorAnswers, (indicatorAnswer) => {
      if (indicatorAnswer.indicatorData.id === indicatorData.id) {
        indicatorAnswer.comment = event.target.value
      }

      return indicatorAnswer
    })

    responseBody.indicators = _.map(_.cloneDeep(indicatorHasAnswer), (indicatorAnswer) => {
      return {
        id: indicatorAnswer.id,
        answerTypeId: indicatorAnswer.answerTypeId,
        componentImpactId: indicatorAnswer.componentImpactId,
        comment: indicatorAnswer.comment,
        indicatorId: indicatorAnswer.indicatorData.id,
      }
    })

    this.setState({
      indicatorAnswers: indicatorHasAnswer,
      responseBody: responseBody,
      needToRecalculateScore: !_.isEqual(responseBodyIndicators, responseBody.indicators),
    })
  }

  renderComponentImpacts = (indicatorData) => {
    const { allMappings, componentImpactsKey } = this.props
    const { indicatorAnswers } = this.state
    let componentImpactsForKPI = _.cloneDeep(allMappings.componentImpacts)
    componentImpactsForKPI.splice(0, 1)
    let indicatorHasAnswer = _.filter(indicatorAnswers, (indicatorAnswer) => (indicatorAnswer.indicatorData.id === indicatorData.id)).pop()
    let compactDataByIndicatorAnswer = this.getComponentImpactByAnswer(indicatorHasAnswer, componentImpactsForKPI)
    let defaultSelected = compactDataByIndicatorAnswer.value ? { key: compactDataByIndicatorAnswer.value } : { key: '' }
    return (
      <Select
        style={{ width: '100%' }}
        labelInValue
        value={defaultSelected}
        onChange={(value, option) => this.onChangeComponentImpacts(value, option, indicatorData)}
        disabled={compactDataByIndicatorAnswer.disabled}
      >
        {_.map(componentImpactsForKPI, (componentImpact) => (
          (
            <Select.Option
              key={componentImpact.id}
              value={componentImpact.id}
              // disabled={compactDataByIndicatorAnswer.disabled}
            >
              {componentImpact[componentImpactsKey]}
            </Select.Option>
          )
        ))}

      </Select>
    )
  }

  renderImpactCommentComponent = (indicatorData) => {
    const { translate } = this.props
    const { indicatorAnswers } = this.state

    let defaultIndicatorComment = null
    _.forEach(indicatorAnswers, (indicatorAnswer) => {
      if (indicatorAnswer.indicatorData.id === indicatorData.id) {
        defaultIndicatorComment = indicatorAnswer.comment
      }
    })

    return (
      <Input.TextArea
        placeholder={translate('option_comment')}
        autosize={{ minRows: 1, maxRows: 10 }}
        onChange={(event) => this.onChangeImpactComment(event, indicatorData)}
        value={defaultIndicatorComment ? defaultIndicatorComment : ''}
      />
    )
  }

  renderIndicatorAnswers = (indicatorData) => {
    const { allMappings, indicatorAnswersKey } = this.props
    const { indicatorAnswers } = this.state
    let existIndicatorAnswer = null

    if (!_.isEmpty(indicatorAnswers)) {
      existIndicatorAnswer = _.filter(indicatorAnswers, (haveAnswer) => (haveAnswer.indicatorData.id === indicatorData.id)).pop()
    }

    let defaultSelected = existIndicatorAnswer.answerTypeId ? { key: existIndicatorAnswer.answerTypeId } : { key: '' }

    return (
      <Select
        labelInValue
        value={defaultSelected}
        style={{ width: '100%' }}
        onChange={(value, option) => this.onChangeIndicatorAnswer(value, option, indicatorData)}
      >
        {_.map(allMappings.indicatorAnswers, (indicatorAnswer) => (
          <Select.Option key={indicatorAnswer.id}
                         value={indicatorAnswer.id}>{indicatorAnswer[indicatorAnswersKey]}</Select.Option>
        ))}

      </Select>
    )
  }

  prepareIndicatorsTableData = () => {
    const { indicatorsByTenderId } = this.state
    const { indicators } = this.props.allMappings
    return _.map(indicatorsByTenderId, (indicatorData) => {
      let findIndicatorData = _.find(indicators, { id: indicatorData.id })
      indicatorData = _.merge({}, indicatorData, {
        indicatorAnswers: this.renderIndicatorAnswers(indicatorData),
        componentImpacts: this.renderComponentImpacts(indicatorData),
        indicatorComment: this.renderImpactCommentComponent(indicatorData),
        ...findIndicatorData,
      })

      return indicatorData
    })
  }

  renderIndicatorsWorked = () => {
    const { translate } = this.props
    let preparedColumns = _.map(INDICATORS_BY_TENDER_TABLE, (column) => {
      column.title = translate(column.translateKey)
      if (column.dataIndex === 'description') {
        column.dataIndex = getLocalizationPropByKey('indicatorsKey')
      }
      return column
    })

    return (
      <Row>
        <Col span={24}>
          <Divider>{translate('triggered_indicators')}</Divider>
        </Col>
        <Col span={24} ref={this._indicatorsElementRef} className="indicatorsHighlightTenderTable">
          <Table
            key={this.state.kpiTableKey}
            bordered
            rowKey='id'
            size="small"
            pagination={{ pageSize: 5 }}
            columns={preparedColumns}
            // indentSize={150}
            dataSource={this.prepareIndicatorsTableData()}
          />
        </Col>
      </Row>
    )
  }

  handleChangeChecklistQuestionIndicators = (answers, changeAnswerStatus) => {
    let { responseBody, noAnswersToCalculateScore } = this.state
    const { checklistQuestionsData } = this.props
    responseBody.answers = _.map(_.cloneDeep(answers), (answer) => {
      // delete answer.tempIndex
      delete answer.selectDisabled
      return answer
    })

    let amountOfQuestions = 0
    let amountOfAnsweredMissing = 0

    _.forEach(checklistQuestionsData.categories, (category) => {
      _.forEach(category.questions, (question) => {
        let findAnswer = _.find(responseBody.answers, { tempIndex: question.tempIndex })
        if (!_.isEmpty(findAnswer)) {
          amountOfQuestions++
          if (findAnswer.componentImpactId === 1) {
            amountOfAnsweredMissing++
          }
        } else {
          amountOfQuestions++
        }
      })
    })

    noAnswersToCalculateScore = (amountOfQuestions !== 0) && (amountOfQuestions === amountOfAnsweredMissing)

    this.setState({
      responseBody: responseBody,
      noAnswersToCalculateScore: noAnswersToCalculateScore,
      needToRecalculateScore: changeAnswerStatus,
    })
  }

  onChangeChecklistScore = (value) => {
    this.setState({
      selectedChecklistScore: {
        id: value.key,
        name: value.label,
      },
    })
  }

  closeCalculateAlert = (e) => {
    e.preventDefault()
    this.setState({
      calculateAlertOptions: {
        showMessage: false,
        message: '',
      },
    }, () => {
      message.destroy()
    })
  }

  prepareCustomClosableMessage = (message) => {
    return (
      <div style={{ display: 'inline', position: 'relative' }}>
        <span style={{ paddingRight: '10px' }}>{message}</span>
        <div style={{ position: 'absolute', top: '-12px', right: '-22px' }}
             onClick={(e) => this.closeCalculateAlert(e)}>
          <Icon type="close-circle" style={{ color: '#8c8c8c', cursor: 'pointer' }} />
        </div>
      </div>
    )
  }

  handleCalculatedScore = () => {
    message.destroy()
    const { responseBody, selectedBuyer, selectedTender, selectedTemplateId, indicatorAnswers } = this.state
    const { translate } = this.props

    // let amountOfQuestions = 0
    // _.forEach(this.props.checklistQuestionsData.categories, (category) => {
    //   amountOfQuestions += category.questions.length
    // })

    let amountOfQuestions = 0
    let amountOfIndicatorsAnswers = 0
    let preparedAnswers = this.prepareAnswersArray()

    // _.forEach(this.props.checklistQuestionsData.categories, (category) => {
    //   amountOfQuestions += category.questions.length
    // })
    _.forEach(preparedAnswers, (answer) => {
      answer.answerTypeId && amountOfQuestions++
    })

    _.forEach(indicatorAnswers, (indicatorData) => {
      indicatorData.answerTypeId && amountOfIndicatorsAnswers++
    })

    if (!selectedTender) {
      this.setState({
        calculateAlertOptions: {
          showMessage: true,
          message: translate('calculate_no_selected_tender_message'),
        },
      }, () => {
        this.scrollToMyRef('_tenderElementRef')
      })
    }
    // else if ((_.isEmpty(responseBody.indicators) || (!_.isEqual(responseBody.indicators.length, amountOfIndicatorsAnswers)))) {
    else if (!_.isEqual(responseBody.indicators.length, amountOfIndicatorsAnswers) && !_.isEmpty(responseBody.indicators)) {
      this.setState({
        calculateAlertOptions: {
          showMessage: true,
          message: translate('calculate_no_kpi_indicators_answer_message'),
        },
      }, () => {
        this.scrollToMyRef('_indicatorsElementRef')
      })
    } else if (_.isEmpty(preparedAnswers) || (!_.isEqual(preparedAnswers.length, amountOfQuestions))) {
      this.setState({
        calculateAlertOptions: {
          showMessage: true,
          message: translate('calculate_no_questions_answers_message'),
        },
      }, () => {
        this.scrollToMyRef('_answersElementRef')
      })
    } else {
      let responseData = _.merge({}, responseBody, {
        templateId: selectedTemplateId,
      })

      selectedBuyer && (responseData = _.merge({}, responseData, {
        buyerId: selectedBuyer.id,
      }))

      selectedTender && (responseData = _.merge({}, responseData, {
        tenderId: selectedTender.id,
      }))

      this.props.calculateChecklistScore(responseData).then(() => {
        this.setState({
          calculatedScore: this.props.calculatedChecklistScoreData,
          needToRecalculateScore: false,
          checklistChanged: false,
        })
      })
    }
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    this.onChange('startValue', value)
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  handleSearchByCompetitionId = (value) => {
    if (value) {
      this.props.fetchPrioritizationTenderTableForChecklistData({
        tenderId: _.toNumber(value),
      }).then(() => {
        if (!_.isEmpty(this.props.tenderDataForChecklist)) {
          let tenderData = this.props.tenderDataForChecklist[0]
          this.props.getBuyersBySearch(tenderData.identifierId).then(() => {
            this.setState({
              buyers: this.props.buyersBySearch,
              selectedTender: tenderData,
              notFoundTenderById: false,
            }, () => {
              this.setState({
                selectedBuyer: this.props.buyersBySearch[0],
              }, () => {
                this.props.fetchIndicatorsDataByTenderId(tenderData.id).then(() => {
                  let { responseBody } = this.state
                  let { indicators } = this.props.allMappings
                  let indicatorAnswers = []

                  _.forEach(this.props.indicatorsByTenderIdData, (indicatorByTender) => {
                    indicatorAnswers.push({
                      id: null,
                      answerTypeId: null,
                      comment: '',
                      indicatorData: _.find(indicators, { id: indicatorByTender.id }),
                      componentImpactId: null,
                    })
                  })

                  responseBody.indicators = _.map(_.cloneDeep(this.props.indicatorsByTenderIdData), (indicatorByTenderId) => {
                    return {
                      id: null,
                      answerTypeId: null,
                      comment: '',
                      componentImpactId: null,
                      indicatorId: indicatorByTenderId.id,
                    }
                  })

                  let eraseQuestionData = _.cloneDeep(this.props.checklistQuestionsData)

                  _.forEach(eraseQuestionData.categories, (category) => {
                    _.forEach(category.questions, (question) => {
                      question.answerTypeId = null
                      question.componentImpactId = null
                      question.comment = ''
                      question.npa = ''
                    })
                  })

                  responseBody.answers = _.map(responseBody.answers, (answer) => {
                    answer.answerTypeId = null
                    answer.componentImpactId = null
                    answer.comment = ''
                    answer.npa = ''

                    return answer
                  })

                  this.props.changeChecklistQuestionsData(eraseQuestionData)
                  this.setState({
                    indicatorsByTenderId: this.props.indicatorsByTenderIdData,
                    responseBody: responseBody,
                    indicatorAnswers: indicatorAnswers,
                  })
                })
              })
            })
          })
        } else {
          this.setState({
            buyers: [],
            selectedTender: null,
            selectedBuyer: null,
            indicatorsByTenderId: null,
            notFoundTenderById: true,
          })
        }
      })
    }
  }

  validateCompetitionId = (rule, value, callback) => {
    (!value) ? callback(true) : callback()
  }

  scrollToMyRef = (refName) => {
    let headerOffset = 70
    let elementPosition = ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].offsetParent.offsetTop
    let offsetPosition = elementPosition - headerOffset

    switch (refName) {
      case '_buyerElementRef':
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollIntoView({
        //   block: 'center',
        //   behavior: 'smooth',
        // })
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-buyer')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-buyer')
        }, 2000)
        break
      case '_tenderElementRef':
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollIntoView({
        //   // block: 'start',
        //   top: offsetPosition,
        //   behavior: 'smooth',
        // })
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-tender')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-tender')
        }, 2000)
        break
      case '_indicatorsElementRef':
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollIntoView({
        //   block: 'center',
        //   behavior: 'smooth',
        // })
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-tender')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-tender')
        }, 2000)
        break
      case '_answersElementRef':
        // let questionElement = ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].offsetParent.offsetTop
        // let cardHeaderHeight = ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].children[0].children[0].clientHeight
        // offsetPosition = questionElement - headerOffset + cardHeaderHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollIntoView({
        //   block: 'start',
        //   behavior: 'smooth',
        // })
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-answers')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-answers')
        }, 2000)
        break
      case '_manualCommentElementRef':
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollIntoView({
        //   block: 'center',
        //   behavior: 'smooth',
        // })
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollTop += 10
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-manual-impact')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-manual-impact')
        }, 2000)
        break
      case '_manualScoreElementRef':
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollIntoView({
        //   block: 'center',
        //   behavior: 'smooth',
        // })
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollTop += 10
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-manual-impact')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-manual-impact')
        }, 2000)
        break

      default:
        break
    }
  }

  renderChecklistStatusLabel = () => {
    const { translate } = this.props
    const { responseBody: { statusId } } = this.state
    if (statusId === 2) {
      return (
        <Badge
          count={translate('checklist_status_complete_name')}
          style={{ backgroundColor: '#52c41a', fontSize: '14px' }}
        />
      )
    } else {
      return (
        <Badge
          count={translate('checklist_status_not_complete_name')}
          style={{ fontSize: '14px' }}
        />
      )
    }
  }

  onCloseAlert = () => {
    message.destroy()
  }

  handleClickBackButton = () => {
    this.props.history.push('/inspections/buyer')
  }

  render() {
    const {
      waitLoadData,
      buyers,
      selectedBuyer,
      calculateAlertOptions,
      calculatedScore,
      checklistName,
      selectedChecklistScore,
      summary,
      modifiedDate,
      contractNumber,
      contractAmount,
      contractDescription,
      supplier,
      selectedTender,
      responseBody,
    } = this.state
    const { allMappings, translate, form, checklistScoreKey } = this.props
    const { getFieldDecorator } = form

    if (waitLoadData) {
      return null
    }

    return (
      <div className="InspectionPage">
        {calculateAlertOptions.showMessage && message.warning(this.prepareCustomClosableMessage(calculateAlertOptions.message), 4, this.onCloseAlert)}
        {this.state.showAddNewTemplateFromDefaultForm && <AddNewTemplateFromDefaultForm
          isVisible={this.state.showAddNewTemplateFromDefaultForm}
          onCreate={this.handleFormClickCreateFromDefaultTemplate}
          onCancel={this.handleFormClickCancelCreateFromDefaultTemplate}
          defaultTemplateData={this.state.templateByIdData}
        />}
        <Row style={{ marginBottom: 15 }}>
          <Col span={4}>
            <div>
              <Button size='large' onClick={() => this.handleClickBackButton()}>
                <Icon type="left" />
                {translate('back_button')}
              </Button>
            </div>
          </Col>
          <Col span={4} offset={16}>
            <div style={{ float: 'right' }}>
              {this.renderChecklistStatusLabel()}
            </div>
          </Col>
        </Row>
        <Form
          layout="horizontal"
          prefixCls="buyer_inspection_form"
        >
          <Row style={{ marginBottom: 15 }}>
            <Col span={6} ref={this._tenderElementRef} className="checklistTenderTable">
              <Form.Item>
                {getFieldDecorator('tenderId', {
                  initialValue: selectedTender && selectedTender.id,
                  rules: [{
                    required: true,
                    message: translate('not_empty_field'),
                    validator: this.validateCompetitionId,
                  }],
                })(
                  <Input.Search
                    placeholder={translate('tender_filter_concurs_number_name')}
                    onSearch={this.handleSearchByCompetitionId}
                    enterButton
                    disabled={this.state.disableSearchTenderById}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.notFoundTenderById && <Row style={{ marginBottom: 5 }}>
            <Col span={24}>
              <Alert
                description={translate('no_found_tender_by_id')}
                type="warning"
                showIcon
              />
              {/*needToRecalculateScore*/}
            </Col>
          </Row>}
          {/*<Row>*/}
          {/*<Col span={24}>*/}
          {/*{this.state.selectedTemplateId && <TenderInformationComponent*/}
          {/*templateData={this.state.templateByIdData}*/}
          {/*selectedBuyerData={this.state.selectedBuyer}*/}
          {/*selectedTenderData={this.state.selectedTender}*/}
          {/*/>}*/}
          {/*</Col>*/}
          {/*</Row>*/}
          <Row>
            <Col span={6}>
              {translate('checklist_name')}
            </Col>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator('name', {
                  initialValue: checklistName && checklistName,
                  rules: [{ required: true, message: translate('not_empty_field') }],
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
          </Row>

          {/*<Row>*/}
          {/*<Col span={6}>*/}
          {/*{translate('inspection_audit_name')}*/}
          {/*</Col>*/}
          {/*<Col span={16}>*/}
          {/*<Form.Item>*/}
          {/*{getFieldDecorator('auditName', {*/}
          {/*initialValue: auditName && auditName,*/}
          {/*rules: [{ required: true, message: translate('not_empty_field') }],*/}
          {/*})(*/}
          {/*<Input />,*/}
          {/*)}*/}
          {/*</Form.Item>*/}
          {/*</Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*<Col span={6}>*/}
          {/*{translate('inspection_period_of_the_audit_name')}*/}
          {/*</Col>*/}
          {/*<Col span={6} className="date-picker-container">*/}
          {/*<Form.Item>*/}
          {/*{getFieldDecorator('startDate', {*/}
          {/*initialValue: startDate && moment(new Date(startDate)),*/}
          {/*rules: [*/}
          {/*{*/}
          {/*type: 'object',*/}
          {/*required: true,*/}
          {/*// message: 'Please input startDate',*/}
          {/*message: `${translate('please_select')} ${translate('start_data')}`,*/}
          {/*whitespace: true,*/}
          {/*},*/}
          {/*],*/}
          {/*})(*/}
          {/*<DatePicker*/}
          {/*disabledDate={this.disabledStartDate}*/}
          {/*style={{ width: '90%' }}*/}
          {/*placeholder={translate('start_data')}*/}
          {/*onChange={this.onStartChange}*/}
          {/*/>)}*/}
          {/*</Form.Item>*/}
          {/*</Col>*/}
          {/*<Col span={6} className="date-picker-container">*/}
          {/*<Form.Item>*/}
          {/*{getFieldDecorator('endDate', {*/}
          {/*initialValue: endDate && moment(new Date(endDate)),*/}
          {/*rules: [*/}
          {/*{*/}
          {/*type: 'object',*/}
          {/*required: true,*/}
          {/*message: `${translate('please_select')} ${translate('end_date')}`,*/}
          {/*whitespace: true,*/}
          {/*},*/}
          {/*],*/}
          {/*})(*/}
          {/*<DatePicker*/}
          {/*disabledDate={this.disabledEndDate}*/}
          {/*style={{ width: '90%' }}*/}
          {/*placeholder={translate('end_date')}*/}
          {/*onChange={this.onEndChange}*/}
          {/*/>)}*/}
          {/*</Form.Item>*/}
          {/*</Col>*/}
          {/*</Row>*/}
          <Row>
            <Col span={6}>
              {translate('inspection_checked_organization_name')}
            </Col>
            <Col span={16} ref={this._buyerElementRef} className="checklistBuyerDropDown">
              <Form.Item>
                {getFieldDecorator('buyerName', {
                  initialValue: selectedBuyer ? selectedBuyer.identifierLegalNameRu : '',
                  // rules: [
                  //   {
                  //     type: 'string',
                  //     // required: true,
                  //     message: `${translate('please_select')} ${translate('buyer_title')}`,
                  //     whitespace: true,
                  //     validator: this.validateSelectBuyer,
                  //   },
                  // ],
                })(
                  <AutoComplete
                    dataSource={buyers.map(buyer => (buyer.identifierLegalNameRu))}
                    style={{ width: '100%' }}
                    // onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    onSelect={this.handleSelectBuyer}
                    placeholder={translate('buyer_title')}
                    disabled={true}
                  >
                    <Input />
                  </AutoComplete>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_date_of_completion_name')}
            </Col>
            <Col span={16}>
              <span className="modified-date-field">{modifiedDate}</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_contract_number_name')}
            </Col>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator('contractNumber', {
                  initialValue: contractNumber && contractNumber,
                  // rules: [{ required: true, message: translate('not_empty_field') }],
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_amount_of_the_deal_name')}
            </Col>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator('contractAmount', {
                  initialValue: contractAmount && contractAmount,
                  // rules: [{ required: true, message: translate('not_empty_field') }],
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    // type="number"
                    // onChange={(e) => this.props.handleChangeSumTo(e.target.value)}
                    // onChange={this.props.handleChangeSumTo}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_description_of_the_contract_name')}
            </Col>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator('contractDescription', {
                  initialValue: contractDescription && contractDescription,
                  // rules: [{ required: true, message: translate('not_empty_field') }],
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_contractor_name')}
            </Col>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator('supplier', {
                  initialValue: supplier && supplier,
                  // rules: [{ required: true, message: translate('not_empty_field') }],
                })(
                  <Input />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_published_date_on_portal_name')}
            </Col>
            <Col span={16}>
              <Input value={selectedTender ? selectedTender.datePublished : ''} disabled={true} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_date_start_concurs_name')}
            </Col>
            <Col span={16}>
              <Input value={selectedTender ? selectedTender.periodStartDate : ''} disabled={true} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_date_end_concurs_name')}
            </Col>
            <Col span={16}>
              <Input value={selectedTender ? selectedTender.periodEndDate : ''} disabled={true} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_amount_of_concurs_name')}
            </Col>
            <Col span={16}>
              <Input value={selectedTender ? selectedTender.dateDisclosed : ''} disabled={true} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_date_disclosed_concurs_name')}
            </Col>
            <Col span={16}>
              <Input value={selectedTender ? selectedTender.guaranteeAmount : ''} disabled={true} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_contract_date_of_concurs_name')}
            </Col>
            <Col span={16}>
              <Input value={selectedTender ? selectedTender.contractSigningDate : ''} disabled={true} />
            </Col>
          </Row>

          {/*{(showTendersTable && selectedBuyer && !_.isEmpty(tenderTableData)) ? (<Row>*/}
          {/*<Col span={24} ref={this._tenderElementRef} className="checklistTenderTable">*/}
          {/*<PrioritizationBaseTable*/}
          {/*bordered*/}
          {/*rowKey='id'*/}
          {/*size="small"*/}
          {/*pagination={{ pageSize: 10 }}*/}
          {/*columns={PRIORITIZATION_TENDER_TABLE_COLUMNS}*/}
          {/*dataSource={tenderTableData}*/}
          {/*rowSelectable={true}*/}
          {/*allowCheckboxes={false}*/}
          {/*onSelectRow={(tenderData) => this.handleTenderSelected(tenderData)}*/}
          {/*defaultSelectedRow={this.state.selectedTender}*/}
          {/*/>*/}
          {/*</Col>*/}
          {/*</Row>) : (showTendersTable && selectedBuyer && _.isEmpty(tenderTableData)) && (*/}
          {/*<Row style={{ marginBottom: 15 }}>*/}
          {/*<Col span={24}>*/}
          {/*<Alert*/}
          {/*message={translate('alert_info_title')}*/}
          {/*description={translate('buyer_no_tenders_message')}*/}
          {/*type="info"*/}
          {/*showIcon*/}
          {/*/>*/}
          {/*</Col>*/}
          {/*</Row>*/}
          {/*)}*/}
          {!_.isEmpty(this.state.indicatorsByTenderId) && this.renderIndicatorsWorked()}
        </Form>
        <Row>
          <Col span={24} ref={this._answersElementRef} className="answersHighlightCards">
            <BuyerInspectionForm
              selectedTemplateId={this.state.selectedTemplateId}
              templateByIdData={this.state.templateByIdData}
              selectedBuyer={this.state.selectedBuyer}
              selectedTender={this.state.selectedTender}
              defaultAnswered={this.state.defaultAnswered}
              getFieldDecorator={getFieldDecorator}
              onlyView={this.state.previewOnly}
              handleChangeChecklistQuestion={this.handleQuestionChange}
              handleChangeChecklistQuestionIndicators={this.handleChangeChecklistQuestionIndicators}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 5 }}>
          <Col span={24}>
            {this.state.needToRecalculateScore && <Alert
              description={translate('checklist_buyer_or_question_change_message')}
              type="warning"
              showIcon
            />}
            {/*needToRecalculateScore*/}
          </Col>
        </Row>
        <Row style={{ marginBottom: 5 }}>
          <Col span={24}>
            {this.state.noAnswersToCalculateScore && <Alert
              description={translate('checklist_question_selected_as_missing_message')}
              type="warning"
              showIcon
            />}
            {/*needToRecalculateScore*/}
          </Col>
        </Row>

        <Row style={{ marginBottom: 15 }}>
          <Col span={12}>
            {translate('result_evaluation_automatic_scoring_without_critical_information')}
          </Col>
          <Col span={8}>
            <Select
              className={`risk-indicator-background-${calculatedScore.hasOwnProperty('id') && calculatedScore.id}`}
              labelInValue
              style={{ width: '100%' }}
              // onChange={(value, option) => this.onChangeChecklistScore(value, option)}
              // disabled={_.isEmpty(calculatedScore)}
              disabled={true}
              value={calculatedScore.hasOwnProperty('id') ? { key: calculatedScore.id } : { key: '' }}

            >
              {_.map(allMappings.checklistScores, (checklistScore) => (
                <Select.Option key={checklistScore.id}
                               value={checklistScore.id}>{checklistScore[checklistScoreKey]}</Select.Option>
              ))}

            </Select>
          </Col>
          <Col span={4}>
            {!this.state.previewOnly && <Button
              type="primary"
              htmlType="button"
              style={{ marginLeft: '15px' }}
              onClick={(e) => this.handleCalculatedScore(e)}
              disabled={this.state.noAnswersToCalculateScore}
            >{translate('checklist_calculate_score_button_name')}
            </Button>}
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col span={24} ref={this._manualScoreElementRef} className="manualScoreElementRef">
            <Col span={12}>
              {translate('final_assessment_representative_SP_KP')}
            </Col>
            <Col span={8}>
              {/*checklistScores*/}
              <Select
                className={`risk-indicator-background-${selectedChecklistScore.hasOwnProperty('id') && selectedChecklistScore.id}`}
                labelInValue
                style={{ width: '100%' }}
                value={selectedChecklistScore.hasOwnProperty('id') ? { key: selectedChecklistScore.id } : { key: '' }}
                onChange={(value, option) => this.onChangeChecklistScore(value, option)}
              >
                {_.map(allMappings.checklistScores, (checklistScore) => (
                  <Select.Option key={checklistScore.id}
                                 value={checklistScore.id}>{checklistScore[checklistScoreKey]}</Select.Option>
                ))}
              </Select>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <strong>{translate('inspection_auditor_comment_name')}</strong>
          </Col>
        </Row>
        <Row>
          <Col span={24} ref={this._manualCommentElementRef} className="manualCommentEmentRef">
            <Form.Item>
              {getFieldDecorator('summary', {
                initialValue: summary && summary,
                // rules: [{ required: true, message: translate('not_empty_field') }],
              })(
                <Input.TextArea autosize={{ minRows: 2, maxRows: 10 }} />,
              )}
            </Form.Item>
          </Col>
        </Row>
        {!this.state.previewOnly && <Row>
          <Col span={2}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSaveBuyerInspection}
                disabled={this.state.notFoundTenderById}
              >
                {translate('save_button')}
              </Button>
            </Form.Item>
          </Col>
          {(responseBody.statusId === 1) && <Col span={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSaveAndCompleteBuyerInspection}
                disabled={this.state.notFoundTenderById}
              >
                {translate('complete_and_calculate_button_name')}
              </Button>
            </Form.Item>
          </Col>}
          <Col span={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSaveAsTemplate}
              >
                {translate('save_as_template_button_name')}
              </Button>
            </Form.Item>
          </Col>
        </Row>}
      </div>
    )
  }

}

function mapStateToProps({
                           templatesStore,
                           checklistsStore,
                           prioritizationStore,
                           buyerStore,
                           mappingsStore,
                           localizationStore,
                         }) {
  return {
    templateByIdData: templatesStore.templateByIdData,
    saveAuditorTemplateErrorStatus: templatesStore.saveAuditorTemplateErrorStatus,
    checklistQuestionsData: checklistsStore.checklistQuestionsData,
    calculatedChecklistScoreData: checklistsStore.calculatedChecklistScoreData,
    checklistDataById: checklistsStore.checklistDataById,
    tenderDataForChecklist: checklistsStore.tenderDataForChecklist,
    tenderTableData: prioritizationStore.tenderTableData,
    tenderTableDataByBuyerId: prioritizationStore.tenderTableDataByBuyerId,
    indicatorsByTenderIdData: prioritizationStore.indicatorsByTenderIdData,
    saveTemplatesData: templatesStore.saveTemplatesData,
    templatesIsFetching: templatesStore.templatesIsFetching,
    templatesTypesData: templatesStore.templatesTypesData,
    saveAuditorTemplateData: templatesStore.saveAuditorTemplateData,
    buyersBySearch: buyerStore.buyersBySearch,
    buyersBySearchIsFetching: buyerStore.buyersBySearchIsFetching,
    allMappings: mappingsStore.allMappings,
    indicatorAnswersKey: localizationStore.indicatorAnswersKey,
    componentImpactsKey: localizationStore.componentImpactsKey,
    checklistScoreKey: localizationStore.checklistScoreKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTemplateById: bindActionCreators(fetchTemplateById, dispatch),
    getCategoriesOfTemplateById: bindActionCreators(getCategoriesOfTemplateById, dispatch),
    saveNewBuyerChecklist: bindActionCreators(saveNewBuyerChecklist, dispatch),
    fetchPrioritizationTenderTableData: bindActionCreators(fetchPrioritizationTenderTableData, dispatch),
    fetchPrioritizationTenderTableDataByBuyerId: bindActionCreators(fetchPrioritizationTenderTableDataByBuyerId, dispatch),
    fetchIndicatorsDataByTenderId: bindActionCreators(fetchIndicatorsDataByTenderId, dispatch),
    getBuyersBySearch: bindActionCreators(getBuyersBySearch, dispatch),
    calculateChecklistScore: bindActionCreators(calculateChecklistScore, dispatch),
    ClearCalculatedChecklistScore: bindActionCreators(ClearCalculatedChecklistScore, dispatch),
    getChecklistsDataById: bindActionCreators(getChecklistsDataById, dispatch),
    saveNewTemplateFromDefault: bindActionCreators(saveNewTemplateFromDefault, dispatch),
    fetchPrioritizationTenderTableForChecklistData: bindActionCreators(fetchPrioritizationTenderTableForChecklistData, dispatch),
    changeChecklistQuestionsData: bindActionCreators(changeChecklistQuestionsData, dispatch),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create({ name: TENDER_INSPECTION_FORM_NAME })(withTranslate(TenderInspection))))
