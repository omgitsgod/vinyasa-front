import React, { useState, useEffect } from 'react';
import { poses, svgs } from './constants';
import './css/Routine.css';


function Routine(props) {

  const [time, setTime] = useState(2);
  const [pose, setPose] = useState({});
  const [open, setOpen] = useState(true);
  const { handleSessionTime, load, addToRoutines, num, routines } = props;

  useEffect(()=>{

    handleSessionTime()
//    if (load.id) {
//      setPose(load)
//      setOpen(false)
//      addToRoutines(num-1, load)
//   }
    return ()=> {
     handleSessionTime([...routines].filter(x => x.num !== num))
    }
  }, [handleSessionTime])

  const select = (e) => {

    const term = e.target.value;
    let tempPose;

    if (term > 0) {
      tempPose = pose;
      tempPose.time = parseInt(term);
      setTime(tempPose.time);
      setPose(tempPose);
      addToRoutines(num-1, tempPose);
    } else {
      if (poses.filter(x => x.english_name === term)[0] || poses.filter(x => x.sanskrit_name === term)[0]) {
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
        addToRoutines(num-1, tempPose);
      }
    }
  }

  return (
    <div className='pose'>
      <div className='name'>
        {pose.chosen && !open ? 
          <p className='name-text' onClick={() => setOpen(!open)}>
            {pose.chosen}
          </p> 
        : 
          null
        }
        {open ?
          <div>
            <input list='brow' className='search' onChange={select} />
            <datalist id='brow'>
              {[
                ...poses.map(x => <option key={x.id} value={x.english_name} />),
                ...poses.map(x => <option key={x.id + 48} value={x.sanskrit_name} />)
              ]}
            </datalist>
          </div>
        : 
          null 
        }
        {pose.id && !open ? 
          <img src={svgs[pose.img]} className='pose-img' alt='pose' /> 
        : 
          null
        }
      </div>
      <div className='time'>
        <input 
          className='slider'
          onChange={select}
          type='range'
          min={1}
          max={5}
          defaultValue={load.time || time} 
        />
        {time !== 1 ? 
          <p className='time-text'>
            {load.time || time} minutes
          </p> 
        : 
          <p className='time-text'>
            {load.time || time} minute
          </p>
        }
      </div>
    </div>
  );
}

export default Routine;
