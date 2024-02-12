import React, { useState, useEffect, useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";

export const Activity = () => {
  const { store, actions } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    actions.getAllUserActivity();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = store.activity.User
    ? store.activity.User.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = store.activity.User
    ? Math.ceil(store.activity.User.length / itemsPerPage)
    : 0;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    if (store.activity.User) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            className="me-2 px-3"
            variant="outline-dark"
            size="sm"
            key={i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }
    return buttons;
  };

  return (
    <section className="tab activities">
      <h5 className="mb-4">Account Activity</h5>
      <span>
        This is a list of devices that have logged into your account. Revoke any
        sessions that you do not recognize.
      </span>
      <div className="activity-list">
        <ListGroup className="d-flex flex-column gap-3">
          {currentItems.map((el, key) => (
            <div key={el.id}>
              <ListGroup.Item className="rounded">
                <strong>Device: </strong>
                {el.device} <br />
                <strong>Location: </strong>
                {el.ip} <br />
                <strong>Time: </strong>
                {el.time}
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
        <div className="pagination-buttons">{renderPaginationButtons()}</div>
      </div>
    </section>
  );
};
