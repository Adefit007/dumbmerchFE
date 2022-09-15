import React, { useState, useContext } from "react";
import { Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";

import { API } from "../config/api";

const Register = () => {
  const navigate = useNavigate();

  const title = "Register";
  document.title = "DumbMerch | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
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

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      console.log(response.data);

      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setform({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="warning" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div>
      <Form
        onSubmit={(e) => handleSubmit.mutate(e)}
        className="formLogin  p-3 rounded "
      >
        {message && message}
        <h3 className="text-white mt-2 mb-0">Register</h3>

        <Form.Group className="mt-0" controlId="exampleForm.ControlInput1">
          <Form.Label></Form.Label>
          <Form.Control
            className="formInput"
            name="name"
            onChange={handleChange}
            value={name}
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
          <Form.Label></Form.Label>
          <Form.Control
            className="formInput"
            name="email"
            onChange={handleChange}
            value={email}
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label></Form.Label>
          <Form.Control
            className="formInput"
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <button className="buttonLogin " type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
