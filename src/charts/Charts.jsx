import React from 'react';
// import PropTypes from 'prop-types';
import ApexCharts from './apex-charts/ApexCharts';
import ChartistChart from './chartist/ChartistChart';
import FrappeChart from './frappe/FrappeChart';
import VisChart from './react-vis/VisChart';

const Charts = props => {
    return (
        <div className="Charts">
            <ChartistChart />
            <FrappeChart />
            <VisChart />
            <ApexCharts />
        </div>
    );
};

Charts.propTypes = {

};

Charts.defaultProps = {

};

export default Charts;
