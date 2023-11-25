import React, {useEffect, useState, useMemo} from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { GoogleMap,useLoadScript,Marker,InfoWindow } from "@react-google-maps/api";
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";

function AutocompleteComp(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: props.data.ApiKey,
        libraries: props.data.Libraries
    });
  
    if (!isLoaded) return <div>Loading...</div>;
    return <Autocomplete props={props.data}/>;
  }
  
  function Autocomplete({props}) {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []); //PENDIENTE LAT LNG
    const [selected, setSelected] = useState(null);
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: "Callback Function",
        types: ['(cities)'],
        componentRestrictions:{
          country:props.Country
        },
        types: props.Types,
        requestOptions: {
        fields: ['address_component', 'adr_address', 'business_status', 'formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'type', 'url', 'utc_offset', 'vicinity'],
        },
      debounce: props.delay,
    });
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
        ReturnState({ address: address, lat: lat, lng: lng, selected: results[0] })
        return ({ address: address, lat: lat, lng: lng, selected: results[0] });
      } catch (error) {
        console.error(`😱 Error:`, error);
      }
    }

    return (
      <label htmlFor="search">{props.label}
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            aria-labelledby="demo"
            id="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="combobox-input"
            style={props.MyStyles}
            placeholder={props.Placeholder}
            autoComplete="off"
            disabled={!ready}
          />
          <ComboboxPopover style={props.MyStyles}>
            <ComboboxList aria-labelledby="demo" style={props.MyStyles}>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </label>
    );
  }

export default React.memo(AutocompleteComp)


// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: props.data.ApiKey
// })
// if (!isLoaded) return <div>Loading...</div>

// const center = useMemo(()=>({lat:props.data.lat, lng:props.data.lng}),[])
// const [Selected,setSelected] = useState(null)



    // return (
    //     <GoogleMap //Map Library Component 
    //         zoom = {props.data.zoom} //Initial zoom
    //         center = {center} //Initial center
    //         mapContainerStyle={{ //Styles to fill at 100% the container of this component to be displayed
    //             width: '100%',
    //             height: '100%',
    //         }}
    //         mapContainerClassName='mapComponent' //Class assigned to all map library components to be used when styling and applies to the map directly no to its container
    //     >
    //         {/* {console.log(props.data)} */}
    //         {/* {props.data.markers.map((marker,i)=>{ //Array of points of interest (POI) to be displayed as markers
    //             return(
    //                 console.log(marker, i)
    //                 // <Marker //Marker library component
    //                 //     key={i} //Unique key based on the array index to automatic rerendering for React.
    //                 //     position={{
    //                 //         lat:marker.lat, //Latitude assigned to the current marker
    //                 //         lng:marker.lng, //Longitude assigned to the current marker
    //                 //     }}
    //                 //     onClick={()=>{setSelected(marker)}} // Function trigered when user clicks the marker
    //                 //     icon={{ //Image to be used as marker
    //                 //         url: "/Icons/MarkerIcon.png", //URL of the customized icon
    //                 //     }}
    //                 // />
    //             )
    //         })} */}
    //         {Selected && ( //If there has been selected a marker for the user then it displays an info window with details of that specific marker
    //             <InfoWindow //Window for detailed information to be displayed for each specific marker
    //                 position={{ //Possition for the info window assigned at the same point of its own marker based on its latitune and longitude
    //                     lat:Selected.lat, //Info window latitude
    //                     lng:Selected.lng, //Info window longitude
    //                 }}
    //                 onCloseClick={()=>setSelected(null)} //When the user close the information windos it stablish the selected state to null to close the info window
    //             >
    //                 <h4 style={{color:"black"}}>{Selected.title}</h4>
    //                 <div style={{color:"black"}}>{Selected.descr}</div>
    //             </InfoWindow>
    //         )}
    //     </GoogleMap>
    // )
