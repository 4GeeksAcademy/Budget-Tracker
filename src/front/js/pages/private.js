import React, { useContext, useEffect } from "react";
import Toast from 'react-bootstrap/Toast';
import { Context } from "../store/appContext";
import Table from 'react-bootstrap/Table';

export const Private = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
           actions.getUser();
}, [store.user])

  return (
    <Table className="d-flex justify-content-center mt-5">
        <tbody>
           <tr>
            <td className="align-middle">
                <Toast className="text-center">
                <Toast.Header className="justify-content-md-center rounded-2 bg-dark text-white">
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Private Message</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body className= "bg-dark text-white rounded-2">
                {store.user || "Login to reveal the secret message!"}</Toast.Body>
                </Toast>
            </td>
           </tr>
        </tbody>
</Table>
  );
}

export default Private;