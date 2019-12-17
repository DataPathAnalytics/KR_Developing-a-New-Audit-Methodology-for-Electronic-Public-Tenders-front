import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parseISO } from 'date-fns'
import { Row, Col, Select, Button, Alert } from 'antd'
import DatePicker from 'react-datepicker'
import _ from 'lodash'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { withTranslate } from 'react-redux-multilingual'
import {
  getCalendarDataByYear,
  saveCalendarData,
} from '../../../redux/action/administration/AdministrationActions'
import { changeNavigationItem, setBreadCrumbsOptions } from '../../../redux/action/navigation/NavigationActions'

import './CalendarPage.css'
import 'react-datepicker/dist/react-datepicker.css'

const Option = Select.Option

class CalendarPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentYear: moment().year(),
      selectedYear: moment().year(),
      calendarData: [],
      changedDates: [],
      showNonSavedMessage: false,
    }

    props.changeNavigationItem(props.menuKey.key)
    props.setBreadCrumbsOptions(props.menuKey.breadcrumb)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.loadCalendarData(this.state.currentYear)
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.calendarDataByYear, prevProps.calendarDataByYear) || (!_.isEmpty(this.props.calendarDataByYear) && _.isEmpty(this.state.calendarData))) {
      if (!_.isEmpty(this.props.calendarDataByYear)) {
        this.setState({
          calendarData: this.props.calendarDataByYear,
          showNonSavedMessage: false,
        })
      } else {
        this.preparedEmptyYearDays()
        this.setState({
          calendarData: this.preparedEmptyYearDays(),
          changedDates: this.preparedEmptyYearDays(),
          showNonSavedMessage: true,
        })
      }
    }
  }

  loadCalendarData = (year) => {
    this.props.getCalendarDataByYear(parseInt(year, 10))
  }

  preparedEmptyYearDays = () => {
    let allYearDays = []
    const { selectedYear } = this.state
    for (let monthNumber = 0; monthNumber < 12; monthNumber++) {
      let amountDaysInMonth = moment(new Date(selectedYear, monthNumber)).daysInMonth()
      for(let day = 1; day <= amountDaysInMonth; day++) {
        allYearDays.push({
          date: moment(new Date(selectedYear, monthNumber, day)).format('YYYY-MM-DD'),
          isWorking: true,
        })
      }
    }

    return allYearDays
  }

  handleChangeYear = (value) => {
    if (!_.isEqual(this.state.selectedYear, value)) {
      this.setState({
        selectedYear: value,
      }, () => {
        this.loadCalendarData(value)
      })
    }
  }

  handleChangeCalendar = (date) => {
    let dateArrayIndex
    let calendarData = _.cloneDeep(this.state.calendarData)
    let changedDates = _.cloneDeep(this.state.changedDates)
    let isoDate = moment(date).format('YYYY-MM-DD')
    if(!_.isEmpty(this.props.calendarDataByYear)) {
      dateArrayIndex = _.findIndex(this.props.calendarDataByYear, { date: isoDate })
      calendarData[dateArrayIndex].isWorking = !calendarData[dateArrayIndex].isWorking
      if (!_.isEqual(calendarData[dateArrayIndex], this.props.calendarDataByYear[dateArrayIndex])) {
        changedDates.push(calendarData[dateArrayIndex])
      } else {
        let dateIndex = _.findIndex(changedDates, { date: isoDate })
        changedDates.splice(dateIndex, 1)
      }
    } else {
      dateArrayIndex = _.findIndex(changedDates, { date: isoDate })
      calendarData[dateArrayIndex].isWorking = !calendarData[dateArrayIndex].isWorking
      changedDates[dateArrayIndex].isWorking = !changedDates[dateArrayIndex].isWorking
    }

    this.setState({
      calendarData: calendarData,
      changedDates: changedDates,
    })
  }

  renderCalendarForYear = () => {
    let calendarNode = []
    let preparedByMonth = []
    let sortedCalendarData = _.orderBy(this.state.calendarData, ['date'], ['asc']);
    _.chain(_.cloneDeep(sortedCalendarData))
      .groupBy('date')
      .map((values, key) => {
        let month = moment(key).format('M')
        let positionInArray = _.findIndex(preparedByMonth, { monthName: month })
        // let convertedDateFromString = new Date(key)
        let convertedDateFromString = parseISO(key)
        // values[0].value = new Date(values[0].date)
        values[0].value = parseISO(values[0].date)
        if (positionInArray !== -1) {
          if (values[0].isWorking) {
            preparedByMonth[positionInArray].workingDays.push(parseISO(values[0].date))
          } else {
            preparedByMonth[positionInArray].daysOff.push(parseISO(values[0].date))
          }
        } else {
          preparedByMonth.push({
            startDay: convertedDateFromString,
            monthName: month,
            workingDays: values[0].isWorking ? [parseISO(values[0].date)] : [],
            daysOff: !values[0].isWorking ? [parseISO(values[0].date)] : [],
          })
        }
        return values[0]
      })
      .value()

    _.forEach(preparedByMonth, (mothData, index) => {
      let includeDates = _.concat(mothData.workingDays, mothData.daysOff)

      calendarNode.push(
        <Col span={6} key={index}>
          <DatePicker
            inline
            showDisabledMonthNavigation
            fixedHeight
            locale={this.props.localeTitle}
            selected={mothData.startDay}
            includeDates={includeDates}
            highlightDates={
              [
                {
                  'react-datepicker__working-day--highlighted': mothData.workingDays,
                },
                {
                  'react-datepicker__day-off--highlighted': mothData.daysOff,
                },
              ]
            }
            onSelect={(date) => this.handleChangeCalendar(date)}
          />
        </Col>)
    })

    return calendarNode
  }

  renderSelectYearsComponent = () => {
    let options = []
    let previousYear = moment().year() - 1
    let nextYear = moment().year() + 1
    let countOfYears = nextYear - previousYear
    for (let y = 0; y <= countOfYears; y++) {
      options.push(
        <Option
          key={y}
          value={moment(`${previousYear}-01-01`).add(y, 'year').year()}>{moment(`${previousYear}-01-01`).add(y, 'year').year()}
        </Option>,
      )
    }

    return options
  }

  handleSaveCalendarChanges = () => {
    this.props.saveCalendarData(this.state.changedDates).then(() => {
      this.setState({
        changedDates: [],
      }, () => {
        this.loadCalendarData(this.state.selectedYear)
      })
    })
  }

  render() {
    const { translate } = this.props
    let preparedDatePickerData = this.renderCalendarForYear()
    let chunkedDatePickerData = _.chunk(preparedDatePickerData, 4)

    return (
      <div className="CalendarPage">
        <Row style={{ marginBottom: 15 }}>
          <Alert
            message={translate('alert_warning_title')}
            description={translate('calendar_warning_message')}
            type="warning"
            showIcon
          />
        </Row>
        {this.state.showNonSavedMessage && <Row style={{ marginBottom: 15 }}>
          <Alert
            message={translate('alert_warning_title')}
            description={translate('calendar_non_saved_days_warning_message')}
            type="error"
            showIcon
          />
        </Row>}
        <Row style={{ marginBottom: 15 }}>
          <Col span={4}>
            <Select
              defaultValue={this.state.currentYear}
              style={{ width: 180 }}
              placeholder={translate('select_year')}
              onChange={this.handleChangeYear}
            >
              {this.renderSelectYearsComponent()}
            </Select>
          </Col>
          <Col span={20}>
            <Row>
              <Col span={4}>
                <div
                  className="react-datepicker__day react-datepicker__day--008 react-datepicker__working-day--highlighted">&nbsp;</div>
                <span>{` ${translate('working_day')}`}</span>
              </Col>
              <Col span={4}>
                <div
                  className="react-datepicker__day react-datepicker__day--002 react-datepicker__day--weekend react-datepicker__day-off--highlighted">&nbsp;</div>
                <span>{` ${translate('day_off')}`}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        {_.map(chunkedDatePickerData, (datePicker, ind) => {
          return (
            <Row key={ind} style={{ marginBottom: 15 }}>
              {datePicker}
            </Row>
          )
        })}
        <Row>
          <Col>
            <Button
              type="primary"
              onClick={() => this.handleSaveCalendarChanges()}
              disabled={_.isEmpty(this.state.changedDates)}
            >
              {translate('save_button')}
            </Button>
          </Col>
        </Row>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCalendarDataByYear: bindActionCreators(getCalendarDataByYear, dispatch),
    saveCalendarData: bindActionCreators(saveCalendarData, dispatch),
    changeNavigationItem: bindActionCreators(changeNavigationItem, dispatch),
    setBreadCrumbsOptions: bindActionCreators(setBreadCrumbsOptions, dispatch),
  }
}

function mapStateToProps({
                           localizationStore,
                           administrationStore,
                         }) {
  return {
    localeTitle: localizationStore.datePickerLocaleTitle,
    localeObject: localizationStore.datePickerLocaleObject,
    calendarDataByYear: administrationStore.calendarDataByYear,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(CalendarPage))