import React, { use, useEffect, useState } from 'react';
import '../css/Auth.css';
import {auth,db} from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
function AuthPage() {





  //form states
  const[name,setName]=useState("");
  const[surname,setSurname]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[role,setRole]=useState("");
  const navigate=useNavigate();

  //auth mode 
  const[isRegisterMode,setIsRegisterMode]=useState(true);

  const handleRegister = async() => {
    if(name=="" || surname=="" || email=="" || password==""||role==""){
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    try{
      const userCredential= await createUserWithEmailAndPassword(auth, email, password);
      const userDocref=(doc(db,"users",userCredential.user.uid));
      await setDoc(userDocref,{
        name:name,
        surname:surname,
        email:email,
        role:role,
        
      })

      alert("Kayıt Başarılı");
      navigate("/");

    }catch(error){
      if(error instanceof Error){
        alert(error.message);
      } else{
        alert("Kayıt sırasında bir hata oluştu.");
      }
    }
  };
  
  const handleLogin = async() =>  {
    if(email=="" || password==""){
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }
    try{
      await signInWithEmailAndPassword(auth,email,password);
      alert("Giriş Başarılı");
      navigate("/");
    }catch(error){
      if(error instanceof Error){
        alert(error.message);
      } else{
        alert("Giriş sırasında bir hata oluştu.");
      }
    }
  }
  

  return (
        <div className="card customCard">
        <h3 className="myHeader"> {isRegisterMode ? "Kayıt Ol" : "Giriş Yap"} </h3>
        {isRegisterMode && (<>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">

<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center"> 
    <p className="m-0 mx-3">Ad </p>
    <input type="text" className="form-control item" id="name" placeholder="John" 
    value={name} 
    onChange={(e)=>setName(e.target.value)} />
</div>

<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center"> 
    <p className="m-0 mx-3">Soyad </p>
    <input type="text" className="form-control item" id="surname" placeholder="Lennon" 
    value={surname} 
    onChange={(e)=>setSurname(e.target.value)} />
</div>

<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center"> 
    <p className="m-0 mx-3">E-Posta </p>
    <input type="email" className="form-control item" id="email" placeholder="xxxx@gmail.com" 
    value={email} 
    onChange={(e)=>setEmail(e.target.value)} />
</div>

<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center"> 
    <p className="m-0 mx-3">Şifre</p>

    <input type="password" className="form-control item" id="password" placeholder="•••••••••"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
</div>  


<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center">
    <p className="m-0 mx-3">Rol</p>
    <select className="form-control item" id="role" value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="">Lütfen Seçiniz</option>
        <option value="barista">Barista</option>
        <option value="cooker">Mutfakçı</option>
        <option value="waiter">Garson</option>
    </select>
  </div>


          </div>
          <div className="d-flex justify-content-between align-items-center ">

          <div className="btn customBtnAuth AUSpanText" onClick={()=>setIsRegisterMode(false)}>

          Zaten bir hesabınız var mı, giriş yap!
          </div>

          <div className="AUbuttonContainer">

            <button  className="btn btn-primary w-100 " onClick={handleRegister}>
                <span className="AUbtnText">Kayıt Ol</span>
            </button> 
          </div>
          </div>

</>)}
{!isRegisterMode && (<>
        <div className="card-body d-flex flex-column align-items-center justify-content-center">





<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center"> 
    <p className="m-0 mx-3">E-Posta </p>
    <input type="email" className="form-control item" id="email" placeholder="xxxx@gmail.com" 
    value={email} 
    onChange={(e)=>setEmail(e.target.value)} />
</div>

<div className="form-group my-1 w-50 d-flex align-items-center justify-content-center"> 
    <p className="m-0 mx-3">Şifre</p>

    <input type="password" className="form-control item" id="password" placeholder="•••••••••"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
</div>  





          </div>
          <div className="d-flex justify-content-between align-items-center ">

          <div className="btn customBtnAuth AUSpanText" onClick={()=>setIsRegisterMode(true)}>

          Hesap Oluştur
          </div>

          <div className="AUbuttonContainer">

            <button  className="btn btn-primary w-100 " onClick={handleLogin}>
                <span className="AUbtnText">Giriş Yap</span>
            </button> 
          </div>
          </div>
</>)}
        </div>

  );
}

export default AuthPage;
