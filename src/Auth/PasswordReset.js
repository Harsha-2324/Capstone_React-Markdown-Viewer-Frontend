import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Signup.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API } from "../globle";
// import Swal from 'sweetalert2';

const passwordValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Need a bigger password")
    .required("A New Password is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
});

function PasswordReset() {
  const params = useParams();
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
      },

      valaidationSchema: passwordValidationSchema,

      onSubmit: async (values) => {
        delete passwordValidationSchema.confirmPassword;
        values.id = params.id;
        values.token = params.token;
        setloading(true);
        let user = await axios.post(`${API}/users/passwordReset`, values);

        if (user.data.statusCode === 200) {
          setloading(false);
          //   Toast.fire({ icon: 'success', title: user.data.message })
          navigate("/");
        } else {
          setloading(false);
          //   Toast.fire({ icon: 'error', title: user.data.message })
        }
      },
    });
  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSubmit}>
            <h1 className="text-center">Password Reset Page</h1>
            {/* <div className="signup-profile-pic__container">
              
              <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input  type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
           </div> */}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                value={values.password}
                type="password"
                placeholder="Enter your Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                required

                // helperText={touched.password && errors.password ? errors.password : null }
              />
              <p style={{ color: "red" }}>
                {touched.password && errors.password ? errors.password : null}
              </p>
            </Form.Group>

            <Button variant="primary" type="submit">
              {loading ? "Changed" : "Reset"}
            </Button>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
}

export default PasswordReset;
