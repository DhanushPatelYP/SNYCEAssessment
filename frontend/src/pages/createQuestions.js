import React, { useState,useEffect } from 'react';
import "./createQuestions.css";

function CreateQuestions() {
    const [selectedItem, setSelectedItem] = useState(""); 
    const [topics,setTopics]=useState([]);
    const [formData, setFormData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption:"",
        marks:""
      });

    const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:8080/admin/get_topics", {
        method: "GET",
        });
        const data = await response.json();
        setTopics(data);
    } catch (error) {
        console.error("Error:", error);
    }
    };
    useEffect(() => {
        fetchData();
      }, []);
    const resetformdata=()=>{
      console.log("resetting");
      setFormData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption:"",
        marks:""
      });
      setSelectedItem("");
    }
    
    const handleTopicChange = (event) => {
        setSelectedItem(event.target.value);
      };  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataArray = [formData.option1, formData.option2, formData.option3, formData.option4];


        fetch("http://localhost:8080/admin/create_question",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            "description":formData.question,
            "options":dataArray,
            "correctOption":formData.correctOption,
            "marks":formData.marks,
            "topic":selectedItem
          })
        }).then((response)=>{
          if(response.ok){
            alert("Question created successfully");
          }else{
            console.log("error in creating question");
          }
        }).catch((error)=>{
          console.log(error);
        })
        resetformdata();
    };
    

    return (
        <div >
            <button onClick={()=>{window.location.href="/adminViewResults"} }  className="navigation-button">Admin Home</button>             
            <button onClick={()=>{window.location.href = "/admin"}} className="navigation-button">create topic</button>
            <button onClick={()=>{window.location.href="/createAssessment"}}  className="navigation-button">Create Assessment</button>             
            <button onClick={()=>{window.location.href="/assignAssessment"} } className="navigation-button">Assign Assessment</button>

        <h1>Create Questions</h1>
                <div >
                <form onSubmit={handleSubmit} className="styled-form">
                    <select id="dropdown" className="styled-select" value={selectedItem} onChange={handleTopicChange} required>
                        <option value="" disabled>
                        -- Select the Topic --
                        </option>
                        {topics.map(item => item.name).map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                        ))}
                    </select><br/>
                    <input
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={formData.question}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    <input
                    type="text"
                    name="option1"
                    placeholder="Option1"
                    value={formData.option1}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    <input
                    type="text"
                    name="option2"
                    placeholder="Option2"
                    value={formData.option2}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    <input
                    type="text"
                    name="option3"
                    placeholder="Option3"
                    value={formData.option3}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    <input
                    type="text"
                    name="option4"
                    placeholder="Option4"
                    value={formData.option4}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    <input
                    type="text"
                    name="correctOption"
                    placeholder="Correct Option"
                    value={formData.correctOption}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    <input
                    type="number"
                    name="marks"
                    min="1"
                    max="4"
                    placeholder="Marks"
                    value={formData.marks}
                    onChange={handleChange}
                    className="styled-input"
                    required
                    /><br/>
                    
                    <button type="submit" className="styled-button">Submit</button>
                </form>

                {selectedItem && (
                    <p>
                    You selected: <strong>{selectedItem}</strong>
                    </p>
                )}

                </div>   
    </div>
  )
}

export default CreateQuestions;