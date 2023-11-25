/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement: import Footer from '@/...path.../MenuBottomComp'
 provide the intarfeces parameters based on the interface IFooter
    <MenuBottomComp 
    menus={[
        {
        menu: 'Menu Title 1',
        link: '/',
        onClick: (e:any)=>{e.preventDefault();console.log('click1')}
        },
        {
    ]}
    />
---------------------------------------------------------*/
//Libraries
import React, { useEffect, useContext } from 'react'
import GlobalContext from '../GlobalContextComp/GlobalContextComp';
//styles
import styles from './MenuBottomComp.module.css';//Default Styles for the Header component

interface IMenus{//Interface for the menus
    menu: string,//Menu name
    link?: string,//Link to be redirected when the menu is clicked
    onClick?: any,//Function to be executed when the menu is clicked
}

interface IMenuBottom{ //Interface for the component
    menus?: IMenus[], //Optional menus array based on the interface IMenus
    styles?: {}, //Optional inline styles
    classNames?: string, //Optional multiple clases but the styling need to be in the global styles or in the component styles
}

function MenuBottomComp(props:IMenuBottom){ //MenuBottom component
    const {HideHeaderFooterMenuBottom}:any = useContext(GlobalContext)

    return ( //Return the component
        <div id={HideHeaderFooterMenuBottom ? styles.showMenuBottom : styles.hideMenuBottom} >
            <div id={styles.MenuBottom} className={props.classNames} style={props.styles}> {/*MenuBottom Container*/}
                <div className={styles.MenusContainer}> {/*Menus Container*/}
                    {props.menus?.map((menu:any, i:any)=>{ //If the menus are passed as a parameter
                            return( //Return the menus
                                <a href={menu.link} onClick={menu.onClick} className={styles.MenuButton} key={i}>{menu.menu}</a> //Menu button
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(MenuBottomComp) //Export the component