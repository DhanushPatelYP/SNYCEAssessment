import React, { useState,useEffect } from 'react';


function AssignAssessment() {
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [candidates,setCandidates] = useState([]); 
    const [selectedAssessment,setSelectedAssessment] = useState([]);
    const [assessments,setAssessments] = useState([]);
    const [selectedTopic,setSelectedTopic] = useState("");
    const [topics,setTopics] = useState([]);

    const handleCandidateChange=(event)=>{
        setSelectedCandidate(event.target.value);
        
    }
    const handleTopicChange=(event)=>{
        setSelectedTopic(event.target.value);
    }
    const handleAddAssessment = (assessment) => {
        setSelectedAssessment((prevSelected) => {
            if (!prevSelected.some((q) => q.id === assessment.id)) {
            return [...prevSelected, { id: assessment.id, assessmentName: assessment.assessmentName }];
            }
            return prevSelected;
        });
    };
    const handleRemoveAssessment = (id) => {
        setSelectedAssessment((prevSelected) =>
            prevSelected.filter((q) => q.id !== id)
        );
    };
    const handleAssign=()=>{
        const userId = candidates.find(candidate => candidate.username.toString() === selectedCandidate).id;
        const assessmentId = selectedAssessment.map((item)=>item.id);
        fetch("http://localhost:8080/admin/assign_assessment",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                "userId":userId,
                "assessmentId":assessmentId
            })
        }).then((response)=>{
            if (response.ok){
                alert("Assessment Assigned Successfully")
                setSelectedCandidate("");
                setSelectedTopic("");
                setAssessments([]);
                setSelectedAssessment([]);
            }
        }).catch((error)=>{
            console.error(error);
        })
    };

    const handleGetAssessments=async()=>{
        try{
            const response = await fetch("http://localhost:8080/admin/get_topic_assessments",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    "topicName":selectedTopic
                })
            });
            const data = await response.json();
            setAssessments(data);

        }catch(error){
            console.log(error)
        }
    };

    const fetchCandidates = async ()=>{
        try{
            const response = await fetch("http://localhost:8080/admin/get_candidates",{
                method:"GET",
            });
            const data=await response.json();
            setCandidates(data);
        }catch(error){
            console.error("Error:",error);
        }
    }
    const fetchTopics = async () =>{
        try{
            const response = await fetch("http://localhost:8080/admin/get_topics",{
                method:"GET"
            })
            const data = await response.json();
            setTopics(data);

        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCandidates();
        fetchTopics();
    }, []);


    const styles = {
        container: {
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
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
        header: {
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
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
        selectedAssessment: {
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            color:"Black"
            },
      };

    return (
    <div>
        <button onClick={()=>{window.location.href="/adminViewResults"} } className="navigation-button">Admin Home</button>
        <button onClick={()=>{window.location.href = "/admin"}}className="navigation-button">create topic</button>
        <button onClick={()=>{window.location.href = "/createQuestions"}}className="navigation-button">Create Questions</button>
        <button onClick={()=>{window.location.href="/createAssessment"}} className="navigation-button">Create Assessment</button>             


        <h1>Assign Assessment</h1>
        <select id="dropdown" value={selectedCandidate} onChange={handleCandidateChange} required>
            <option value="" disabled>
            -- Select the Candidate --
            </option>
            {candidates.map(item => item.username).map((item, index) => (
            <option key={index} value={item}>
                {item}
            </option>
            ))}
        </select>
        <select id="dropdown" value={selectedTopic} onChange={handleTopicChange} required>
            <option value="" disabled>
            -- Select the Topic --
            </option>
            {topics.map(item => item.name).map((item, index) => (
            <option key={index} value={item}>
                {item}
            </option>
            ))}
        </select><br/>
        <button onClick={handleGetAssessments}>Get assessments</button>
        <div style={styles.container}>
            <h1 style={styles.header}>Assessment List</h1>
            <div style={styles.scrollableContainer} >
                { (assessments.map((assessment) => (
                    <div key={assessment.id} style={styles.card}>
                        <h2 style={styles.title}>Assessment: {assessment.assessmentName}</h2>
                        <button onClick={() => handleAddAssessment(assessment)} style={styles.addButton}>Add</button>
                        
                    </div>
                )))}
            </div>
            <div style={styles.selectedAssessment}>
                <h3>Selected Assessment</h3>
                {selectedAssessment.length > 0 ? (
                <ul>
                    {selectedAssessment.map((q) => (
              <li key={q.id}>
                <strong>Name:</strong> {q.assessmentName}
                <button onClick={() => handleRemoveAssessment(q.id)} style={styles.addButton}>Delete</button>
              </li>
            ))}
                </ul>
                ) : (
                <p>No questions selected.</p>
                )}
            </div>
        </div>
        <button onClick={handleAssign}>Assign</button>
    </div>
  )
}

export default AssignAssessment