'use client'
import { db } from './firebaseCongif';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

async function addDataToFirestore( name: string, email: string, phone: number, message: string ){
  try {
    const docRef = await addDoc(collection(db, "messages"),{
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
    console.log("Document written with id: ", docRef.id);
    return true;
  }
  catch (error) {
    console.error("Error adding document",error);
    return false;
  }
}

async function fetchDataFromFirestore(){
  const querySnapshot = await getDocs(collection(db, "messages"))

  const data: any=[];
  querySnapshot.forEach((doc)=>{
    data.push({id: doc.id, ...doc.data()});
  });

  return data;
}

export default function Home() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState(0);
  const [message,setMessage] = useState("");

  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  },[]);

  const handleSubmit = async (e:any)=>{
    e.preventDefault();
    const added = await addDataToFirestore(name, email, phone, message);
    if (added){
      setName("");
      setEmail("");
      setPhone(0);
      setMessage("");

      alert("Data Added to Firestore Succesfully!")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Data Fetched from Firestore</h1>
      {userData.map((item:any)=>(
        <div key={item.id} className='mb-4'>
          <p className='text-xl font-bold'>{item.name}</p>
          <p className='text-xl font-bold'>{item.email}</p>
          <p className='text-xl font-bold'>{item.phone}</p>
          <p className='text-xl font-bold'>{item.message}</p>
        </div>
      ))}

      <h1 className="text-5x1 font-bold m-10">
        Add data to Firestore
      </h1>

      <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Name:
          </label>
          <input
            type='text'
            id='name'
            className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />

          <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
            Email:
          </label>
          <input
            type='text'
            id='email'
            className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <label htmlFor='phone' className='block text-gray-700 font-bold mb-2'>
            Phone:
          </label>
          <input
            type='text'
            id='phone'
            className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
            value={phone}
            onChange={(e)=> setPhone(Number(e.target.value))}
          />

          <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>
            Message:
          </label>
          <textarea
          rows={5}
            id='message'
            className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className='text-center'>
          <button 
            type='submit'
            className='bg-blue-500 hove;bg-blue-600 text-white font-bold py-2 px-4 rounded-md'
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  )
}
