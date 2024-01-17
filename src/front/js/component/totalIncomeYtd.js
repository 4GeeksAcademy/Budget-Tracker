import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

function TotalIncomeYTD() {
    const { store, actions } = useContext(Context);
    const [totalExpensesYTD, setTotalExpensesYTD] = useState(0);

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined)
            actions.getTransactions();
    }, [store.token]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();

        // Filter transactions for the current year and category "income"
        const currentYearExpenses = store.transactions.filter(transaction => {
            const transactionYear = new Date(transaction.date).getFullYear();
            return transactionYear === currentYear && transaction.category === "income";
        });

        // Sum up expenses from the filtered transactions
        const ytdExpenses = currentYearExpenses.reduce((total, transaction) => {
            // Replace 'transaction.amount' with the actual field in your transaction data
            return total + (transaction.amount || 0);
        }, 0);

        setTotalExpensesYTD(ytdExpenses);
    }, [store.transactions]);

    return (
                <span className="category green-numbers">$ {totalExpensesYTD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    );
}

export default TotalIncomeYTD;
