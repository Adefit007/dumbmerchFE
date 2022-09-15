import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import CheckBox from "../components/CheckBox";
import NavbarAdmin from "../components/NavbarAdmin";
import { API } from "../config/api";

export default function UpdateProduct() {
  const title = "Product admin";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  });

  useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      name: response.data.data.name,
      desc: response.data.data.desc,
      price: response.data.data.price,
      qty: response.data.data.qty,
    });
    setProduct(response.data.data);
  });

  useQuery("categoriesCache", async () => {
    const response = await API.get("/categories");
    setCategories(response.data.data);
  });

  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

  return (
    <div>
      <NavbarAdmin />
      <Container className="container-fluid">
        <h3 className="text-white mt-4">Add Product</h3>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            </div>
          )}
          <input
            type="file"
            id="upload"
            name="image"
            hidden
            onChange={handleChange}
          />
          <label for="upload" className="mb-3 label-file-add-product">
            Upload file
          </label>
          <Form.Group className="mb-3 " controlId="formBasic">
            <Form.Control
              name="name"
              onChange={handleChange}
              className="formInputDetail"
              type="text"
              value={form?.name}
              placeholder="Name Product"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              name="desc"
              onChange={handleChange}
              className="formInputDetail"
              as="textarea"
              type="text"
              value={form?.desc}
              placeholder="Product description"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              className="formInputDetail"
              type="number"
              name="price"
              value={form?.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="">
            <Form.Control
              className="formInputDetail"
              name="qty"
              value={form?.qty}
              onChange={handleChange}
              type="number"
              placeholder="Stock"
            />
          </Form.Group>
          <div className="formInputDetail card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>
            {product &&
              categories.map((item, index) => (
                <label className="checkbox-inline me-4" key={index}>
                  <CheckBox
                    categoryId={categoryId}
                    value={item?.id}
                    handleChangeCategoryId={handleChangeCategoryId}
                  />
                  <span className="ms-2">{item?.name}</span>
                </label>
              ))}
          </div>
          <Button className="buttonLoginDeatil mt-4" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}
