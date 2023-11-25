/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement: import MapBoxMapComp from '@/...path.../MapBoxMapComp'
 and implemented as an html element with the tag 
 
 <MapBoxMapComp
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
import React , { useRef, useState } from 'react'
import ReactMapGL , { Marker, Popup, ViewState } from 'react-map-gl'

function MapBoxMapComp(props){
    const [Viewport,setViewport]= useState({ //Initial seetings for the MapBox Library component
        zoom: props.data.zoom, //Initial zoom defined in the data element component on each page
        latitude: props.data.lat, //Initial latitude defined in the data element component on each page
        longitude: props.data.lng, //Initial longitude defined in the data element component on each page
        width: '100%', //Initial width at 100% to fill the element container
        height: '100%', //Initial height at 100% to fill the element container
    })
    const [Selected,setSelected]=useState(null)

    return (
        <div className={'MapBoxComp'} style={props.data.styles}>
            <ReactMapGL 
                {...Viewport}
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_COMPONENT_MapBox_token_apiKey}
                onViewportChange={Viewport=>{setViewport(Viewport)}}
                mapStyle={'mapbox://styles/alain0106/ckp8tpdan101l18mmd7bxn0tu'}

            >
                {props.data.markers.map((marker,i)=>{
                    return(
                        <Marker
                            key={i}
                            latitude={marker.lat}
                            longitude={marker.lng}
                        >
                            <button onClick={(e)=>{e.preventDefault, setSelected(marker)}} style={{backgroundColor:'transparent',border:'none'}}>
                                <img src="/Icons/LocIcon.png" alt="marker" width={25} height={25}/>
                            </button>
                        </Marker>
                    )
                })}
                {Selected && (
                    <Popup latitude={Selected.lat} longitude={Selected.lng} onClose={()=>{setSelected(null)}}>
                        <h4 style={{backgroundColor:'transparent', border:'none', color:'black'}}>{Selected.title}</h4>
                        <p style={{backgroundColor:'transparent', border:'none', color:'black'}}>{Selected.descr}</p>
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    )
}

export default React.memo(MapBoxMapComp)