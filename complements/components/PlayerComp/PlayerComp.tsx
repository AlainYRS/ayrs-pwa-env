/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement:
 import PlayerComp from '@/...path.../PlayerComp'
 
 Add one states:

 const [ActPopUp, setActPopUp] = useState(false) //When it's true the PopUp will be displayed

 Implement the component based on this component interfaces.
    <PlayerComp 
        url={'https://www.youtube.com/watch?v=YpZKwbdbsJ4'} //Video url (a copy paste from youtube url)
        width={560} //Player window width
        height={280} //Player window height
        vertical={'Center'}  //Vertical default possitioning (Top, Center, Bottom)
        horizontal={'Left'}  //Horizontal default possitioning (Left, Center, Right)
        setState={setPlayer} //State to activate or deactivate the Player window
        volume={1} //Vidro intrinsic volume (0.01, 0.25, 0.5, 0.75, 1)
        position={'fixed'} //optional Player window possitioning (Absolute, relative, sticky, static) by default is static
        typeDevice={true} //optional Shown as device or as a Rectangle
        readOnly={false} //optional No sizable, without controls and without positioning bottoms
        controls={true} //optional Youtube controls visible or not
        playing={true} //optional Playing or paused initially
        autoplay={true} //optional Autoplay initially or not
        muted={false} //optional without volume or not
        loop={true} //optional Loop when the video finishs
    />
 
---------------------------------------------------------*/
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
/*Modulos*/
import ReactPlayer from 'react-player/lazy'
/*Estilos*/
import styles from './PlayerComp.module.css'
import Control from 'react-select/dist/declarations/src/components/Control'

interface IPlayer{
    url:string, 
    setState:any,
    width:number,
    height:number,
    readOnly: boolean,
    vertical: 'Top' | 'Bottom' | 'Center',
    horizontal: 'Left' | 'Right' | 'Center',
    position?: 'relative' | 'fixed' | 'absolute' | 'static' | 'sticky',
    volume?: .01 | .25 | .5 | .75 | 1,
    typeDevice?: boolean,
    controls?: boolean,
    playing?: boolean,
    autoplay?: boolean,
    muted?: boolean,
    loop?: boolean,
}


function PlayerComp(props:IPlayer) {

    const [Position, setPosition] = useState<string>(props.vertical + props.horizontal)
    const [Width, setWidth] = useState(props.width)
    const [Height, setHeight] = useState(props.height)

    useEffect(()=>{
        {props.readOnly && setCorners(false), setSizers(false)}
        switch (Position) {
            case 'TopLeft':
                setTop(0)
                setLeft(0)
                break;                
            case 'TopCenter':
                setTop(0)
                setLeft(window.innerWidth/2 - Width/2)
                break;
            case 'TopRight':
                setTop(0)
                setLeft(window.innerWidth - Width)
                break;
            case 'CenterLeft':
                setTop(window.innerHeight/2 - Height/2)
                setLeft(0)
                break;
            case 'CenterCenter':
                setTop(window.innerHeight/2 - Height/2)
                setLeft(window.innerWidth/2 - Width/2)
            case 'CenterRight':
                setTop(window.innerHeight/2 - Height/2)
                setLeft(window.innerWidth - Width)
                break;
            case 'BotttomLeft':
                setTop(window.innerHeight - Height)
                setLeft(0)
                break;
            case 'BotttomCenter':
                setTop(window.innerHeight - Height)
                setLeft(window.innerWidth/2 - Width/2)
                break;  
            case 'BotttomRight':
                setTop(window.innerHeight - Height)
                setLeft(window.innerWidth - Width)
                break;  
            case 'Maximize':
                setLeft(0)
                setTop(0)
                setWidth(window.innerWidth)
                setHeight(window.innerHeight)
                setCorners(false)
                break;
            case 'Minimize':
                setWidth(140)
                setHeight(70)
                setCorners(true)
                break;
            case 'Default':
                setWidth(props.width)
                setHeight(props.height)
                setCorners(true)
                setPosition(props.vertical + props.horizontal)
                break;
        }
    },[Position])
    
    const [Left, setLeft] = useState<number>(window.innerWidth/2 - props.width/2)
    const [Top, setTop] = useState<number>(window.innerHeight/2 - props.height/2)
    const [Corners, setCorners] = useState(true)
    const [Sizers, setSizers] = useState(true)

    return (
        <>
        <div className={styles.PlayerContainer}>
            <div className={Corners ? styles.PlayerScreen : `${styles.PlayerScreen} ${styles.PlayerScreenMaximized}`} id={styles.PlayerScreen}
                style={{
                    width: Width,
                    height: Height,
                    left: Left,
                    top: Top,
                    position: (!props.position ? 'static' : props.position)
                }}>
                {props.readOnly && <div className={styles.blocker}></div>}
                {Corners && <span className={styles.Corner} id={styles.TopLeft} onClick={()=>setPosition('TopLeft')}>«</span>}
                {Corners && <span className={styles.Corner} id={styles.TopRight} onClick={()=>setPosition('TopRight')}>»</span>}
                <ReactPlayer className={styles.Screen}
                    url={props.url}
                    volume={!props.volume ? 1 : props.volume}
                    width= {props.typeDevice ? '93%':'100%'}
                    height= '100%'
                    controls={!props.controls ? false : true}
                    playing={props.playing ? true : false}
                    autoplay={props.autoplay ? true : false}
                    muted={props.muted ? true : false}
                    loop={props.loop ? true : false}
                />
                {Corners && <span className={styles.Corner} id={styles.BotttomLeft} onClick={()=>setPosition('BotttomLeft')}>«</span>}
                {Corners && <span className={styles.Corner} id={styles.BotttomRight} onClick={()=>setPosition('BotttomRight')}>»</span>}
                {Sizers &&
                    <>
                        <a className={styles.Default} id={styles.Default} onClick={()=>{setPosition('Default')}}>
                            <Image src="/Icons/DefaultIcon.png" fill alt="AYRSWebApp"/>
                        </a>
                        <a className={styles.ClosePlayer} onClick={() => props.setState(false)}>
                            <Image src="/Icons/ClosePlayerIcon.png" fill alt="AYRSWebApp"/>
                        </a>
                        {Corners && <a className={styles.Maximize} id={styles.Maximize} onClick={()=>setPosition('Maximize')}>
                            <Image src="/Icons/MaximizeIcon.png" fill alt="AYRSWebApp"/>
                        </a>}
                        {Corners && <a className={styles.Minimize} id={styles.Minimize} onClick={()=>setPosition('Minimize')}>
                            <Image src="/Icons/MinimizeIcon.png" fill alt="AYRSWebApp"/>
                        </a>}
                    </>
                }
            </div>
        </div>
        </>
    )
  }
  export default React.memo(PlayerComp)