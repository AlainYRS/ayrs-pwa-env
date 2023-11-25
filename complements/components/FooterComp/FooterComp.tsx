/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement: import Footer from '@/...path.../FooterComp'
 interface IFooter{
    author: string,
    copyright: string,
    date: string,
    version: string,
    styles?:{{}} // Optional inline styles
    classNames?: string // Optional multiple clases but the styling needs to be in the global styles
 }
 
 <Footer 
    author= {'Alain Y. Rivera S.'}
    copyright= {'Personal Portfolio'}
    date= {'Feb 3, 2023'}
    version= {'1.0.0'}
    className= {'AppFooter'}
    styles?:{{}}
    classNames?: string
 />
---------------------------------------------------------*/

import React, { useContext } from 'react';
import styles from './FooterComp.module.css';
import Image from 'next/image';

//Imported complements from other components
import ShareComp from '@/complements/components/ShareComp/ShareComp';
import Link from 'next/link';

interface IMapSiteLinks{
    Label: string //
    TagName: string //
}

interface IGetInTouch{
    ContactButton: boolean // Flag to 
    Label: string // Legend contained in contact button
}

interface IFooter{
    MapSiteLinks?: IMapSiteLinks[]
    GetinTouchComp?: string | "Contact"
}

function Footer(props:IFooter){

    return (
        // Social Media, Mapa del sitio, Contacto. 
        <>
            <div className={styles.AppFooter}>
                <div className={styles.Mapsite}>
                    {props.MapSiteLinks?.map((LinkMenu, i:any)=>{ //If the menus are passed as a parameter
                        return( //Return the menus
                        <Link href={LinkMenu.TagName} className={styles.MapSiteLink} key={i}>{LinkMenu.Label}</Link> //Menu button
                        )
                    })}
                </div>
                <div id={styles.AppFooter}>
                    <div className={styles.SocialMed}>
                        <ShareComp 
                            styles={{margin:"3.5px"}}
                            IconSize={28}
                            facebook={{
                                url:'https://www.facebook.com/elpatronbarandgrill?mibextid=LQQJ4d'
                            }}
                        />
                        <a href="https://www.instagram.com/elpatron_leamington/?igshid=NTc4MTIwNjQ2YQ%3D%3D" target="_blank" rel="noopener noreferrer">
                            <Image src={'/Icons/InstaIcon.png'} style={{borderRadius:'50px'}} width={30} height={30} alt={'Instagram'}/>
                        </a>
                    </div>
                </div>
                {props.GetinTouchComp && 
                    <Link href="/GetInTouch" className={styles.ContactBotton}>{props.GetinTouchComp}</Link>
                }
            </div>
        </>
    )
}

export default React.memo(Footer)