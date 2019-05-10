import React, {
    Component,
    createRef
} from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import ApexCharts from 'apexcharts/dist/apexcharts.common';
import chartData from '../chartData';
import styles from '../styles';
import './ApexChart.scss';

export default class ApexChart extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    state = {

    };
    _apexRef = createRef();
    _apexChart = null;

    constructor(props) {
        super(props);

        this.HIDDEN_MARKERS = [];

        let previousPointValue = 0;
        chartData.inventoryData.forEach((inventoryDataPt, i) => {
            if (previousPointValue === inventoryDataPt.y) {
                this.HIDDEN_MARKERS.push({
                    seriesIndex: 0,
                    dataPointIndex: i,
                    size: 0,
                    fillColor: 'transparent',
                    strokeColor: 'transparent',
                    hover: {
                        sizeOffset: 0
                    }
                });
            }

            previousPointValue = inventoryDataPt.y;
        });
    }

    componentDidMount() {
        const {
            colorGo,
            colorFuel,
            colorCaution,
            colorWhite
        } = styles;
        const myChartRef = this._apexRef.current;
        const options = {
            colors: [colorGo, colorCaution, colorFuel],
            chart: {
                height: '100%',
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            grid: {
                padding: {
                    right: 30,
                    bottom: 30
                }
            },
            stroke: {
                curve: 'stepline'
            },
            series: [
                {name: 'Inventory', data: chartData.inventoryData, type: 'line'},
                {name: 'Stuff', data: chartData.randomData, type: 'column'},
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 8,
                labels: {
                    formatter: value => {
                        return moment(value).format('h:mma');
                    }
                }
            },
            markers: {
                size: 6,
                colors: colorWhite,
                strokeColor: colorGo,
                discrete: this.HIDDEN_MARKERS,
                hover: {
                    sizeOffset: 2
                }
            },
            tooltip: {
                x: {
                    formatter: value => {
                        return moment(value).format('h:mma');
                    }
                }
            }
        };

        this._apexChart = new ApexCharts(myChartRef, options);

        this._apexChart.render();
    }

    render() {
        return (
            <div className="ApexChart">
                <h1>Apex Charts</h1>
                <div className="ApexChart-chart-container">
                    <div
                        id="apexchart"
                        ref={this._apexRef}
                    />
                </div>
            </div>
        );
    }
}
