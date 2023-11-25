/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement: import GoogleMapComp from '@/...path.../GoogleMapComp'
 and implemented as an html element with the tag 
 
 <GoogleMapComp
    data={
        {
            ApiKey: Application Key from .env.local file
            zoom: Range 1 to 14,
            lat: Latitude range -90 to 90,
            lng: Longitude range -180 to 180,
            styles:{width:'21%', height:'14rem'} //styles applicable for the main Div container
            markers: [
                {title:"Title string", descr:"Description string", lat:latitude number,lng:longitude number},
                ...
                {title:"Title string", descr:"Description string", lat:latitude number,lng:longitude number},
            ],
        }
    }/>

---------------------------------------------------------*/

import React, { useMemo, useState } from 'react'
import { GoogleMap,useLoadScript,Marker,InfoWindow } from "@react-google-maps/api";

function GoogleMapComp(props){

    const center = useMemo(()=>({lat:props.data.lat, lng:props.data.lng}),[])
    const [Selected,setSelected] = useState(null)

    const { isLoaded } = useLoadScript({
    googleMapsApiKey: props.data.ApiKey
    })
    if (!isLoaded) return <div>Loading...</div>

    return (
        <div className={'GoogleMapComp'} style={props.data.styles}>
            <GoogleMap //Map Library Component 
                zoom = {props.data.zoom} //Initial zoom
                center = {center} //Initial center
                mapContainerStyle={{ //Styles to fill at 100% the container of this component to be displayed
                    width: '100%',
                    height: '100%',
                }}
                mapContainerClassName='mapComponent' //Class assigned to all map library components to be used when styling and applies to the map directly no to its container
            >
                {props.data.markers.map((marker,i)=>{ //Array of points of interest (POI) to be displayed as markers
                    return(
                        <Marker //Marker library component
                            key={i} //Unique key based on the array index to automatic rerendering for React.
                            position={{
                                lat:marker.lat, //Latitude assigned to the current marker
                                lng:marker.lng, //Longitude assigned to the current marker
                            }}
                            onClick={()=>{setSelected(marker)}} // Function trigered when user clicks the marker
                            icon={{ //Image to be used as marker
                                url: "/Icons/MarkerIcon.png", //URL of the customized icon
                            }}
                        />
                    )
                })}
                {Selected && ( //If there has been selected a marker for the user then it displays an info window with details of that specific marker
                    <InfoWindow //Window for detailed information to be displayed for each specific marker
                        position={{ //Possition for the info window assigned at the same point of its own marker based on its latitune and longitude
                            lat:Selected.lat, //Info window latitude
                            lng:Selected.lng, //Info window longitude
                        }}
                        onCloseClick={()=>setSelected(null)} //When the user close the information windos it stablish the selected state to null to close the info window
                    >
                        <>
                            <h4 style={{color:"black"}}>{Selected.title}</h4>
                            <div style={{color:"black"}}>{Selected.descr}</div>
                        </>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
}

export default React.memo(GoogleMapComp)