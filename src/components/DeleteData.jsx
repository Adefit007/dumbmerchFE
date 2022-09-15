import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function DeleteData({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="text-dark">
        <div>Delete Product</div>
        <div className="my-2">Are you sure you want Delete this Data...?</div>
        <div className="text-end mt-3">
          <Button
            className="me-2"
            variant="success"
            style={{ width: "135px" }}
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            variant="danger"
            style={{ width: "135px" }}
            onClick={handleClose}
          >
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
