import 'chartist-plugin-legend';
import 'chartist-plugin-tooltips';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Chartist from 'chartist';
import './SHChartist.scss';

export default class Chart extends Component {
    static propTypes = {
        /** Additional class(es) to add to the component. */
        className: PropTypes.string,
        /** The type of chart to draw. */
        type: PropTypes.oneOf([
            'Line',
            'Bar',
            'Pie',
            'Donut'
        ]).isRequired,
        /**
         * The aspect ratio of the chart container.
         *
         * @see See the aspect ratio information <a href="https://gionkunz.github.io/chartist-js/getting-started.html#as-simple-as-it-can-get" target="_blank">here</a>. The value should not include the leading `ct-`.
         */
        aspectRatio: PropTypes.string,
        /**
         * The data to display on the chart.
         *
         * @see See the <a href="https://gionkunz.github.io/chartist-js/api-documentation.html" target="_blank">Chartist documentation</a> for details.
         */
        data: PropTypes.object.isRequired,
        /**
         * The options for the chart.
         *
         * @see See the <a href="https://gionkunz.github.io/chartist-js/api-documentation.html" target="_blank">Chartist documentation</a> for details.
         */
        options: PropTypes.object,
        /**
         * The responsive options to apply to chart.
         *
         * @see See the <a href="https://gionkunz.github.io/chartist-js/api-documentation.html" target="_blank">Chartist documentation</a> for details.
         */
        responsiveOptions: PropTypes.array,
        /** An array containing the events to listen for and their respective handler functions. */
        events: PropTypes.arrayOf(PropTypes.shape({
            event: PropTypes.oneOf([
                'draw',
                'optionsChanged',
                'data',
                'animationBegin',
                'animationEnd',
                'created'
            ]).isRequired,
            handler: PropTypes.func.isRequired
        })),
        /**
         * Setting this will show a legend. If passed as an object it will set configuration options on the legend.
         *
         * @see For possible options, see <a href="https://github.com/CodeYellowBV/chartist-plugin-legend" target="_blank">chartist-plugin-legend</a>.
         */
        legend: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ]),
        /**
         * Setting this will show a tooltip when hovering over a point. If passed as an object it will set configuration options on the tooltip.
         *
         * @see For possible options, see <a href="https://github.com/Globegitter/chartist-plugin-tooltip" target="_blank">chartist-plugin-tooltip</a>.
         */
        tooltip: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ])
    };
    static defaultProps = {
        aspectRatio: 'double-octave'
    };

    constructor(props) {
        super(props);

        const {
            type,
            options,
            legend,
            tooltip
        } = props;
        const plugins = [];
        const isDonut = (type === 'Donut');

        this._chartType = (isDonut) ? 'Pie' : type;
        this._options = {...options};

        if (isDonut) {
            this._options.donut = true;
        }

        if (legend) {
            plugins.push(Chartist.plugins.legend(legend));
        }

        if (tooltip) {
            plugins.push(Chartist.plugins.tooltip(tooltip));
        }

        if (this._options.plugins) {
            this._options.plugins.concat(plugins);
        } else {
            this._options.plugins = plugins;
        }

        this._previousOptions = this._options;
    }

    componentDidMount() {
        const {
            data,
            responsiveOptions,
            events
        } = this.props;

        this._chartist = new Chartist[this._chartType](this._chart, data, this._options, responsiveOptions);

        if (events) {
            forEach(events, ({event, handler}) => {
                this._chartist.on(event, handler);
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            data,
            options,
            responsiveOptions
        } = this.props;

        this._options = {
            ...this._options,
            ...options
        };

        if (!isEqual(this._previousOptions, this._options)) {
            this._chartist.update(data, this._options, responsiveOptions);

            this._previousOptions = this._options;
        }
    }

    componentWillUnmount() {
        const {
            tooltip,
            events
        } = this.props;

        if (tooltip && tooltip.appendToBody) {
            const els = document.querySelectorAll('.chartist-tooltip');
            const el = (els.length > 1) ? els : els[0];

            if (!el) { return; }

            if (isArray(el) || el instanceof NodeList) {
                const len = el.length;
                let i = 0;

                for (i; i < len; ++i) {
                    el.outerHTML = '';
                }
            } else {
                el.outerHTML = '';
            }
        }

        forEach(events, ({event, handler}) => {
            this._chartist.off(event, handler);
        });

        this._chartist.detach();
    }

    /**
     * Getter for the chartist event emitter.
     *
     * @public
     * @returns {Object} - The event emitter.
     */
    get eventEmitter() {
        return this._chartist.eventEmitter;
    }

    render() {
        const {
            className,
            aspectRatio
        } = this.props;
        const classes = classNames(
            'Chart',
            'ct-chart',
            `ct-${aspectRatio}`,
            className
        );

        return (
            <div
                ref={node => { this._chart = node; }}
                className={classes}
            />
        );
    }
}
