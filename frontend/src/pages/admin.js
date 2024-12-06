
import React, { useEffect, useState } from "react";

function Admin() {
    const [details, setDetails] = useState([]);
    const [topic,setTopic] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/get_topics", {
        method: "GET",
      });
      const data = await response.json();
      console.log("Data:", data);
      setDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleCreate=(e)=>{
    e.preventDefault();
    const data={"name":topic};
    // console.log(data)
    fetch("http://localhost:8080/admin/create_topic",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    }).then(()=>{
        setTopic("");
        fetchData();
    }).catch((error)=>{
        console.error("Error:",error);
    })
  }

  const handleTopicChange=(e)=>{
      setTopic(e.target.value);
      console.log(e.target.value)
  }


  return (
    <div>
        <button onClick={()=>{window.location.href="/adminViewResults"} }  className="navigation-button">Admin Home</button>
        <button onClick={()=>{window.location.href = "/createQuestions"}} className="navigation-button">Create Questions</button>
        <button onClick={()=>{window.location.href="/createAssessment"}}  className="navigation-button">Create Assessment</button>             
        <button onClick={()=>{window.location.href="/assignAssessment"} } className="navigation-button">Assign Assessment</button>
      <h1>Existing Topics</h1>
      <ul>
        {details.length > 0 ? (
          details.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>

        <div>
        <h1>Create topic</h1>
        <input
            type="text"
            name="topic"
            placeholder="Topic"
            value={topic}
            onChange={handleTopicChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            /><br/>
        <button onClick={handleCreate}> Create</button><br/>
        
        </div>



    </div>

  );
}

export default Admin;


