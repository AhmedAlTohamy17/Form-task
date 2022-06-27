import React, { useRef } from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import './login.css'
function LoginForm(){
    const [data,setData]=useState({
        email:"",
        password:""
    })
    const [errors,setErrors]=useState({
      emailError:"",
      passwordError:""
  })
  const emailRegex = new RegExp(/^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,5})$/)
  const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  const passType =useRef(null)
  
  const handleValidation =(field,value)=>{
if(field==="email"){
  setErrors({
    ...errors,
    emailError:
     value.length === 0
    ? "This field is required"
    :!emailRegex.test(value)
    ? "Enter a valid e-mail"  
    :null
    //  emailRegex.test(value)?
  }
  )
}
else{
  setErrors({
    ...errors,
    passwordError:
     value.length === 0
    ? "This field is required"
    :!passRegex.test(value)
    ? "password must be: Minimum eight characters, at least one letter, one number and one special character"  
    :null})
}
console.log(emailRegex.test(value));
  }

   const changeHandle = (e)=>{
    setData({
        ...data,
        [e.target.id]:e.target.value,
        
    })
    handleValidation(e.target.id,e.target.value)
   }

   const viewPassword =()=>{
    if(passType.current.type == "password"){
      passType.current.type = 'text'
    }
    else{
      passType.current.type = "password"
    }
   }

   const submitHandle = (e)=>{
    e.preventDefault();
   }
    return (
      
      <>
      <div className='container my-5'>
        <h1 className='alert alert-primary text-center'>Welcome to our website</h1>
      <div className="border border-2 fr w-75 mx-auto">
      <form className="my-2 w-50 mx-auto" onSubmit={submitHandle}>
    <div className="mb-3">
      <label forHtml="email" className="form-label">Email address</label>
      <input onChange={changeHandle} value={data.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text text-danger">{errors.emailError}</div>
    </div>
    <div className="mb-3">
      <label forHtml="password" className="form-label">Password</label>
      <input ref={passType} onChange={changeHandle} value={data.password} type="password" className="form-control" id="password"/>
      <span class="input-group-text" id="basic-addon2"><button className="btn btn-secondary w-100" onClick={()=>viewPassword()}>
        view password
        <span className="ms-1"><FaEye/></span>
        </button></span>
      <div id="passwordHelp" className="form-text text-danger">{errors.passwordError}</div>
      
    </div>
    <div className="text-center">
    <button type="submit" className="btn btn-primary">Login</button>
    </div>
  </form>
  </div>
  </div>
      </>
    );
}
 export default LoginForm;