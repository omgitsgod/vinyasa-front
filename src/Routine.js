import React, { useState, useEffect } from 'react';
import { poses } from './constants'
import './css/Routine.css';
const reqSvgs = require.context ( './imgs', true, /\.svg$/ )
const paths = reqSvgs.keys ()
const svgs = paths.reduce((images,path) => {
    images[path] = reqSvgs(path)
    return images
  }, {} )

function Routine(props) {
  const [time, setTime] = useState(2)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [pose, setPose] = useState({})
  const [open, setOpen] = useState(true)
  useEffect(()=>{
    props.addToRoutineTimes(props.num-1, 2)
    if (props.load.id) {
      setPose(props.load)
      setOpen(false)
    }
    return ()=> {
      props.addToRoutineTimes(props.num-1, 0)
    }
  }, [])


  const select = (e) => {
    let term = e.target.value
    if (poses.filter(x => x.english_name === term)[0] || poses.filter(x => x.sanskrit_name === term)[0]) {
      let tempPose
      if (poses.filter(x => x.english_name === term)[0]) {
        tempPose = {...poses.filter(x => x.english_name === term)[0]}
        tempPose.chosen = tempPose.english_name
      } else if (poses.filter(x => x.sanskrit_name === term)[0])  {
        tempPose = {...poses.filter(x => x.sanskrit_name === term)[0]}
        tempPose.chosen = tempPose.sanskrit_name
      }
      setPose(tempPose)
      setOpen(false)
      setResults([])
      props.addToRoutines(props.num-1, tempPose, time)
      console.log(pose);
    }
  }
  console.log(svgs['./1.svg']);
  return (
    <div className='pose'>
    <div className='name'>
      {pose.chosen ? <p className='name-text' onClick={() => setOpen(!open)}>{pose.chosen}</p> : <p className='name-text'>Pose</p>}
      {open ?
        <div>
        <input list='brow' className='search' onChange={select}/>
      <datalist id='brow'>
        {[...poses.map(x => <option value={x.english_name}/>),...poses.map(x => <option value={x.sanskrit_name}/>)]}
      </datalist>
      </div>
      : null }
      {pose.id && !open ? <img src={svgs[pose.img]} className='pose-img' alt='pose'/> : null}
    </div>
    <div className='time'>
      {time !== 1 ? <p className='time-text'>{time} minutes</p> : <p className='time-text'>{time} minute</p>}
      <input className='slider' onChange={
        (e)=> {setTime(e.target.value); props.addToRoutineTimes(props.num-1, parseInt(e.target.value)); props.addToRoutines(props.num-1, pose, parseInt(e.target.value))}}
        type="range" min={1} max={5} defaultValue={time} />
    </div>
    </div>
  );
}

export default Routine;
