import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../context/userContext";
import { useState } from "react";

import Login from "../components/Login";
import Register from "../components/Register";
// class SigninPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loginStatus: true,
//       registerStatus: false,
//     };
//   }

//   DisplayLogin = () => {
//     this.setState({
//       loginStatus: true,
//       registerStatus: false,
//     });
//   };

//   DisplayRegister = () => {
//     this.setState({
//       loginStatus: false,
//       registerStatus: true,
//     });
//   };

//   render() {
//     let login = "";
//     let register = "";
//     if (this.state.loginStatus) {
//       login = <Login />;
//     } else {
//       register = <Register />;
//     }

//     return (
// <div className="containerLogin">
//   <div className=" mt-0">
//     <Container xs={6} md={12} className="pt-5 ">
//       <Row>
//         <Col xs={12} md={7}>
//           <div className="fluid align-items-center justify-content-center ms-4 pt-3">
//             <div className="d-flex align-items-center ">
//               <img
//                 src={logo}
//                 style={{ height: "auto", width: "50%" }}
//                 className="fluid"
//                 alt="logo"
//               />
//             </div>
//             <h2 className="text-white mt-3">Easy, Fast and Reliable</h2>
//             <p className="text-white-50 mb-0">
//               Go shopping for merchandise, just go to dumb merch shopping.
//             </p>
//             <p className="text-white-50 mt-0">
//               the biggest merchandise in Indonesia
//             </p>
//             <div className="mt-3">
//               <button
//                 onClick={this.DisplayLogin}
//                 type="button"
//                 className="buttonLeft me-3 text-white-50 "
//               >
//                 Login
//               </button>
//               <button
//                 onClick={this.DisplayRegister}
//                 type="button"
//                 className="buttonLeft1 text-white-50"
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//         </Col>
//         <Col xs={12} md={5}>
//           <div className=" align-items-center justify-content-center py-5">
//             <Container className="py-5 px-3 justify-content-center">
//               {login}
//               {register}
//             </Container>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   </div>
// </div>
//     );
//   }
// }

// export default SigninPage;

export default function Auth() {
  let navigate = useNavigate();

  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      if (state.user.status === "admin") {
        navigate("/product");
      } else {
        navigate("/");
      }
    }
  };
  checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <div className="containerLogin">
      <div className=" mt-0">
        <Container xs={6} md={12} className="pt-5 ">
          <Row>
            <Col xs={12} md={7}>
              <div className="fluid align-items-center justify-content-center ms-4 pt-3">
                <div className="d-flex align-items-center ">
                  <img
                    src={logo}
                    style={{ height: "auto", width: "50%" }}
                    className="fluid"
                    alt="logo"
                  />
                </div>
                <h2 className="text-white mt-3">Easy, Fast and Reliable</h2>
                <p className="text-white-50 mb-0">
                  Go shopping for merchandise, just go to dumb merch shopping.
                </p>
                <p className="text-white-50 mt-0">
                  the biggest merchandise in Indonesia
                </p>
                <div className="mt-3">
                  <button
                    onClick={switchLogin}
                    className="buttonLeft me-3 text-white-50 "
                  >
                    Login
                  </button>
                  <button
                    onClick={switchRegister}
                    className="buttonLeft1 text-white-50"
                  >
                    Register
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div className=" align-items-center justify-content-center py-5">
                <Container className="py-5 px-3 justify-content-center">
                  {isRegister ? <Register /> : <Login />}
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
