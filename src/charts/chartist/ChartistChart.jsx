import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Chartist from 'chartist';
import SHChartist from './SHChartist';
import './ChartistChart.scss';

export default class ChartistChart extends Component {
    static propTypes = {
        chartData: PropTypes.shape({
            inventoryData: PropTypes.arrayOf(PropTypes.object),
            randomData: PropTypes.arrayOf(PropTypes.object),
        }).isRequired
    };

    constructor(props) {
        super(props);

        const {
            chartData: {
                inventoryData,
                randomData
            }
        } = props;

        this._maxY = 0;
        this._mappedInventoryData = inventoryData.map(point => {
            if (point.y > this._maxY) {
                this._maxY = point.y;
            }

            return {
                x: new Date(point.x),
                y: point.y
            };
        });
        this._mappedRandomData = randomData.map(point => {
            if (point.y > this._maxY) {
                this._maxY = point.y;
            }

            return {
                x: new Date(point.x),
                y: point.y
            };
        });
    }

    render() {
        let firstIndexToggle = true;
        let pointRadius = 4;
        let previousPointValue = 0;

        return (
            <div className="ChartistChart">
                <h1>Chartist</h1>
                <div className="ChartistChart-chart-container">
                    <div className="ChartistChart-chart-wrapper">
                        <SHChartist
                            className="ChartistChart-chart-bar"
                            type="Bar"
                            legend={{
                                legendNames: ['Random']
                            }}
                            tooltip={{
                                tooltipFnc: (label, value) => {
                                    return `${value.split(',')[1]} Spaces`;
                                }
                            }}
                            data={{
                                series: [{
                                    name: 'random',
                                    data: this._mappedRandomData
                                }]
                            }}
                            options={{
                                high: (this._maxY + Math.ceil(this._maxY * 0.15)),
                                low: 0,
                                axisX: {
                                    showGrid: false,
                                    type: Chartist.FixedScaleAxis,
                                    divisor: 8,
                                    labelInterpolationFnc: value => {
                                        return moment(value).format('ha');
                                    }
                                },
                                axisY: {
                                    onlyInteger: true
                                },
                                fullWidth: true,
                                chartPadding: {
                                    top: 0,
                                    right: 20,
                                    bottom: 60,
                                    left: 0
                                },
                                height: '400px',
                            }}
                        />
                        <SHChartist
                            className="ChartistChart-chart-line"
                            type="Line"
                            legend={{
                                legendNames: ['Inventory']
                            }}
                            tooltip={{
                                pointClass: 'ct-circle',
                                tooltipFnc: (label, value) => {
                                    return `${value} Spaces`;
                                }
                            }}
                            data={{
                                series: [{
                                    name: 'inventory',
                                    data: this._mappedInventoryData
                                }]
                            }}
                            options={{
                                series: {
                                    inventory: {
                                        lineSmooth: Chartist.Interpolation.step()
                                    }
                                },
                                high: (this._maxY + Math.ceil(this._maxY * 0.15)),
                                low: 0,
                                axisX: {
                                    showGrid: false,
                                    showLabel: false,
                                    type: Chartist.FixedScaleAxis,
                                    divisor: 8,
                                    labelInterpolationFnc: value => {
                                        return moment(value).format('ha');
                                    }
                                },
                                axisY: {
                                    onlyInteger: true,
                                    showGrid: false,
                                    showLabel: false,
                                },
                                lineSmooth: false,
                                fullWidth: true,
                                chartPadding: {
                                    top: 0,
                                    right: 20,
                                    bottom: 60,
                                    left: 0
                                },
                                height: '400px',
                            }}
                            events={[
                                {
                                    event: 'draw',
                                    handler: pointData => {
                                        if (pointData.type === 'point') {
                                            const yValue = pointData.value.y;

                                            // chartist logs index 0 twice, so use a toggle to only draw the first 0 index point
                                            // otherwise continue to draw the other points with the correct radius
                                            pointRadius = (pointData.index === 0 && firstIndexToggle)
                                                ? 4
                                                : (previousPointValue === yValue) ? 0 : 4;
                                            previousPointValue = yValue;
                                            firstIndexToggle = (pointData.index === 0) ? !firstIndexToggle : true;

                                            const circle = new Chartist.Svg('circle', {
                                                cx: [pointData.x],
                                                cy: [pointData.y],
                                                r: [pointRadius],
                                                'ct:value': pointData.value.y,
                                                'ct:meta': pointData.meta
                                            }, 'ct-circle');

                                            pointData.element.replace(circle);
                                        }
                                    }
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
