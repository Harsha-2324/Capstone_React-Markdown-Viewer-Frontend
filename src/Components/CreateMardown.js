import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "./Article";
import { API } from "../globle";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";


function CreateMarkdown() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [markdown, setMarkdown] = useState("# Markdown Preview");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date());
  const navigate = useNavigate();

  const onTextChange = (e) => setMarkdown(e.target.value);

  const onTitleChange = (e) => setTitle(e.target.value);

  const onDateChange = (e) => setDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { markdown, title, date };
    if (data.title == "" && data.markdown == "") {
      alert("Please Enter the Title and Markdown values!");
      // data.title.focus();

      return false;
    } 
    else if (data.title == "") {
        alert("Please enter the Title!");

        return false;
      } else if (data.markdown == "") {
        alert("Please enter a value in Markdown Editor!");

        return false;
      } else {
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
        return true;
      }
    
  };

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
        <div className="markdown">
          <div className="division">
            <div className="fields">
              <form name="form" id="form">
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
                  type="text"
                  value={Date()}
                  id="date"
                  onChange={onDateChange}
                  required="true"
                  readOnly
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
      )}
    </div>
  );
}

export default CreateMarkdown;
