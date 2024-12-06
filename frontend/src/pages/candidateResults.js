import React, { useEffect, useState } from 'react';
import "./candidateResults.css";
import { useLocation } from 'react-router-dom';

function CandidateResults() {
    const location = useLocation();
    const {userId} = location.state;
    const [data,setData] = useState({});

      const fetchData = async() =>{
        try{
            const response = await fetch(`http://localhost:8080/user/get_results?userId=${userId}`,{
                method:"POST"
            })
            const dataResponse = await response.json();
            setData(dataResponse);
        }catch(error){
            console.error(error);
        }
      }

      useEffect(()=>{
        fetchData();
      },[]);
      console.log(data)
      return (
        <div>
            <h1>Results</h1>

            <div className="assessment-container">
            {Object.entries(data).map(([id, details]) => (
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

        </div>
      );
}

export default CandidateResults;