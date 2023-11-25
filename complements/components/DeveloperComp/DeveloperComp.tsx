/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement: import Developer from '@/...path.../DeveloperComp'
 interface IDeveloper{
    author: string,
    copyright: string,
    date: string,
    version: string,
    styles?:{{}} // Optional inline styles
    classNames?: string // Optional multiple clases but the styling needs to be in the global styles
 }
 
 <Developer 
    author= {'Alain Y. Rivera S.'}
    copyright= {'Personal Portfolio'}
    date= {'Feb 3, 2023'}
    version= {'1.0.0'}
    className= {'AppDeveloper'}
    styles?:{{}}
    classNames?: string
 />
---------------------------------------------------------*/

import React, { useContext } from 'react';
import styles from './DeveloperComp.module.css';
import GlobalContext from '../GlobalContextComp/GlobalContextComp';

//Imported complements from other components
import ShareComp from '@/complements/components/ShareComp/ShareComp'

interface ILangsDeveloper{
    developed?: string,
    made?: string,
    version?: string,
}

interface IDeveloper{
    author?: string,
    copyright?: string,
    date?: string,
    version?: string,
    styles?: any,
    classNames?: string
    langs?: ILangsDeveloper
}

function Developer(props:IDeveloper){
    const { LangLegends } :any = useContext(GlobalContext)

    return (
        <>
            <div id={styles.AppDeveloper} className={props.classNames} style={props.styles}>
                {props.author && ((props.langs?.developed ? props.langs.developed : 'Developed by') + ': ' + props.author + '.')}
                {props.date && (' ' + (props.langs?.made ? props.langs.made : 'made') +': ' + props.date + '.')}
                {props.copyright && (' ' + props.copyright)}
                {props.version && (' ' + (props.langs?.version ? props.langs.version : 'version') +': ' + props.version + '.')}
            </div>
        </>
    )
}

export default React.memo(Developer)