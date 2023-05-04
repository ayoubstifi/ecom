 
import React, { useEffect,useState } from 'react'
import Header from './components/Header';
import Home from './components/Home';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddToCart from './components/Cart/AddToCart';
import Order from './components/Order';
import WishList from './components/WishList';
import Details from './components/Details';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {  onAuthStateChanged,getAuth } from "firebase/auth";
 import { Link, Redirect,Navigate } from 'react-router-dom'
import Layout from './components/Layout';
const firebaseConfig = {

  apiKey: "AIzaSyDjiPnK4R2lxCC23PHpaKICwEHu6HWJPkw",

  authDomain: "ecom-b73de.firebaseapp.com",

  projectId: "ecom-b73de",

  storageBucket: "ecom-b73de.appspot.com",

  messagingSenderId: "393597725023",

  appId: "1:393597725023:web:7f0f0276140e8aa4162eea",

  measurementId: "G-GWMKJMWYCD",
  databaseURL: "https://ecom-b73de-default-rtdb.firebaseio.com"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


function App(props) {

  const [isSignin, setIsSignin] = useState(false);
  const auth = getAuth();
   const userState = ()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignin(true);
        console.log(true);
      } else {
        setIsSignin(false);
      }
    });
  }

  useEffect(()=>{
    userState()
  },[])

  return (     

    <BrowserRouter>  
     {/*window.location.pathname !== "/login" ?<Header/>:<></>*/}
   { /*<Header/>  */}    
    {
    isSignin ?     
    <Routes>        <Route element={<Layout />}/>
       <Route path="/" element={<Home />} /> 
      <Route path="*" element={<Navigate to="/" replace />} />  
      <Route path='Cart' element={<AddToCart/>}/>
      <Route path='Myorder' element={<Order/>}/>
      <Route path='wishList' element={<WishList/>}/>
      <Route path='details/:pid' element={<Details/>}/>
     </Routes>
    :
    <Routes> 
      {/* <Route path='/login' render={() => ( !this.state.isSignin ? <Login /> : <Navigate to='/Home' /> )}/> */}
      {/* <Route index element={<SignUp />} />    */}
       <Route path="/" element={<Home />} />   
      <Route path='Cart' element={<AddToCart/>}/>
      <Route path='Myorder' element={<Order/>}/>
      <Route path='wishList' element={<WishList/>}/>
      <Route path='details/:pid' element={<Details/>}/>
      <Route path='login' element={<Login/>} /> 
      <Route path='signup' element={<SignUp/>}/>
     </Routes>
    }
    </BrowserRouter>
  );
}

export default App;
