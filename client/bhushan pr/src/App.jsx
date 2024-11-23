// import { useState } from 'react'
// import './App.css'

// function App() {

// const [counter , setCounter ] = useState(0);

// const addValue=()=>{
//   setCounter(counter+1)
// }

// const removeValue=()=>{
//   setCounter(counter-1)
// }

//   return (
//     <>
    
//     <h1> Code With Bhushan </h1>
//     <br />
//     <h2>Count is :{counter}</h2>

//     <br />
//     <button
//     onClick={addValue}
//     > Add Value </button>
//     <button
    
//     onClick={removeValue}
//     > remove  Value </button>

//     </>
//   )
// }

// export default App



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
