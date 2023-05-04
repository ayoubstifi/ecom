import React, { useState, useEffect } from "react";
//import { getDatabase, ref, onValue} from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import './style.css'
import { Icon } from '@iconify/react';
 import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import Header from "./Header";

export default function Details( ){
  const {pid} = useParams();
  const db = getFirestore();       

 
const [produit,setProduct ] = useState([]);

const getData = async ()=>{
  const docRef = doc(db, "product", pid);
  const docSnap = await getDoc(docRef);
  setProduct( docSnap.data());
}

const productContainer = (item)=>(
  <div className="container py-5">
    {/* title*/}
    <div className="row">
      <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
        <h1>{item.nameprodduct}</h1>
      </div>
    </div>
    {/* end title*/}
    {/* product info*/}
    <div className="row">
      <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
        <img src={item.picture} className="img-fluid" alt="product" />
      </div>
      {/* product text*/}

      <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
        <h2>Product : {item.nameprodduct}</h2>
        <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
      {  /*  made by : <span className="text-uppercase"> </span> */}
        </h4>
        <h4 className="text-blue">
          <strong>
            price : <span>$</span>
            {item.productPrice}
          </strong>
        </h4>
        <p className="text-capitalize font-weight-bold mt-3 mb-0">
          some info about the product :
        </p>
        <p className="text-muted lead">{item.productDesc}</p>
        {/*button*/}
        <div>
          <Link to="/">
            <button class='btn btn-primary'>Back to products</button>
          </Link>
          <Link to="/cart">
          <button class='btn btn-danger'>Cart</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)
    
useEffect( ()=>{
 getData()
},[])

return(
    <div >
        <Header/>    
        {productContainer(produit)}
    </div>
)


}     
 


