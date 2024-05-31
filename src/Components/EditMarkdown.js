import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../globle";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export function EditMarkdown() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const { id } = useParams();
  const [editdata, setEditData] = useState(null);

  useEffect(() => {
    fetch(`${API}/players/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((dt) => dt.json())
      .then((details) => setEditData(details));
  }, [id]);

  return <div>{editdata ? <Edit editdata={editdata} /> : null}</div>;
}

function Edit({ editdata }) {
  const [markdown, setMarkdown] = useState(editdata.markdown);
  const [title, setTitle] = useState(editdata.title);
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
    } else if (data.title == "") {
      alert("Please enter the Title!");

      return false;
    } else if (data.markdown == "") {
      alert("Please enter a value in Markdown Editor!");

      return false;
    } else {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      };
      fetch(`${API}/players/${editdata._id}`, requestOptions)
        .then((response) => response.json())
        .then(() => navigate("/dashboard/get"));
      return true;
    }
  };

  return (
    <form className="markdown">
      <div className="division">
        <div className="fields">
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
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              required
            />
            {/* </div>

            <div> */}
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
              onChange={onDateChange}
              required
              readOnly
            />

            <Button
              type="submit"
              variant="outlined"
              onClick={handleSubmit}
              className="editbtn"
              style={{
                color: "white",
                backgroundColor: "navy",
                marginTop: "10px",
                marginBottom: "10px",
                fontFamily: "inherit",
              }}
            >
              Save Update
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
        </div>

        <textarea
          className="input"
          value={markdown}
          onChange={onTextChange}
          required
        >
          {" "}
        </textarea>
      </div>

      <article className="result">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </form>
  );
}
