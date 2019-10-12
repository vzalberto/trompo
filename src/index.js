import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
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

  const [aux, setAux] = useState(initDiscos.d)

  const toggleA = () => {
     if (aux.length === 0){
      setAux ([torreA.pop()])
      setTorreA(torreA)
    }else{
      torreA.push(aux[0])
      setTorreA(torreA)
      setAux([])
    }
  }

  const toggleB = () => {
     if (aux.length === 0){
      setAux ([torreB.pop()])
      setTorreB(torreB)
    }else{
      torreB.push(aux[0])
      setTorreB(torreB)
      setAux([])
    }
  }

  const toggleC = () => {
     if (aux.length === 0){
      setAux ([torreC.pop()])
      setTorreC(torreC)
    }else{
      torreC.push(aux[0])
      setTorreC(torreC)
      setAux([])
    }
  }

  useEffect(()=>{
    console.log(aux)
    console.log('torre A: ', torreA)
    console.log('torre B: ', torreB)
    console.log('torre C: ', torreC)

    if(torreA.length == 6|| torreB.length == 6 || torreC.length == 6){
      alert('🌮🌮🌮')
      setTorreA(initDiscos.a)
      setTorreB(initDiscos.b)
      setTorreC(initDiscos.c)
    }
  }, [aux, torreA, torreB, torreC])

  return (
      <div>
        <div className={"hand"}><Trompo discs={aux || []} zoom={1}/></div>
        <div className={"hanoi"} onClick={toggleA}><Trompo discs={torreA} zoom={3} /></div>
        <div className={"hanoi"} onClick={toggleB}><Trompo discs={torreB} zoom={3} /></div>
        <div className={"hanoi"} onClick={toggleC}><Trompo discs={torreC} zoom={3} /></div>
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
