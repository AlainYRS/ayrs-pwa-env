/*---------------------------------------------------------
 ------------- README FUNCTION INSTRUCTIONS: --------------
 Type: Component
 Import statements:
    import CookiesComp from  '@/...path.../Cookiesfunc'
 Import Modules:
    import { getCookie, getCookies, setCookie, deleteCookie } from 'cookies-next';

 Instructions:

    1) Create a state to save and retrieve the user election. It can be locally at the page to be used or as a global user context (Recomended).
    const [UsrCookie,setUsrCookie] = useState(null)

    2) Import component statement and Modules statement in the page to be used as described above. This will show the modal form for the user election.
    import CookiesComp from  '@/...path.../Cookiesfunc'
    import { getCookie, getCookies, setCookie, deleteCookie } from 'cookies-next';

    3) Insert the component as follow: (This will display the Cookies modal form ONLY IF it hasn't been selected before by the user)
    {UsrCookie == null && 
        <CookiesComp 
            setState={setUsrCookie} //Pass the state defined in step 1 to the required parameter "setState"
            coockieTitle={LangLegends['Cookie.Title']}
            coockieAccept={LangLegends['Cookie.Accept']}
            coockieReject={LangLegends['Cookie.Reject']}
            coockieRead={LangLegends['Cookie.Read']}
            coockieIcon='/Icons/DayNightIcon.png'
            contract={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus incidunt quas vero deserunt molestiae voluptates, natus nobis. Magnam odio libero, ullam sequi dolores id tempora. Aliquid in hic saepe.'}
        />}

    4) Make use of next commands to set, get or delete the cookies:
        setCookie('key','value') // Set the pair key, value cookie
        getCookie('key') // Retrieve the value of a specific cookie 
        getCookies() // Retrieve all cookies set before
        deleteCookie('key'} // Delete the specified cookie

    5) Optional tool: Make use of below code to validate the cookies funcionality (Sample based on Global User Context)

    const [LocalCookies, setLocalCookies] = useState(getCookies())
    useEffect(()=>{
        setEnvironment({...Environment, Cookies: UsrCookie})
        if (UsrCookie){setEnvironment({...Environment, CookiesSaved: getCookies()})}
        else if (!UsrCookie){setEnvironment({...Environment, CookiesSaved: null})}
        
        THE NEXT COMMENTED LINE BELOW DISABLE THE ESLINT REQUIREMENT TO ADD 'Environment.UserContext.UserSeeting.Navigation' TO THE DEPENDENCY ARRAY SO IT HAS TO BE THERE

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[UsrCookie, LocalCookies])

    {UsrCookie !== null &&
        <div>
        <button onClick={()=>{
            setCookie('key','value')
            setLocalCookies(getCookies())
            }}>set cookie 'Key'</button>
        <button onClick={()=>{
            getCookie('key')
            alert(getCookie('key'))
            }}>get cookie 'Key'</button>
        <button onClick={()=>{
            getCookies()
            console.log(Environment.UserContext.UserSeeting.Navigation.CookiesSaved)
            }}>get all cookies</button>
        <button onClick={()=>{
            deleteCookie('key')
            setLocalCookies(getCookies())
        }}>delete cookie 'Key'</button>
        </div>
    }
---------------------------------------------------------*/
//Libraries
import React, { useState } from 'react'
import Image from 'next/image'
import { getCookie, getCookies, setCookie, deleteCookie } from 'cookies-next';
//Styles
import styles from './CookiesComp.module.css'

interface ICookie{
    contract: string,
    setState: any,
    coockieTitle: string
    coockieAccept: string,
    coockieReject: string,
    coockieRead: string,
    coockieIcon: string
    styles?: {},
    classNames?: string,
}

export default function CookiesComp(props: ICookie){
    const [ViewCookiesContract, setViewCookiesContract] = useState(false)
    return (
        <>
            <div className={styles.CookiePoint}>
                <p className={styles.CookieLegend}>{props.coockieTitle}</p>
                    <div className={styles.Btns}>
                        <div className={styles.cookieBtn} onClick={() => {props.setState(false), setViewCookiesContract(false)}}>
                            <p className={styles.BtnLegend}>{props.coockieReject}</p>
                        </div>
                        <div className={styles.cookieBtn} onClick={() => {props.setState(true), setViewCookiesContract(false)}}>
                            <p className={styles.BtnLegend}>{props.coockieAccept}</p>
                        </div>
                    </div>
                    <div>
                        <Image
                            id={styles.Coockimage}
                            src={props.coockieIcon}
                            alt="Cookies"
                            width={35}
                            height={35}
                        />
                    </div>
                <span id={styles.cookiesnotification} className={props.classNames} onClick={()=>setViewCookiesContract(!ViewCookiesContract)}>{props.coockieRead}</span>
            </div>
            {ViewCookiesContract && 
                <div className={styles.coockieWindow} style={props.styles}>
                    <div className={styles.contract}>{props.contract}</div>
                    <button className={styles.cookieBtn} onClick={()=>setViewCookiesContract(!ViewCookiesContract)}>Close</button>
                </div>
            }
        </>
    )
}