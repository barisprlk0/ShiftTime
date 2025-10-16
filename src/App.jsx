import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmployeeAvailability from "./pages/EmployeeAvailability";
import ManageShifts from "./pages/ManageShifts";
import AuthPage from "./pages/AuthPage";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../src/firebaseConfig';


function HomePage({ isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/availability")} className="m-3">
        Go to Availability
      </button>
      <button onClick={() => navigate("/manage-shifts" )} className="m-3">
        Go to Manage Shifts
      </button>
      {!isAuthenticated && (<>
       

      <button onClick={() => navigate("/auth")} className="m-3">
        GO TO  AUTH PAGE
      </button>
      </>)}

    </div>
  );
}

function App() {

  const[isAuthenticated,setIsAuthenticated]=useState(false);
  useEffect(()=>onAuthStateChanged(auth,(user)=>{
    if(user){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  }),[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
        
        <Route path="/availability" element={<EmployeeAvailability />} />
        <Route path="/manage-shifts" element={<ManageShifts />} />
        <Route path="/auth" element={<AuthPage />} />

  
      </Routes>
    </Router>
     

  );
}

export default App;
