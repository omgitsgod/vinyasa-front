import React, { useState } from 'react';
import Routine from './Routine';
import './css/RoutineContainer.css';

function RoutineContainer() {
  const [routines, setRoutines] = useState([]);
  const [routineNum, setRoutineNum] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [routineTimes, setRoutineTimes] = useState([]);


  const addToRoutineTimes = (num, time) => {
    let temp = [...routineTimes]
    temp[num] = time
    let x = 60
    if (temp.length > 0) {
      x = x - temp.reduce((x,y) => x+y)
    }
    setRoutineTimes(temp)
    setTimeLeft(x)
  }

  const addToRoutines = (num, routine, time) => {
    let temp = [...routines]
    let tempy = {...routine}
    tempy.time = time
    tempy.num = num + 1
    temp[num] = tempy
    setRoutines(temp)
  }

  const addRoutine = () => {
    setRoutines([...routines, {num: routineNum}])
    setRoutineNum(routineNum + 1)
  }
  const deleteRoutine = () => {
    let num = routineNum - 1
    setRoutineNum(num)
    let temp = routines.filter(x => x.num !== num)
    setRoutines(temp)
  }
  const displayRoutines = routines.map(x => <Routine key={x.num} num={x.num} addToRoutines={addToRoutines} addToRoutineTimes={addToRoutineTimes}/>)
  console.log(routines);
  return (
    <div className='mat'>
      <div className='heading'>
        <div>
          <button onClick={deleteRoutine}>-</button>
          <button onClick={addRoutine}>+</button>
        </div>
        {timeLeft !== 1 ? <p>{timeLeft} Minutes</p> : <p>{timeLeft} Minute</p>}
      </div>
      {displayRoutines}
    </div>
  );
}

export default RoutineContainer;
