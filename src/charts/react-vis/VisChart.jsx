import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    Hint
} from 'react-vis';
import chartData from '../chartData';
import './VisChart.scss';

export default class VisChart extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    state = {
        tooltipValue: null
    };

    constructor(props) {
        super(props);

        this._mappedData = chartData.inventoryData.map(point => {
            return {
                x: new Date(point.x),
                y: point.y
            };
        });
    }

    _onSetTooltip = tooltipValue => {
        this.setState({
            tooltipValue
        });
    }

    _onForgetTooltip = () => {
        this.setState({
            tooltipValue: null
        });
    }

    _xTickFormat = value => {
        // console.log(value);

        return moment(value).format('ha');
    }

    render() {
        const {
            tooltipValue
        } = this.state;

        return (
            <div className="VisChart">
                <h1>React-vis</h1>
                <div className="VisChart-chart-container">
                    <FlexibleXYPlot>
                        <XAxis
                            tickFormat={this._xTickFormat}
                        />
                        <YAxis />
                        <LineMarkSeries
                            data={this._mappedData}
                            curve="curveStepAfter"
                            onValueMouseOver={this._onSetTooltip}
                            onValueMouseOut={this._onForgetTooltip}
                        />
                        {tooltipValue &&
                            <Hint value={tooltipValue}>
                                <div>{moment(tooltipValue.x).format('h:mma')}</div>
                                <div>{tooltipValue.y} spaces</div>
                            </Hint>
                        }
                    </FlexibleXYPlot>
                </div>
            </div>
        );
    }
}
