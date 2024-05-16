import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../globle";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(8, "Need a bigger Email")
    .required("A cool Email is in need")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  username: yup.string().required("Username is in need"),

  password: yup
    .string()
    .min(4, "Need a bigger Password")
    .required("A cool Password is in need"),
});

function Signup() {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },

      validationSchema: formValidationSchema,

      onSubmit: (values) => {
        register(values);
      },
    });
  const navigate = useNavigate();

  const register = (newUser) => {
    ////-----> Follow 3 step's <-----////

    //// Step's
    //// 1. Method => POST
    //// 2. body => data & JSON(string)
    //// 3. header => JSON

    fetch(`${API}/users/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate("/"));
  };

  return (
    <div className="logback2">
      <Container>
        <Row>
          <div>
            <Col
              md={7}
              className="d-flex align-items-center justify-content-center flex-direction-column"
            >
              <Form
                style={{
                  width: "80%",
                  maxWidth: 500,
                  border: "2px groove navy",
                  borderRadius: "15px",
                  // boxShadow: "20px red",
                  paddingTop: "52px",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  paddingBottom: "52px",
                  backgroundColor: "whitesmoke",
                }}
                onSubmit={handleSubmit}
              >
                <img
                  className="mark2"
                  src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*kCShHqnFJqZYvEy343c-VA.gif"
                />
                {/* <h1 className="text-center mb-4">Create account</h1> */}
                <h2
                  style={{
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    paddingBottom: "10%",
                    paddingTop: "10%",
                    color: "#3b5998",
                  }}
                >
                  Sign Up!
                </h2>
                <Form.Group className="mb-4" controlId="formBasicName">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    value={values.username}
                    type="text"
                    placeholder="Enter your Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && errors.username}
                  />
                  <p style={{ color: "red" }}>
                    {touched.username && errors.username
                      ? errors.username
                      : null}{" "}
                  </p>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={values.email}
                    type="email"
                    placeholder="Enter your Email Id"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                  <p style={{ color: "red" }}>
                    {touched.email && errors.email ? errors.email : null}
                  </p>

                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={values.password}
                    type="password"
                    placeholder="Enter your Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                  <p style={{ color: "red" }}>
                    {touched.password && errors.password
                      ? errors.password
                      : null}
                  </p>
                </Form.Group>

                <Button
                  style={{
                    width: "100%",
                    justifyItems: "center",
                    padding: "8px",
                  }}
                  type="submit"
                  className="logback2"
                >
                  Create account
                </Button>
                <div className="py-4">
                  <p className="text-center">
                    Already have an account ? <Link to="/"> Login </Link>
                  </p>
                </div>
              </Form>
            </Col>
            {/* <Col md={5} className="signup__bg"></Col> */}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
