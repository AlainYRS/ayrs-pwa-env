/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement:
 import { WaitComp, Success, Failed } from '@/...path.../WaitComp'//PopUp de Exito o Falla en Loading

 Add two states:

 const [wait, setWait] = useState(false)//Ventana de Cargando
 const [success, setSuccess] = useState(null)//Ventana de Cargando

 Add at the end of pages where it will be used with next two statements:
 
 {wait && <WaitComp />}
 {success !== null && (success ? <Success /> : <Failed />)}
 
 Control the component through the states.

 setWait(true) ==> Show the wait component
 setWait(false) ==> Hide the wait component
 setWait(null) ==> Hide the wait component

 setSuccess(null) ==> Hide the two alternative components <Success/> and <Failed/> from this components
 setSuccess(true) ==> Show the alternative component <Success/> and Hide the alternative components <Failed/>
 setSuccess(null) ==> Hide the alternative components <Failed/> and Show the alternative component <Success/>
---------------------------------------------------------*/
//Libraries
import React from 'react' //React
import Image from 'next/image' //Image
//Styles
import styles from './Wait.module.css'

function WaitComp() { //Loading component
    return(
        <div className={styles.Loading}> {/*Loadin container*/}
            <Image src={"/Icons/NIXINIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Central Image Icon*/}
            <Image src={"/Icons/LoadingIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Rounding Loading Image*/}
        </div>
    )
}
React.memo(WaitComp) //Loading Component

function Success(){ //Succesfull loading component
    return(
        <div className={styles.Success}> {/*Success container*/}
            <Image src={"/Icons/NIXINIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Central Image Icon*/}
            <Image src={"/Icons/LoadingIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Rounding Loading Image*/}
        </div>
    )
}
React.memo(Success) //Success Component

function Failed(){ //Failed loading component
    return(
        <div className={styles.Failed}> {/*Failed container*/}
            <Image src={"/Icons/RestIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Background alert Image*/}
            <Image src={"/Icons/NIXINIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Central Loading Image*/}
            <Image src={"/Icons/RetryIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Retry Loading cross Image*/}
            <Image src={"/Icons/LoadingIcon.png"} width={40} height={40} alt="NIXIN" /> {/*Rounding Loading Image*/}
        </div>
    )
}
React.memo(Failed) //Failed Component

export {WaitComp, Success, Failed}