const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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
					})
			  }

			   		
					const resp = await fetch("https://studious-potato-4j7v6996rjq5cqpvv-3001.app.github.dev/api/token", opts)
				    if(resp.status !== 200){
					  alert('There has been an error!');
					  return false;
					}
			        
					const data = await resp.json();
					console.log("JWT Token: ", data.access_token);
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
					const resp = await fetch("https://studious-potato-4j7v6996rjq5cqpvv-3001.app.github.dev/api/signup", opts)
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
					const resp = await fetch("https://studious-potato-4j7v6996rjq5cqpvv-3001.app.github.dev/api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
