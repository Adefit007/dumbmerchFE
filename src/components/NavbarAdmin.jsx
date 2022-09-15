import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const NavbarAdmin = () => {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/auth");
  };

  return (
    <div>
      <Navbar className="navbarBg">
        <Container>
          <Navbar.Brand>
            <NavLink
              to="/product"
              activeClassName="active"
              className="text-white text-decoration-none mx-2"
            >
              <img src={logo} style={{ maxWidth: "50px" }} alt="logobrand" />
            </NavLink>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="text-white ">
              <NavLink
                to="/complain-admin"
                activeClassName="active"
                className="navbar-bolder text-white text-decoration-none mx-2"
              >
                Complain
              </NavLink>
            </Nav.Link>
            <Nav.Link className="text-danger">
              <NavLink
                to="/category"
                activeClassName="active"
                className="navbar-bolder text-white text-decoration-none"
              >
                Category
              </NavLink>
            </Nav.Link>
            <Nav.Link className="text-white ">
              <NavLink
                to="/product"
                activeClassName="active"
                className="navbar-bolder text-white text-decoration-none mx-2"
              >
                Product
              </NavLink>
            </Nav.Link>
            <Nav.Link
              onClick={logout}
              className="navbar-bolder text-white text-decoration-none"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarAdmin;
