import React from 'react';
// import PropTypes from 'prop-types';
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    LineMarkSeries
} from 'react-vis';
import chartData from './chartData';
import './VisChart.scss';

const VisChart = props => {
    console.log(chartData);

    return (
        <div className="VisChart">
            <FlexibleXYPlot>
                <XAxis />
                <YAxis />
                <LineMarkSeries data={[{x: 1, y: 11}, {x: 1.5, y: 29}, {x: 3, y: 7}]} />
            </FlexibleXYPlot>
        </div>
    );
};

VisChart.propTypes = {

};

VisChart.defaultProps = {

};

export default VisChart;
