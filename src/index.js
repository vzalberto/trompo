import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import { Illustration, Cylinder } from 'react-zdog'

import './styles.css'

import Tone from 'tone';

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
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
      <Illustration className={"portal"} dragRotate={true} zoom={props.zoom} rotate={props.rotation}>
        {discos}
      </Illustration>
  )
}

const Hanoi = () => {

const synth = new Tone.Synth().toMaster();
const synth2 = new Tone.Synth().toMaster();
const synth3 = new Tone.Synth().toMaster();

  const initDiscos = {
    a: [{diameter:70,backface:"#f3de72", }, {diameter:60,backface:"#782d21"}, {diameter:50,backface:"#c1572f"}, {diameter:10,backface:"#e5af2a", color:"#71471f"}],
    b: [{diameter:20,backface:"#63b043", color:"#377d1e"}],
    c: [{diameter:40,backface:"#ffa500", color:"#573a29"}],
    d: []
  }

  const sounds = {70:'b', 60:'a', 50:'g', 40:'f', 30:'e', 20: 'd', 10:'c'}

  const ordenCorrecto = [initDiscos.a[0], initDiscos.a[1], initDiscos.a[2], initDiscos.c[0], initDiscos.b[0], initDiscos.a[3]]

  const [torreA, setTorreA] = useState(initDiscos.a)
  const [torreB, setTorreB] = useState(initDiscos.b)
  const [torreC, setTorreC] = useState(initDiscos.c)
  const [moveCount, setMoveCount] = useState(0)

  const [illoRotation, setIlloRotation] = useState({x: TAU / 7})

  const [aux, setAux] = useState(initDiscos.d)

  const toggleA = () => {
     if (aux.length === 0){
      if(torreA.length > 0){  
      const pop =    torreA.pop()  
        setAux ([pop])
      synth.triggerAttackRelease(sounds[pop.diameter]+"4", "8n");
        setTorreA(torreA)
      }
    }else{
      if( torreA.length === 0 || torreA[torreA.length-1].diameter > aux[0].diameter){ 
      torreA.push(aux[0])

      synth.triggerAttackRelease(sounds[aux[0].diameter]+"3", "8n");
      setMoveCount(moveCount + 1)
      setTorreA(torreA)
      setAux([])
    }
        else{
          synth.triggerAttackRelease("c3", "8n");
          synth2.triggerAttackRelease("f#3", "8n");
        }
    }
  }

  const toggleB = () => {
     if (aux.length === 0){

      if(torreB.length > 0){ 

      const pop =    torreB.pop() 
      synth.triggerAttackRelease(sounds[pop.diameter]+"4", "8n");

          setAux ([pop])
          setTorreB(torreB)
        
    }
    }else{
      if( torreB.length === 0 || torreB[torreB.length-1].diameter > aux[0].diameter){ 
      torreB.push(aux[0])


      synth.triggerAttackRelease(sounds[aux[0].diameter]+"3", "8n");

      setMoveCount(moveCount + 1)
      setTorreB(torreB)
      setAux([])
    }
        else{
          synth.triggerAttackRelease("c3", "8n");
          synth2.triggerAttackRelease("f#3", "8n");
        }
    }
  }

  const toggleC = () => {
     if (aux.length === 0){

      if(torreC.length > 0){ 

      const pop =    torreC.pop() 
      synth.triggerAttackRelease(sounds[pop.diameter]+"4", "8n");

      setAux ([pop])
      setTorreC(torreC)
    }
    }else{

      if( torreC.length === 0 || torreC[torreC.length-1].diameter > aux[0].diameter){ 
            torreC.push(aux[0])



      synth.triggerAttackRelease(sounds[aux[0].diameter]+"3", "8n");
            setMoveCount(moveCount + 1)
            setTorreC(torreC)
            setAux([])
        }
        else{
          synth.triggerAttackRelease("c3", "8n");
          synth2.triggerAttackRelease("f#3", "8n");
        }
    }
  }

  useEffect(()=>{
    console.log(aux)
    console.log('torre A: ', torreA)
    console.log('torre B: ', torreB)
    console.log('torre C: ', torreC)

    if(torreA.length === 6 ){
      //Si alguna torre está en el orden correcto, win

      if (arraysEqual(torreA, ordenCorrecto) )
        {

      synth.triggerAttackRelease("c4", "4n");

      synth2.triggerAttackRelease("e3", "4n");
      synth3.triggerAttackRelease("c3", "4n");

        alert("🌮🌮🌮 movimientos:" + moveCount )
        setMoveCount(0)


      setTorreA(initDiscos.a)
      setTorreB(initDiscos.b)
      setTorreC(initDiscos.c)

        setIlloRotation({x:TAU/4})
        }

    }
    else if (torreB.length === 6) {
      alert('😮😮😮 movimientos:' + moveCount)


      synth.triggerAttackRelease("c4", "8n");

      synth2.triggerAttackRelease("e4", "8n");
      synth3.triggerAttackRelease("g4", "8n");


      synth.triggerAttackRelease("g3", "8n");

      synth2.triggerAttackRelease("e3", "8n");
      synth3.triggerAttackRelease("c3", "8n");

      setMoveCount(0)
      setIlloRotation({x:TAU/4})
    }

        else if (torreC.length === 6) {
      alert('😮😮😮 movimientos:' + moveCount)
      setMoveCount(0)
      setIlloRotation({x:TAU/5})
    }
  // eslint-disable-next-line
  }, [aux, torreA, torreB, torreC. initDiscos])

  return (
      <div>
        <div className={"hand"}><Trompo discs={aux || []} zoom={1} rotation={illoRotation}/></div>
        <div className={"hanoi"} onClick={toggleA}><Trompo discs={torreA} zoom={3} rotation={illoRotation}/></div>
        <div className={"hanoi"} onClick={toggleB}><Trompo discs={torreB} zoom={3} rotation={illoRotation}/></div>
        <div className={"hanoi"} onClick={toggleC}><Trompo discs={torreC} zoom={3} rotation={illoRotation}/></div>
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
