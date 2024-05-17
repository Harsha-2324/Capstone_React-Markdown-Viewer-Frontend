import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="load3">
      {loading ? (
        <ClipLoader
          color={"#090f7b"}
          loading={loading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="inload3"
        />
      ) : (
        <div className="homecontainer">
          <Row>
            {/* <Col
          md={6}
          className="d-flex flex-direction-column align-items-center justify-content-center"
        > */}
            <div>
              <h1>What is React-Markdown?</h1>
              <h4>
                The React markdown editor, also known as uiw/react-md-editor, is
                a straightforward yet powerful Markdown editing library
                developed for React by the UIW (React UI components) team. It
                offers a seamless text editing experience for creating and
                modifying Markdown content within a React application. With the
                uiw/react-md-editor library, users can easily compose and edit
                Markdown content through a user-friendly and customizable editor
                interface. It comes equipped with a variety of features
                including syntax highlighting, toolbar options for text
                formatting, real-time preview, and the ability to render
                Markdown as HTML.
              </h4>
              <LinkContainer to="/dashboard/get">
                <Button className="btn1">Get Started</Button>
              </LinkContainer>

              <img
                src="https://cdn.dribbble.com/users/1459765/screenshots/3563580/media/b6dae753f8d84d081a0d886a62a405b6.gif"
                className="scroll"
              />
            </div>
            {/* </Col> */}
            {/* <Col md={6} className="home__bg"></Col> */}
          </Row>
          <img
            src="https://miro.medium.com/v2/format:webp/1*dGmfst4GHLJtBf-_TIlTOg.png"
            className="linediagram"
            alt="Markdown Previewer" // Add a meaningful description here
          />
        </div>
      )}
    </div>
  );
}

export default Home;
