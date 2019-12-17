import React, { Component } from 'react'
import { Tabs, Spin, Icon } from 'antd'
import _ from 'lodash'
import ReactHighcharts from 'react-highcharts'
import ReactPlayer from 'react-player'
import Slider from 'react-slick'

import './DocumentationPage.css'

class DocumentationPage extends Component {
  constructor() {
    super()

    this.state = {
      seriesData: [],
    }

    // this.getSeriesData = _.debounce(this.getSeriesData, 2000)
  }

  callback = (key) => {
    console.log(key)
  }

  getSeriesData = () => {
    this.setState({
      seriesData: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],

      }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],

      }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],

      }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],

      }],
    })
  }

  render() {
    // this.getSeriesData()
    let { seriesData } = this.state

    let settings = {
      className: 'h-100',
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
    }
    return (
      <div>
        <Tabs onChange={this.callback} type="card">
          <Tabs.TabPane tab="Tab 1" key="1">
            <div className="your-class">
              <Slider {...{
                className: 'h-100',
                dots: false,
                infinite: true,
                speed: 500,
                slidesToScroll: 1,
              }}>
                <div className="first-slick">
                  <Spin spinning={!_.isEmpty(seriesData)}>
                    <ReactHighcharts
                      key={'111'}
                      config={
                        {
                          chart: {
                            type: 'column',
                          },
                          credits: {
                            enabled: false,
                          },
                          title: {
                            text: 'Monthly Average Rainfall',
                          },
                          subtitle: {
                            text: 'Source: WorldClimate.com',
                          },
                          xAxis: {
                            categories: [
                              'Jan',
                              'Feb',
                              'Mar',
                              'Apr',
                              'May',
                              'Jun',
                              'Jul',
                              'Aug',
                              'Sep',
                              'Oct',
                              'Nov',
                              'Dec',
                            ],
                            crosshair: true,
                          },
                          yAxis: {
                            min: 0,
                            title: {
                              text: 'Rainfall (mm)',
                            },
                          },
                          tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true,
                          },
                          plotOptions: {
                            column: {
                              pointPadding: 0.2,
                              borderWidth: 0,
                            },
                          },
                          series: [{
                            name: 'Tokyo',
                            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],

                          }, {
                            name: 'New York',
                            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],

                          }, {
                            name: 'London',
                            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],

                          }, {
                            name: 'Berlin',
                            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],

                          }],
                        }
                      }
                    />
                  </Spin>
                </div>
                <div className="second-slick">
                  <ReactPlayer
                    controls
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    url='/media/big_buck_bunny.mp4'
                  />
                </div>
              </Slider>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            <ReactPlayer
              controls
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
              url='/media/big_buck_bunny.mp4'
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 3" key="3">
            <Icon width={20} heigth={20} type="left" />
            <div className="row margin-top-30">
              <div className="col-md-12 slider-wrapper slider-kpis-wrapper p-0">
                <Slider {...settings}>
                  <div className="slider-chart">
                    <h3>1</h3>
                  </div>
                  <div className="slider-chart">
                    <h3>2</h3>
                  </div>
                  <div className="slider-chart">
                    <h3>3</h3>
                  </div>
                  <div className="slider-chart">
                    <h3>4</h3>
                  </div>
                  <div className="slider-chart">
                    <h3>5</h3>
                  </div>
                  <div className="slider-chart">
                    <h3>6</h3>
                  </div>
                </Slider>
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default DocumentationPage