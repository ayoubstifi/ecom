import React, { useState, useEffect } from "react";
//import { getDatabase, ref, onValue} from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import './style.css'
import { Icon } from '@iconify/react';
import Details from "./Details";
import { Link } from "react-router-dom";
import Header from './Header'
import { getAuth, signOut } from "firebase/auth";
 
export default function Home( ){
    const db = getFirestore();       
    const auth = getAuth();

/*    
   const db = getDatabase();

    const test = ()=>{
        set(ref(db, 'users/'), {
            username: 'adil',
        });

    }

    return(
        <div style={{marginTop:'100px'}} >
            <button onClick={()=> test() } >
                teest
            </button>
        </div>
     )


     user{
        fullName,
        email,
        panier:{
            0: {
                id,
                nom,
                price,
                img
            },
        },
        adress:{
            adress,
            num,
        }
     }
*/
 
const [produit,setProduct ] = useState([]);

   const [user,setUser]=useState('');
    const uid = auth.currentUser ? auth.currentUser.uid : '';

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


const getData = async ()=>{
    const querySnapshot = await getDocs(collection(db, "product"));
    let arr = [];
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    setProduct(arr);
}

const addToCart = async (product)=>{
    try { 
        const newProductRef = doc(db, "users",uid);
        await updateDoc(newProductRef, {
            cart: arrayUnion({pName: product.nameprodduct, pId: product.pid, price: product.productPrice, picture: product.picture})
        });

        console.log("Produit ajoutee");
    } catch (e) {
        console.log("Error adding document: ", e);
    }
}

const productContainer = (item)=>(
    
     <div class="wsk-cp-product" > 
    <Link to={`/details/${item.pid}`} class='details'>    
        <div class="wsk-cp-img">
            <img src={item.picture} alt="Product" class="img-responsive" />
        </div>   
   </Link>
        <div class="wsk-cp-text">
            <div class="category">
                <span>Tech</span>
            </div>
            <div class="title-product">
                <h3>{item.nameprodduct}</h3>
            </div>
            <div class="description-prod">
                <p>{item.productDesc}</p>
            </div>
            <div class="card-footer">
                <div class="wcf-left">
                    <span class="price">${item.productPrice}</span>
                </div>       
                <div class="wcf-right">
                    {/* <button onClick={()=> addToCart(item) }> */}
                        <a href="#" class="buy-btn" onClick={()=> addToCart(item)}>
                            <Icon icon="material-symbols:shopping-basket" />
                        </a>
                    {/* </button>                   */}
                           &nbsp;
                           <a href="#" class="buy-btn" onClick={wishList}>
                            <i class="fa fa-heart" aria-hidden="true" ></i>
                            
                         </a>
                </div>
            </div>
     </div>     
       </div>

)
    const wishList=()=>{
        
    }
useEffect( ()=>{
 getData();
},[])

    
return(
    <div >    
         <Header/>   
         {/* <span class="profile">Connected as : {user.name}</span> */}
        <div class='productlist'>
            {produit.map((item)=>{ return productContainer(item) })}
        </div>
    </div>
)


}     
 


