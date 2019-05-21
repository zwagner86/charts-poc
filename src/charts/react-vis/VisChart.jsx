import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    HorizontalGridLines,
    VerticalRectSeries,
    DiscreteColorLegend,
    Crosshair
} from 'react-vis';
import styles from '../styles';
import './VisChart.scss';

export default class VisChart extends Component {
    static propTypes = {
        chartData: PropTypes.shape({
            inventoryData: PropTypes.arrayOf(PropTypes.object),
            randomData: PropTypes.arrayOf(PropTypes.object),
        }).isRequired
    };
    state = {
        crosshairValues: []
    };

    constructor(props) {
        super(props);

        const {
            chartData: {
                inventoryData,
                randomData
            }
        } = props;

        this._mappedInventoryData = inventoryData.map((point, i, arr) => {
            return {
                x: new Date(point.x),
                y: point.y,
                size: ((i > 0) && (arr[i - 1].y === point.y)) ? 0 : 5
            };
        });
        this._mappedRandomData = randomData.map(point => {
            const date = new Date(point.x);

            return {
                x0: moment(date).subtract(10, 'm')
                    .toDate(),
                x: moment(date).add(10, 'm')
                    .toDate(),
                y: point.y
            };
        });
        this._SERIES = [
            {title: 'Inventory', data: this._mappedInventoryData},
            {title: 'Random', data: this._mappedRandomData},
        ];

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
            moment(this.tickValues[0]).subtract(30, 'm')
                .toDate(),
            moment(this.tickValues[this.tickValues.length - 1]).add(30, 'm')
                .toDate()
        ];
    }

    _onMouseLeaveHandler = () => {
        this.setState({
            crosshairValues: []
        });
    };

    _onNearestXHandler = (value, {index}) => {
        this.setState({
            crosshairValues: this._SERIES.map(s => s.data[index])
        });
    };

    _formatCrosshairItems = values => {
        return values.map((v, i) => {
            return {
                title: this._SERIES[i].title,
                value: v.y
            };
        });
    };

    _formatCrosshairTitle = values => {
        return {
            title: 'Time',
            value: moment(values[0].x).format('h:mma')
        };
    };

    _xTickFormat = value => {
        return moment(value).format('ha');
    }

    render() {
        const {
            crosshairValues
        } = this.state;
        const {
            colorGo,
            colorCaution,
            colorWhite
        } = styles;

        return (
            <div className="VisChart">
                <h1>React-vis</h1>
                <div className="VisChart-content">
                    <DiscreteColorLegend
                        orientation="horizontal"
                        items={[
                            {title: 'Inventory', color: colorGo},
                            {title: 'Random', color: colorCaution},
                        ]}
                    />
                    <div className="VisChart-chart-container">
                        {/* eslint-disable react/forbid-component-props */}
                        <FlexibleXYPlot
                            xDomain={this.xDomain}
                            onMouseLeave={this._onMouseLeaveHandler}
                        >
                            <XAxis
                                tickFormat={this._xTickFormat}
                                tickValues={this.tickValues}
                            />
                            <YAxis />
                            <HorizontalGridLines />
                            <VerticalRectSeries
                                className="VisChart-rect"
                                data={this._mappedRandomData}
                                onNearestX={this._onNearestXHandler}
                                style={{
                                    stroke: colorWhite,
                                    fill: colorCaution
                                }}
                            />
                            <LineMarkSeries
                                className="VisChart-lines"
                                data={this._mappedInventoryData}
                                curve="curveStepAfter"
                                color={colorGo}
                                fill={colorWhite}
                                sizeType="literal"
                            />
                            <Crosshair
                                itemsFormat={this._formatCrosshairItems}
                                titleFormat={this._formatCrosshairTitle}
                                values={crosshairValues}
                            />
                        </FlexibleXYPlot>
                        {/* eslint-enable react/forbid-component-props */}
                    </div>
                </div>
            </div>
        );
    }
}
