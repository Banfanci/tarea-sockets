import React from 'react';

import {Vuelo} from './Vuelo'

export const Vuelos = ({ vuelos }) => (
    <div className="lista-vuelos">
        <p className="vuelosTitle">Vuelos</p>
        {vuelos.map((vuelo, i) => <div key={i}><Vuelo vuelo={vuelo} /></div>)}
    </div>
);