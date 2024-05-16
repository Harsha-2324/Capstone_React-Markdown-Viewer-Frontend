import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {API} from "../globle"  


const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(8, "Need a bigger Email")
    .required("**A Valid E-mail is required**")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),

});

function ForgotPassword() {
  const [formState, setFormState] = useState("success");

  let [loading, setloading] = useState(false);
  let [resend, setResend] = useState(true);

  const navigate = useNavigate();

   const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      
      email: "",
      
    },

    validationSchema: formValidationSchema,

    onSubmit: async(values) => {
     
        setloading(true);
        const data = await fetch(`${API}/users/forgot`,{
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type" : "application/json" },
           })
           .then((data)=>data.json())
           
          if(data.statusCode === 200){
            setResend(false);
            setloading(false);
            navigate("/")
              
           }else{
           
              setResend(false);
              console.log("ERROR")
             setFormState("error");
            
           }
      
       
      
    },
  });
  

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{width: "80%", maxWidth:500 }} onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
               <p style={{color:"red"}}>{touched.email && errors.email ? errors.email : null }</p>
             
            </Form.Group>

           
             <div className="password">
           <Button variant={ formState === "error" ? "danger" : "success" } type="submit">
      
            { loading ? resend ? "Resend" : "Invalid Email" : "Send Email"}
           
      </Button>
        
         <Link to="/" className="link">Back</Link>
      </div>   
      
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
