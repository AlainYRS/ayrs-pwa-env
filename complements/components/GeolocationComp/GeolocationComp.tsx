/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement:
 import GeolocationComp from '@/...path.../GeolocationComp'
 Add one states to retrive the uer location:

 const [ Location, setLocation ] = useState() //Has to be empty.

 Implement the component based on this component interface.
    <GeolocationComp 
        GeoIcon={'/Icons/CountryIcon.png'} //Icon
        GeoLabel={LangLegends['Geolocation.enable']} //Optional Label
        classNames={''} //optional classes
        styles={{width:'28px', height:'28px'}} //optional styles
        Msg_denied={LangLegends['Geolocation.denied']} //message to retrieve when the geolocation has been denied
        Msg_unavailable={LangLegends['Geolocation.unavailable']} //message to retrieve when the geolocation is unavailable
        Msg_timeout={LangLegends['Geolocation.timeout']} //message to retrieve when the time has run out
        Msg_unknown={LangLegends['Geolocation.unknown']}  //message to retrieve when the geolocation is unknown
        Msg_not_supported={LangLegends['Geolocation.not_supported']} //message to retrieve when the geolocation is not supported by the navigator
        setState={setLocation}  //State to retrieve the User location data (Latitude, Longitude, Locales, Locale, DateTime) to be used.
    />
---------------------------------------------------------*/
import React from "react";
import Image from "next/image";
import styles from './GeolocationComp.module.css'
import enableGeolocationFunc from './GeolocationCompJs'

interface IGeolocation{
    GeoIcon: string,
    GeoLabel?: string,
    classNames?: any,
    styles?: any,
    Msg_denied: string,
    Msg_unavailable: string,
    Msg_timeout: string,
    Msg_unknown: string,
    Msg_not_supported: string,
    setState: any,
}

export default function GeolocationComp(props:IGeolocation){
    return(
        <div id={styles.GeoComp}  onClick={()=>{enableGeolocationFunc(props)}}>
            <div id={styles.GeolocationComp} className={props.classNames} style={props.styles}>
                <Image
                    src={props.GeoIcon}
                    alt="Geolocation"
                    fill
                />
            </div>{props.GeoLabel}
        </div>
    )
}