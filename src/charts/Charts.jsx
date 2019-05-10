import React from 'react';
// import PropTypes from 'prop-types';
import FrappeChart from './FrappeChart';
import VisChart from './VisChart';

const Charts = props => {
    return (
        <div className="Charts">
            <FrappeChart />
            <VisChart />
        </div>
    );
};

Charts.propTypes = {

};

Charts.defaultProps = {

};

export default Charts;
