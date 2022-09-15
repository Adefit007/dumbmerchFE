import { Container, Table, Button, Modal, Col } from "react-bootstrap";
import React, { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { dataCategory } from "../components/DataDummy";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useEffect } from "react";
import DeleteData from "../components/DeleteData";

const ListCategory = () => {
  let navigate = useNavigate();

  const title = "List Category";
  document.title = "DumbMerch | " + title;

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addCategory = () => {
    navigate("/add-category");
  };

  let { data: categories, refetch } = useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    return response.data.data;
  });

  const handleEdit = (id) => {
    navigate(`/update-category/${id}`);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();

      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div className="bgHome">
      <NavbarAdmin />
      <Container>
        <div className="containr-fluid mt-3 ">
          <h4 className="text-white mb-3">List Category</h4>
          <Col className="text-end my-2">
            <Button
              onClick={addCategory}
              className="btn-danger"
              style={{ width: "130px" }}
            >
              Add Category
            </Button>
          </Col>
          <Table
            responsive
            striped
            bordered
            hover
            variant="dark"
            className="text-center"
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Category Name</th>
                <th colSpan={2} className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      type="button"
                      className="buttonList"
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      className="buttonList1"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ListCategory;
