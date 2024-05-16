import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../globle";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(8, "Need a bigger Email")
    .required("Email Required to Login!"),

  password: yup
    .string()
    .min(4, "Need a bigger Password")
    .required("Password Required to Login!"),
});

function Login() {
  const [formState, setFormState] = useState("success");

  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      validationSchema: formValidationSchema,

      onSubmit: async (values) => {
        const data = await fetch(`${API}/users/login`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json" },
        });

        if (data.status === 401) {
          console.log("ERROR");
          setFormState("error");
        } else {
          const result = await data.json();
          console.log("Success", result);

          window.localStorage.setItem("token", result.token);
          window.localStorage.setItem("email", result.email);
          navigate("/dashboard/home");
        }
      },
    });

  return (
    <div className="logback1">
      <Container>
        <Row>
          <div>
            <Col
              md={7}
              className="d-flex align-items-center justify-content-center flex-direction-column"
            >
              {/* <Col md={8} className="login__bg"></Col> */}
              <Form
                style={{
                  width: "80%",
                  maxWidth: 500,
                  border: "2px groove navy",
                  borderRadius: "15px",
                  // boxShadow: "20px red",
                  paddingTop: "45px",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  paddingBottom: "45px",
                  backgroundColor: "whitesmoke",
                }}
                onSubmit={handleSubmit}
              >
                <img
                  className="mark1"
                  src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*DT4F2hlgoOToE_b6feUSMw.gif"
                />
                <h2
                  style={{
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    paddingBottom: "10%",
                    paddingTop: "10%",
                    color: "#3b5998",
                  }}
                >
                  User Login!
                </h2>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Control
                    value={values.email}
                    type="email"
                    placeholder="Enter your Email Id"
                    required
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                  <p style={{ color: "red" }}>
                    {" "}
                    {touched.email && errors.email ? errors.email : null}{" "}
                  </p>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    value={values.password}
                    type="password"
                    placeholder="Enter your Password"
                    name="password"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                  <p style={{ color: "red" }}>
                    {" "}
                    {touched.password && errors.password
                      ? errors.password
                      : null}
                  </p>
                </Form.Group>
                <p style={{ color: "red" }}>
                  {" "}
                  {formState === "error" ? "Invalid Email or Password" : null}
                </p>
                <div className="password">
                  <Button
                    variant={formState === "error" ? "danger" : "success"}
                    type="submit"
                    className="logback1"
                    style={{
                      width: "700%",
                      justifyItems: "center",
                      padding: "8px",
                    }}
                  >
                    {formState === "error" ? "Retry" : "Login"}
                  </Button>
                  <Link
                    to="/fortgotpassword"
                    className="link"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      paddingTop: "8%",
                      color: "navy",
                    }}
                  >
                    Forgot Password
                  </Link>
                </div>
                <div className="py-2">
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      paddingTop: "5%",
                    }}
                  >
                    Don't have an account ?{" "}
                    <Link to="/register" style={{ color: "navy" }}>
                      {" "}
                      Signup{" "}
                    </Link>
                  </p>
                </div>
                <div>
                  <p>For Demo:</p>
                  <p>Email: student1@gmail.com</p>
                  <p>Password: Student1@</p>
                </div>
              </Form>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
