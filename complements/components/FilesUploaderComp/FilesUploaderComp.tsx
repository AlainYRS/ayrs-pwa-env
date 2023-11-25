//Libraries
import React, { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadStorage, GetURL } from "../CommonFunctions/FirebaseCloudStorage"
// import { addFirestoreItems } from "../CommonFunctions/FirestoreCRUD"
// import GlobalContext from "../GlobalContextComp/GlobalContextComp";
//Styles
import styles from './FilesUploaderComp.module.css'

interface IDoctos{
    logotype?: {
        addLogo: boolean,
        logoLegend:string,
        logoLink?:string,
    },
    cloud:{
        store:boolean,
        path:string,
        storageFiles:{
            appName:string,
            fileTypes:'Images' | 'Documents' | 'Multimedia',
            attempts: number,
            MSecToUploadxFile: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 2000 | 3000,
            MSecdelay:1000 | 2000 | 3000 | 4000 | 5000,
        }
    },
    selection: {
        multiple: boolean,
        DocumentCap: number,
        display: {
            visible: boolean,
            maxRowsDisplay: number,
        }
    },
    compTitles:{
        select: string,
        restore: string,
        submit: string,
        logo?:string,
    }
    blockWidth:number,
    blockHeight:number,
    classNames?: string,
    styles?: {},
}

export default function FilesUploaderComp(props:IDoctos){
    const [Attempts, setAttempts] = useState<number>(props.cloud.storageFiles.attempts)
    const types = ".txt, .doc, .docx, .pdf"
    const [DctoPreviews, setDctoPreviews] = useState<Array<any>>([])
    const [RestorableDctos, setRestorableDctos] = useState<Array<any>>([])
    const [DctosUrl, setDctosUrl] = useState<Array<string>>([])


    useEffect(()=>{
        DctoPreviews.map((item)=>{setDctosUrl([...DctosUrl,item.Dcto_url])})
    },[DctoPreviews])
    
    interface ICloudStore{
        event:any // Element to prevent default conditions
        logotype?:{ // Optional logotype data
            Logo:Array<any> // Array with the logotype file (file, orig_url, "Dcto_url", name, type, shortname, storaged_name, orig_order)
            setLogo: React.SetStateAction<any> // State to replace Logo info
        }
        Files:Array<any>, // Array of files to upload and resize in the cloud (file, orig_url, "Dcto_url", name, type, shortname, storaged_name, orig_order)
        setFiles: React.SetStateAction<any>, // State to replace files
        fileTypes: 'Images' | 'Documents' | 'Multimedia', //Type of valid files
        path?:string, // Path to be uploaded the files
        appName: string, // App Name used to create the path
        Attempts: any, // Number of attempts to retrieve the resized urls
        setAttempts: React.SetStateAction<any>, // Number of attempts to retrieve the resized urls
        MSecToUploadxFile: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 2000 | 3000,
        MSecdelay: 1000 | 2000 | 3000 | 4000 | 5000,
    }
    const handleSubmit=(props:ICloudStore)=>{
        props.event.preventDefault() //Stop the default reset events
        // Upload to the path the original files to be storaged and returned the cloud URL for each Document
        UploadStorage({
            Files:props.Files, // Documents to be storaged
            fileTypes:props.fileTypes, // files type description amoung valid values
            path:props.path, // Path to allocate files in cloud storage
            appName:props.appName, // App name as part of path
        })
        GetURL({
            path:props.path,
            appName:props.appName,
            fileTypes:props.fileTypes,
            Files: props.Files,
            setFiles: props.setFiles,
            Attempts: props.Attempts,
            setAttempts: props.setAttempts,
            MSecToUploadxFile:props.MSecToUploadxFile,
            MSecdelay: props.MSecdelay,
        })
        // CreateFirestoreItems({
        //     path:{
        //         appName: props.appName,
        //         fileTypes: props.fileTypes,
        //         folderId: props.path,
        //         data:{
        //             DctosUrl: DctosUrl,
        //         }
        //     }
        // })
    }
    interface IHandleSelection{
        e:any,
        ArrayState:Array<any>,
        setArrayState:React.SetStateAction<any>, 
        CapDocuments:number,
        setResult?:React.SetStateAction<any>,
    }
    interface IFile{
        file: any,
        orig_url: any,
        Dcto_url: string,
        name: string,
        type: string,
        shortname: string,
        storaged_name: string,
        orig_order: number,
    }
    const handleSelection = (Hndlprops:IHandleSelection) => {
        var DocumentCollection:any = []//Inicializa Arreglo de archivos de Documentos de firebase storage
        if (Array.from(Hndlprops.e).length > 0) {//Se elegió un archivo? Evitar error por formato indefinido ocasionado de no subir ningun archivo
            var append = true
            var Large = Array.from(Hndlprops.e).length
            Array.from(Hndlprops.e).forEach((Dcto:any,i)=>{
                Hndlprops.ArrayState.map((prevDcto)=>{prevDcto.name == Dcto['name'] && (append = false, Large = Large-1)}) // Evita cargar duplicados.
                if( i < Hndlprops.CapDocuments && append == true){
                    let docToAdd:IFile = {
                        file: Dcto,//Archivo a concatenar
                        orig_url: URL.createObjectURL(Dcto),//URL de Documentos a concatenar
                        Dcto_url:'',// Cloud Url
                        name: Dcto["name"],//Nombre de documento
                        type: Dcto["type"],//Tipo de documento
                        shortname: Dcto["name"].substr(0, Dcto["name"].lastIndexOf('.')),//Nombre corto de la documento
                        storaged_name: '',//No aplica nombre de redimension para los documantos
                        orig_order: Hndlprops.ArrayState.length + DocumentCollection.length,//Define orden de carga para su reordenamiento sobre las URLs redimensionadas de Firebase Storage
                    }
                    DocumentCollection = DocumentCollection.concat(docToAdd)//Concatena arreglo de objetos de los documentos validos enviadas a firebase storage
                    Hndlprops.setArrayState(Hndlprops.ArrayState.concat(DocumentCollection))//Agrega arreglo de objetos al estado
                }
                append = true
            })
            {Hndlprops.setResult && Hndlprops.setResult(Hndlprops.ArrayState.length)}
        }
    }
    interface IRemove{
        item: any,
        delId:string,
        ArrayToCrop:Array<any>,
        setArrayToCrop:React.SetStateAction<any>,
        ArrayToRestore:Array<any>,
        setArrayToRestore:React.SetStateAction<any>,
    }
    function removePreview(Delprops:IRemove):void {//Marca Previsualizaciones para NO cargar al anuncio
        var append = true
        Delprops.ArrayToRestore.map((prevDcto)=>{
            prevDcto.name == Delprops.item['name'] && (append = false)
        })
        if(append){
            Delprops.setArrayToRestore([...Delprops.ArrayToRestore, Delprops.item])//Crea arreglo de previsualizaciónes eliminadas para el caso de que quieran restaurarlas finalmente
        }
        let DeteleIndex = Delprops.ArrayToCrop.findIndex(function (ItemToDel:any) {//Crea variable para encontrar indice y url de previsualización a omitir
            return ItemToDel.orig_url === Delprops.item.orig_url//Regresa la url en donde el arreglo de previsualizaciones sea igual a la previsualizacion eliminada
        })
        Delprops.ArrayToCrop.splice(DeteleIndex, 1)
        Delprops.setArrayToCrop(Delprops.ArrayToCrop)
    }
    interface IRestore{
        item: any,
        delId:string,
        ArrayToRestore:Array<any>,
        setArrayToRestore:React.SetStateAction<any>,
        ArrayToAppend:Array<any>,
        setArrayToAppend:React.SetStateAction<any>,
    }
    function RestorePreview(Rstrprops:IRestore) {//Crea arreglo de url de previsualizaciones eliminadas para su restauracion en caso de ser solicitado por el usuario.
        var append = true
        var Large = Rstrprops.ArrayToAppend.length
        Rstrprops.ArrayToAppend.map((prevDcto)=>{
            prevDcto.name == Rstrprops.item['name'] && (append = false, Large = Large-1)
        })
        if(append && props.selection.DocumentCap-Large >0){
            Rstrprops.setArrayToAppend([...Rstrprops.ArrayToAppend, Rstrprops.item])//Concatena previsualizaciones eliminadas que se restauren
            let RestoreIndex = Rstrprops.ArrayToRestore.findIndex(function (RestoreItem:any) {//Encuentra el indice de previsualizacion restaurada
                return RestoreItem.orig_url === Rstrprops.item.orig_url//Regresa URL de restauracion con base al indice encontrado
            })
            Rstrprops.ArrayToRestore.splice(RestoreIndex, 1)//Elimina url restaurada de previsualizaciones eliminadas
            Rstrprops.setArrayToRestore(Rstrprops.ArrayToRestore)
        }
    }
    return (
        <>
            <div id={styles.DctoCompContainer} className={props.classNames} style={Object.assign({maxHeight: 35 + props.selection.display.maxRowsDisplay*(props.blockHeight)}, props.styles)} >
                <div id="FilesUploaderComp" className={styles.DctoCompForm}>
                    {/* Documents Selector */}
                    {(props.selection.DocumentCap-DctoPreviews.length > 0 && (!DctoPreviews[0] || DctoPreviews[0].Dcto_url == '')) &&
                        <div
                            className={styles.DocumentSelector}
                            style={{
                                width:props.blockWidth,
                                height:props.blockHeight}}>
                                <label
                                    htmlFor="DctoSel"
                                    className={styles.SelLabel}
                                    >{props.compTitles.select}<br/>{props.selection.DocumentCap-DctoPreviews.length}
                                </label>
                                <input
                                    id="DctoSel"
                                    type='file'
                                    multiple={props.selection.multiple}
                                    className={styles.FileSelector}
                                    accept={types}
                                    // Events
                                    onChange={(e)=>handleSelection({e:e.target.files, ArrayState:DctoPreviews, setArrayState:setDctoPreviews, CapDocuments:(props.selection.DocumentCap && props.selection.DocumentCap)})}
                               />
                        </div>
                    }
                    {/* Documents Previews */}
                    {(props.selection.display.visible && DctoPreviews[0] && 
                        DctoPreviews.map((Dcto,i)=>{
                            return(
                                (!DctoPreviews[i] || DctoPreviews[i].Dcto_url == '' ? 
                                    <div 
                                        key={Dcto.orig_url+'Rest'}
                                        className={styles.DctoPreview}
                                        style={{
                                            width:props.blockWidth,
                                            height:props.blockHeight,
                                            minWidth:'auto',
                                            minHeight:'auto'}}
                                            //Events
                                            draggable={true} 
                                            onDragEnd={() => removePreview({item:Dcto, delId:Dcto.orig_url, ArrayToCrop:DctoPreviews, setArrayToCrop:setDctoPreviews, setArrayToRestore:setRestorableDctos, ArrayToRestore:RestorableDctos})}
                                        >
                                            <span
                                                key={Dcto.orig_url}
                                                id={Dcto.orig_url}
                                                className={styles.SpanDelete}
                                                draggable={true} 
                                                //Events
                                                onDragEnd={() => removePreview({item:Dcto, delId:Dcto.orig_url, ArrayToCrop:DctoPreviews, setArrayToCrop:setDctoPreviews, setArrayToRestore:setRestorableDctos, ArrayToRestore:RestorableDctos})}
                                                onClick={() => removePreview({item:Dcto, delId:Dcto.orig_url, ArrayToCrop:DctoPreviews, setArrayToCrop:setDctoPreviews, setArrayToRestore:setRestorableDctos, ArrayToRestore:RestorableDctos})}
                                                >
                                            </span>
                                            {Dcto.name}
                                    </div>
                                :
                                    <div
                                        key={Dcto.orig_url+'Rest'}
                                        className={styles.DctoPreview}
                                        style={{width:props.blockWidth, height:props.blockHeight, minWidth:'auto', minHeight:'auto'}}>
                                        <div
                                            className={styles.SpanVerified}
                                            >
                                                <Image
                                                    src={'/Icons/CloudIcon.png'}
                                                    fill
                                                    alt=""
                                                    />
                                        </div>
                                        <a
                                            href={Dcto.Dcto_url}
                                            className={styles.DocVerified}
                                            >
                                            {Dcto.name}
                                        </a>
                                    </div>
                                ))
                        }))
                    }
                    {/* Documents Restorables */}
                    {(props.selection.display.visible  && (!DctoPreviews[0] || DctoPreviews[0].Dcto_url == '')) && 
                        RestorableDctos.map((Dcto)=>{
                            if(props.selection.DocumentCap-DctoPreviews.length >0){
                                return(
                                    <div
                                        key={Dcto.orig_url+'Rest'}
                                        className={styles.SpanContain}
                                        style={{
                                            width:props.blockWidth,
                                            height:props.blockHeight,
                                            minWidth:'100px',
                                            minHeight:'100px'}}>
                                            <blockquote
                                                className={styles.blockquote}
                                                cite={Dcto.name}
                                                style={{
                                                    width:props.blockWidth,
                                                    height:props.blockHeight,
                                                    minWidth:'100px',
                                                    minHeight:'100px'}}
                                                // Events
                                                draggable={true}
                                                onDragEnd={() => RestorePreview({item:Dcto, delId:Dcto.orig_url, setArrayToRestore:setRestorableDctos,  ArrayToRestore:RestorableDctos, setArrayToAppend:setDctoPreviews, ArrayToAppend:DctoPreviews})} key={Dcto.orig_url}
                                                onClick={() => RestorePreview({item:Dcto, delId:Dcto.orig_url, setArrayToRestore:setRestorableDctos, ArrayToRestore:RestorableDctos, setArrayToAppend:setDctoPreviews, ArrayToAppend:DctoPreviews})}
                                                >
                                                {props.compTitles.restore}
                                            </blockquote>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
                {DctoPreviews[0] &&
                <button form="ImageUploaderComp" id={styles.SubmitImages} 
                    onClick={(e)=>{
                        handleSubmit({
                            event:e,
                            Files:DctoPreviews,
                            setFiles: setDctoPreviews,
                            fileTypes: props.cloud.storageFiles.fileTypes,
                            path: props.cloud.path,
                            appName: props.cloud.storageFiles.appName,
                            Attempts: Attempts,
                            setAttempts: setAttempts,
                            MSecToUploadxFile: props.cloud.storageFiles.MSecToUploadxFile,
                            MSecdelay: props.cloud.storageFiles.MSecdelay,
                        })
                    }}
                >{props.compTitles.submit}</button>
            }
        </>
    )
}