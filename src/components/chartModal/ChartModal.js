import React, { useEffect, useRef, useState } from 'react'
import './ChartModal.css'
import { Chart } from 'chart.js';

function ChartModal({ visibility, gamesStatus, gameMode }) {

    const chartRef = useRef(null);

    const data = {
        labels: ['1 Chance', '2 Chance', '3 Chance', '4 Chance', '5 Chance'],
        datasets: [
            {
                label: 'Vitórias',
                data: gamesStatus.hist,
                color: '#fff',
                backgroundColor: ['#9488AC', '#B7ABD0', '#DDCAD9', '#D1B1CB', '#A08DA9']
            },
        ],
    };

    useEffect(() => {
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
                        }
                    }
                }
            });

            return () => {
                myChart.destroy();
            };
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
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    )
}

export default ChartModal