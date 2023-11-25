//Libraries
import React, { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadStorage, GetURL, GetURLs } from "../CommonFunctions/FirebaseCloudStorage"
import { addFirestoreItems } from "../CommonFunctions/FirestoreCRUD"
// import GlobalContext from "../GlobalContextComp/GlobalContextComp";
//Styles
import styles from './ImageUploaderComp.module.css'

interface IResizedImg{
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
        ImageCap: number,
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

export default function ImageUploaderComp(props:IResizedImg){
    const [Attempts, setAttempts] = useState<number>(props.cloud.storageFiles.attempts)
    const types = ".jpg, .jpeg, .png, .gif, .bmp, .webp, .ico"
    const [CardLogo, setCardLogo] = useState<Array<any>>([])
    const [ImgPreviews, setImgPreviews] = useState<Array<any>>([])
    const [RestorableImgs, setRestorableImgs] = useState<Array<any>>([])
    const [LogoUrl, setLogoUrl] = useState<Array<string>>([])
    const [ImgsUrl, setImgsUrl] = useState<Array<string>>([])
    const [rszdCloudImgs, setRszdCloudImgs] = useState<Array<any>>([])


    useEffect(()=>{
        CardLogo.map((item)=>{setLogoUrl([...LogoUrl,item.storaged_url])})
        ImgPreviews.map((item)=>{setImgsUrl([...ImgsUrl,item.storaged_url])})
    },[CardLogo, ImgPreviews])
    
    interface ICloudStore{
        event:any // Element to prevent default conditions
        logotype?:{ // Optional logotype data
            Logo:Array<any> // Array with the logotype file (file, orig_url, "storaged_url", name, type, shortname, storaged_name, orig_order)
            setLogo: React.SetStateAction<any> // State to replace Logo info
            setStLogo: React.SetStateAction<any>,
        }
        Files:Array<any>, // Array of files to upload and resize in the cloud (file, orig_url, "storaged_url", name, type, shortname, storaged_name, orig_order)
        setFiles: React.SetStateAction<any>, // State to replace files
        fileTypes: 'Images' | 'Documents' | 'Multimedia', //Type of valid files
        path?:string, // Path to be uploaded the files
        appName: string, // App Name used to create the path
        Attempts: any, // Number of attempts to retrieve the resized urls
        setAttempts: React.SetStateAction<any>, // Number of attempts to retrieve the resized urls
        MSecToUploadxFile: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 2000 | 3000,
        MSecdelay: 1000 | 2000 | 3000 | 4000 | 5000 ,
    }
    const handleSubmit=(props:ICloudStore)=>{
        props.event.preventDefault() //Stop the default reset events
        // Upload to the path the original files to be resized, storaged and returned the resized cloud URL for each image
        UploadStorage({
            Logo:(props.logotype && props.logotype.Logo), // If exist logotype send the logo array
            Files:props.Files, // Images to be resized
            fileTypes:props.fileTypes, // files type description amoung valid values
            path:props.path, // Path to allocate files in cloud storage
            appName:props.appName, // App name as part of path
        })
        GetURL({
            logotype:(props.logotype &&
                {
                    Logo:props.logotype.Logo,
                    setLogo:props.logotype.setLogo,
                }
            ),
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

        console.log(props)
        //AQUIVA
        GetURLs({
            storagePath: props.appName + '/'+ props.fileTypes + '/' + (props.path ? props.path + '/' : ''),
            stateforURLs: setRszdCloudImgs,
        })

        // addFirestoreItems({
        //     path:{
        //         appName: props.appName,
        //         fileTypes: props.fileTypes,
        //         folderId: props.path,
        //         data:{
        //             LogoUrl: LogoUrl,
        //             ImgsUrl: ImgsUrl,
        //         }
        //     }
        // })
    }
    interface IHandleSelection{
        e:any,
        ArrayState:Array<any>,
        setArrayState:React.SetStateAction<any>, 
        CapImages:number,
        setResult?:React.SetStateAction<any>,
    }
    interface IFile{
        file: any,
        orig_url: any,
        storaged_url: string,
        name: string,
        type: string,
        shortname: string,
        storaged_name: string,
        orig_order: number,
    }
    const handleSelection = (Hndlprops:IHandleSelection) => {
        var ImageCollection:any = []//Inicializa Arreglo de archivos de imagenes redimensionadas de firebase storage
        if (Array.from(Hndlprops.e).length > 0) {//Se elegió un archivo? Evitar error por formato indefinido ocasionado de no subir ningun archivo
            var append = true
            var Large = Array.from(Hndlprops.e).length
            Array.from(Hndlprops.e).forEach((Img:any,i)=>{
                Hndlprops.ArrayState.map((prevImg)=>{prevImg.name == Img['name'] && (append = false, Large = Large-1)}) // Evita cargar duplicados.
                if( i < Hndlprops.CapImages && append == true){
                    let imgToAdd:IFile = {
                        file: Img,//Archivo a concatenar
                        orig_url: URL.createObjectURL(Img),//URL de la imagen a concatenar
                        storaged_url:'',// Cloud Url
                        name: Img["name"],//Nombre de la imagen
                        type: Img["type"],//Tipo de la imagen
                        shortname: Img["name"].substr(0, Img["name"].lastIndexOf('.')),//Nombre corto de la imagen
                        storaged_name: Img["name"].substr(0, Img["name"].lastIndexOf('.')) + "_200x200.webp",//Nombre redimensionado de la imagen en forebase storage para obtener su URL redimensionada
                        orig_order: Hndlprops.ArrayState.length + ImageCollection.length,//Define orden de carga para su reordenamiento sobre las URLs redimensionadas de Firebase Storage
                    }
                    ImageCollection = ImageCollection.concat(imgToAdd)//Concatena arreglo de objetos de las imagenes validas enviadas a firebase storage para su redimension
                    Hndlprops.setArrayState(Hndlprops.ArrayState.concat(ImageCollection))//Agrega arreglo de objetos al estado
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
        Delprops.ArrayToRestore.map((prevImg)=>{
            prevImg.name == Delprops.item['name'] && (append = false)
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
        Rstrprops.ArrayToAppend.map((prevImg)=>{
            prevImg.name == Rstrprops.item['name'] && (append = false, Large = Large-1)
        })
        if(append && props.selection.ImageCap-Large >0){
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
            <div id={styles.ImgCompContainer} className={props.classNames} style={Object.assign({maxHeight: 35 + props.selection.display.maxRowsDisplay*(props.blockHeight)}, props.styles)} >
                <div id="ImageUploaderComp"
                    className={styles.ImgCompForm}>
                    {/* Logotype Selector */}
                    {props.logotype?.addLogo &&
                        ((!CardLogo[0]) &&
                        <div
                            className={styles.ImageSelector}
                            style={{
                                width:props.blockWidth,
                                height:props.blockHeight}}>
                                <label
                                    htmlFor="LogoSel"
                                    className={styles.SelLabel}
                                    >{props.logotype.logoLegend}
                                    <input
                                        id="LogoSel"
                                        type='file'
                                        className={styles.FileSelector}
                                        accept={types} 
                                        // Events
                                        onChange={(e)=>handleSelection({e:e.target.files, ArrayState:CardLogo, setArrayState:setCardLogo, CapImages:1})}
                                        />
                                </label>
                        </div>
                        )
                    }
                    {/* Logotype Preview */}
                    {CardLogo[0] && 
                        (CardLogo[0].storaged_url == '' ?
                            <div
                                className={styles.ImgPreview}>
                                <span
                                    className={styles.SpanDelete}
                                    draggable={true}
                                    // Events
                                    onDragEnd={() =>setCardLogo([])}
                                    onClick={() =>setCardLogo([])}>
                                    <Image
                                        draggable={true}
                                        src={CardLogo[0].orig_url}
                                        fill
                                        alt={CardLogo[0].name}
                                        // Events
                                        onDragEnd={() =>setCardLogo([])}
                                        />
                                </span>
                                <blockquote
                                    className={styles.blockquoteLogo}
                                    cite={props.compTitles.logo}
                                    draggable={true}
                                    // Events
                                    onDragEnd={() =>setCardLogo([])}
                                    />
                            </div>
                            :
                            <div
                                key={CardLogo[0].name}
                                className={styles.ImgPreview}
                                style={{
                                    width:props.blockWidth,
                                    height:props.blockHeight,
                                    minWidth:'100px',
                                    minHeight:'100px'}}>
                                <div
                                    className={styles.SpanVerified}
                                    >
                                    <Image
                                        src={'/Icons/CloudIcon.png'}
                                        fill
                                        alt=""/>
                                </div>
                                <Image
                                    className={styles.ImgVerified}
                                    src={CardLogo[0].orig_url}
                                    fill
                                    alt={CardLogo[0].name}/>
                                <blockquote
                                    id={styles.blockquoteLogo}
                                    cite={props.compTitles.logo}
                                    />
                            </div>
                        )
                    }
                    {/* Images Selector */}
                    {(props.selection.ImageCap-ImgPreviews.length > 0 && (!ImgPreviews[0] || ImgPreviews[0].storaged_url == '')) &&
                        <div
                            className={styles.ImageSelector}
                            style={{
                                width:props.blockWidth,
                                height:props.blockHeight}}>
                            <label
                                htmlFor="ImgSel"
                                className={styles.SelLabel}
                                >{props.compTitles.select}<br/>{props.selection.ImageCap-ImgPreviews.length}
                            </label>
                            <input
                                id="ImgSel"
                                type='file'
                                multiple={props.selection.multiple}
                                className={styles.FileSelector}
                                accept={types} 
                                // Events
                                onChange={(e)=>handleSelection({e:e.target.files, ArrayState:ImgPreviews, setArrayState:setImgPreviews, CapImages:(props.selection.ImageCap && props.selection.ImageCap)})}
                            />
                        </div>
                    }
                    {/* Images Previews */}
                    {(props.selection.display.visible && ImgPreviews[0]) && 
                        ImgPreviews.map((Img,i)=>{
                            return(
                                (!ImgPreviews[i] || ImgPreviews[i].storaged_url == '' ?
                                    <div
                                        key={Img.orig_url+'Rest'}
                                        className={styles.ImgPreview}
                                        style={{
                                            width:props.blockWidth,
                                            height:props.blockHeight,
                                            minWidth:'100px',
                                            minHeight:'100px'}}>
                                        <span
                                            key={Img.orig_url}
                                            id={Img.orig_url}
                                            className={styles.SpanDelete}
                                            draggable={true}
                                            // Events
                                            onDragEnd={() => removePreview({item:Img, delId:Img.orig_url, ArrayToCrop:ImgPreviews, setArrayToCrop:setImgPreviews, setArrayToRestore:setRestorableImgs, ArrayToRestore:RestorableImgs})}
                                            onClick={() => removePreview({item:Img, delId:Img.orig_url, ArrayToCrop:ImgPreviews, setArrayToCrop:setImgPreviews, setArrayToRestore:setRestorableImgs, ArrayToRestore:RestorableImgs})}
                                        />
                                        <Image
                                            src={Img.orig_url}
                                            fill
                                            alt={Img.name}
                                            // Events
                                            onDragEnd={() => removePreview({item:Img, delId:Img.orig_url, ArrayToCrop:ImgPreviews, setArrayToCrop:setImgPreviews, setArrayToRestore:setRestorableImgs, ArrayToRestore:RestorableImgs})}
                                        />
                                    </div>
                                :                                
                                    <div
                                        key={Img.orig_url+'Rest'}
                                        className={styles.ImgPreview}
                                        style={{
                                            width:props.blockWidth,
                                            height:props.blockHeight,
                                            minWidth:'100px',
                                            minHeight:'100px'}}>
                                        <div
                                            className={styles.SpanVerified}>
                                            <Image
                                                src={'/Icons/CloudIcon.png'}
                                                fill
                                                alt=""
                                            />
                                        </div>
                                            <Image
                                                src={Img.orig_url}
                                                fill
                                                alt={Img.name}
                                            />
                                    </div>
                                )
                            )
                        })
                    }
                    {/* Images Restorables */}
                    {(props.selection.display.visible  && (!ImgPreviews[0] || ImgPreviews[0].storaged_url == '')) && 
                        RestorableImgs.map((Img)=>{
                            if(props.selection.ImageCap-ImgPreviews.length >0){
                                return(
                                    <div
                                        key={Img.orig_url+'Rest'}
                                        className={styles.SpanContain}
                                        style={{
                                            width:props.blockWidth,
                                            height:props.blockHeight,
                                            minWidth:'100px',
                                            minHeight:'100px'}}>
                                        <blockquote
                                            id={styles.blockquote}
                                            cite={props.compTitles.restore}
                                            style={{
                                                width:props.blockWidth,
                                                height:props.blockHeight,
                                                minWidth:'100px',
                                                minHeight:'100px'}}
                                            draggable={true}
                                            // Events
                                            // onDragEnd={() => RestorePreview({item:Img, delId:Img.orig_url, setArrayToRestore:setRestorableImgs,  ArrayToRestore:RestorableImgs, setArrayToAppend:setImgPreviews, ArrayToAppend:ImgPreviews})} key={Img.orig_url}
                                            onClick={() => RestorePreview({item:Img, delId:Img.orig_url, setArrayToRestore:setRestorableImgs, ArrayToRestore:RestorableImgs, setArrayToAppend:setImgPreviews, ArrayToAppend:ImgPreviews})}
                                        >
                                            <Image
                                                className={styles.Previews}
                                                src={Img.orig_url}
                                                fill
                                                alt={Img.name}
                                            />
                                        </blockquote>
                                    </div>
                                )
                            }
                        })
                    }
                    {/*Images Resized at Cloud Storage*/}
                    {rszdCloudImgs[0] && 
                        rszdCloudImgs.map((RszdImg,i)=>{
                            return(
                                <div
                                    key={RszdImg+'Rest'}
                                    className={styles.ImgPreview}
                                    style={{
                                        width:props.blockWidth,
                                        height:props.blockHeight,
                                        minWidth:'100px',
                                        minHeight:'100px'}}>
                                    <div
                                        className={styles.SpanVerified}>
                                        <Image
                                            src={'/Icons/CloudIcon.png'}
                                            fill
                                            alt=""
                                        />
                                    </div>
                                        <Image
                                            src={RszdImg}
                                            fill
                                            alt={RszdImg}
                                        />
                                </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
            {(CardLogo[0] || ImgPreviews[0]) && (!ImgPreviews[0] || ImgPreviews[0].storaged_url == '') &&
                <button
                    form="ImageUploaderComp"
                    id={styles.SubmitImages} 
                    // Events
                    onClick={(e)=>{
                        handleSubmit({
                            event:e,
                            logotype:(CardLogo[0] &&
                                {
                                    Logo: CardLogo,
                                    setLogo: setCardLogo,
                                }
                            ),
                            Files:ImgPreviews,
                            setFiles: setImgPreviews,
                            fileTypes: props.cloud.storageFiles.fileTypes,
                            path: props.cloud.path,
                            appName: props.cloud.storageFiles.appName,
                            Attempts: Attempts,
                            setAttempts: setAttempts,
                            MSecToUploadxFile: props.cloud.storageFiles.MSecToUploadxFile,
                            MSecdelay: props.cloud.storageFiles.MSecdelay,
                        })
                    }}
                >{props.compTitles.submit}
                </button>
            }
        </>
    )
}