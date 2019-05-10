import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import chartData from '../chartData';
import './ApexCharts.scss';

export default class ApexCharts extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    state = {

    };

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
    }

    render() {
        return (
            <div className="ApexCharts">
                <h1>Apex Charts</h1>
                <div className="ApexCharts-chart-container">
                    Chart goes here
                </div>
            </div>
        );
    }
}
