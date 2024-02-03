import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Chart } from "react-google-charts";

function ChartExpenses() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getTransactions();
  }, [store.token]);

  const expensesByBudget = {};

  store.transactions.forEach((transaction) => {
    if (transaction.amount <= 0) {
      const category = transaction.budget ? transaction.budget : "Income";

      if (expensesByBudget[category] === undefined) {
        expensesByBudget[category] = 0;
      }

      expensesByBudget[category] += transaction.amount;
    }
  });

  const expensesByCategory = Object.entries(expensesByBudget).map(
    ([category, amount]) => [category, Math.abs(amount)]
  );

  const options = {
    backgroundColor: store.isDarkMode ? "#1E1E1E" : "#fff",
    legend: {
      position: "labeled",
      textStyle: {
        color: store.isDarkMode ? "#fff" : "#081426",
        fontSize: 12,
      },
    },
    colors: ["#4C5677", "#DFEF6A", "#B8DBAD", "#AF5072", "#AF5072", "#CD554F"],
    pieSliceTextStyle: {
      color: "transparent",
      fontSize: 16,
      bold: true,
    },
    pieSliceLegendStyle: {
      color: "#081426",
      fontSize: 16,
      bold: true,
    },
    pieHole: 0.5,
    lineWidth: 2,
    pointSize: 6,
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    chartArea: {
      width: "100%",
      height: "100%",
    },
  };

  return (
    <div className="py-5">
      <Chart
        chartType="PieChart"
        data={[["Category", "Amount"], ...expensesByCategory]}
        options={options}
      />
    </div>
  );
}

export default ChartExpenses;
