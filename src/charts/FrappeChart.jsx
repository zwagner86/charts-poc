import React, {
    Component,
    createRef
} from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import {Chart} from 'frappe-charts/dist/frappe-charts.min.esm.js';
import chartData from './chartData';
import './FrappeChart.scss';

export default class FrappeChart extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    state = {

    };
    _chartRef = createRef();
    _chart = null;

    constructor(props) {
        super(props);

        this.CHART_DATA = chartData.reduce((dataObj, chartDataPt) => {
            dataObj.labels.push(moment(chartDataPt.x).format('h:mma'));
            dataObj.data.push(chartDataPt.y);

            return dataObj;
        }, {labels: [], data: []});
    }

    componentDidMount() {
        const myChartRef = this._chartRef.current;

        this._chart = new Chart(myChartRef, {
            title: 'Inventory Chart',
            data: {
                labels: this.CHART_DATA.labels,
                datasets: [
                    {
                        name: 'Bar',
                        chartType: 'bar',
                        values: this.CHART_DATA.data
                    },
                    {
                        name: 'Line',
                        chartType: 'line',
                        values: this.CHART_DATA.data
                    }
                ]
            },
            type: 'axis-mixed',
            axisOptions: {
                xIsSeries: true
            },
            tooltipOptions: {
                formatTooltipY: d => `${d} spaces`
            }
        });
    }

    render() {
        return (
            <div className="FrappeChart">
                <h1>Frappe Charts</h1>
                <div className="FrappeChart-chart-container">
                    <div
                        id="mychart"
                        ref={this._chartRef}
                    />
                </div>
            </div>
        );
    }
}
