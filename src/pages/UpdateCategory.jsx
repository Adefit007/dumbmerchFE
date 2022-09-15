import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { API } from "../config/api";

export default function UpdateCategory() {
  console.clear();

  const title = "Category admin";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });

  useQuery("categoryCache", async () => {
    const response = await API.get("/category/" + id);
    setCategory({ name: response.data.data.name });
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch("/category/" + id, body, config);
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
              value={category.name}
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
