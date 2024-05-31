import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import PreviewIcon from '@mui/icons-material/Preview';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Button from '@mui/material/Button';
import { CheckAuth } from "../Auth/CheckAuth";
import { LogOut } from "../Auth/LogOut";
import { API } from "../globle";
import ClipLoader from "react-spinners/ClipLoader";

function Mardown() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

    const [data, setData] = useState([])

    useEffect(() => getDetails(), [])

    const getDetails = () => {
        fetch(`${API}/players/markdown/${localStorage.getItem("email")}`, {
            method: "GET",
            headers:{
                "x-auth-token" : localStorage.getItem("token")
            }
        })
        .then((data) => CheckAuth(data))
        .then((mbs) => setData(mbs))
        .catch((err) => LogOut())  
    }
     
    let projectDelete = async (id)=>{
   
        try{
            let ask= window.confirm("Do you want to delete this data.?"
            );
            if(ask){
                await axios.delete(`${API}/players/${id}`);
                getDetails();
            }
        }catch (error){
           console.log(error)
        }
        
       }
    console.log(data)
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
        <div className="create">
          <Link to="/dashboard/create">
            <div  style={{ marginLeft: "90%" }}>
              <Button
                variant="outlined"
                style={{
                  color: "white",
                  backgroundColor: "navy",
                  margin: "20px",
                  fontFamily: "inherit",
                }}
              >
                Create Project
              </Button>
            </div>
          </Link>

          <Table striped bordered hover>
            <thead>
              <th
                style={{
                  color: "white",
                  backgroundColor: "navy",
                  fontFamily: "inherit",
                }}
              >
                Project Title
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "navy",
                  fontFamily: "inherit",
                }}
              >
                Date & Time of Creation
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "navy",
                  fontFamily: "inherit",
                }}
              >
                Actions
              </th>
            </thead>
            <tbody>
              {data.map((project) => {
                return (
                  <tr>
                    <td>{project.title}</td>
                    <td>{project.date}</td>
                    <td className="threebtns">
                      <Link to={`/dashboard/view/${project._id}`}>
                        <PreviewIcon
                          style={{
                            color: "green",
                          }}
                        />
                      </Link>
                      <Link to={`/dashboard/edit/${project._id}`}>
                        <EditNoteIcon
                          style={{
                            color: "navy",
                          }}
                        />
                      </Link>
                      <DeleteIcon
                        onClick={() => projectDelete(project._id)}
                        style={{
                          color: "red",
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default Mardown;
