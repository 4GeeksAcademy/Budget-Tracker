import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Chart } from 'react-google-charts';

function ChartCashFlow() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getTransactions();
	}, [store.token])

    console.log("Transactions: ", store.transactions)

    const data = [
        [
          "Month",
          "Income",
          "Expenses",
          "Average",
        ],
        ["November", 1265, 938, 1101],
        ["December", 2335, 1120, 1727],
        ["January", 1840, 674, 1257],
      ];
      
    const options = {
        seriesType: "bars",
        series: { 2: { type: "line" } },
        colors: ['#85A47C', '#C8423A', '#4C5677']
      };
    
    return (
        <div className='py-10'>
             <Chart
                chartType="ComboChart"
                width="100%"
                height="350px"
                data={data}
                options={options}
              />
        </div>
    )
}

export default ChartCashFlow;