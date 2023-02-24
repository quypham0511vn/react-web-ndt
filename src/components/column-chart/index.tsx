import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import NoData from 'components/no-data';
import Spinner from 'components/spinner';
import { ReportChartModel } from 'models/report';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { COLORS } from 'theme/colors';
import styles from './column-chart.module.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
);
const cx = classNames.bind(styles);

const options = {
    responsive: true,
    // scales: {
    //     x: {
    //         title: {
    //             display: true,
    //             text: Languages.report.month,
    //             color: COLORS.BLACK,
    //             font: {
    //                 size: 16,
    //                 family: 'medium'
    //             }
    //         },
    //         ticks: {
    //             font: {
    //                 size: 14
    //             }
    //         }
    //     },
    //     y: {
    //         title: {
    //             display: true,
    //             text: Languages.report.million,
    //             color: COLORS.BLACK,
    //             font: {
    //                 size: 16,
    //                 family: 'medium'
    //             },
    //             ticks: {
    //                 position: {
    //                     x: 200
    //                 }
    //             }
    //         },
    //         ticks: {
    //             font: {
    //                 size: 14
    //             }
    //         }
    //     }
    // },
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                pinch: {
                    enabled: true // Enable pinch zooming
                },
                wheel: {
                    enabled: true // Enable wheel zooming
                },
                mode: 'x'
            }
        },
        legend: {
            display: true,
            labels: {
                color: COLORS.BLACK,
                usePointStyle: true
            },
            position: 'bottom'
        }

        // SHOW VALUE LABEL
        // datalabels: {
        //     display: true,
        //     color: COLORS.WHITE,
        //     fontSize: 8
        // }
    }
} as any;

function ColumnChart({ dataChart, isMobile, chartContainer, hideBarChart }: {
    dataChart: ReportChartModel,
    isMobile?: boolean,
    chartContainer?: string,
    hideBarChart?: boolean
}) {

    const labels = dataChart.label as any;

    const data = {
        labels,
        datasets: [
            {
                label: Languages.report.reportColumnValue[0],
                data: dataChart?.label.map((label: string, index: number) => dataChart.moneyInvestMent[index]),
                backgroundColor: COLORS.GREEN,
                pointStyle: 'rect'
            },
            {
                label: Languages.report.reportColumnValue[1],
                data: dataChart.label.map((label: string, index: number) => dataChart.initialMoney[index]),
                backgroundColor: COLORS.YELLOW_2,
                pointStyle: 'rect'
            },
            {
                label: Languages.report.reportColumnValue[2],
                data: dataChart.label.map((label: string, index: number) => dataChart.interestMoney[index]),
                backgroundColor: COLORS.BLUE,
                pointStyle: 'rect'
            }
        ]
    };

    return (
        <div className={cx('chart', chartContainer)}>
            {dataChart.moneyInvestMent.filter((item: number) => item !== 0).length > 0
                ? <>
                    <div className={cx('container')}>
                        <span className={cx('text-gray h7')}>{Languages.report.million}</span>
                        <Bar
                            options={options}
                            data={data}
                            height={isMobile ? 350 : 150}
                        />
                    </div>
                    <div className={cx('text-end')}>
                        <span className={cx('text-gray h7')}>{Languages.report.month}</span>
                    </div>
                </>
                : (
                    hideBarChart
                        ? <Spinner className={cx('spinner')}/>
                        : <NoData description={Languages.invest.noDataInvest} />
                )
            }
        </div>

    );
}

export default ColumnChart;

