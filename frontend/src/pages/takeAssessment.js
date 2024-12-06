import React, { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";

function TakeAssessment() {
    const location = useLocation();
    const navigate = useNavigate()
    const {assessmentList,userId} = location.state;
    const [selectedAssessment, setSelectedAssessment] = useState("");
    const [assessment, setAssessment] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [totalMarks, setTotalMarks] = useState(-1);
    const [showAssessment, setShowAssessment] = useState(false);
    const [marksSum,setMarksSum] = useState(0);

    const handleAssessmentChange=(e)=>{
        setSelectedAssessment(e.target.value);
        console.log(e.target.value)
    }
    const handleTakeTest = () => {
        setShowAssessment(true);
    };

    useEffect(() => {
        const assessmentId = selectedAssessment;
        if (showAssessment) {
            const fetchAssessment = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/user/get_assessment?assessmentId=${assessmentId}`);
                    const data = await response.json();
                    setAssessment(data);
                } catch (error) {
                    console.error('Error fetching assessment data:', error);
                }
            };
            fetchAssessment();
        }
    }, [showAssessment,selectedAssessment]);

    const handleAnswerChange = (questionId, selectedOption) => {
        setSelectedAnswers((prevAnswers) => ({...prevAnswers,[questionId]: selectedOption,}));
    };

    useEffect(() => {
        if ((totalMarks>-1) && marksSum) {
          fetch("http://localhost:8080/user/test_completed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                "userId":userId,
                "topicId":assessment.topicId,
                "assessmentId":selectedAssessment,
                "totalMarks":marksSum,
                "obtainedMarks":totalMarks
            }),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Test completed:", response);
                setSelectedAssessment("");
                setAssessment(null);
                setSelectedAnswers({});
                setTotalMarks(-1);
                setShowAssessment(false);
                setMarksSum(0);
              } else {
                console.error("Error completing test:", response.statusText);
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        }
      }, [marksSum, totalMarks,selectedAssessment,userId]);

    const handleFinish = () => {
        if (assessment) {
        const unansweredQuestions = assessment.questions.some((question) => !selectedAnswers[question.id]);
        if (unansweredQuestions) {
            alert("Please answer all questions");
            return;
        }
        let total = 0;
        assessment.questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.correctOption) {
                total += question.marks;
            }
        });
        const Sum = assessment.questions.reduce((sum, question) => sum + question.marks, 0);
        setTotalMarks(total);
        setMarksSum(Sum);

        alert(`Total Marks: ${total}/${Sum}`);
        

        // navigate("/candidate",{state:userId});

        
    }};

  return (
    <div>
        {/* <button onClick={()=>{window.location.href="./candidate"}}>Home</button> */}
      <h1>Take Assessment</h1>
      
        {assessmentList.length === 0 ? (
        <p>No assessments assigned</p> 
      ) : (
        <select id="dropdown" value={selectedAssessment} onChange={handleAssessmentChange} required>
            <option value="" disabled>
            -- Select the Assessment --
            </option>
            {assessmentList.map((item, index) => (
                    <option key={index} value={item.id}>
                        {item.assessmentName}
                    </option>
            ))}
        </select>
      )}<br/>
      <button onClick={handleTakeTest}>Take Test</button>
      {showAssessment && assessment && (
            <div>
                <h1>{assessment.assessmentName}</h1>
                {assessment.questions.map((question) => (
                    <div key={question.id}>
                        <h3>{question.description}</h3>
                        {question.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                        checked={selectedAnswers[question.id] === option}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={handleFinish}>Finish</button>
            </div>
        )}

    </div>
  );
}

export default TakeAssessment;
