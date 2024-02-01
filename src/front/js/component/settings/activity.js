import React, { useState, useEffect, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../../store/appContext";
export const Activity = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getAllUserActivity();
    console.log("ACtivity from store", store.activity.User);
  }, []);

  return (
    <section className="tab">
      <h3>Account Activity</h3>
      <p>
        This is a list of devices that have logged into your account. Revoke any
        sessions that you do not recognize.
      </p>
      <ListGroup className="d-flex flex-column gap-4">
        {store.activity.User ? (
          store.activity.User.map((el, key) => {
            return (
              <ListGroup.Item className="rounded" key={key}>
                <strong>Device: </strong>
                {el.device} <br />
                <strong>Location: </strong>
                {el.ip} <br />
                <strong>Time: </strong>
                {el.time}
              </ListGroup.Item>
            );
          })
        ) : (
          <p>No current activity</p>
        )}
      </ListGroup>
    </section>
  );
};
