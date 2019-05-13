import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    HorizontalGridLines,
    VerticalRectSeries,
    Hint
} from 'react-vis';
import styles from '../styles';
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

        this._mappedData = chartData.inventoryData.map((point, i, arr) => {
            return {
                x: new Date(point.x),
                y: point.y,
                size: ((i > 0) && (arr[i - 1].y === point.y)) ? 0 : 5
            };
        });

        this._mappedRandomData = chartData.randomData.map(point => {
            const date = new Date(point.x);

            return {
                x0: moment(date).subtract(15, 'm').toDate(),
                x: moment(date).add(15, 'm').toDate(),
                y: point.y
            };
        });

        this.tickValues = [
            new Date('2019-05-09T00:00'),
            new Date('2019-05-09T03:00'),
            new Date('2019-05-09T06:00'),
            new Date('2019-05-09T09:00'),
            new Date('2019-05-09T12:00'),
            new Date('2019-05-09T15:00'),
            new Date('2019-05-09T18:00'),
            new Date('2019-05-09T21:00'),
            new Date('2019-05-10T00:00')
        ];

        this.xDomain = [
            moment(this.tickValues[0]).subtract(30, 'm').toDate(),
            moment(this.tickValues[this.tickValues.length - 1]).add(30, 'm').toDate()
        ];
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
        const {
            colorGo,
            colorCaution,
            colorWhite
        } = styles;

        return (
            <div className="VisChart">
                <h1>React-vis</h1>
                <div className="VisChart-chart-container">
                    {/* eslint-disable react/forbid-component-props */}
                    <FlexibleXYPlot xDomain={this.xDomain}>
                        <XAxis
                            tickFormat={this._xTickFormat}
                            tickValues={this.tickValues}
                        />
                        <YAxis />
                        <HorizontalGridLines />
                        <VerticalRectSeries
                            className="VisChart-rect"
                            data={this._mappedRandomData}
                            style={{
                                stroke: colorWhite,
                                fill: colorCaution
                            }}
                        />
                        <LineMarkSeries
                            className="VisChart-lines"
                            data={this._mappedData}
                            curve="curveStepAfter"
                            color={colorGo}
                            fill={colorWhite}
                            sizeType="literal"
                            onValueMouseOver={this._onSetTooltip}
                            onValueMouseOut={this._onForgetTooltip}
                        />
                        {tooltipValue &&
                            <Hint value={tooltipValue} />
                        }
                    </FlexibleXYPlot>
                    {/* eslint-enable react/forbid-component-props */}
                </div>
            </div>
        );
    }
}
