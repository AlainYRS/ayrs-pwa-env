/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement:
 import PopupComp from '@/...path.../PopupComp'
 
 Add one states:

 const [ActPopUp, setActPopUp] = useState(false) //When it's true the PopUp will be displayed

 Implement the component based on this component interfaces.
    <PopupComp
        mainmessage={'Title message'} // Main Message
        description={'Message description'} // Paragraphs
        LeftAction={<button onClick={()=>{function()}}>left button</button>} //Optional left botton and function
        RightAction={<button onClick={()=>{function()}}>right button</button>} //Optional right botton and function
        video={{   //Optional video botton to show a nested video from a linked url from youtube or other source
            text:'Video', //Botton legend
            url: 'https://www.youtube.com/watch?v=kl0nOv_SF0M', //Video Url
            controls: false, // Show or Hide the video controls
            readOnly: false, // Block or allow the user to interact with the video
        }}
        timer={2000} //optional time to autoclose the popup message
        setPopUp={setActPopUp} // pass the initial setState defined
    />
---------------------------------------------------------*/
/*Modulos*/
import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
/*Estilos*/
import styles from './PopupComp.module.css'

interface IVideo{
    text: string,
    url: string,
    controls: boolean,
    readOnly: boolean,
}

interface IPopUp{
    mainmessage: string,
    description: string,
    LeftAction?: any,
    RightAction?: any,
    video?: IVideo,
    timer?: number,
    setPopUp: any,
}

function PopupComp(props:IPopUp) {
    const [Video, setVideo] = useState<boolean>(false)
    {props.timer && setTimeout(() => props.setPopUp(false), props.timer*1000)}
    return (
        <div className={styles.MsgContainer}>
            <div className={styles.Msg}>
                <h1 className={styles.MainMessage}>{props.mainmessage}</h1>
                <span className={styles.CloseMsg} onClick={()=>props.setPopUp(false)}>X</span>
                <p className={styles.description}>{props.description}</p>
                {props.LeftAction && props.LeftAction}
                {props.RightAction && props.RightAction}<br/>
                {props.video && 
                    <a className={styles.PlayerBtn} onClick={() => setVideo(!Video)}>{props.video?.text}</a>}
                {Video && 
                    <div  className={styles.VideoContainer}>
                        {props.video?.readOnly && <div className={styles.blocker}></div>}
                        <ReactPlayer className={styles.Screen}
                            url={props.video?.url}
                            volume={1}
                            width= '100%'
                            height= '100%'
                            controls={props.video?.controls}
                            playing={true}
                            autoPlay={true}
                            muted={false}
                            loop
                            />
                    </div>
                }
            </div>
        </div>
    )
}
export default React.memo(PopupComp)