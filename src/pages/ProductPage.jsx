import { Container, Card, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

const ProductPage = () => {
  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  return (
    <div>
      <Container className="bgProduct py-3">
        <div>
          <h4 className="text-danger">Product</h4>
        </div>
        <Row>
          {products?.map((item, index) => (
            <Col md={4} lg={3} className="mt-2" key={index}>
              <Link
                as={Link}
                to={`/product/` + item.id}
                className="text-decoration-none text-danger"
              >
                <Card
                  style={{ width: "14rem" }}
                  className="product-card bg-dark"
                >
                  <Card.Img
                    className="img-fluid"
                    variant="top"
                    src={item.image}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="text-light m-0">
                      {convertRupiah.convert(item.price)}
                    </Card.Text>
                    <Card.Text className="text-light m-0">
                      Stock {item.qty}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;
