import React, { useState,useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";
import './style.css';
import { getAuth, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

function Header(){

  
  const auth = getAuth();

  const uid = auth.currentUser ? auth.currentUser.uid : '';
  const out = ()=>{
    signOut(auth).then(() => {
      console.log(' Sign-out successful')
    }).catch((error) => {
      // An error happened.
    });
  }

  const db = getFirestore();       
  const [user,setUser]=useState('');

   const userdata=async()=>{
    const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  setUser(docSnap.data());
} else {
  console.log("No such document!");
}
   }

 
 

useEffect( ()=>{
 userdata()
},[])
  
  //render(){
     //if(this.props.history.location.pathname==='/login') return null;

    return(
    <div>
      {/* constructor(){
            this.user = auth.currentUser.uid
    } */}
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
     <ul class="navbar-nav">
              <Link className="nav-link" to='/'/> 
              <Link className="nav-link" to='/Home' > Home</Link>
              <Link className="nav-link" to="/cart">Cart</Link>      
             <Link className="nav-link" to="/Myorder">Order</Link>      
             <Link className="nav-link" to="/wishList">wish List</Link> 
    
    </ul>     
    </ul>
    <form class="form-inline my-2 my-lg-0"  >
       
       <div class="d-flex justify-content-center"/>
    <div class="input-group w-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Example input"
          aria-label="Example input"
          aria-describedby="button-addon1"
        />
        <button class="btn btn-primary" type="button" id="button-addon1" data-mdb-ripple-color="dark">
            Search
        </button>
    </div>
    
           </form>
            <form class="d-flex">
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
      </form>  
       <span class="profile"> <i class="fa fa-user fa-2x" aria-hidden="true" style={{color: 'blue'}}>  {user.name}  </i> </span>
      
       <Link to='login'>    
         <button type="button" class="btn btn-primary float-right" onClick={out}>Log Out</button>
      </Link> 
     
  </div>
</nav>

    </div>


    ) 
  //}
      }


export default Header;