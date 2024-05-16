import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "./Article";
import { API } from "../globle";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function CreateMarkdown() {
  const [markdown, setMarkdown] = useState("# Markdown Preview");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const onTextChange = (e) => setMarkdown(e.target.value);

  const onTitleChange = (e) => setTitle(e.target.value);

  const onDateChange = (e) => setDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { markdown, title, date };
    data.email = localStorage.getItem("email");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    };

    fetch(`${API}/players`, requestOptions)
      .then((response) => response.json())
      .then(() => navigate("/dashboard/get"));
  };

  return (
    <div className="markdown">
      <div className="division">
        <div className="fields">
          <form>
            <div>
              <label
                style={{
                  color: "black",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontFamily: "inherit",
                }}
              >
                Project Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={onTitleChange}
                required="true"
                pattern="[a-zA-z]+"
              />

              <label
                style={{
                  color: "black",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontFamily: "inherit",
                }}
              >
                Date:
              </label>
              <input
                type="date"
                value={date}
                onChange={onDateChange}
                required="true"
              />

              <Button
                type="submit"
                onClick={handleSubmit}
                variant="success"
                className="editbtn"
                style={{
                  color: "white",
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontFamily: "inherit",
                }}
              >
                Save
              </Button>
              <Link to="/dashboard/get">
                <Button
                  variant="outlined"
                  className="editbtn"
                  style={{
                    color: "white",
                    backgroundColor: "#F63E02",
                    margin: "10px",
                    marginLeft: "20px",
                    fontFamily: "inherit",
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>

        <textarea
          className="input"
          value={markdown}
          //   onChange={(e) => setMarkdown(e.target.value)}
          onChange={onTextChange}
          required
        >
          {" "}
        </textarea>
      </div>

      <Article markdown={markdown} />
    </div>
  );
}

export default CreateMarkdown;
