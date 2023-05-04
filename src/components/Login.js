import React, { useState, useEffect } from 'react'
 import { Link,Navigate } from 'react-router-dom'
import 'firebase/database'
import firebase from 'firebase/app'
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword }  from 'firebase/auth';

 
function Login(props){
    const auth = getAuth();
    //const user = auth.currentUser.uid;

        const [email,setEmail]=useState('');
        
        const [password,setPassword]=useState('');
        
        const [error,setError]=useState('');
        
        const [issign,Setissign]=useState(false);

    const login= (e)=>{
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
     setEmail('');
    setPassword('');
    console.log(userCredential);
   })
  .catch((error) => {
    const errorCode = error.code;
    console.log(error);
    const errorMessage = error.message;
   });
}


if(issign){
    return <Navigate to="/Account"/>
}else{

return(
        <div style={{width:'50%',margin:'auto'}}>
          <div class="mb-3" >
  <label for="exampleFormControlInput1" class="form-label">Email address </label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" 
  onChange=  {(e) =>setEmail(e.target.value) }  value={email} />
</div>
  
<label for="inputPassword5" class="form-label">Password</label>
<input type="password" onChange={(e) => setPassword(e.target.value)} id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock"  value={password} />
<div id="passwordHelpBlock" class="form-text" >
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
<button type="button" class="btn btn-primary" onClick={()=> login() }>Login</button>
    <span> Don't have an account? Register
        <Link to="/signup"> Here</Link>
    </span>
</div>
    )
}
}
export default Login;