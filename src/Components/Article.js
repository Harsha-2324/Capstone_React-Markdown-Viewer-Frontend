import ReactMarkdown from "react-markdown";

 function Article({markdown}){
    return(
        <>
         
        <article  className="result" style={{ textAlign: "start" }}>
        <ReactMarkdown  className="preview">{markdown}</ReactMarkdown>
      </article>
      </>
    )
 }
 export default Article;