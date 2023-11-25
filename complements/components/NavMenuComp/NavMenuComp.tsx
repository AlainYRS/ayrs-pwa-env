/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 The component has to be imported as:
 import NavMenu from 'this component path'
 and implemented as an html element with the tag giving its intarface parameters as:
    <NavMenu 
        logo={{
            path: '/Icons/manifest_icons/MaskableIcon.png',
            alt: 'Home Header Logo',
        }}
        menus={[
            {
            menu: LangLegends['Header.menu1'],
            link: '/',
            onClick: (params)=>{handleClickMenu(params)}
            },...
        ]}
        idioms={{
            LangsFlags:[
            {
            Lng: 'en',
            Icon: '/Icons/Flags/ENlng.png',
            },...
            ],
            setLocalState: setLocale
        }}
        signin={{
            legend: LangLegends['Header.signin'],
            function: (e:any)=>{e.preventDefault();console.log('HandleSignIn Function')},
        }}
    />
---------------------------------------------------------*/
import React, { useEffect, useState, useContext, ReactComponentElement } from 'react'
import GlobalContext from '../GlobalContextComp/GlobalContextComp';
//Libraries
import Link from 'next/link';
import Image from 'next/image';
//styles
import styles from './NavMenuComp.module.css';//Default Styles for the Header component

interface IFlagLang{//Interface for the languages and flags
    Lng: string,//Language code
    Icon: string,//Flag icon path
}

interface ILanguages{//Interface for the languages and Locale state
    LangsFlags: IFlagLang[],//Array of languages and flags based on the interface IFlagLang
    setLocalState: any,//Function to set the language state to be used in the app
}

interface IMenus{//Interface for the menus
    menu: string,//Menu name
    link?: string,//Link to be redirected when the menu is clicked
    onClick?: any,//Function to be executed when the menu is clicked
}

interface ISignIn{//Interface for the SignIn button
    legend: string,//Legend for the SignIn button
    function: any,//Function to be executed when the SignIn button is clicked
}

interface ILogo{//Interface for the Logo
    path: string,//Logo path
    alt: string | '',//Logo alt text optional
}

interface ICheckOut{
    Icon: string,
    Legend: string,
    Link: any,
}

interface IHeadersMenu{ //Interface for the component
    logo?: ILogo, //Optional logo string path
    menus?: IMenus[], //Optional menus array based on the interface IMenus
    idioms?: ILanguages, //Optional languages array based on the interface ILanguages
    signin?: ISignIn, //Optional sign in object based on the interface ISignIn
    CheckOut?: ICheckOut, //Optional sign in object based on the interface ISignIn
}

function NavMenu(props: IHeadersMenu){//Header component
    const {HideHeaderFooterMenuBottom}:any = useContext(GlobalContext)
    
    return (//Return the component
        <div id={HideHeaderFooterMenuBottom ? styles.showHeader : styles.hideHeader}>
            <div className={styles.Header}> {/*Header Container*/}
                {props.logo && //If the logo is passed as a parameter
                        <Link href="/"> {/*Link to the home page*/}
                            <div className={styles.HeaderLogo}> {/*Logo Container*/}
                                <Image src={props.logo.path} fill alt={props.logo.alt}/> {/*Logo Image*/}
                            </div>
                        </Link>
                }
                <div>   {/*Menus Container*/}
                    <div className={styles.MenusContainer}> {/*Menus Container*/}
                        {props.menus?.map((menu:any, i:any)=>{ //If the menus are passed as a parameter
                                return( //Return the menus
                                    <Link href={menu.link} onClick={menu.onClick} className={styles.MenuButton} key={i}>{menu.menu}</Link> //Menu button
                                )
                            })
                        }
                    </div>
                </div>
                {props.idioms?.LangsFlags && //If the languages are passed as a parameter
                    <div className={styles.FlagLangsContainer}>     {/*Languages Container*/}
                        {props.idioms?.LangsFlags.map((Lng:any, i:any)=> //Map the languages
                            <div key={i} className={styles.HeaderFlagsLngs}> {/*Language Container*/}
                                <Image onClick={() => { props.idioms?.setLocalState(Lng.Lng) }} src={Lng.Icon} width={21} height={21} alt="Language Flag"/> {/*Language Flag*/}
                            </div>
                        )}
                    </div>
                }
                {props.signin &&  //If the sign in button is passed as a parameter
                    <button className={styles.SignInButton} onClick={props.signin.function}>{props.signin.legend}</button> //Sign in button
                }
                {props.CheckOut && //If the ShoppingCart is passed as parameter
                    <div className={styles.CheckOutButton}>
                        <Link href={props.CheckOut.Link}>
                            <Image src={props.CheckOut.Icon} fill alt={props.CheckOut.Legend}/>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default React.memo(NavMenu);    //Export the component