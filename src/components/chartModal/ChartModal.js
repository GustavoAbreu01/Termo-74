import React, { useEffect, useRef, useState } from 'react'
import './ChartModal.css'
import { IoStatsChart } from "react-icons/io5";
import { Chart } from 'chart.js';

function ChartModal({ visibility, gamesStatus, gameMode, labelsStats, colorsStats }) {

    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);

    const data = {
        labels: labelsStats,
        datasets: [
            {
                label: 'Vitórias',
                data: gamesStatus.hist,
                color: '#fff',
                backgroundColor: colorsStats
            },
        ],
    };

    useEffect(() => {
        if (gamesStatus.games === 0) {
            setChart(null);
        } else {
            if (chartRef && chartRef.current) {
                Chart.defaults.color = '#fff';
                const myChart = new Chart(chartRef.current, {
                    type: 'doughnut',
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        size: 13,
                                        family: 'Archivo',
                                    }
                                }
                            },
                            title: {
                                display: true,
                                font: {
                                    size: 15,
                                    family: 'Archivo-Bold',
                                },
                                text: 'Vitórias por chance',
                                color: '#fff',
                            }
                        },
                    }
                });

                return () => {
                    myChart.destroy();
                };
            }
        }
    }, [data]);

    return (
        <div className={`container_chart ${visibility ? 'active' : ''}`}>
            <div className='box_chart'>
                <div className='chart_infos'>
                    <p className='title_chart'>Dados do {gameMode}</p>
                    <div className='chart_status'>
                        <div className='status_item'>
                            <p className='number_chart_status'>{gamesStatus.games}</p>
                            <p className='text_chart_status'>Partidas</p>
                        </div>
                        <div className='status_item'>
                            <p className='number_chart_status'>{gamesStatus.wins}</p>
                            <p className='text_chart_status'>Vitórias</p>
                        </div>
                        <div className='status_item'>
                            <p className='number_chart_status'>{gamesStatus.streak}</p>
                            <p className='text_chart_status'>Sequência</p>
                        </div>
                    </div>
                </div>
                {gamesStatus.games === 0 ?
                    <div className='status_not_found'>
                        <IoStatsChart className='chart_icon_found' />
                        <p className='no_data'>Nenhuma partida jogada</p>
                    </div>
                    :
                    <div className='chart_area'>
                        <canvas ref={chartRef}></canvas>
                    </div>
                }
            </div>
        </div >
    )
}

export default ChartModal