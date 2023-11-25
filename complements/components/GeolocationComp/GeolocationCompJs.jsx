export default function enableGeolocationFunc(props){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function onSuccessGeolocating(position) {
          props.setState({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              datenow: new Date(position.timestamp),
              locale: navigator.language,
              lngs: navigator.languages,
          })
          },
          function onErrorGeolocating(error) {
              let message = null
              switch (error.code) {
                  case error.PERMISSION_DENIED:
                  message = props.Msg_denied
                  break;
                  case error.POSITION_UNAVAILABLE:
                  message = props.Msg_unavailable
                  break;
                  case error.TIMEOUT:
                  message = props.Msg_timeout
                  break;
                  default:
                  message = props.Msg_unknown
                  break;
              }
          },
          {
              enableHighAccuracy: true,
          }
      )}
  else {
      let message =  props.Msg_not_supported
  }
}