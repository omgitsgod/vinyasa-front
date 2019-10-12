import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import Icon from '@mdi/react'
import {mdiNewBox, mdiTrashCan, mdiContentSave, mdiPlusCircle, mdiMinusCircle } from '@mdi/js'
import Routine from './Routine';
import './css/RoutineContainer.css';

function RoutineContainer(props) {
  const [routines, setRoutines] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [date, setDate] = useState(new Date(new Date().setHours(0,0,0,0)))
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    //fetch(`https://vinyasa-backend.herokuapp.com/`)
    //  .then(r => r.text())
    //  .then(console.log)
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
    fetch(`https://vinyasa-backend.herokuapp.com/loadRoutine/${date.getMonth() + 1}/${date.getDate()}`,{method: 'GET', credentials: 'include'})
      .then(r => r.json())
      .then(json => {
        if(json){
          setRoutines(json.routine)
          console.log('json', json.routine);
          setLoaded(true)
        } else {
          setRoutines([])
        }
      })
  }

  const handleDeleteDate = () => {
    const temp = `${date.getMonth() + 1}/${date.getDate()}`
    const confirm = window.confirm(`Are you sure you want to delete the routine for ${temp}?`)
    if (confirm) {
      setRoutines([])
      setLoaded(false)
      fetch(`https://vinyasa-backend.herokuapp.com/deleteRoutine/${temp}`,{method: 'DELETE', credentials: 'include'})
    }
  }

  const handleSaveDate = () => {
    let datey = `${date.getMonth() + 1}/${date.getDate()}`
    let temp = JSON.stringify({datey, routines})
    console.log(temp);
    fetch(`https://vinyasa-backend.herokuapp.com/saveRoutine`, {
      method: 'POST',
      credentials: 'include',
      body: temp,
      headers: {'Content-Type': 'application/json'}
    })
  }

  const handleDeleteIndividual = (num) => {
    const temp = [...routines].filter(x => x.num !== num)
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].num > num) {
        temp[i].num -= 1
      }
    }
    displayRoutines = temp.map(x => <Routine load={x} key={x.num} num={x.num} addToRoutines={addToRoutines} addToRoutineTimes={addToRoutineTimes} handleDeleteIndividual={handleDeleteIndividual} routines={routines}/>)
    setRoutines(temp)
  }

  const db = () => {
    fetch(`https://vinyasa-backend.herokuapp.com/getUser`,{method: 'GET', credentials: 'include'})
  }

  const display = (routines) => {

  }

  let displayRoutines = routines.map(x => <Routine load={x} key={x.num} num={x.num} addToRoutines={addToRoutines} addToRoutineTimes={addToRoutineTimes} handleDeleteIndividual={handleDeleteIndividual} routines={routines}/>)

  console.log(routines);
  console.log(date.getTime());

  return (
    <div className='mat'>
      <div className='heading'>
        {routines.length > 0 ?
        <div>
          <Icon path={mdiNewBox}
            className='icon'
            size={1.5}
            color='white'
            onClick={() => {setRoutines([]); addToRoutineTimes([])}}
          />
          {props.isAuthenticated && props.user && loaded ?
            <Icon path={mdiTrashCan}
              className='icon'
              size={1.5}
              color='red'
              onClick={() => handleDeleteDate()}
            />
            :
            null}
          {props.isAuthenticated && props.user ?
            <Icon path={mdiContentSave}
              className='icon'
              size={1.5}
              color='white'
              onClick={() => handleSaveDate()}
            />
            :
            null }
        </div>
        :
        <div>
          <Icon path={mdiMinusCircle}
            className='icon'
            size={1.5}
            color='white'
            onClick={deleteRoutine}
          />
          <Icon path={mdiPlusCircle}
            className='icon'
            size={1.5}
            color='white'
            onClick={addRoutine}
          />
        </div>
        }
        {timeLeft !== 1 ? <p>{timeLeft} Minutes</p> : <p>{timeLeft} Minute</p>}
        {!open ? <p onClick={setOpen}>{date.toDateString()}</p> : <Calendar onChange={handleDate} value={date}/>}
      </div>
      {displayRoutines}
      {routines.length > 0 ?
        <div>
        <Icon path={mdiMinusCircle}
          className='icon'
          size={1.5}
          color='white'
          onClick={deleteRoutine}
        />
        <Icon path={mdiPlusCircle}
          className='icon'
          size={1.5}
          color='white'
          onClick={addRoutine}
        />
        </div>
      :
        null
      }
    </div>
  );
}

export default RoutineContainer;
