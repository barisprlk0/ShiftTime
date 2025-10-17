import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmployeeAvailability from "./pages/EmployeeAvailability";
import ManageShifts from "./pages/ManageShifts";
import AuthPage from "./pages/AuthPage";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../src/firebaseConfig';


function HomePage({ currentUser }) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/availability")} className="m-3">
        Go to Availability
      </button>
      <button onClick={() => navigate("/manage-shifts" )} className="m-3">
        Go to Manage Shifts kaan maldir
      </button>
      {!currentUser && (<>
       

      <button onClick={() => navigate("/auth")} className="m-3">
        GO TO  AUTH PAGE
      </button>
      </>)}

    </div>
  );
}

function App() {

  const[currentUser,setCurrentUser]=useState(null);
  useEffect(()=>onAuthStateChanged(auth,(user)=>{
    if(user){
      setCurrentUser(user);
    }else{
      setCurrentUser(null);
    }
  }),[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        
        <Route path="/availability" element={<EmployeeAvailability currentUser={currentUser} />}  />
        <Route path="/manage-shifts" element={<ManageShifts currentUser={currentUser} />} />
        <Route path="/auth" element={<AuthPage />} />

  
      </Routes>
    </Router>
     

  );
}

export default App;
