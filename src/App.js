import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style/style.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import Homepage from "./pages/Homepage";
import ProfilPage from "./pages/ProfilPage";
import ListProduct from "./pages/ListProduct";
import ListCategory from "./pages/ListCategory";
import DetailPage from "./pages/DetailPage";
import User from "./pages/CustomerComplain";
import AdminComplain from "./pages/AdminComplain";
import { UserContext } from "./context/userContext";
import Auth from "./pages/Auth";
import { API, setAuthToken } from "./config/api";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateProfile from "./pages/UpdateProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/auth");
    } else {
      if (state.user.status === "Admin") {
        navigate("/product");
      } else if (state.user.status === "Customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<ProfilPage />} />
      <Route path="/update-profile/user/:id" element={<UpdateProfile />} />
      <Route path="/product" element={<ListProduct />} />
      <Route path="/product/:id" element={<DetailPage />} />
      <Route path="/category" element={<ListCategory />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/update-category/:id" element={<UpdateCategory />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route path="/complain-user" element={<User />} />
      <Route path="/complain-admin" element={<AdminComplain />} />
    </Routes>
  );
}

export default App;
