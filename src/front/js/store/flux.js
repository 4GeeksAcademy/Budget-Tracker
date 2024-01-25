const getState = ({ getStore, getActions, setStore }) => {

  const apiUrl = "https://turbo-journey-pjrw9qq9677p3rv56-3001.app.github.dev";
  return {
    store: {
      user_info: null,
      token: null,
      balances: [],
      transactions: [],
      account_details: [],
      isDarkMode: false,
    },

    actions: {
      // Use getActions to call a function within a function
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      syncToken: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        const resp = await fetch(`${apiUrl}/api/token/`, opts);
        if (resp.status !== 200) {
          alert("There has been an error!");
          return false;
        }

        const data = await resp.json();
        sessionStorage.setItem("token", data.access_token);
        setStore({ token: data.access_token });
        return true;
      },

      signup: async (firstName, lastName, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            is_active: false,
          }),
        };

        try {
          const resp = await fetch(`${apiUrl}/api/signup`, opts);
          if (resp.status !== 200) {
            alert("There has been an error!");
            return false;
          }
        } catch (error) {
          console.error("There has been an error!");
        }
      },

      getMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        try {
          // fetching data from the backend
          const resp = await fetch(`${apiUrl}/api/hello`, opts);
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      getBalances: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        try {
          // fetching data from the backend
          const resp = await fetch(`${apiUrl}/api/get_account_balances`, opts);
          const data = await resp.json();
          setStore({ balances: data });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading balances", error);
        }
      },

      updateCashBalance: async (updateAmount) => {
        const store = getStore();
        const opts = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({ update_amount: updateAmount }),
        };

        try {
          // Make a request to update the cash balance
          const resp = await fetch(`${apiUrl}/api/update_cash_balance`, opts);
          const data = await resp.json();

          const updatedCashBalance = data.updatedCashBalance;

          setStore((prevState) => ({
            balances: {
              ...prevState.balances,
              Cash: updatedCashBalance,
            },
          }));

          // Return the updated balance if needed
          return updatedCashBalance;
        } catch (error) {
          console.error("Error updating cash balance", error);
          throw error;
        }
      },

      updateSavingsBalance: async (updateAmount) => {
        const store = getStore();
        const opts = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({ update_amount: updateAmount }),
        };

        try {
          // Make a request to update the savings balance
          const resp = await fetch(
            `${apiUrl}/api/update_savings_balance`,
            opts
          );
          const data = await resp.json();

          const updatedSavingsBalance = data.updatedSavingsBalance;

          setStore((prevState) => ({
            balances: {
              ...prevState.balances,
              Savings: updatedSavingsBalance,
            },
          }));

          // Return the updated balance if needed
          return updatedSavingsBalance;
        } catch (error) {
          console.error("Error updating savings balance", error);
          throw error;
        }
      },

      getTransactions: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        try {
          // fetching data from the backend
          const resp = await fetch(`${apiUrl}/api/get_user_transactions`, opts);
          const data = await resp.json();
          setStore({ transactions: data });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading balances", error);
        }
      },

      addExpense: async (transaction) => {
        const store = getStore();

        // Validate transaction data
        if (!transaction || typeof transaction !== "object") {
          throw new Error("Transaction data is missing or not an object");
        }

        const requiredFields = ["budgetId", "accountId", "amount", "date"];
        for (let field of requiredFields) {
          if (!transaction.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
          }
        }

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(transaction),
        };

        try {
          const resp = await fetch(`${apiUrl}/api/post_user_transaction`, opts);
          if (!resp.ok) {
            const error = new Error(
              `Request failed with status ${resp.status}: ${resp.statusText}`
            );
            error.response = resp;
            throw error;
          }
          const data = await resp.json();
          setStore({ transactions: [...store.transactions, data] });
          return data;
        } catch (error) {
          console.error("Error posting transaction", error);
          // If the response is available, try to get more error details from the response body
          if (error.response) {
            error.response.text().then((text) => {
              console.error("Server response:", text);
            });
          }
          throw error;
        }
      },

      addIncome: async (transaction) => {
        const store = getStore();

        // Validate transaction data
        if (!transaction || typeof transaction !== "object") {
          throw new Error("Transaction data is missing or not an object");
        }

        const requiredFields = ["budgetId", "accountId", "amount", "date"];
        for (let field of requiredFields) {
          if (!transaction.hasOwnProperty(field)) {
            throw new Error(`Missing required field: ${field}`);
          }
        }

        // Ensure the amount is positive
        transaction.amount = Math.abs(transaction.amount);

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify(transaction),
        };

        try {
          const resp = await fetch(`${apiUrl}/api/post_user_transaction`, opts);
          if (!resp.ok) {
            const error = new Error(
              `Request failed with status ${resp.status}: ${resp.statusText}`
            );
            error.response = resp;
            throw error;
          }
          const data = await resp.json();
          setStore({ transactions: [...store.transactions, data] });
          return data;
        } catch (error) {
          console.error("Error posting transaction", error);
          // If the response is available, try to get more error details from the response body
          if (error.response) {
            error.response.text().then((text) => {
              console.error("Server response:", text);
            });
          }
          throw error;
        }
      },

      getUser: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };

        try {
          // Fetching data from the backend
          const resp = await fetch(`${apiUrl}/api/get_user_info`, opts);

          if (!resp.ok) {
            console.error(`Error loading user info. Status: ${resp.status}`);
            return null;
          }

          const data = await resp.json();
          setStore({ user_info: data });

          return data;
        } catch (error) {
          console.error("Error loading user info", error);
          return null;
        }
      },

      addNewAccount: async (accountType, balance) => {
        const store = getStore();
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({ account_type: accountType, balance: balance }),
        };

        try {
          // Make a request to add a new account
          const resp = await fetch(`${apiUrl}/api/add_new_account`, opts);
          const data = await resp.json();

          // Update the store with the new account
          setStore((prevState) => ({
            balances: {
              ...prevState.balances,
              [accountType]: balance,
            },
          }));

          // Return the new account if needed
          return data;
        } catch (error) {
          console.error("Error adding new account", error);
          throw error;
        }
      },

      toggleDarkMode: () => {
        const store = getStore();
        const newIsDarkMode = !store.isDarkMode;
        setStore({ isDarkMode: newIsDarkMode });

        // Use the new value directly
        if (newIsDarkMode) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
      },

      updateUserInfo: async (firstName, lastName, email) => {
        const store = getStore();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
          }),
        };

        try {
          const resp = await fetch(`${apiUrl}/api/update_personal_info`, opts);

          const data = await resp.json();
          console.log(data);
        } catch (error) {
          console.error("Error updating user info", error);
        }
      },
      
      getAccountDetails: async (accountId) => {
        const store = getStore();
        const opts = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };

        try {
          const resp = await fetch(
            `${apiUrl}/api/get_account_details/${accountId}`,
            opts
          );

          if (!resp.ok) {
            console.error(
              `Error loading account details. Status: ${resp.status}`
            );
            return null;
          }

          const data = await resp.json();
          setStore({ account_details: data });

          return data;
        } catch (error) {
          console.error("Error loading account details", error);
          return null;
        }
      },

      updateUserPassword: async (oldPassword, newPassword) => {
        const store = getStore();
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },

          body: JSON.stringify({
            new_password: newPassword,
            old_password: oldPassword,
          }),
        };

        const res = await fetch(`${apiUrl}/api/update_password`, opts);
        const data = await res.json();

        return data;
      },
    },
  };
};

export default getState;
