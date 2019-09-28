import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import Routine from './Routine';
import './css/RoutineContainer.css';

function RoutineContainer() {
  const [routines, setRoutines] = useState([]);
  const [routineNum, setRoutineNum] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [routineTimes, setRoutineTimes] = useState([]);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('routines')) {
      setRoutines(JSON.parse(localStorage.getItem('routines')))
      setRoutineNum(JSON.parse(localStorage.getItem('num')))
    }
    fetch(`https://vinyasa-backend.herokuapp.com/`)
      .then(r => r.text())
      .then(console.log)
  },[])
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

  const handleDate = (date) => {
    setDate(date)
    setOpen(false)
  }

  const db = () => {
    fetch(`https://vinyasa-backend.herokuapp.com/getUser`,{method: 'GET', credentials: 'include'})
  }

  const displayRoutines = routines.map(x => <Routine load={x} key={x.num} num={x.num} addToRoutines={addToRoutines} addToRoutineTimes={addToRoutineTimes}/>)

  console.log(routines);

  return (
    <div className='mat'>
      <div className='heading'>
        {routines.length > 0 ?
        <div>
          <button onClick={() => {setRoutines([]); localStorage.clear()}}>New</button>
          <button onClick={() => {localStorage.setItem('routines', JSON.stringify(routines)); localStorage.setItem('num', routineNum); console.log('routines: ', routines); console.log('num: ', routineNum);}}>Save</button>
        </div>
        :
        <div>
          <button onClick={deleteRoutine}>-</button>
          <button onClick={addRoutine}>+</button>
        </div>
        }
        {timeLeft !== 1 ? <p>{timeLeft} Minutes</p> : <p>{timeLeft} Minute</p>}
        {!open ? <p onClick={setOpen}>{date.toDateString()}</p> : <Calendar onChange={handleDate} value={date}/>}
      </div>
      {displayRoutines}
      {routines.length > 0 ?
        <div>
          <button onClick={deleteRoutine}>-</button>
          <button onClick={addRoutine}>+</button>
        </div>
      :
      null
      }
    </div>
  );
}

export default RoutineContainer;
