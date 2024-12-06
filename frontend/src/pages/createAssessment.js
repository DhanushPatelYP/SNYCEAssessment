import React, { useState,useEffect } from 'react';
import "./createAssessment.css";

function CreateAssessment() {
    const [selectedItem, setSelectedItem] = useState(""); 
    const [topics,setTopics]=useState([]);
    const [topicQuestions,setTopicQuestions]=useState([]);
    const [assessmentName,setAssessmentName]=useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([]);


    const handleTopicChange = (event) => {
        setSelectedItem(event.target.value);
        }; 
    const handleNameChange = (event) => {
        setAssessmentName(event.target.value);
        };
    const handleAddQuestion = (question) => {
        setSelectedQuestions((prevSelected) => {
            if (!prevSelected.some((q) => q.id === question.id)) {
            return [...prevSelected, { id: question.id, description: question.description }];
            }
            return prevSelected;
        });
        };
    const handleRemoveQuestion = (id) => {
    setSelectedQuestions((prevSelected) =>
        prevSelected.filter((q) => q.id !== id)
    );
    };

    
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
    
    const fetchTopicQuestions=async()=>{
        try{
            const response = await fetch("http://localhost:8080/admin/get_topic_questions",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    "name":selectedItem
                })
            });
            const data=await response.json();
            setTopicQuestions(data);
        }catch(error){
            console.log(error);
        }
    };

    const handleCreateAssessment=()=>{
        const questionIdList=selectedQuestions.map((item) => item.id);
        fetch("http://localhost:8080/admin/create_assessment",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "assessmentName":assessmentName,
                "topic":selectedItem,
                "questionIdList":questionIdList
            })
        }).then((response)=>{
            if(response.ok){
                alert("Assessment Created Successfully");
                setSelectedItem("");
                setTopics([]);
                setTopicQuestions([]);
                setAssessmentName("");
                setSelectedQuestions([]);
            }
        }).catch((error)=>{
            console.error(error);
        })
    }
    

    const styles = {
        container: {
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
        },
        header: {
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
        },
        card: {
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        },
        title: {
          color: "#007BFF",
          marginBottom: "10px",
        },
        detail: {
          color: "#555",
          marginBottom: "10px",
        },
        options: {
          listStyleType: "none",
          padding: 0,
        },
        option: {
          backgroundColor: "#f1f1f1",
          color:"Black",
          padding: "8px",
          margin: "5px 0",
          borderRadius: "4px",
        },
        scrollableContainer: {
            maxHeight: "400px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#fff",
        },
        addButton: {
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        selectedQuestions: {
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#f1f1f1",
        borderRadius: "8px",
        color:"Black"
        },
      };
    
    
    return (
    <div  >
        <div className="navigation-buttons">
        <button onClick={()=>{window.location.href="/adminViewResults"} } className="navigation-button">Admin Home</button>
        <button onClick={()=>{window.location.href = "/admin"}} className="navigation-button">create topic</button>
        <button onClick={()=>{window.location.href = "/createQuestions"}} className="navigation-button">Create Questions</button>
        <button onClick={()=>{window.location.href="/assignAssessment"} } className="navigation-button">Assign Assessment</button>
        </div>
        <div className="create-assessment-container">
        <h1>Create Assessment</h1>
        <input
            type="text"
            name="assessmentName"
            placeholder="Assessment Name"
            value={assessmentName}
            onChange={handleNameChange}
            className="styled-input"
            required
            /><br/>
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
        <button onClick={fetchTopicQuestions} className="action-button">Get Existing Question</button>
        

        <div style={styles.container}>
            <h1 style={styles.header}>Questions List</h1>
            <div style={styles.scrollableContainer} >
                { (topicQuestions.map((question) => (
                    <div key={question.id} style={styles.card}>
                        <h2 style={styles.title}>Question: {question.description}</h2>
                        <p style={styles.detail}>
                            <strong>Topic:</strong> {question.topic.name} <br />
                            <strong>Marks:</strong> {question.marks} <br />
                            <strong>Correct Option:</strong> {question.correctOption}
                        </p>
                        <ul style={styles.options}>
                            {question.options.map((option, index) => (
                            <li key={index} style={styles.option}>
                                {option}
                            </li>
                            ))}
                            <button onClick={() => handleAddQuestion(question)} className="add-button">Add</button>
                            
                        </ul>
                    </div>
                )))}
            </div>
            <div style={styles.selectedQuestions}>
                <h3>Selected Question IDs</h3>
                {selectedQuestions.length > 0 ? (
                <ul>
                    {selectedQuestions.map((q) => (
              <li key={q.id}>
                <strong>Description:</strong> {q.description}
                <button onClick={() => handleRemoveQuestion(q.id)} style={styles.addButton}>Delete</button>
              </li>
            ))}
                </ul>
                ) : (
                <p>No questions selected.</p>
                )}
            </div>
        </div>
        <button onClick={handleCreateAssessment} className="action-button">Create Assessment</button><br/>
        </div>

        

    </div>
  )


  
}

export default CreateAssessment;