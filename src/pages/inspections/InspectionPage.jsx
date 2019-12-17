import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslate } from 'react-redux-multilingual'
import { bindActionCreators } from 'redux'
import { changeNavigationItem, setBreadCrumbsOptions } from '../../redux/action/navigation/NavigationActions'
import BuyerInspection from './BuyerInspection'
import TenderInspection from './TenderInspection'

import './InspectionPage.css'

class InspectionPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSection: false,
      sectionType: '',
      sectionProps: null,
    }

    props.changeNavigationItem(props.menuKey.key)
    props.setBreadCrumbsOptions(props.menuKey.breadcrumb)
  }


  componentDidMount(){
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    if (!this.props.history.location.state) {
      this.props.history.push('/')
    } else {
      const { templateType } = this.props.history.location.state

      if (templateType === 'tender') {
        this.setState({
          showSection: true,
          sectionType: 'tender',
          sectionProps: this.props.history.location.state,
        })
      } else {
        this.setState({
          showSection: true,
          sectionType: 'buyer',
          sectionProps: this.props.history.location.state,
        })
      }
    }
  }

  render() {
    if (!this.state.showSection) {
      return null
    }

    return (this.state.sectionType === 'tender') ?
      <TenderInspection sectionProps={this.state.sectionProps} />
      :
      <BuyerInspection sectionProps={this.state.sectionProps} />
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    changeNavigationItem: bindActionCreators(changeNavigationItem, dispatch),
    setBreadCrumbsOptions: bindActionCreators(setBreadCrumbsOptions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslate(InspectionPage))