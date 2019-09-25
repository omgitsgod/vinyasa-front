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
    return ()=> {
      props.addToRoutineTimes(props.num-1, 0)
    }
  }, [])

  const handleSearch = (term) => {
    setSearch(term)
    let list = poses.map(x => x.english_name)
    let results = list.filter(x => x.toLowerCase().includes(term))
    setResults(results)
    console.log('term', term);
    let index = list.indexOf('')
    console.log('index', );
    console.log(results);
  }
  const select = (e) => {
    let term = e.target.innerText
    let tempPose = poses.filter(x => x.english_name === term)[0]
    setPose(tempPose)
    setOpen(false)
    setResults([])
    console.log(pose);
  }
  return (
    <div className='pose'>
    <div className='name'>
      {pose.english_name ? <p onClick={() => setOpen(!open)}>{pose.english_name}</p> : <p>Pose</p>}
      {open ? <input type='text' onChange={(e)=> handleSearch(e.target.value)} value={search}/> : null}
      {pose.id ? <img src={svgs[pose.img]} className='pose-img' alt='pose'/> : null}
      <ul>
      {results.length > 0 && results.length < 20 ? results.map((x,y) => <li key={y} onClick={select} className="result">{x}</li>) : null}
      </ul>
    </div>
    <div className='time'>
      <p>{time} minute(s)</p>
      <input onChange={
        (e)=> {setTime(e.target.value); props.addToRoutineTimes(props.num-1, parseInt(e.target.value))}}
        type="range" min={1} max={5} defaultValue={time} />
    </div>
    </div>
  );
}

export default Routine;
