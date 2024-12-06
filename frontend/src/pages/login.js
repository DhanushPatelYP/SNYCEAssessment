import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";


const Login = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("login");
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === "login") {
        const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:8080/user/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
                })
              const data = await response.json();
              console.log("Data:", data.role);
              if (data.role==="ADMIN"){
                window.location.href = "/adminViewResults"; 
              }else{                
                const userId = data.id;
                // console.log(userId)
                navigate('/candidate', { state: userId });
                // window.location.href = "/candidate";
              }
            } catch (error) {
              alert("Enter Valid Details or SignUp")
              console.error("Error:", error);
            }
          };
        fetchData();
      
    } else {
        formData.role="CANDIDATE";
        fetch("http://localhost:8080/user/addUser",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      }).then((response) => {
        if (response.ok) { 
          console.log("Request successful, redirecting...");
          alert("user signed up successfully")
          window.location.href = "/"; 
        } else {
          console.error("Request failed with status:", response.status);
        }
      }).catch((error) => {
        console.error("An error occurred:", error);
      });
    }
    setFormData({ username: "", password: "" });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>{page === "login" ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", marginBottom: "10px" }}>
          {page === "login" ? "Login" : "Signup"}
        </button>
      </form>
      <button
        onClick={() => setPage(page === "login" ? "signup" : "login")}
        style={{ padding: "5px 10px", backgroundColor: "transparent", color: "black", border: "none", cursor: "pointer" }}
      >
        Switch to {page === "login" ? "Signup" : "Login"}
      </button>
    </div>
  );
};

export default Login;


