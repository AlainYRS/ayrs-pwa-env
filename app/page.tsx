'use client'
// TO UPLOAD TO FIRESTORE
import { addFirestoreItems, retrieveFirestoreItems, updateFirestoreItems, deleteFirestoreItems } from '@/complements/components/CommonFunctions/FirestoreCRUD'; 
import React, { useState, useEffect } from 'react';
import ImageUploaderComp from '@/complements/components/ImagesUploaderComp/ImageUploaderComp';
import FilesUploaderComp from '@/complements/components/FilesUploaderComp/FilesUploaderComp';


export default function Home() {
// TO UPLOAD TO FIRESTORE
  const [itemsUploaded, setItemsUploaded] = useState<any>()

  interface IToCloud {
    collection: string;
    fields: {
      [key: string]: any;
    };
  }

  const [fieldsGroup1, setFieldsGroup1] = useState<IToCloud>({
    collection: '',
    fields: {},
  });

  // addFirestoreItems({
  //   collection: fieldsGroup1.collection,  // fieldsGroup1 corresponde a la descripcion del useState 
  //   docs: [fieldsGroup1.fields],  // Crea Array con Json(s) generados en el front end para subir a firestore
  //   StateToUpdate: setUploaded  // Es un state para recibir los docs subidos (este es opcional)
  // });


// TO DOWNLOAD FROM FIRESTORE
  const [itemsFetched, setItemsFetched] = useState<Array<any>>();

  // retrieveFirestoreItems({
  //   collection: fieldsGroup1.collection,
  //   StateToUpdate: setItemsUploaded,
  // })

  function handleSubmit(e: any){
    e.preventDefault();
    addFirestoreItems({
      collection: fieldsGroup1.collection,
      docs: [fieldsGroup1.fields],
      StateToUpdate: setItemsUploaded
    });
    const inputs = document.querySelectorAll("input");
    inputs.forEach((e)=>{
      e.value = '';
    })
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((e)=>{
      e.value = '';
    })
  }

  function handleRetrieve(e:any){
    retrieveFirestoreItems({
      collection: fieldsGroup1.collection,
      StateToUpdate: setItemsFetched,
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {itemsFetched && 
        <>
          <h1 className='font-bold text-xl m-2'>Data in Firestore</h1>
          <div className='border w-96 rounded'>
            {itemsFetched.map((item: any)=>(
              Object.entries(item).map((entry) =>{
                const [key, value]:any = entry;
                return (
                  <p key={key} className='text-md left-0 bg-gray-700 block p-1 rounded-md m-1'>{key + ": " + value}</p>
                  )
                })
              ))
            }
          </div>
        </>
      }

      <div>
        {!itemsUploaded && 
            <>
              <label htmlFor='collection' className='block text-gray-100 font-bold mb-2'>Nombre de la collección</label>
              <input type="text" name='collection' className='text-black'
                onChange={(e)=>{setFieldsGroup1({...fieldsGroup1, collection : e.target.value})}}
              />
            </>
          }
          <button className='block text-gray-700 p-2 bg-gray-100 rounded-md font-bold mb-2 m-2'
            onClick={(e)=> handleRetrieve(e)}
          >Mostrar Informacion de Firestore</button>
      </div>

      {fieldsGroup1.collection && 
          <form onSubmit={(e) => handleSubmit(e)} className='max-w-md mx-auto p-4 rounded-md bg-white shadow-md'>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Name:</label>
              <input type='text' id='name'
                className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
                // To add an item entry to be uploaded to cloud.
                onChange={(e) => {setFieldsGroup1(({...fieldsGroup1, fields: {...fieldsGroup1.fields,[e.target.id]: e.target.value}}))}}
              />
              <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>Email:</label>
              <input type='email' id='email'
                className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
                onChange={(e) => {setFieldsGroup1(({...fieldsGroup1, fields: {...fieldsGroup1.fields,[e.target.id]: e.target.value}}))}}
              />
              <label htmlFor='phone' className='block text-gray-700 font-bold mb-2'>Phone:</label>
              <input type='text' id='phone'
                className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
                onChange={(e) => {setFieldsGroup1(({...fieldsGroup1, fields: {...fieldsGroup1.fields,[e.target.id]: e.target.value}}))}}
              />
              <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>Message:</label>
              <textarea id='message' rows={5} 
                className= 'w-full px-3 py-2 border rounded-lg focus: outline-none focus:border-blue-500 text-black'
                onChange={(e) => {setFieldsGroup1(({...fieldsGroup1, fields: {...fieldsGroup1.fields,[e.target.id]: e.target.value}}))}}
              ></textarea>
            </div>
            <>
              <ImageUploaderComp
                  logotype={{
                    addLogo:true,
                    logoLegend:'Agregar Logotipo',
                    logoLink:'www.ayrs-pwa-env.vercel.app/',
                }}
                cloud={{
                  store: true,
                  path: 'Iann',
                  storageFiles:{
                    appName:'PWA_Temp',
                    fileTypes:'Images',
                    attempts:2,
                    MSecToUploadxFile:700,
                    MSecdelay:3000,
                  }
                }}
                selection={{
                    multiple: false, // En TRUE GENERA RIESGO DE EXCESO DE CARGA DE IMAGENES EN STORAGE Y DE CARGO DESMEDIDO EN EL PAGO A GOOGLE.
                    ImageCap: 7,
                    display:{
                        visible: true,
                        maxRowsDisplay: 3,
                  }}
                }
                compTitles={{
                  select:'Subir Imagenes',
                  restore:'Restaurar',
                  submit:'Save and upload images',
                  logo:'Logo',
                }}
                blockWidth={100}
                blockHeight={100}
                classNames={''}
                styles={{}}
              />

              <FilesUploaderComp
                cloud={{
                  store: true,
                  path: 'Iann',
                  storageFiles:{
                    appName:'PWA_Temp',
                    fileTypes:'Documents',
                    attempts:2,
                    MSecToUploadxFile:500,
                    MSecdelay:2000,
                  }
                }}
                selection={{
                    multiple: false, // En TRUE GENERA RIESGO DE EXCESO DE CARGA DE IMAGENES EN STORAGE Y DE CARGO DESMEDIDO EN EL PAGO A GOOGLE.
                    DocumentCap: 10,
                    display:{
                        visible: true,
                        maxRowsDisplay: 3,
                  }}
                }
                compTitles={{
                  select:'Subir Documentos',
                  restore:'Restaurar',
                  submit:'Save and upload Documents',
                  logo:'Logo',
                }}
                blockWidth={100}
                blockHeight={100}
                classNames={''}
                styles={{}}
              />
            </>
            <div className='text-center'>
              <button  type='submit'
                className='bg-gray-900 hove;bg-blue-600 text-white font-bold py-2 px-4 rounded-md'
              >Add to Firestore</button>
            </div>
          </form>
      }
    </main>
  )
}
