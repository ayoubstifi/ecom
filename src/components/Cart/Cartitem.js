import React, { useEffect, useState } from "react";
import { collection, query, where, getDoc, doc,getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Cartitem   ({item}) {
  
  const db = getFirestore();       
  const auth = getAuth();
  const uid = auth.currentUser ? auth.currentUser.uid : '';
  const [product,setProduct]=useState([]);

const ProductList = async( )=>{    
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setProduct(docSnap.get("cart"));
  } else {
    console.log("No such document!");
  }
}   

// const ProductList = async ()=>{
//     const querySnapshot = await getDocs(collection(db, "product"));
//     let arr = [];
//     querySnapshot.forEach((doc) => {
//         arr.push(doc.data());
//     });
//     setProduct(arr);
// } 
useEffect( 
    ()=>{
        ProductList(product);
    },[]
  )

const ProductContainer=(item)=>(
<div>
<div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={item.picture}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product:</span>
        {item.pName}
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price:</span>
        {item.price}
      </div>

      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" class="btn btn-outline-warning" >
              -
            </span>
            <span className="btn btn-black mx-1">1</span>
            <span className="btn btn-black mx-1" class="btn btn-outline-warning">
              +
            </span>
          </div>
        </div>
      </div>
      {/* */}
      <div className="col-10 mx-auto  col-lg-2">
        <div className="cart-icon" >
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto  col-lg-2">
        <strong>item total : $</strong>
      </div>
    </div>
</div>
)


    return ( 
    <div> 
      {product.map((item)=> ProductContainer(item) )}    
    </div>
   )

}