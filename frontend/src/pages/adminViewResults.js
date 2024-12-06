import React, { useState,useEffect } from 'react';
import "./candidateResults.css";


function AdminViewResults() {
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [candidates,setCandidates] = useState([]); 
    const [completedAssessments,setCompletedAssessments] = useState({}); 
    const [pendingAssessments,setPendingAssessments] = useState([]);

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
    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleCandidateChange=(event)=>{
        setSelectedCandidate(event.target.value);
    }

    const fetchCompletedAssessments = async() =>{
        try{
            const userId = candidates.find((user)=>user.username === selectedCandidate).id;
            const response = await fetch(`http://localhost:8080/user/get_results?userId=${userId}`,{
                method:"POST"
            })
            const dataResponse = await response.json();
            setCompletedAssessments(dataResponse);
        }catch(error){
            console.error(error);
        }
      }
    
    const fetchPendingAssessments = async() =>{
        try{
            const userId = candidates.find((user)=>user.username === selectedCandidate).id;
            const response = await fetch(`http://localhost:8080/user/get_pending_assessments?userId=${userId}`,{
                method:"POST"
            })
            const dataResponse = await response.json();
            setPendingAssessments(dataResponse);
        }catch(error){
            console.error(error);
        }
    }

    const handleGetDetails=()=>{
        fetchCompletedAssessments();
        fetchPendingAssessments();
    }

    return (
    <div>
        <button onClick={()=>{window.location.href = "/admin"}} className="navigation-button">create topic</button>
        <button onClick={()=>{window.location.href = "/createQuestions"}} className="navigation-button">Create Questions</button>
        <button onClick={()=>{window.location.href="/createAssessment"}}  className="navigation-button">Create Assessment</button>             
        <button onClick={()=>{window.location.href="/assignAssessment"} } className="navigation-button">Assign Assessment</button>


        <h1>Dashboard</h1><br/>
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
        <button onClick={handleGetDetails}>Get Details</button>


        <h3>Completed Assessments :</h3>
        {(Object.keys(completedAssessments).length === 0)?(
            <h4>No Completed Assessments</h4>
        ):(
        <div className="assessment-container">
            {Object.entries(completedAssessments).map(([id, details]) => (
                <div key={id} className="assessment-card">
                    <h3>Topic: {details.topicName}</h3>
                    <p>Assessment: {details.assessmentName}</p>
                    <p>Status: {details.status}</p>
                    <p>
                        Marks: {details.obtainedMarks} / {details.totalMarks}
                    </p>
                </div>
            ))}
        </div>
        )}

        <h3> Assigned/Pending Assessments :</h3>
        {(Object.keys(pendingAssessments).length === 0)?(
            <h4>No Assessments Assigned/Pending</h4>
        ):(
        <div className="assessment-container">
            {Object.entries(pendingAssessments).map(([id, details]) => (
                <div key={id} className="assessment-card">
                    <h3>Topic: {details.topicName}</h3>
                    <p>Assessment: {details.assessmentName}</p>
                    <p>Status: {details.status}</p>
                </div>
            ))}
        </div>
        )}

    </div>
    )
}

export default AdminViewResults;