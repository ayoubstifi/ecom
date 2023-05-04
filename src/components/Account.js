import firebase from 'firebase/app';
import React, { useState, useEffect } from 'react'
 import { Link, Redirect,Navigate } from 'react-router-dom'

export default function Account(){

    const [isSignin, setIsSignin] = useState(false);

    const out = ()=>{
        firebase.auth().signOut();
        return <Navigate to="/login" />
    }

    const userState = ()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsSignin(true);
            } else {
                setIsSignin(false);
            }
        });
    }

    useEffect(()=>{
        userState()
    },[])

    if(isSignin){
        return(
            <div>
                <h1> Account </h1>
                <button onClick={()=>out()} >
                    log out
                </button>
            </div>
        )
    }else{
        return null
        // return <Redirect to="/login" />
    }

}