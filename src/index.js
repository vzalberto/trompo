import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import { Illustration, Cylinder } from 'react-zdog'

import './styles.css'

// TAU representa una vuelta completa a un círculo, a.k.a. 360º
const TAU = Math.PI * 2

function Trompo (props) {
  const [discs, setDiscs] = useState(props.discs)
  const [aux, setAux] = useState({})

  // Elimina el último elemento del arreglo y lo asigna al global state
  const pizza = () => {
    console.log(aux)

    const disc = discs[discs.length - 1]

    setAux({disc})
    setDiscs(discs.slice(0, discs.length - 1))
  };

  useEffect(()=>{})

  const el = discs.map((d,i) => {
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
    <Illustration onClick={pizza} className={"portal"} zoom={props.zoom} rotate={{ x: TAU / 8 }}>
    {el}
    </Illustration>
 )
}

ReactDOM.render(
  <div id="container">
    <Trompo discs={[{diameter:70,backface:"#f3de72"}, {diameter:60,backface:"#c1572f"}, {diameter:10,backface:"#c1ad90"}]} zoom={3}/>
    <Trompo discs={[{diameter:70,backface:"#D72638"}, {diameter:60,backface:"#E6C229"}, {diameter:50,backface:"#F58A07"}, {diameter:40,backface:"#8EA604"}, {diameter:30,backface:"#00A6ED"}, {diameter:20,backface:"#006BA6"}, {diameter:10,backface:"#EF476F"}]} zoom={3}/>
    <Trompo discs={[{diameter:70,backface:"#f3de72"}, {diameter:60,backface:"#6c1a10", color:"#000"}, {diameter:50,backface:"#c1572f"}, {diameter:40,backface:"#E6C229"}, {diameter:10,backface:"#c1ad90"}]} zoom={3}/>
  </div>
 ,
  document.getElementById('root')
)
