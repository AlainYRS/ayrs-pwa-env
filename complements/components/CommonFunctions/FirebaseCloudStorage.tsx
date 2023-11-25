import { storage } from '@/app/firebaseCongif'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

interface IGetUrl{ // Function to retrieve the cloud resized urls
    logotype?:{ // If exists a logotype send the next information
        Logo:Array<any>, // Logo array
        setLogo:React.SetStateAction<any>, // State to update the logo array data
    },
    path?:string, // Path to allocate the files in the cloud storage service
    appName:string, // app name
    fileTypes:'Images' | 'Documents' | 'Multimedia', // file type description
    Files: Array<any>, // Files to upload to cloud storage
    setFiles: React.SetStateAction<any>, // State to update files data
    Attempts: React.SetStateAction<any>, // Number of attempts to retrieve the resized urls
    setAttempts: React.SetStateAction<any>, // Number of attempts to retrieve the resized urls
    MSecToUploadxFile: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 2000 | 3000,
    MSecdelay: 1000 | 2000 | 3000 | 5000 | 4000,
}

var Delays: number = 3500 // mile seconds as initial delay to be updated internally for the second attempt forward.

function GetURL(props:IGetUrl){

    interface IURL_File{
        file: any,
        type: string,
        name: string,
        shortname: string,
        storaged_name: string,
        orig_url: string,
        orig_order: number,
        storaged_url: string,
        storaged_order: number,
    }
    let ResizedLogoURLs:Array<IURL_File> = []
    let ResizedFilesURLs:Array<IURL_File> = []
    let path = props.appName + '/'+ props.fileTypes + '/' + (props.path ? props.path + '/' : '')
    setTimeout(()=>{
        Delays = props.MSecdelay + props.MSecToUploadxFile * props.Files.length
        if(props.Attempts > 0){
            let ReduceAttempts = 0
            let tempArray:Array<string> = []
            let InternalArray:Array<IURL_File> = []
            props.Files.map(async (file)=>{await getDownloadURL(ref(storage,path + file.storaged_name))
                .then((url)=>{
                    if(!tempArray.includes(url)){
                        tempArray.push(url),
                        ResizedFilesURLs.push(
                            {
                                file: file.file,
                                type: file.type,
                                name: file.shortname,
                                shortname: file.shortname,
                                storaged_name:file.storaged_name,
                                orig_url: file.orig_url,
                                orig_order: file.orig_order,
                                storaged_url: url,
                                storaged_order: file.orig_order,
                            }
                        )                        
                    }
                    props.setFiles(ResizedFilesURLs)
                    InternalArray == props.Files
                })
                .catch((err)=>{console.log(err)})
            })
            props.logotype?.Logo.map(async(logo)=>{await getDownloadURL(ref(storage,path + 'Logo/' + logo.storaged_name))
                .then((url)=>{
                    ResizedLogoURLs.push(
                        {
                            file: logo,
                            type: logo.type,
                            name: logo.shortname,
                            shortname: logo.shortname,
                            storaged_name:logo.storaged_name,
                            orig_url: logo.orig_url,
                            orig_order: logo.orig_order,            
                            storaged_url: url,
                            storaged_order: logo.orig_order,
                        })
                    props.logotype?.setLogo(ResizedLogoURLs)
                })
                .catch((err) => {console.log('Cloud Storage Uploading Error:',err)})
            })
            props.setAttempts(props.Attempts - ReduceAttempts)
            {(tempArray.length == props.Files.length && ResizedLogoURLs.length == props.logotype?.Logo.length) && props.setAttempts(0)}
        }
    },Delays)
}




interface IGetURLs{
    storagePath?: string,
    fileNameToGetURLs?: [],
    stateforURLs?: React.SetStateAction<any>, 
}

async function GetURLs(props: IGetURLs){
    console.log('Entre a ' + props.storagePath)
    const storageRef = ref(getStorage(), props.storagePath)
    if (!props.fileNameToGetURLs){
        console.log('entre a Todas las URLs')
        const storageFiles = await listAll(storageRef);
        console.log(storageFiles)
        const storageURLs = await Promise.all(
            storageFiles.items.map(async (item) => getDownloadURL(item))
            );
            {props.stateforURLs && props.stateforURLs(storageURLs)}
            return storageURLs;
        } else if (props.fileNameToGetURLs) {
            console.log('entre a URLs especificas')
            props.fileNameToGetURLs.map(async (fileName)=>{
                const fileNameRef = ref(getStorage(), fileName) 
                const storageURLs = await getDownloadURL(fileNameRef)
                console.log(storageURLs)
                {props.stateforURLs && props.stateforURLs(storageURLs)}
                return storageURLs
            }
        )
    }
}

interface IUploadFiles{
    Logo?:Array<any> // If exist logotype send the logo array
    Files:Array<any> // Images to be resized
    fileTypes:'Images' | 'Documents' | 'Multimedia', // files type description amoung valid values
    path?:string, // Path to allocate files in cloud storage
    appName:string, // App name as part of path
}
function UploadStorage(props:IUploadFiles){
    props.Logo?.map((logo)=>{ // If Logo array exists map it
        const storageRef = ref(storage, props.appName + '/'+ props.fileTypes + '/' + (props.path ? props.path + '/Logo/' : 'Logo/') + logo.name); // Set a local variable with the path (Considering the app name, the type of files and the path provided by the user)
        uploadBytes(storageRef, logo.file ) // Upload to the Cloud storage service the current file mapped
        .then((snapshot) => { // If success then:
            // console.log('CARGADO',snapshot) // Console a snapshot
        })
        .catch((err)=>{ // If fails
            // console.log(err) // Consolo the error code
        })
    })
    props.Files.map((file)=>{ // With files array map
        const storageRef = ref(storage, props.appName + '/'+ props.fileTypes + '/' + (props.path ? props.path + '/' : '') + file.name); // Set a local variabble with the path (Considering the app name, the type of files and the path provided by the user)
        uploadBytes(storageRef, file.file ) // Upload to the Cloud storage service the current file mapped
        .then((snapshot) => { // If success then:
            // console.log(snapshot) // Console a snapshot
        })
        .catch((err)=>{ // If fails
            // console.log(err) // Consolo the error code
        })
    })
}

interface IDownloadFiles{

}
function DownloadStorage(props:IDownloadFiles){
    // console.log(props)

}

interface IDeleteFiles{

}
function DeleteStorage(props:IDeleteFiles){
    // console.log(props)

}

export {
    UploadStorage,
    GetURL,
    GetURLs,
    DownloadStorage,
    DeleteStorage,
}