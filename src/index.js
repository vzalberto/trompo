import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import { Illustration, Cylinder } from 'react-zdog'

import './styles.css'

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(!isEquivalent(arr1[i], arr2[i]))
            return false;
    }

    return true;
}

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
      <Illustration className={"portal"} dragRotete={true} zoom={props.zoom} rotate={{ x: TAU / 8 }}>
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

  const ordenCorrecto = [initDiscos.a[0], initDiscos.a[1], initDiscos.c[0], initDiscos.c[1], initDiscos.b[0], initDiscos.a[2]]

  const [torreA, setTorreA] = useState(initDiscos.a)
  const [torreB, setTorreB] = useState(initDiscos.b)
  const [torreC, setTorreC] = useState(initDiscos.c)

  const [aux, setAux] = useState(initDiscos.d)

  const toggleA = () => {
     if (aux.length === 0){
      if(torreA.length > 0){       
        setAux ([torreA.pop()])
        setTorreA(torreA)
      }
    }else{
      torreA.push(aux[0])
      setTorreA(torreA)
      setAux([])
    }
  }

  const toggleB = () => {
     if (aux.length === 0){

      if(torreB.length > 0){ 
      setAux ([torreB.pop()])
      setTorreB(torreB)}
    }else{
      torreB.push(aux[0])
      setTorreB(torreB)
      setAux([])
    }
  }

  const toggleC = () => {
     if (aux.length === 0){

      if(torreC.length > 0){ 
      setAux ([torreC.pop()])
      setTorreC(torreC)
    }
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
      //Si alguna torre está en el orden correcto, win
      console.log(torreA, ordenCorrecto)
      if (arraysEqual(torreA, ordenCorrecto) ||arraysEqual(torreB, ordenCorrecto) ||arraysEqual(torreC, ordenCorrecto)) 
        alert('🌮🌮🌮')
      else
        alert('😳😡👎')

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
