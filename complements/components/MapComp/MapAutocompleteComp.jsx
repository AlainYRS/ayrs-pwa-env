/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 Type: Component
 Import statement: import MapAutocompleteComp from '@/...path.../MapAutocompleteComp'
 and implemented as an html element with the tag 
 
 <MapAutocompleteComp
    data={
      {
        label:"Search Bar",
        Placeholder:"Type your search",
        delay:210, //Miliseconds
        ReturnState:setAddressSelected, //state that retrieve the result[0] from this component to be used forward
        Libraries:["places"], //Google Library
        Country:['ca','us','mx','co','fr'], //Until 5 countries restricted for the search
        Types:['address', 'establishment', 'geocode', '(cities)', '(regions)'],//address, establishment, geocode, (cities), (regions)
        DivStyles:{width:'21%',height:'14rem'}, //
        MyStyles:{ backgroundColor: "white", color: "black", borderRadius:"7px", padding: "3.5px", zIndex:"10"}, //Inputbox styles
        ApiKey: Application Key from .env.local file
      }
    }/>

---------------------------------------------------------*/

import React, {useEffect, useState, useMemo} from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { GoogleMap,useLoadScript,Marker,InfoWindow } from "@react-google-maps/api";
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";

function MapAutocompleteComp(props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: props.data.ApiKey,
        libraries: props.data.Libraries
    });
  
    if (!isLoaded) return <div>Loading...</div>;
    return <Map props={props.data}/>;
  }
  
  function Map({props}) {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []); //PENDIENTE LAT LNG
    const [selected, setSelected] = useState(null);
  
    return (
      <div className={'MapAutocompleteComp'} style={props.DivStyles}>
        <div className="places-container">
          <PlacesAutocomplete 
            setSelected={setSelected}
            props={props}
            />
        </div>
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          style={{width:'100%', heigh:'100%'}}
          >
            {selected && <Marker position={selected} />}
            <p>Y el mapa?</p>
        </GoogleMap>
      </div>
    )
  }

  const PlacesAutocomplete = ({ setSelected, props }) => {
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
  };

export default React.memo(MapAutocompleteComp)