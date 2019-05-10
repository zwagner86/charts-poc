import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import moment from 'moment';
import Chartist from 'chartist';
import SHChartist from './SHChartist';
import chartData from '../chartData';
import './ChartistChart.scss';

export default class ChartistChart extends Component {
    static propTypes = {

    };
    static defaultProps = {

    };
    state = {

    };

    constructor(props) {
        super(props);

        this._highestYValue = 0;
        this._mappedData = chartData.inventoryData.map(point => {
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
        let firstIndexToggle = true;
        let pointRadius = 4;
        let previousPointValue = 0;

        return (
            <div className="ChartistChart">
                <h1>Chartist</h1>
                <div className="ChartistChart-chart-container">
                    <SHChartist
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
                                data: this._mappedData
                            }]
                        }}
                        options={{
                            series: {
                                inventory: {
                                    lineSmooth: Chartist.Interpolation.step()
                                }
                            },
                            high: (this._highestYValue + Math.ceil(this._highestYValue * 0.25)),
                            low: 0,
                            axisX: {
                                showGrid: false,
                                type: Chartist.FixedScaleAxis,
                                divisor: 7,
                                labelInterpolationFnc: value => {
                                    return moment(value).format('ha');
                                }
                            },
                            axisY: {
                                onlyInteger: true
                            },
                            lineSmooth: false,
                            fullWidth: true,
                            chartPadding: {
                                top: 0,
                                right: 20,
                                bottom: 0,
                                left: 0
                            }
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
        );
    }
}
