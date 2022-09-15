import { useContext, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Login = () => {
  const title = "Login";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      const response = await API.post("/login", body, config);
      console.log(response);

      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        if (response.data.data.status === "admin") {
          navigate("/product");
        } else {
          navigate("/");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
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
        <h3 className="text-white mt-2 mb-0">Login</h3>
        <Form.Group className="mt-0" controlId="exampleForm.ControlInput1">
          <Form.Label></Form.Label>
          <Form.Control
            className="formInput"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label></Form.Label>
          <Form.Control
            className="formInput"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            placeholder="Password"
          />
        </Form.Group>
        <button className="buttonLogin " type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
