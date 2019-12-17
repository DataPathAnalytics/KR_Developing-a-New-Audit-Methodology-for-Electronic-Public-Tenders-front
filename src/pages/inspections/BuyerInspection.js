import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import _ from 'lodash'
import moment from 'moment'
import shortId from 'shortid'
import { bindActionCreators } from 'redux'
import { Row, Col, AutoComplete, DatePicker, Button, Form, Input, Alert, Select, Icon, message, Badge } from 'antd'
import { fetchTemplateById, getCategoriesOfTemplateById } from '../../redux/action/templates/TemplatesActions'
import {
  saveNewBuyerChecklist,
  calculateChecklistScore,
  ClearCalculatedChecklistScore,
  getChecklistsDataById,
  getChecklistTenderChecklistScore,
} from '../../redux/action/checklists/ChecklistActions'
import { saveNewTemplateFromDefault } from '../../redux/action/templates/TemplatesActions'
import { getBuyersBySearch } from '../../redux/action/buyer/BuyerActions'
import BuyerInspectionForm from './components/BuyerInspectionForm'
import { BUYER_INSPECTION_FORM_NAME } from './InspectionConstants'
import AddNewTemplateFromDefaultForm from '../templates/components/AddNewTemplateFromDefaultForm'
import { toISOFormat } from '../../utils/DateUtils'

class BuyerInspection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modifiedDate: moment().format('YYYY-MM-DD'),
      auditName: '',
      summary: '',
      tendersComment: '',
      manualTendersScore: {},
      tendersImpactId: {},
      manualScoreId: {},
      autoScore: {},
      autoTendersScore: {},
      checklist: {},
      startValue: null,
      endValue: null,
      collapsed: true,
      buyers: [],
      selectedBuyer: null,
      checklistChanged: false,
      startDate: null,
      endDate: null,
      checklistName: null,
      selectedTemplateId: null,
      indicatorAnswers: [],
      editableChecklistId: null,
      responseBody: {
        answers: [],
        indicators: [],
        statusId: 1,
      },
      calculateAlertOptions: {
        showMessage: false,
        message: '',
      },
      templateTypeId: null,
      templateName: '',
      needToRecalculateScore: false,
      noAnswersToCalculateScore: false,
      editableMode: false,
      previewOnly: false,
      waitLoadData: true,
      defaultAnswered: [],
      templateByIdData: props.templateByIdData,
      showAddNewTemplateFromDefaultForm: false,
      disableSearchBuyerSelect: false,
      showNoTendersScore: false,
    }

    this._buyerElementRef = React.createRef()
    this._answersElementRef = React.createRef()
    this._manualImpactElementRef = React.createRef()
    this._manualCommentElementRef = React.createRef()
    this._manualScoreElementRef = React.createRef()

    this.handleSearch = _.debounce(this.handleSearch, 400)
    this.handleUnload = this.handleUnload.bind(this)
  }


  componentDidMount() {
    const { templateId, checklistId, selectedBuyerIdentifierId, previewOnly } = this.props.sectionProps

    if (!previewOnly) {
      window.addEventListener('beforeunload', (event) => this.handleUnload(event))
      document.addEventListener('mousedown', this.handleClickOutside, false)
    }

    if (checklistId) {
      let { defaultAnswered, indicatorAnswers, templateByIdData, responseBody } = this.state

      this.props.getChecklistsDataById(checklistId).then(() => {
        const { checklistDataById, allMappings } = this.props
        // this.props.fetchTemplateById(checklistDataById.template.id).then(() => {
        defaultAnswered = checklistDataById.answers

        this.props.getBuyersBySearch(checklistDataById.buyer.identifierLegalNameRu).then(() => {
          responseBody.statusId = checklistDataById.status.id
          this.setState({
            buyers: this.props.buyersBySearch,
            disableSearchBuyerSelect: true,
          }, () => {
            templateByIdData = {
              name: checklistDataById.templateName,
              type: _.find(allMappings.templateTypes, { id: checklistDataById.templateTypeId }),
            }

            this.setState({
              checklistName: checklistDataById.name,
              templateName: checklistDataById.templateName,
              // selectedTemplateId: checklistDataById.templateName,
              selectedBuyer: checklistDataById.buyer,
              templateTypeId: checklistDataById.templateTypeId,
              startDate: checklistDataById.startDate,
              endDate: checklistDataById.endDate,
              startValue: checklistDataById.startDate,
              endValue: checklistDataById.endDate,
              auditName: checklistDataById.auditName,
              summary: checklistDataById.summary,
              modifiedDate: checklistDataById.modifiedDate,
              editableChecklistId: checklistDataById.id,
              manualTendersScore: checklistDataById.manualTendersScore ? checklistDataById.manualTendersScore : {},
              autoTendersScore: checklistDataById.autoTendersScore ? checklistDataById.autoTendersScore : {},
              tendersImpactId: checklistDataById.tendersImpact ? checklistDataById.tendersImpact : {},
              tendersComment: checklistDataById.tendersComment,
              manualScoreId: checklistDataById.manualScore ? checklistDataById.manualScore : {},
              autoScore: checklistDataById.autoScore ? checklistDataById.autoScore : {},
              editableMode: true,
              waitLoadData: false,
              defaultAnswered: defaultAnswered,
              previewOnly: previewOnly ? previewOnly : false,
              templateByIdData: templateByIdData,
              responseBody: responseBody,
            })
          })
        })
        // })
      })
    } else {
      this.props.fetchTemplateById(templateId).then(() => {
        if (selectedBuyerIdentifierId) {
          this.props.getBuyersBySearch(selectedBuyerIdentifierId).then(() => {
            this.setState({
              buyers: this.props.buyersBySearch,
            }, () => {
              this.setState({
                selectedTemplateId: templateId,
                waitLoadData: false,
                templateByIdData: this.props.templateByIdData,
                selectedBuyer: this.props.buyersBySearch[0],
                templateTypeId: this.props.templateByIdData.type.id,
                templateName: this.props.templateByIdData.name,
              })
            })
          })
        } else {
          this.setState({
            selectedTemplateId: templateId,
            waitLoadData: false,
            templateByIdData: this.props.templateByIdData,
            templateTypeId: this.props.templateByIdData.type.id,
            templateName: this.props.templateByIdData.name,
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

    if (((!_.isEqual(this.state.checklistChanged, prevState.checklistChanged) && !_.isEmpty(prevState.responseBody.answers) && !prevState.checklistChanged)) && !prevState.needToRecalculateScore) {
      if (!_.isEmpty(prevProps.calculatedChecklistScoreData)) {
        this.setState({
          needToRecalculateScore: true,
          checklistChanged: false,
        })
      }
    }

    if (!_.isEqual(this.state.startValue, prevState.startValue) || !_.isEqual(this.state.endValue, prevState.endValue) || !_.isEqual(this.state.selectedBuyer, prevState.selectedBuyer)) {
      if (this.state.selectedBuyer && this.state.startValue && this.state.endValue) {
        let requestData = {
          buyerId: this.state.selectedBuyer.id,
          startPeriodDate: toISOFormat(this.state.startValue),
          endPeriodDate: toISOFormat(this.state.endValue),
        }

        this.getTenderChecklistScore(requestData)
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUnload)
    document.removeEventListener('mousedown', this.handleClickOutside, false)
  }

  getTenderChecklistScore = (requestData) => {
    return Promise.resolve(this.props.getChecklistTenderChecklistScore(requestData)).then(() => {
      if (this.props.tenderChecklistScoreData.id) {
        this.setState({
          autoTendersScore: this.props.tenderChecklistScoreData,
          showNoTendersScore: false,
        })
      } else {
        this.setState({
          autoTendersScore: {},
          showNoTendersScore: true,
        })
      }
    })
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

  prepareAnswersArray = () => {
    let temp = []

    _.forEach(this.props.checklistQuestionsData.categories, (category) => {
      _.forEach(category.questions, (question) => {
        temp.push({
          answerTypeId: question.hasOwnProperty('answerTypeId') ? question.answerTypeId : null,
          comment: question.hasOwnProperty('comment') ? question.comment : '',
          npa: question.hasOwnProperty('npa') ? question.npa : '',
          componentImpactId: question.hasOwnProperty('componentImpactId') ? question.componentImpactId : null,
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
        const { selectedTender, tendersImpactId, manualTendersScore, manualScoreId, autoScore, templateName, templateTypeId, autoTendersScore } = this.state

        let buyer = this.state.buyers.find(buyer => buyer.identifierLegalNameRu === values.buyerName)
        values.startDate = moment(values.startDate).format('YYYY-MM-DD')
        values.endDate = moment(values.endDate).format('YYYY-MM-DD')
        delete values.buyerName
        values = _.merge({}, values, {
          buyerId: buyer.id,
          // templateId: this.state.selectedTemplateId,
          templateName: templateName,
          templateTypeId: templateTypeId,
          // answers: answers,
          answers: this.prepareAnswersArray(),
          indicators: this.state.responseBody.indicators,
          tenderId: selectedTender ? selectedTender.id : null,
          statusId: this.state.responseBody.statusId,
          id: this.state.editableChecklistId,
          tendersImpactId: tendersImpactId ? tendersImpactId.id : null,
          manualTendersScoreId: manualTendersScore ? manualTendersScore.id : null,
          manualScoreId: manualScoreId ? manualScoreId.id : null,
          autoScore: autoScore ? autoScore.id : null,
        })

        this.props.saveNewBuyerChecklist(values).then(() => {
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
          selectedTender,
          tendersImpactId,
          manualTendersScore,
          manualScoreId,
          autoScore,
          responseBody,
          templateName,
          templateTypeId,
          noAnswersToCalculateScore,
          autoTendersScore,
        } = this.state
        const { translate } = this.props

        let amountOfQuestions = 0
        let preparedAnswers = this.prepareAnswersArray()
        // _.forEach(this.props.checklistQuestionsData.categories, (category) => {
        //   amountOfQuestions += category.questions.length
        // })
        _.forEach(preparedAnswers, (answer) => {
          answer.answerTypeId && amountOfQuestions++
        })

        if (_.isEmpty(preparedAnswers) || !_.isEqual(preparedAnswers.length, amountOfQuestions)) {
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
        } else if (_.isEmpty(manualTendersScore)) {
          this.setState({
            calculateAlertOptions: {
              showMessage: true,
              message: translate('not_complete_manual_buyer_score_message'),
            },
          }, () => {
            this.scrollToMyRef('_manualImpactElementRef')
          })
        }
        // else if (_.isEmpty(manualScoreId)) {
        //   this.setState({
        //     calculateAlertOptions: {
        //       showMessage: true,
        //       message: translate('not_complete_checklist_manual_score_message'),
        //     },
        //   }, () => {
        //     this.scrollToMyRef('_manualScoreElementRef')
        //   })
        // }
        else if (_.isEmpty(values.summary)) {
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
            // templateId: this.state.selectedTemplateId,
            templateName: templateName,
            templateTypeId: templateTypeId,
            // answers: answers,
            answers: preparedAnswers,
            indicators: this.state.responseBody.indicators,
            tenderId: selectedTender ? selectedTender.id : null,
            statusId: 2,
            id: this.state.editableChecklistId,
            tendersImpactId: tendersImpactId ? tendersImpactId.id : null,
            manualTendersScoreId: manualTendersScore ? manualTendersScore.id : null,
            manualScoreId: manualScoreId ? manualScoreId.id : null,
            autoScore: autoScore ? autoScore.id : null,
          })

          this.props.saveNewBuyerChecklist(values).then(() => {
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
      manualScoreId: {
        id: value.key,
        name: value.label,
      },
    })
  }

  onChangeCustomChecklistScore = (value) => {
    this.setState({
      manualTendersScore: {
        id: value.key,
        name: value.label,
      },
    })
  }

  onChangeCustomImpactChecklistScore = (value) => {
    this.setState({
      tendersImpactId: {
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
    const { responseBody, selectedBuyer, selectedTemplateId, tendersImpactId, manualTendersScore } = this.state
    const { translate } = this.props

    let amountOfQuestions = 0
    let preparedAnswers = this.prepareAnswersArray()

    _.forEach(preparedAnswers, (answer) => {
      answer.answerTypeId && amountOfQuestions++
    })

    if (_.isEmpty(preparedAnswers) || !_.isEqual(preparedAnswers.length, amountOfQuestions)) {
      this.setState({
        calculateAlertOptions: {
          showMessage: true,
          message: translate('calculate_no_questions_answers_message'),
        },
      }, () => {
        this.scrollToMyRef('_answersElementRef')
      })
    }
    // else if (_.isEmpty(manualTendersScore) || _.isEmpty(tendersImpactId)) {
    //   this.setState({
    //     calculateAlertOptions: {
    //       showMessage: true,
    //       message: translate('no_conclusion_of_the_representative_message'),
    //     },
    //   }, () => {
    //     this.scrollToMyRef('_manualImpactElementRef')
    //   })
    // }
    else {
      let responseData = _.merge({}, responseBody, {
        templateId: selectedTemplateId,
        // manualTendersScore: manualTendersScore.id,
        // tendersImpactId: tendersImpactId.id,
      })

      selectedBuyer && (responseData = _.merge({}, responseData, {
        buyerId: selectedBuyer.id,
      }))

      this.props.calculateChecklistScore(responseData).then(() => {
        this.setState({
          autoScore: this.props.calculatedChecklistScoreData,
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
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].scrollTop += 10
        ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.add('scroll-highlight-col-buyer')
        setTimeout(() => {
          ReactDOM.findDOMNode(this).getElementsByClassName(this[refName].current.props.className)[0].classList.remove('scroll-highlight-col-buyer')
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
      case '_manualImpactElementRef':
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
      autoScore,
      autoTendersScore,
      startDate,
      endDate,
      checklistName,
      manualScoreId,
      summary,
      modifiedDate,
      manualTendersScore,
      tendersComment,
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
          <Row>
            <Col span={6}>
              {translate('inspection_period_of_the_audit_name')}
            </Col>
            <Col span={6} className="date-picker-container">
              <Form.Item>
                {getFieldDecorator('startDate', {
                  initialValue: startDate && moment(new Date(startDate)),
                  rules: [
                    {
                      type: 'object',
                      required: true,
                      // message: 'Please input startDate',
                      message: `${translate('please_select')} ${translate('start_data')}`,
                      whitespace: true,
                    },
                  ],
                })(
                  <DatePicker
                    disabledDate={this.disabledStartDate}
                    style={{ width: '90%' }}
                    placeholder={translate('start_data')}
                    onChange={this.onStartChange}
                  />)}
              </Form.Item>
            </Col>
            <Col span={6} className="date-picker-container">
              <Form.Item>
                {getFieldDecorator('endDate', {
                  initialValue: endDate && moment(new Date(endDate)),
                  rules: [
                    {
                      type: 'object',
                      required: true,
                      message: `${translate('please_select')} ${translate('end_date')}`,
                      whitespace: true,
                    },
                  ],
                })(
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    style={{ width: '90%' }}
                    placeholder={translate('end_date')}
                    onChange={this.onEndChange}
                  />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {translate('inspection_checked_organization_name')}
            </Col>
            <Col span={16} ref={this._buyerElementRef} className="checklistBuyerDropDown">
              <Form.Item>
                {getFieldDecorator('buyerName', {
                  initialValue: selectedBuyer && selectedBuyer.identifierLegalNameRu,
                  rules: [
                    {
                      type: 'string',
                      required: true,
                      message: `${translate('please_select')} ${translate('buyer_title')}`,
                      whitespace: true,
                      validator: this.validateSelectBuyer,
                    },
                  ],
                })(
                  <AutoComplete
                    dataSource={buyers.map(buyer => (buyer.identifierLegalNameRu))}
                    style={{ width: '100%' }}
                    // onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    onSelect={this.handleSelectBuyer}
                    placeholder={translate('buyer_title')}
                    disabled={this.state.disableSearchBuyerSelect}
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
        <Row style={{ marginBottom: 15 }} className="manual-scoring-section">
          <Col span={12}>
            {translate('result_evaluation_automatic_scoring_buyer_information')}
          </Col>
          {!_.isEmpty(autoTendersScore) ? <Col span={8}>
              <Select
                className={`risk-indicator-background-${autoTendersScore.hasOwnProperty('id') && autoTendersScore.id}`}
                labelInValue
                style={{ width: '100%' }}
                // onChange={(value, option) => this.onChangeChecklistScore(value, option)}
                // disabled={_.isEmpty(calculatedScore)}
                disabled={true}
                value={autoTendersScore.hasOwnProperty('id') ? { key: autoTendersScore.id } : { key: '' }}

              >
                {_.map(allMappings.checklistScores, (checklistScore) => (
                  <Select.Option key={checklistScore.id} value={checklistScore.id}>{checklistScore[checklistScoreKey]}</Select.Option>
                ))}

              </Select></Col> :
            <Col span={12}><span
              style={{ color: 'red' }}
            >
              {this.state.showNoTendersScore ? translate('checklist_no_completed_tenders_checklists') : (
                !this.state.selectedBuyer ? translate('checklist_no_buyer_selected') : translate('checklist_no_completed_selected_period')
              )}
            </span></Col>}
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col span={12}>
            {translate('result_evaluation_scoring_buyer_information')}
          </Col>
          <Col span={8}>
            <Select
              className={`risk-indicator-background-${manualTendersScore.hasOwnProperty('id') && manualTendersScore.id}`}
              labelInValue
              style={{ width: '100%' }}
              value={manualTendersScore.hasOwnProperty('id') ? { key: manualTendersScore.id } : { key: '' }}
              onChange={(value, option) => this.onChangeCustomChecklistScore(value, option)}
            >
              {_.map(allMappings.checklistScores, (checklistScore) => (
                <Select.Option key={checklistScore.id}
                               value={checklistScore.id}>{checklistScore[checklistScoreKey]}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row className="manual-scoring-section">
          <Col span={24} ref={this._manualImpactElementRef} className="manualImpactHighlightCards">
            <Col span={12}>
              {translate('auditor_conclusion_by_result_of_inspection')}
            </Col>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }}>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator('tendersComment', {
                initialValue: tendersComment && tendersComment,
                // rules: [{ required: true, message: translate('not_empty_field') }],
              })(
                <Input.TextArea autosize={{ minRows: 2, maxRows: 10 }} />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }} className="manual-scoring-section">
          <Col span={12}>
            {translate('result_evaluation_automatic_scoring_without_critical_information')}
          </Col>
          <Col span={8}>
            <Select
              className={`risk-indicator-background-${autoScore.hasOwnProperty('id') && autoScore.id}`}
              labelInValue
              style={{ width: '100%' }}
              // onChange={(value, option) => this.onChangeChecklistScore(value, option)}
              // disabled={_.isEmpty(calculatedScore)}
              disabled={true}
              value={autoScore.hasOwnProperty('id') ? { key: autoScore.id } : { key: '' }}

            >
              {_.map(allMappings.checklistScores, (checklistScore) => (
                <Select.Option key={checklistScore.id} value={checklistScore.id}>{checklistScore[checklistScoreKey]}</Select.Option>
              ))}

            </Select>
          </Col>
          <Col span={4}>
            {!this.state.previewOnly && <Button
              type="primary"
              htmlType="button"
              style={{ marginLeft: '15px' }}
              onClick={() => this.handleCalculatedScore()}
              disabled={this.state.noAnswersToCalculateScore}
            >{translate('checklist_calculate_score_button_name')}
            </Button>}
          </Col>
        </Row>
        <Row style={{ marginBottom: 15 }} className="manual-scoring-section">
          <Col span={24} ref={this._manualScoreElementRef} className="manualScoreElementRef">
            <Col span={12}>
              {translate('final_assessment_representative_SP_KP')}
            </Col>
            <Col span={8}>
              <Select
                className={`risk-indicator-background-${manualScoreId.hasOwnProperty('id') && manualScoreId.id}`}
                labelInValue
                style={{ width: '100%' }}
                value={manualScoreId.hasOwnProperty('id') ? { key: manualScoreId.id } : { key: '' }}
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
              <Button type="primary" htmlType="submit"
                      onClick={this.handleSaveBuyerInspection}>{translate('save_button')}</Button>
            </Form.Item>
          </Col>
          {(responseBody.statusId === 1) && <Col span={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSaveAndCompleteBuyerInspection}
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
                           buyerStore,
                           mappingsStore,
                           localizationStore,
                         }) {
  return {
    templateByIdData: templatesStore.templateByIdData,
    checklistQuestionsData: checklistsStore.checklistQuestionsData,
    calculatedChecklistScoreData: checklistsStore.calculatedChecklistScoreData,
    tenderChecklistScoreData: checklistsStore.tenderChecklistScoreData,
    checklistDataById: checklistsStore.checklistDataById,
    saveTemplatesData: templatesStore.saveTemplatesData,
    templatesIsFetching: templatesStore.templatesIsFetching,
    templatesTypesData: templatesStore.templatesTypesData,
    saveAuditorTemplateData: templatesStore.saveAuditorTemplateData,
    buyersBySearch: buyerStore.buyersBySearch,
    buyersBySearchIsFetching: buyerStore.buyersBySearchIsFetching,
    allMappings: mappingsStore.allMappings,
    checklistScoreKey: localizationStore.checklistScoreKey,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTemplateById: bindActionCreators(fetchTemplateById, dispatch),
    getCategoriesOfTemplateById: bindActionCreators(getCategoriesOfTemplateById, dispatch),
    saveNewBuyerChecklist: bindActionCreators(saveNewBuyerChecklist, dispatch),
    getBuyersBySearch: bindActionCreators(getBuyersBySearch, dispatch),
    calculateChecklistScore: bindActionCreators(calculateChecklistScore, dispatch),
    ClearCalculatedChecklistScore: bindActionCreators(ClearCalculatedChecklistScore, dispatch),
    saveNewTemplateFromDefault: bindActionCreators(saveNewTemplateFromDefault, dispatch),
    getChecklistsDataById: bindActionCreators(getChecklistsDataById, dispatch),
    getChecklistTenderChecklistScore: bindActionCreators(getChecklistTenderChecklistScore, dispatch),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create({ name: BUYER_INSPECTION_FORM_NAME })(withTranslate(BuyerInspection))))
