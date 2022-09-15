import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const NavbarProduct = () => {
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
            <NavLink to="/">
              <img src={logo} style={{ maxWidth: "50px" }} alt="logobrand" />
            </NavLink>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="text-white ">
              <NavLink
                to="/complain-user"
                activeClassName="active"
                className="navbar-bolder text-white text-decoration-none"
              >
                Complain
              </NavLink>{" "}
            </Nav.Link>
            <Nav.Link className=" mx-1 ">
              <NavLink
                to="/profile"
                activeClassName="active"
                className="navbar-bolder text-white text-decoration-none"
              >
                Profile
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

export default NavbarProduct;
