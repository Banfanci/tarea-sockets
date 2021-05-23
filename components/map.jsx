import { MapContainer, TileLayer, Tooltip, Polyline, CircleMarker, LayerGroup, useMap, Circle} from 'react-leaflet'
import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css'
import { marker } from 'leaflet';

function MyLayer(props, ref) {
  const { defaultMarkers, socket } = props;
  const [markers, setMarkers] = useState(defaultMarkers);
  const [last, setLast] =useState({});
  const redOptions = { color: 'red' }

  useEffect(() => {
    socket.on('POSITION', newMarker => {
      setMarkers((existingMarkers) => [...existingMarkers, newMarker]);
      last[newMarker.code] = newMarker.position;
      setLast({...last});
    });
  }, []);
   
  return (
    <LayerGroup>
      {markers.map((marker, idx) => {
        return (
          <Circle
            key={idx}
            center={marker.position}
            radius={5}
          >
            <Tooltip>{marker.code}</Tooltip>
          </Circle>
        );
      })}
      {Object.keys(last).map((key) => {
        return (
          <CircleMarker
            key={key}
            center={last[key]}
            radius={3}
            pathOptions={redOptions}
          >
            <Tooltip>{`Actual ${key}`}</Tooltip>
          </CircleMarker>
        );
      })}
    </LayerGroup>
  );
}



const Map = ({places, socket}) => {
  const [markers, setMarkers] = useState([]);

  const teoricLineOptions = { color: 'lime', dashArray: '8'}
  const redOptions = { color: 'red' }
  const blueOptions = { color: 'blue' }

  return (
    <MapContainer center={[0,0]} zoom={2} scrollWheelZoom={false} style={{height: 600, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => (
        <CircleMarker key={`I-${place.code}`} center={place.origin} pathOptions={blueOptions} radius={5}>
          <Tooltip>{`Inicio ${place.code}`}</Tooltip>
        </CircleMarker>
      ))}

      {places.map((place) => (
        <CircleMarker key={`F-${place.code}`} center={place.destination} pathOptions={redOptions} radius={5}>
          <Tooltip>{`Fin ${place.code}`}</Tooltip>
        </CircleMarker>
      ))}

      {places.map((place) => (
        <Polyline key={`T-${place.code}`}  positions= {[place.origin, place.destination]} pathOptions={teoricLineOptions}>
          <Tooltip>{place.code}</Tooltip>
        </Polyline>
      ))}

      {/* {positions.map((position) => (
        <Circle key={`${position.code}-${position.position[0]}-${position.position[1]}`}  positions= {position.position} radius={5}>
          <Tooltip>{position.code}</Tooltip>
        </Circle>
      ))} */}
      <MyLayer defaultMarkers={markers} socket={socket} />
    </MapContainer>
  )
}

export default Map