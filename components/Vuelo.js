
import React from 'react';

export const Vuelo = ({vuelo}) => {
    return (
        <div className="vueloContainer backgroundLight">
          <p className="vueloText colorDark">{`${vuelo.code}-${vuelo.airline}-${vuelo.plane}`}</p>
          <p className="vueloText colorDark">{`[${vuelo.origin}] -> [${vuelo.destination}]`}</p>
          <p className="vueloText colorDark">{`Capacidad: ${vuelo.seats}`}</p>
          <div className="pasajeros">
            {vuelo.passengers.map((pasajero, i) => <p className="pasajerosText colorDark">{`|${pasajero.name}(${pasajero.age})|`}&nbsp;</p>)}
          </div>
        </div>
    ) 
};