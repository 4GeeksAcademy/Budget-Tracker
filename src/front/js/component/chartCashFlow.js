import React, { useContext, useEffect } from "react";
import { Chart } from 'react-google-charts';

function ChartCashFlow() {
    const temperatureData = [
        ['Month', 'Top'],
        ['May', 6550],
        ['June', 5870],
        ['July', 3689],
        ['August', 7490],
        ['September', 9820]
    ];

    const options = {
      title: 'Net cash flow over the recent months',
      backgroundColor: '#fff',
      hAxis: {
          title: 'Month',
      },
      vAxis: {
          title: 'Dollar amount $',
      },
      lineWidth: 10,
      colors: ['#61B842'],
      lineWidth: 2,
      pointSize: 6,
      animation: {
          startup: true,
          duration: 1000,
          easing: 'out',
      },
  };
    
    return (
        <div className='py-10'>
            <Chart
                chartType="LineChart"
                data={temperatureData}
                options={options}
            />
        </div>
    )
}

export default ChartCashFlow;