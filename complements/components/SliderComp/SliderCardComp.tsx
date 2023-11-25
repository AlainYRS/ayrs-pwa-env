/*---------------------------------------------------------
 ------------- README FUNCTION INSTRUCTIONS: --------------
Type: Component
Import statement: import SliderCardComp from '@/...path.../SliderCardComp'
interface ISlideGallery{
    ImgSeconds: number,
    classNames?: string,
    styles: string,
    title: string
    shortdesc: string
    url: string
    images: string[]
}

<SliderCardComp 
    ImgSeconds={3} // Seconds for each image previos to be changed for the next one
    classNames={""}
    title={"Gallery 1"}
    shortdesc={"Shrt Desc 1"}
    url={"url1 "}
    images={[ //Array of images
        '/Images/IMG1.png',
        '/Images/IMG2.png',
        '/Images/IMG3.png',
        '/Images/IMG4.png',
        '/Images/IMG5.png',
        '/Images/IMG6.png',
        '/Images/IMG7.png',
        '/Images/IMG8.png',
        '/Images/IMG9.png',
        '/Images/IMG10.png',
        ]}
/>
---------------------------------------------------------*/

/*Modulos*/
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
/*Estilos*/
import styles from './SliderCardComp.module.css'

interface IGallery{
    images: string[]
    title?: string
    shortdesc?: string
    url?: string
}

interface IDisplay{
    display: boolean,
    position: 'top' | 'bottom' | 'left' | 'right',
}

interface ISlideGallery{
    ImgSeconds: number,
    DispGalleries: IDisplay,
    classNames?: string,
    styles?: any,
    width:number,
    height:number,
    galleries: IGallery[]
}

function SliderCardComp(props:ISlideGallery) {
    const [ImgCounter, setImgCounter] = useState<number>(0)
    const [GalCounter, setGalCounter] = useState<number>(0)
    const [TotImgs, setTotImgs] = useState<number>(props.galleries[GalCounter].images.length)
    const [ShowGal, setShowGal] = useState<boolean>()
   
    return (
        <>
            <div className={(styles.SlidCardContainer)}
                style={{
                    width:(props.DispGalleries.position == 'top' || props.DispGalleries.position =='bottom') ? props.width : props.width*1.3+14,
                    height:(props.DispGalleries.position == 'top' || props.DispGalleries.position =='bottom') ? props.height*1.3+14 : props.height,
                }}
                    >
                <div className={(styles.SliderCardLink)} style={{width:props.width, height:props.height}}>
                    {props.galleries[GalCounter].title && <p className={styles.CardTitle}>{props.galleries[GalCounter].title}</p>}
                    {props.galleries[GalCounter].url && <a href={`${props.galleries[GalCounter].url}`} target="_black" rel="noreferrer noopener" className={styles.CardUrl}>&#128279;</a>}
                    {TotImgs>1 && 
                        <a className={styles.PrvImgSlideCard} 
                            onClick={() => setImgCounter(ImgCounter <= 0 ? TotImgs - 1 : ImgCounter - 1)}
                        >«</a>
                    }
                    {props.galleries.length>1 && !props.DispGalleries.display && 
                        <Image className={styles.MoreGalleries} src={'/Icons/AddIcon.png'} width={50} height={50} alt="MoreGalleryes"
                            onClick={()=>setShowGal(!ShowGal)}
                            />
                    }
                    <Image className={styles.SlideImage} src={props.galleries[GalCounter].images[ImgCounter]} fill alt="SliderComp"
                        onClick={() => setImgCounter(ImgCounter >= TotImgs - 1 ? 0 : ImgCounter + 1)}
                        />
                    {TotImgs>1 &&
                        <a className={styles.NxtImgSlideCard}
                            onClick={() => setImgCounter(ImgCounter >= TotImgs - 1 ? 0 : ImgCounter + 1)}
                        >»</a>}
                    {props.galleries[GalCounter].shortdesc && <p className={styles.CardDescription}>{props.galleries[GalCounter].shortdesc}</p>}
                </div>
                {props.galleries.length>1 && (props.DispGalleries.display || ShowGal) &&
                    <div className={styles.GalleriesContainer}
                        style={{
                            flexFlow:(props.DispGalleries.position == 'top' || props.DispGalleries.position =='bottom') ? 'row' : 'column',
                            width:(props.DispGalleries.position == 'top' || props.DispGalleries.position =='bottom') ? props.width : props.width*.3 ,
                            height:(props.DispGalleries.position == 'top' || props.DispGalleries.position =='bottom') ? props.height*.3 : props.height,
                            gridArea: props.DispGalleries.position,
                            position: (!props.DispGalleries.display && props.galleries.length>1) ? 'absolute': 'relative',
                            zIndex: (!props.DispGalleries.display && props.galleries.length>1) ? 3: 0
                        }}>
                        {props.galleries.map((Gallery, i)=>{
                            return(
                                <>
                                    <Image className={styles.SlideImage} onClick={() => {setGalCounter(i), setTotImgs(Gallery.images.length), setImgCounter(0), setShowGal(false)}} src={Gallery.images[0]} width={props.width/3} height={props.height/3} alt="SliderComp" />
                                </>
                            )
                        })}
                    </div>
                }
            </div>
        </>
    );
}

export default React.memo(SliderCardComp)