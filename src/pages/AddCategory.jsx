import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { API } from "../config/api";

export default function AddCategory() {
  console.clear();

  const title = "Category admin";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({ name: category });

      const response = await API.post("/category", body, config);
      navigate("/category");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <NavbarAdmin />
      <Container>
        <h3 className="text-white mt-4">Add Category</h3>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              onChange={handleChange}
              className="formInputDetail"
              name="category"
              value={category}
              placeholder="category"
            />
          </Form.Group>
          <Button className="buttonLoginDeatil" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
