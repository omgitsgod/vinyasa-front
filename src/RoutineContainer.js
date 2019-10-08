import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import Routine from './Routine';
import './css/RoutineContainer.css';

function RoutineContainer() {
  const [routines, setRoutines] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [date, setDate] = useState(new Date(new Date().setHours(0,0,0,0)))
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`https://vinyasa-backend.herokuapp.com/`)
      .then(r => r.text())
      .then(console.log)
      handleLoadDate(date)
  },[])
  const addToRoutineTimes = (list) => {
    let temp
    if (list) {
    temp = list.map(x => x.time)
  } else {
    temp = routines.map(x => x.time)
  }
    let x = 60
    if (temp.length > 0) {
      x = x - temp.reduce((x,y) => x+y)
    }
    setTimeLeft(x)
  }

  const addToRoutines = (num, routine) => {
    let temp = [...routines]
    let tempy = {...routine}
    tempy.num = num + 1
    temp[num] = tempy
    addToRoutineTimes(temp)
    setRoutines(temp)
  }

  const addRoutine = () => {
    let temp = [...routines, {num: routines.length + 1, time: 2}]
    setRoutines(temp)
  }

  const deleteRoutine = () => {
    let temp = routines.filter(x => x.num !== routines.length)
    addToRoutineTimes(temp)
    setRoutines(temp)
  }

  const handleDate = (date) => {
    setDate(date)
    handleLoadDate(date)
    setOpen(false)
  }

  const handleLoadDate = (date) => {
    setRoutines([])
    fetch(`https://vinyasa-backend.herokuapp.com/loadRoutine/${date.getMonth() + 1}/${date.getDate()}`)
      .then(r => r.json())
      .then(json => {
        if(json){
          setRoutines(json.routine)
          console.log('json', json.routine);
        } else {
          setRoutines([])
        }
      })
  }

  const handleSaveDate = () => {
    let datey = `${date.getMonth() + 1}/${date.getDate()}`
    let temp = JSON.stringify({datey, routines})
    console.log(temp);
    fetch(`https://vinyasa-backend.herokuapp.com/saveRoutine`, {
      method: 'POST',
      body: temp,
      headers: {'Content-Type': 'application/json'}
    })
  }

  const db = () => {
    fetch(`https://vinyasa-backend.herokuapp.com/getUser`,{method: 'GET', credentials: 'include'})
  }

  const displayRoutines = routines.map(x => <Routine load={x} key={x.num} num={x.num} addToRoutines={addToRoutines} addToRoutineTimes={addToRoutineTimes} routines={routines}/>)

  console.log(routines);
  console.log(date.getTime());

  return (
    <div className='mat'>
      <div className='heading'>
        {routines.length > 0 ?
        <div>
          <button onClick={() => {setRoutines([]); localStorage.clear(); addToRoutineTimes([])}}>New</button>
          <button onClick={() => handleSaveDate()}>Save</button>
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
