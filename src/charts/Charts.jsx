import React from 'react';
// import PropTypes from 'prop-types';
import ApexChart from './apex-charts/ApexChart';
import ChartistChart from './chartist/ChartistChart';
import FrappeChart from './frappe/FrappeChart';
import VisChart from './react-vis/VisChart';

const Charts = props => {
    return (
        <div className="Charts">
            <ChartistChart />
            <FrappeChart />
            <VisChart />
            <ApexChart />
        </div>
    );
};

Charts.propTypes = {

};

Charts.defaultProps = {

};

export default Charts;
