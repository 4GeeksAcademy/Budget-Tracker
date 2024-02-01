import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Chart } from "react-google-charts";

function ChartCashFlow() {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([["Month", "Income", "Expenses"]]);

  useEffect(() => {
    let isMounted = true;

    if (store.token && store.token != "" && store.token != undefined) {
      actions.getTransactions().then(() => {
        if (!isMounted) return;

        // Process transactions to calculate total income and expenses for each month
        const sortedTransactions = [...store.transactions].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const transactionsByMonth = sortedTransactions.reduce(
          (acc, transaction) => {
            const month = new Date(transaction.date).toLocaleString("default", {
              month: "long",
            });
            if (!acc[month]) {
              acc[month] = { income: 0, expenses: 0 };
            }
            if (transaction.category === "income") {
              acc[month].income += Number(transaction.amount);
            } else {
              acc[month].expenses -= Number(transaction.amount);
            }
            return acc;
          },
          {}
        );

        // Convert processed transactions to data array for chart
        const newData = [
          ["Month", "Income", "Expenses"],
          ...Object.entries(transactionsByMonth).map(
            ([month, { income, expenses }]) => [month, income, expenses]
          ),
        ];

        setData(newData);
        setIsLoading(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [store.token]);

  const options = {
    seriesType: "bars",
    series: { 2: { type: "line" } },
    colors: ["#00AA93", "#E04A80"],
  };

  return (
    <div className="py-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : data.length > 1 ? (
        <Chart
          chartType="ComboChart"
          width="100%"
          height="350px"
          data={data}
          options={options}
        />
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}

export default ChartCashFlow;
