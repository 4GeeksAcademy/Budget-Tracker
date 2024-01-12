import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Stack from 'react-bootstrap/Stack';

export const RightContent = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
           actions.getUser();
}, [store.user])

  return (

 <>
    
        <div className="right-containers">
            <div className="right-items">
              <h5>General Data</h5>
              <Stack gap={1}>
                <div className="ps-0">Expenses</div>
                <div className="ps-0">Income</div>
                <div className="ps-0">Remaining</div>
              </Stack>
            </div>
        </div>

        <div className="right-containers">
          <div className="right-items">
            <h5>Expenses by Categories</h5>
            <Stack gap={1}>
              <div className="ps-0">Food</div>
              <div className="ps-0">Transport</div>
              <div className="ps-0">Bills</div>
              <div className="ps-0">Housing</div>
            </Stack>
          </div>
        </div>

        <div className="right-containers">
          <div className="right-items">
            <h5>Personal Message</h5>
            {store.user || "Login to reveal the secret message!"}
          </div>
        </div>
       
 </>
 
  );
}

export default RightContent;