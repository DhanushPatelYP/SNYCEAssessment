import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Admin from './pages/admin';
import Candidate from './pages/candidate';
import CreateQuestions from './pages/createQuestions';
import CreateAssessment from './pages/createAssessment';
import AssignAssessment from './pages/assignAssessment';
import TakeAssessment from './pages/takeAssessment';
import CandidateResults from './pages/candidateResults';
import AdminViewResults from './pages/adminViewResults';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>} />
      <Route path='/createQuestions' element={<CreateQuestions/>} />
      <Route path='/createAssessment' element={<CreateAssessment/>} />
      <Route path='/assignAssessment' element={<AssignAssessment/>} />
      <Route path='/adminViewResults' element={<AdminViewResults/>}/>
      <Route path='/candidate' element={<Candidate/>} />
      <Route path='/takeAssessment' element={<TakeAssessment/>} />
      <Route path='/candidateResults' element={<CandidateResults/>}/>


    </Routes>
    </BrowserRouter>
  );
}

export default App;
