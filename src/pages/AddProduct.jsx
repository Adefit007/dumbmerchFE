import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import { API } from "../config/api";

export default function AddProduct() {
  const title = "Product admin";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: "",
    desc: "",
    price: "",
    qty: "",
  });

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("categoryId", categoryId);
      console.log(form);
      console.log(formData);

      const response = await API.post("/product", formData, config);
      console.log(response);
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bgHome">
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
          <label for="upload" className=" mb-3 label-file-add-product">
            Upload file
          </label>
          <Form.Group className="mb-3 " controlId="formBasic">
            <Form.Control
              name="name"
              onChange={handleChange}
              className="formInputDetail"
              type="text"
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
              placeholder="Product description"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              className="formInputDetail"
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="Price"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="">
            <Form.Control
              className="formInputDetail"
              name="qty"
              onChange={handleChange}
              type="number"
              placeholder="Stock"
            />
          </Form.Group>
          <div className="formInputDetail card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>
            {categories.map((item, index) => (
              <label className="checkbox-inline me-4" key={index}>
                <input
                  type="checkbox"
                  value={item.id}
                  onClick={handleChangeCategoryId}
                />
                {item.name}
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
