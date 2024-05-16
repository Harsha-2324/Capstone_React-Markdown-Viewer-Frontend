import ReactMarkdown from "react-markdown";

 function Article({markdown}){
    return(
        <>
         
        <article  className="result">
        <ReactMarkdown  className="preview">{markdown}</ReactMarkdown>
      </article>
      </>
    )
 }
 export default Article;