import React, { useState } from "react";
import { Container, Table, Button, Col } from "react-bootstrap";
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useEffect } from "react";
import DeleteData from "../components/DeleteData";
import convertRupiah from "rupiah-format";

function ListProduct() {
  let navigate = useNavigate();

  const title = "List Product";
  document.title = "DumbMerch | " + title;

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = () => {
    navigate("/add-product");
  };

  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const handleUpdate = (id) => {
    navigate("/update-product/" + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
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
          <h4 className="text-white mb-3">List Product</h4>
          <Col className="text-end my-2">
            <Button
              onClick={addProduct}
              className="btn-danger"
              style={{ width: "100px" }}
            >
              Add
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
                <th>Photo</th>
                <th>Product Name</th>
                <th>Product Desc</th>
                <th>Price</th>
                <th>Qty</th>
                <th colSpan={2} className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      alt={item.name}
                    />
                  </td>
                  <td className="align-middle">{item.name}</td>
                  <td className="align-middle text-truncate">{item.desc}</td>
                  <td className="align-middle">
                    {convertRupiah.convert(item.price)}
                  </td>
                  <td className="align-middle">{item.qty}</td>
                  <td className="align-middle">
                    <Button
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
                      type="button"
                      className="buttonList"
                    >
                      Edit
                    </Button>
                  </td>
                  <td className="align-middle">
                    <>
                      <Button
                        type="button"
                        className="buttonList1"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </>
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
}

export default ListProduct;
