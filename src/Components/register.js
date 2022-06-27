import React, { useRef } from "react";
import { useState } from "react";
import './register.css'
function RegisterForm (){
    const [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        userName:"",
        Confirmpassword:""
    })
    const [errors,setErrors]=useState({
      emailError:"",
      passwordError:"",
      nameError:"",
      userNameError:"",
      ConfirmpasswordError:"",
  })
  const emailRegex = new RegExp(/^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,5})$/)
  const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/)
  const pass =useRef(null)
  const confPass = useRef(null)
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
else if(field==="password"){
  setErrors({
    ...errors,
    passwordError:
     value.length === 0
    ? "This field is required"
    :!passRegex.test(value)
    ? "password must be: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"  
    :null})
}
else if(field==="name"){
    setErrors({
        ...errors,
        nameError:
         value.length === 0
        ? "This field is required"  
        :null
      }
      )
}
else if(field==="userName"){
    setErrors({
        ...errors,
        userNameError:
         value.length === 0
        ? "This field is required"  
        : /\s/ .test(value)
        ? "it must not have any spaces"
        :null
      }
      )
}
else{
    setErrors({
        ...errors,
        ConfirmpasswordError:
         value.length === 0
        ? "This field is required"  
        : confPass.current.value != pass.current.value
        ? "Please enter the same password"
        :null
      }
      )
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


   const submitHandle = (e)=>{
    e.preventDefault();
   }
return(
    <>
    <div className='container my-5'>
        <h1 className=' alert-success text-center'>Registeration is <span className="badge bg-success">free</span> </h1>
      <div className="border border-2 fr w-75 mx-auto rounded">
      <form className="my-2 w-50 mx-auto " onSubmit={submitHandle}>

    <div className="mb-3">
      <label forHtml="name" className="form-label">Name</label>
      <input onChange={changeHandle} value={data.name} type="text" className="form-control" id="name" aria-describedby="namelHelp"/>
      <div id="namelHelp" className="form-text text-danger">{errors.nameError}</div>
    </div>

    <div className="mb-3">
      <label forHtml="email" className="form-label">Email address</label>
      <input onChange={changeHandle} value={data.email} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text text-danger">{errors.emailError}</div>
    </div>

    <div className="mb-3">
      <label forHtml="userName" className="form-label">User Name</label>
      <input  onChange={changeHandle} value={data.userName} type="text" className="form-control" aria-describedby="userNameHelp" id="userName"/>
      <div id="userNameHelp" className="form-text text-danger">{errors.userNameError}</div>
    </div>

    <div className="mb-3">
      <label forHtml="password" className="form-label">Password</label>
      <input ref={pass} onChange={changeHandle} value={data.password} type="password" className="form-control" id="password"/>
      <div id="passwordHelp" className="form-text text-danger">{errors.passwordError}</div>
    </div>

    <div className="mb-3">
      <label forHtml="Confirmpassword" className="form-label">Confirm Password</label>
      <input ref={confPass}  onChange={changeHandle} value={data.Confirmpassword} type="password" className="form-control" id="Confirmpassword"/>
      <div id="Confirmpassword" className="form-text text-danger">{errors.ConfirmpasswordError}</div>
    </div>
    <div className="text-center">
    <button type="submit" className="btn btn-success">Register</button>
    </div>
  </form>
  </div>
  </div>
    </>
)
}
export default RegisterForm