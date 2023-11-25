/*---------------------------------------------------------
 ------------- README FUNCTION INSTRUCTIONS: --------------
 Type: Function
 Import statement: import CreateIDFunc from '@/...path.../IDsCreator'
 interface ICreateIDs{
    InitialLetters?:string,
    EncryptionLevel: number,
    Complexity: number,
 }

 const New ID = 
    CreateIDFunc(
        {
        InitialLetters:'id', //Any STRING
        EncryptionLevel: 35, //Number BETWEEN 2 AND 36
        Complexity: 98765467890876 //Any NUMBER
        }
    )
---------------------------------------------------------*/

interface ICreateIDs{
    InitialLetters?:string,
    EncryptionLevel: number, //Between 2 and 36
    Complexity: number,
}

export default function CreateIDFunc(props:ICreateIDs){
    let NewID
        {(props.InitialLetters === undefined) ?
            NewID = "_" + Date.now().toString(Math.abs(props.EncryptionLevel)) + '_' + (Math.floor(Math.random()*Math.abs(props.Complexity))).toString(Math.abs(props.EncryptionLevel))
            :
            NewID = props.InitialLetters + "_" + Date.now().toString(Math.abs(props.EncryptionLevel)) + '_' + (Math.floor(Math.random()*Math.abs(props.Complexity))).toString(Math.abs(props.EncryptionLevel))
        }
    return NewID
}