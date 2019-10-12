import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import { Illustration, Cylinder } from 'react-zdog'

import { StateProvider, useStateValue } from './state';
import './styles.css'

// TAU representa una vuelta completa a un círculo, a.k.a. 360º
const TAU = Math.PI * 2

const discos = {
  a: [{diameter:70,backface:"#f3de72", }, {diameter:60,backface:"#782d21"}, {diameter:10,backface:"#e5af2a", color:"#71471f"}],
  b: [{diameter:20,backface:"#63b043", color:"#377d1e"}],
  c: [{diameter:50,backface:"#c1572f"}, {diameter:40,backface:"#ffa500", color:"#573a29"}]
}

function Trompo (props) {
  const [discs, setDiscs] = useState(props.discs)
  const [aux, setAux] = useState({})

  const initialState = {
    towers: [
      [{diameter:70,backface:"#f3de72", }, {diameter:60,backface:"#782d21"}, {diameter:10,backface:"#e5af2a", color:"#71471f"}],
      [{diameter:20,backface:"#63b043", color:"#377d1e"}],
      [{diameter:50,backface:"#c1572f"}, {diameter:40,backface:"#ffa500", color:"#573a29"}]
    ]
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };
        
      default:
        return state;
    }
  };
 

  // Elimina el último elemento del arreglo y lo asigna al global state
  const pizza = () => {

    if(Object.entries(aux).length === 0 && aux.constructor === Object){
      //Se toma el último disco en un auxiliar
      const disc = discs[discs.length - 1]
      setAux(disc)

      //Se actualiza el arreglo de discos
      setDiscs(discs.slice(0, discs.length - 1))
    }
    else {
      //Si ya se tiene un auxiliar, se añade al arreglo de discos y se elimina del state
      setDiscs([...discs, aux])
      setAux({})
    }
  };

  useEffect(()=>{})

  const discos = discs.map((d,i) => {
    return <Cylinder 
      key={i} 
      diameter={d.diameter} 
      translate={{z:3*i}} 
      length={3} 
      color={d.color || "#7c2c22"} 
      stroke={false} 
      backface={d.backface} />
  });

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Illustration onClick={pizza} className={"portal"} zoom={props.zoom} rotate={{ x: TAU / 8 }}>
        {discos}
      </Illustration>
    </StateProvider>
 )
}

ReactDOM.render(
  <div id="container">
    <Trompo discs={discos.a} zoom={3}/>
    <Trompo discs={discos.b} zoom={3}/>
    <Trompo discs={discos.c} zoom={3}/>
  </div>
 ,
  document.getElementById('root')
)
