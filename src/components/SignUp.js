import React from "react"

import  { useState } from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom';
import { doc, setDoc, getFirestore  } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword }  from 'firebase/auth';

export default function Signup (){
    const auth = getAuth();
    const db = getFirestore();

    const [name,setName]=useState('');

    const [email,setEmail]=useState('');
    
    const [password,setPassword]=useState('');
    
    const [error,setError]=useState('');
    
    const [issign,Setissign]=useState(false);

    const login=  ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            console.log(userCredential);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                email: email,
                uid: userCredential.user.uid
            });
            setName('');
            setEmail('');
            setPassword('');
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(error);
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }


 

return(
        <div style={{width:'50%',margin:'auto'}}>
            <h2>Sign Up</h2>
             <div class="mb-3" >
  <label for="exampleFormControlInput1" class="form-label">Name</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name" 
  onChange=  {(e) =>setName(e.target.value) }/>
</div>        
          <div class="mb-3" >
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput2" placeholder="name@example.com" 
  onChange=  {(e) =>setEmail(e.target.value) }/>
</div>
  
<label for="inputPassword5" class="form-label">Password</label>
<input type="password" onChange={(e) => setPassword(e.target.value)} id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock"/>
<div id="passwordHelpBlock" class="form-text" >
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
<button type="button" class="btn btn-primary" onClick={()=> login()} >Login</button>
    <span> Already have an Account ? Login
        <Link to="/login"> Here</Link>
    </span>
</div>
    )


}
