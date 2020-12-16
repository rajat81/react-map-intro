import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";
import "./styles.css";
import mapStyles from "./mapStyles";

const lib = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};
const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
};
const center = {
  lat: 43.653225,
  lng: -79.383186
};
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: lib
  });

  const [markers, setMarkers] = React.useState([]);

  if (loadError) return "Error: load error while connecting to google API";
  if (!isLoaded) return "Loading maps...";
  //if (!loadError) return "loaded";
  return (
    <div className="App">
      <h1>Mark your marks</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
            }
          ]);
          console.log(markers.lat, markers.lng, markers.time);
        }}
      ></GoogleMap>
    </div>
  );
}
