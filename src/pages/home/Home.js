import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';
import './Home.css'

function Home() {
  const chartRef = useRef(null);
  const termoStatus = JSON.parse(localStorage.getItem('termo')).status;

  const data = {
    labels: ['1 Chance', '2 Chance', '3 Chance', '4 Chance', '5 Chance'],
    datasets: [
      {
        label: 'Vitórias',
        data: termoStatus.hist,
        backgroundColor: ['#9488AC', '#B7ABD0', '#DDCAD9', '#D1B1CB', '#A08DA9']
      },
    ],
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [data]);

  return (
    <div className='container_home'>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default Home;
