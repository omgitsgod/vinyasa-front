import React, { useState, useEffect } from 'react';
import './css/Routine.css';

function Routine(props) {
  const [time, setTime] = useState(2)
  useEffect(()=>{
    props.addToRoutineTimes(props.num-1, 2)
    return ()=> {
      props.addToRoutineTimes(props.num-1, 0)
    }
  }, [])
  return (
    <div className='pose'>
    <div className='num'>
      <p>Routine {props.num}</p>
    </div>
    <div className='name'>
      <p>Name!</p>
      <input />
    </div>
    <div className='time'>
      <p>Time!</p>
      <input onChange={
        (e)=> {setTime(e.target.value); props.addToRoutineTimes(props.num-1, parseInt(e.target.value))}}
        type="range" min={1} max={5} defaultValue={time} />
      <p>{time} minute(s)</p>
    </div>
    </div>
  );
}

export default Routine;
