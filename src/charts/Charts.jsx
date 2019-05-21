import React from 'react';
import ApexChart from './apex-charts/ApexChart';
import ChartistChart from './chartist/ChartistChart';
import FrappeChart from './frappe/FrappeChart';
import VisChart from './react-vis/VisChart';
import chartData from './chartData';
import './Charts.scss';

const Charts = props => {
    return (
        <div className="Charts">
            <ChartistChart chartData={chartData} />
            <FrappeChart chartData={chartData} />
            <VisChart chartData={chartData} />
            <ApexChart chartData={chartData} />
        </div>
    );
};

export default Charts;
