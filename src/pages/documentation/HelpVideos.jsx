import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { withTranslate } from 'react-redux-multilingual'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeNavigationItem, setBreadCrumbsOptions } from '../../redux/action/navigation/NavigationActions'
import _ from 'lodash'
import { Row, Col } from 'antd'
import { VIDEO_TITLES } from './DocumentationConstants'

class HelpVideos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playerWidth: 300,
    }

    props.changeNavigationItem(props.menuKey.key)
    props.setBreadCrumbsOptions(props.menuKey.breadcrumb)
  }

  componentDidMount() {
    this.preparePlayerWidth(this.props.collapsed)
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.collapsed, this.props.collapsed)) {
      this.preparePlayerWidth(this.props.collapsed)
    }
  }

  preparePlayerWidth = (collapsed) => {
    let { playerWidth } = this.state
    if (collapsed) {
      playerWidth = parseInt(((window.innerWidth - 230) / 3).toString(), 10)
    } else {
      playerWidth = parseInt(((window.innerWidth - 450) / 3).toString(), 10)
    }

    this.setState({
      playerWidth: playerWidth,
    })
  }

  prepareVideoContent = () => {
    const { translate } = this.props
    let chunkSize = VIDEO_TITLES[this.props.userInfo.permissions[0]].chunkSize
    let videoOptionsArray = _.chunk(_.cloneDeep(VIDEO_TITLES[this.props.userInfo.permissions[0]].videoOptions), VIDEO_TITLES[this.props.userInfo.permissions[0]].chunkSize)
    return videoOptionsArray.map((optionsArray, index) => {
      return (
        <Row style={{ marginBottom: 60 }}>
          {optionsArray.map((option, ind) => {
            return (
              <Col span={24 / chunkSize} key={`video_${index}_${ind}`}>
                <fieldset className="video-fieldset-style">
                  <legend className="video-fieldset-legend-style">{translate(option.videoTranslationKey)}</legend>
                  <div style={option.styleObject}>
                    <ReactPlayer
                      controls
                      light={option.slide}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                          },
                        },
                      }}
                      url={option.videoSourceName}
                    />
                  </div>
                </fieldset>
              </Col>
            )
          })
          }
        </Row>
      )
    })
  }

  render() {
    return this.prepareVideoContent()
  }
}

function mapStateToProps({
                           navigationStore,
                           auth,
                         }) {
  return {
    defaultSelectedKey: navigationStore.defaultSelectedKey,
    collapsed: navigationStore.collapsed,
    userInfo: auth.userInfo,
  }
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
)(withTranslate(HelpVideos))