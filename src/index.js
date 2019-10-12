import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { Illustration, Cylinder } from 'react-zdog'

import './styles.css'

// TAU representa una vuelta completa a un círculo, a.k.a. 360º
const TAU = Math.PI * 2

const Trompo = (props) => {

  const discos = props.discs ? props.discs.map((d,i) => {
    return <Cylinder 
      key={i} 
      diameter={d.diameter} 
      translate={{z:3*i}} 
      length={3} 
      color={d.color || "#7c2c22"} 
      stroke={false} 
      backface={d.backface} />
  }) : '';

  return (
      <Illustration className={"portal"} zoom={props.zoom} rotate={{ x: TAU / 8 }}>
        {discos}
      </Illustration>
  )
}

const Hanoi = () => {
  const initDiscos = {
    a: [{diameter:70,backface:"#f3de72", }, {diameter:60,backface:"#782d21"}, {diameter:10,backface:"#e5af2a", color:"#71471f"}],
    b: [{diameter:20,backface:"#63b043", color:"#377d1e"}],
    c: [{diameter:50,backface:"#c1572f"}, {diameter:40,backface:"#ffa500", color:"#573a29"}],
    d: []
  }

  const [torreA, setTorreA] = useState(initDiscos.a)
  const [torreB, setTorreB] = useState(initDiscos.b)
  const [torreC, setTorreC] = useState(initDiscos.c)

  const [aux, setAux] = useState({})

  const toggleA = () => {
    
    setTorreA([])
  }

  return (
      <div>
        <div onClick={toggleA}>torre A</div>
        <Trompo discs={torreA} zoom={3} />
        <Trompo discs={torreB} zoom={3} />
        <Trompo discs={torreC} zoom={3} />
      </div>
      )
} 

ReactDOM.render(
  <div id="container">
    <Hanoi />
  </div>
 ,
  document.getElementById('root')
)
