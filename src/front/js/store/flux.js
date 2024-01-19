const getState = ({ getStore, getActions, setStore }) => {
	const apiUrl='https://reimagined-space-guacamole-r4g6wvvwx777fp6v-3001.app.github.dev'
	return {
		store: {
			user_info: null,
			token: null,
			balances: [],
			transactions: [],
			
		},

		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncToken: () => {
				const token = sessionStorage.getItem("token");
				if(token && token !="" && token!=undefined) setStore({ token: token})
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null })
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						  "Content-Type": "application/json"
					},
					body: JSON.stringify({
						  "email": email,
						  "password": password
					}),
					
			  }

			   		
					const resp = await fetch(`${apiUrl}/api/token/`, opts)
				    if(resp.status !== 200){
					  alert('There has been an error!');
					  return false;
					}
			        
					const data = await resp.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
					
				
			},

			signup: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						  "Content-Type": "application/json"
					},
					body: JSON.stringify({
						  "email": email,
						  "password": password,
						  "is_active": false
					})
			  }

			    try {
					const resp = await fetch(`${apiUrl}/api/signup`, opts)
				    if(resp.status !== 200){
					  alert('There has been an error!');
					  return false;
					}	
									
				}
				catch(error) {
					console.error("There has been an error!")

				}
			},


			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				try{
					// fetching data from the backend
					const resp = await fetch(`${apiUrl}/api/hello`, opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getBalances: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				try{
					// fetching data from the backend
					const resp = await fetch(`${apiUrl}/api/get_account_balances`, opts)
					const data = await resp.json()
					setStore({ balances: data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading balances", error)
				}
			},

			updateCashBalance: async (updateAmount) => {
				const store = getStore();
				const opts = {
				  method: "PUT",
				  headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + store.token
				  },
				  body: JSON.stringify({ "update_amount": updateAmount })
  				};
				
			
				try {
				  // Make a request to update the cash balance
				  const resp = await fetch(`${apiUrl}/api/update_cash_balance`, opts);
				  const data = await resp.json();
			
				  const updatedCashBalance = data.updatedCashBalance;
			
				  setStore((prevState) => ({
					balances: {
					  ...prevState.balances,
					  Cash: updatedCashBalance
					}
				  }));
			
				  // Return the updated balance if needed
				  return updatedCashBalance;
				} catch (error) {
				  console.error("Error updating cash balance", error);
				  throw error;
				}
			  },

			getTransactions: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};

				try{
					// fetching data from the backend
					const resp = await fetch(`${apiUrl}/api/get_user_transactions`, opts)
					const data = await resp.json()
					setStore({ transactions: data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading balances", error)
				}
			},

			getUser: async () => {
				const store = getStore();
				const opts = {
				  headers: {
					Authorization: "Bearer " + store.token
				  }
				};
			  
				try {
				  // Fetching data from the backend
				  const resp = await fetch(`${apiUrl}/get_user_info`, opts);
			  
				  if (!resp.ok) {
					// Handle non-OK responses (e.g., 404, 500)
					console.error(`Error loading user info. Status: ${resp.status}`);
					return null; // or handle it in a way that suits your application
				  }
			  
				  const data = await resp.json();
				  setStore({ user_info: data });
			  
				  // Don't forget to return something; this is how the async function resolves
				  return data;
				} catch (error) {
				  console.error("Error loading user info", error);
				  return null; // or handle it in a way that suits your application
				}
			  },


			
		}
	};
};

export default getState;
