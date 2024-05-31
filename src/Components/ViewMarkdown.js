 import axios from "axios";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import React from "react";
import ReactMarkdown from "react-markdown";
import { API } from "../globle";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";

function ViewMarkdown(){
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

    const {id} = useParams()

    const [projectData,setProjectData]= useState("")

    

   useEffect(() => {
    const loadUser = async () => {
        try {
            let project = await axios.get(`${API}/players/${id}`, {
                method: "GET",
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                }
            });
            console.log(project.data);
            setProjectData(project.data);
        } catch (error) {
            console.log(error);
        }
    };

    loadUser(); // Call the function inside useEffect

}, [id]); // Add id to the dependency array if it is used inside the useEffect callback

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
           <>
             <div className="back to dashboard">
               <Link to="/dashboard/get">
                 <Button
                   variant="outlined"
                   style={{
                     color: "white",
                     backgroundColor: "navy",
                     marginTop: "2%",
                    //  marginRight: "70%",
                     fontFamily: "inherit",
                   }}
                 >
                   Back to Dashboard
                 </Button>
               </Link>
             </div>
             <div className="viewcontainer">
               <div className="viewhead">
                 <h5
                   style={{
                     margin: "50px",
                     fontFamily: "inherit",
                   }}
                 >
                   Project Title: {projectData.title}
                 </h5>
                 <h5
                   style={{
                     margin: "50px",
                     fontFamily: "inherit",
                   }}
                 >
                   Date & Time of Creation: {projectData.date}
                 </h5>
               </div>

               <article className="viewresult" style={{ textAlign: "start" }}>
                 <ReactMarkdown className="preview">
                   {projectData.markdown}
                 </ReactMarkdown>
               </article>
             </div>
           </>
         )}
       </div>
     );
}
export default ViewMarkdown;
