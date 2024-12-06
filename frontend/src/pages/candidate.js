import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Candidate() {
  const navigate = new useNavigate();
  const location = useLocation();
  const user = location.state;
  const [assessmentList,setAssessmentList] = useState([]);
  const [completedAssessmentList,setCompletedAssessmentList] = useState([]);
  const id=user;
  useEffect(()=>{
  const fetchAssessments= async()=>{
    const userId = id;
    try{
      const response = await fetch(`http://localhost:8080/user/get_user_assessments?userId=${userId}`,{
        method:"GET"
      })
      const data = await response.json();
      console.log(data);
      setAssessmentList(data);
    }catch(error){
      console.error(error);
    }
  }
  
    fetchAssessments();
  },[id]);

  const handleTakeAssessment=()=>{
    if (assessmentList.length === 0){
      alert("No assessments assigned");
    }else{
      const state = {assessmentList,userId: id}
      setAssessmentList([])
      navigate('/takeAssessment', { state });
    }
  }

  const handleViewResults=()=>{
    const state = {userId: id}
    navigate('/candidateResults', { state });
  }

  return (
    <div>
      <h1>Welcome </h1>
      <h3>Your assigned assessments are :</h3>
      {assessmentList.length === 0 ? (
        <p>No assessments assigned</p> 
      ) : (
        <ul>
          {assessmentList.map((assessment, index) => (
            <li key={index}>{assessment.assessmentName}</li> 
          ))}
        </ul>
      )}
      <button onClick={handleTakeAssessment}>Take an assessment</button><br/>
      
      <button onClick={handleViewResults}>view results</button>

    </div>
  )
}

export default Candidate;

