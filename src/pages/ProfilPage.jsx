import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../assets/blank-profile.jpg";
import NavbarProduct from "../components/Navbar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";
import { useNavigate } from "react-router-dom";

const ProfilPage = () => {
  const title = "Profile";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  let { data: profile, refetch: profileRefetch } = useQuery(
    "profilCache",
    async () => {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic" + localStorage.token,
        },
      };
      const response = await API.get("/profile");
      return response.data.data;
    }
  );

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic" + localStorage.token,
      },
    };
    const response = await API.get("/transactions");
    return response.data.data;
  });

  const handleEdit = (id) => {
    navigate("/update-profile/user/" + id);
  };

  return (
    <div className="bgHome">
      <NavbarProduct />
      <Container>
        <Row className="mt-4">
          <Col md={7} className="mb-3">
            <div className="container-fluid">
              <h4 className="text-danger mb-4">Profile</h4>
              <Row>
                <div className="col-md-5">
                  <img
                    src={profile?.image ? profile?.image : logo}
                    style={{ height: "auto", width: "100%" }}
                    className="img-fluid rounded-1 mb-3"
                    alt="profile"
                  />
                </div>
                <div className="col text-white">
                  <div>
                    <p className="text-danger m-0 p-0">
                      <b>Name</b>
                    </p>
                    <p>{state.user.name}</p>
                  </div>
                  <div>
                    <p className="text-danger m-0 p-0">
                      <b>Email</b>
                    </p>
                    <p>{state.user.email}</p>
                  </div>
                  <div>
                    <p className="text-danger m-0 p-0">
                      <b>Phone</b>
                    </p>
                    <p>{profile?.phone ? profile?.phone : "_"}</p>
                  </div>
                  <div>
                    <p className="text-danger m-0 p-0">
                      <b>Gender</b>
                    </p>
                    <p>{profile?.gender ? profile?.gender : "-"}</p>
                  </div>
                  <div>
                    <p className="text-danger m-0 p-0">
                      <b>Address</b>
                    </p>
                    <p>{profile?.address ? profile?.address : "-"}</p>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="success"
                      onClick={() => {
                        handleEdit(state?.user?.id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="text-header-product mb-4">My Transaction</div>
            {transactions?.length != 0 ? (
              <>
                {transactions?.map((item) => (
                  <div
                    style={{ background: "#303030" }}
                    className="rounded p-2 mb-1"
                  >
                    <Container fluid className=" px-1">
                      <Row>
                        <Col xs="3">
                          <img
                            src={item.product.image}
                            alt="img"
                            className="img-fluid"
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col xs="6">
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#F74D4D",
                              fontWeight: "500",
                              lineHeight: "19px",
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            className="mt-1"
                            style={{
                              fontSize: "14px",
                              color: "#F74D4D",
                              fontWeight: "500",
                              lineHeight: "19px",
                            }}
                          >
                            {dateFormat(item.createdAt, "dddd, ")}
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#F74D4D",
                                fontWeight: "250",
                                lineHeight: "19px",
                              }}
                            >
                              {dateFormat(item.createdAt, "d mmmm yyyy ")}
                            </span>
                          </div>

                          <div
                            className="mt-1"
                            style={{
                              fontSize: "14px",
                              fontWeight: "300",
                            }}
                          >
                            Price : {convertRupiah.convert(item.price)}
                          </div>

                          <div
                            className="mt-1"
                            style={{
                              fontSize: "14px",
                              fontWeight: "700",
                            }}
                          >
                            Sub Total : {convertRupiah.convert(item.price)}
                          </div>
                        </Col>
                        <Col xs="3">
                          <div
                            className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}
                          >
                            {item.status}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-data-transaction">No transaction</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilPage;
