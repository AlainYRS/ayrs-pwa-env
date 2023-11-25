import { firestoreDb } from '@/app/firebaseCongif'
import { collection, doc, onSnapshot, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

interface IAddItem{
    collection: string,
    docs: Array<Record<string, any>>,
    StateToUpdate?: React.SetStateAction<any>
}

async function addFirestoreItems(DataToFirestore:IAddItem){
    try {
        const Loaded = DataToFirestore.docs.map(async (doc) => {
            const docRef = await addDoc(collection(firestoreDb, DataToFirestore.collection), doc);
            return docRef;
        });
        { DataToFirestore.StateToUpdate && DataToFirestore.StateToUpdate(Loaded)}
        console.log("Upload succesfully")
    }
    catch(error){
      console.log("Load failed: " + error)
    }
}

interface IRetrieveItems {
    collection: string;
    StateToUpdate: React.SetStateAction<any>;
}
  
async function retrieveFirestoreItems(DataToRetrieve: IRetrieveItems) {
  try {
    const querySnapshot = await getDocs(collection(firestoreDb, DataToRetrieve.collection));
    const documents: any = [];
    querySnapshot.docs.map((doc) => {
      documents.push({id: doc.id, ...doc.data()})
    })
    console.log('Retrieval successful:', documents);
    DataToRetrieve.StateToUpdate && DataToRetrieve.StateToUpdate(documents)
    return documents;
  } catch (error) {
    console.error('Retrieval failed:', error);
  }
}

interface IUpdateItem {
  collection: string;
  docs: Array<{ id: string; data: Record<string, any> }>;
  StateToUpdate: React.SetStateAction<any>;
}

async function updateFirestoreItems(DataToUpdate: IUpdateItem) {
  try {
    const promises = DataToUpdate.docs.map(async (docToUpdate) => {
      const { id, data } = docToUpdate;
      const docRef = doc(firestoreDb, DataToUpdate.collection, id);
      await updateDoc(docRef, data);
      return id;
    });
    const result = await Promise.all(promises);
    { DataToUpdate.StateToUpdate && DataToUpdate.StateToUpdate(result)}
    console.log('Update successful:', result);
  } catch (error) {
    console.error('Update failed:', error);
  }
}

interface IDeleteItem {
    collection: string;
    docIds: Array<string>;
    StateToUpdate: React.SetStateAction<any>;
  }
  
  async function deleteFirestoreItems(DataToDelete: IDeleteItem) {
    try {
      const promises = DataToDelete.docIds.map(async (docId) => {
        const docRef = doc(firestoreDb, DataToDelete.collection, docId);
        await deleteDoc(docRef);
        return docId;
      });
      const result = await Promise.all(promises);
      console.log('Delete successful:', result);
      { DataToDelete.StateToUpdate && DataToDelete.StateToUpdate(result)}
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }

export {
    addFirestoreItems,
    retrieveFirestoreItems,
    updateFirestoreItems,
    deleteFirestoreItems,
}