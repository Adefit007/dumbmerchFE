import { Container, Row, Col } from "react-bootstrap";
import NavbarProduct from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import { useEffect } from "react";

const DetailPage = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  let { data: product } = useQuery("productChache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-0s8KZfous5XXd_hd";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      const response = await API.post("/transaction", body, config);

      const token = response.data.payment.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className=" mt-1 bgHome">
      <NavbarProduct />
      <Container xs={6} md={10} className="px-3">
        <Row>
          <Col xs={12} md={5}>
            <div className="fluid align-items-center justify-content-center  pt-3">
              <div className="d-flex align-items-center ">
                <img
                  src={product?.image}
                  style={{ height: "auto", width: "100%" }}
                  className="img-fluid"
                  alt="logo"
                />
              </div>
            </div>
          </Col>
          <Col xs={12} md={7}>
            <div className=" py-3 ">
              <Container className=" justify-content-center">
                <div>
                  <h2 className="text-danger">
                    <b>{product?.name}</b>
                  </h2>
                  <div className="text-white">
                    <p>- Stok : {product?.qty} </p>
                    <p>
                      - Barang bagus <br />
                      - Oke pokonya <br />
                      - siplah <br />
                      - ga akan menyesal <br />
                      - pasti puas <br />- garansi hingga 12 Bulan
                    </p>
                    <div className="descProduct">
                      <p>{product?.desc}</p>
                    </div>
                  </div>
                  <div className="text-danger text-end my-3">
                    <b> {convertRupiah.convert(product?.price)}</b>
                  </div>
                  <button
                    onClick={(e) => handleBuy.mutate(e)}
                    className="buttonLogin rounded"
                    type="submit"
                  >
                    <b>Buy</b>
                  </button>
                </div>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailPage;
