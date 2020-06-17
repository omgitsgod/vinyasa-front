import React, { useState, useEffect } from 'react';
import { poses } from './constants';
import './css/Routine.css';

const reqSvgs = require.context('./imgs', true, /\.svg$/);
const paths = reqSvgs.keys();
const svgs = paths.reduce((images,path) => {
  images[path] = reqSvgs(path);
  return images;
  }, {});

function Routine(props) {

  const [time, setTime] = useState(2);
  const [pose, setPose] = useState({});
  const [open, setOpen] = useState(true);

//  useEffect(()=>{
//    props.addToRoutineTimes()
//    if (props.load.id) {
//      setPose(props.load)
//      setOpen(false)
//      props.addToRoutines(props.num-1, props.load)
//   }
//    return ()=> {
//      props.addToRoutineTimes([...props.routines].filter(x => x.num !== props.num))
//    }
//  }, [props])

  const select = (e) => {

    let term = e.target.value;

    if(term > 0) {
      let temp = pose;
      temp.time = parseInt(term);
      setTime(temp.time);
      setPose(temp);
      props.addToRoutines(props.num-1, temp);
    } else {
      if (poses.filter(x => x.english_name === term)[0] || poses.filter(x => x.sanskrit_name === term)[0]) {
        let tempPose;

        if (poses.filter(x => x.english_name === term)[0]) {
          tempPose = {...poses.filter(x => x.english_name === term)[0]};
          tempPose.chosen = tempPose.english_name;
        } else if (poses.filter(x => x.sanskrit_name === term)[0])  {
          tempPose = {...poses.filter(x => x.sanskrit_name === term)[0]};
          tempPose.chosen = tempPose.sanskrit_name;
        }

        tempPose.time = time;
        setPose(tempPose);
        setOpen(false);
        props.addToRoutines(props.num-1, tempPose);
      }
    }
  }

  return (
    <div className='pose'>
      <div className='name'>
        {pose.chosen && !open ? <p className='name-text' onClick={() => setOpen(!open)}>{pose.chosen}</p> : null}
        {open ?
          <div>
          <input list='brow' className='search' onChange={select}/>
        <datalist id='brow'>
          {[...poses.map(x => <option key={x.id} value={x.english_name}/>),...poses.map(x => <option key={x.id + 48} value={x.sanskrit_name}/>)]}
        </datalist>
        </div>
        : null }
        {pose.id && !open ? <img src={svgs[pose.img]} className='pose-img' alt='pose'/> : null}
      </div>
      <div className='time'>
        <input className='slider' onChange={select}
          type="range" min={1} max={5} defaultValue={props.load.time || props.time} />
        {time !== 1 ? <p className='time-text'>{props.load.time || time} minutes</p> : <p className='time-text'>{props.load.time || time} minute</p>}
      </div>
    </div>
  );
}

export default Routine;
