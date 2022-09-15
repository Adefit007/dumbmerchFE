import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Container, Form, Alert, Button } from "react-bootstrap";

import { API } from "../config/api";
import NavbarProduct from "../components/Navbar";

function UpdateProfile() {
  const title = "Edit Profile User";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();
  const { id } = useParams();

  const [mss, setMss] = useState(null);
  const [profile, setProfile] = useState({});
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    gender: "",
    address: "",
    image: "",
  });

  useQuery("profilesCache", async () => {
    const response = await API.get("/profile");
    setPreview(response.data.data.image);
    setForm({
      ...form,
      phone: response.data.data.phone,
      gender: response.data.data.gender,
      address: response.data.data.address,
    });
    setProfile(response.data.data);
  });

  console.log(profile);

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

      // set config
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("phone", form.phone);
      formData.set("gender", form.gender);
      formData.set("address", form.address);
      console.log(form);
      console.log(formData);

      const response = await API.patch(
        "/profile/" + profile.id,
        formData,
        config
      );
      console.log(response);
      console.log(response.data.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert variant="danger" style={{ width: "400px" }}>
          Update Profile Error
        </Alert>
      );
      setMss(alert);
    }
  });

  return (
    <div>
      <NavbarProduct />
      <Container className="mt-3 container-fluid">
        <h3 className="fw-bold mb-2">Edit Your Profile</h3>
        <div className="d-flex justify-content-center">{mss && mss}</div>

        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{ maxWidth: "150px", objectFit: "cover" }}
                  alt="preview"
                />
              </div>
            )}
            <Form.Control
              type="file"
              id="upload"
              name="image"
              hidden
              onChange={handleChange}
            />
            <label for="upload" className="mb-3 label-file-add-product">
              Upload file
            </label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Phone Number"
              id="phone"
              className="formInputDetail"
              name="phone"
              onChange={handleChange}
              value={form?.phone}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Your Gender"
              id="gender"
              className="formInputDetail"
              name="gender"
              onChange={handleChange}
              value={form?.gender}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Enter Your Address"
              rows={3}
              id="address"
              className="formInputDetail"
              name="address"
              onChange={handleChange}
              value={form?.address}
            />
          </Form.Group>
          <Button className="buttonLoginDeatil mt-4" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateProfile;
