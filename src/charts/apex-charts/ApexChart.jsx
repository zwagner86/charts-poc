import React, {
    Component,
    createRef
} from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import ApexCharts from 'apexcharts/dist/apexcharts.common';
import chartData from '../chartData';
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

        this._highestYValue = 0;
        this._mappedData = chartData.map(point => {
            if (point.y > this._highestYValue) {
                this._highestYValue = point.y;
            }

            return {
                x: new Date(point.x),
                y: point.y
            };
        });

        this.CHART_DATA = chartData.reduce((dataObj, chartDataPt) => {
            dataObj.labels.push(chartData.x);
            dataObj.data.push(chartDataPt.y);

            return dataObj;
        }, {labels: [], data: []});
    }

    componentDidMount() {
        const myChartRef = this._apexRef.current;
        const options = {
            chart: {
                height: '100%',
                type: 'line'
            },
            xaxis: {
                categories: this.CHART_DATA.labels
            },
            series: [
                {name: 'Inventory', data: this.CHART_DATA.data}
            ]
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
