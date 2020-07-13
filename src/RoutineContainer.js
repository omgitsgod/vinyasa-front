import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import Calendar from 'react-calendar';
import Icon from '@mdi/react';
import { mdiNewBox, mdiTrashCan, mdiContentSave, mdiPlusCircle, mdiMinusCircle } from '@mdi/js';
import Routine from './Routine';
import './css/RoutineContainer.css';


function RoutineContainer(props) {

  const [routines, setRoutines] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [date, setDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { isAuthenticated, user } = props;

  const wakeBackend = () => {

    fetch(`https://vinyasa-backend.herokuapp.com/`);
  }

  useEffect(() => {

    if (isAuthenticated) {
     handleLoadDate(date);
    } else {
      wakeBackend();
    }
  },[date, isAuthenticated]);

  const scrollAction = () => {

    animateScroll.scrollToBottom();
  }

  const handleSessionTime = (list) => {

    let sessionTime = 60;
    let routineTimes;

    if (list) {
      routineTimes = list.map(x => x.time);
    } else {
      routineTimes = routines.map(x => x.time);
    }

    if (routineTimes.length > 0) {
      sessionTime = sessionTime - routineTimes.reduce((x,y) => x+y);
    }
    setTimeLeft(sessionTime);
  }

  const addToRoutines = (num, routine) => {

    let tempRoutines = [...routines];
    let tempRoutine = {...routine};
    
    tempRoutine.num = num + 1;
    tempRoutines[num] = tempRoutine;
    handleSessionTime(tempRoutines);
    setRoutines(tempRoutines);
  }

  const addRoutine = () => {

    const tempRoutines = [...routines, {num: routines.length + 1, time: 2}];

    setRoutines(tempRoutines);
    scrollAction();
  }

  const deleteRoutine = () => {

    const tempRoutines = routines.filter(x => x.num !== routines.length);

    handleSessionTime(tempRoutines);
    setRoutines(tempRoutines);
    scrollAction();
  }

  const handleDate = (date) => {

    setDate(date);
    handleLoadDate(date);
    setOpen(false);
  }

  const handleLoadDate = async (date) => {

    setRoutines([]);
    const loadedDate = await fetch(`https://vinyasa-backend.herokuapp.com/loadRoutine/${date.getMonth() + 1}/${date.getDate()}`,{method: 'GET', credentials: 'include'}).then(r => r.json());
    
    if (loadedDate) {
      setRoutines(loadedDate.routine);
    } else {
      setRoutines([]);
    }
  }

  const handleDeleteDate = () => {

    const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
    const confirm = window.confirm(`Are you sure you want to delete the routine for ${dateString}?`);

    if (confirm) {
      setRoutines([]);
      setLoaded(false);
      fetch(`https://vinyasa-backend.herokuapp.com/deleteRoutine/${dateString}`,{method: 'DELETE', credentials: 'include'});
    }
  }

  const handleSaveDate = () => {

    const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
    const json = JSON.stringify({dateString, routines});

    fetch(`https://vinyasa-backend.herokuapp.com/saveRoutine`, {
      method: 'POST',
      credentials: 'include',
      body: json,
      headers: {'Content-Type': 'application/json'}
    });
  }

  const handleDeleteIndividual = (num) => {

    const temp = [...routines].filter(x => x.num !== num)

    for (let i = 0; i < temp.length; i++) {

      if (temp[i].num > num) {
        temp[i].num -= 1;
      }
    }
    setRoutines(temp);
  }

  return (
    <div className='mat'>
      <div className='heading'>
        {routines.length > 0 ?
          <div>
            <Icon path={mdiNewBox}
              className='icon'
              size={1.5}
              color='white'
              onClick={() => {setRoutines([]); handleSessionTime([]);}}
            />
            {isAuthenticated && user && loaded ?
              <Icon path={mdiTrashCan}
                className='icon red'
                size={1.5}
                onClick={() => handleDeleteDate()}
              />
            :
              null
            }
            {isAuthenticated && user ?
              <Icon path={mdiContentSave}
                className='icon'
                size={1.5}
                color='white'
                onClick={() => handleSaveDate()}
              />
            :
              null 
            }
          </div>
        :
          <div>
            <Icon path={mdiMinusCircle}
              className='icon red'
              size={1.5}
              onClick={deleteRoutine}
            />
            <Icon path={mdiPlusCircle}
              className='icon blue'
              size={1.5}
              onClick={addRoutine}
            />
          </div>
        }
        {timeLeft !== 1 ? 
          <p>{timeLeft} Minutes</p> 
        : 
          <p>{timeLeft} Minute</p>
        }
        {!open ? 
          <p onClick={setOpen}>{date.toDateString()}</p> 
        : 
          <Calendar onChange={handleDate} value={date} />
        }
      </div>
      {routines.map((x) => (
        <Routine
          load={x}
          key={x.num}
          num={x.num}
          addToRoutines={addToRoutines}
          handleSessionTime={handleSessionTime}
          handleDeleteIndividual={handleDeleteIndividual}
          routines={routines}
        />
      ))}
      {routines.length > 0 ?
        <div name='bottom-add-minus' id='bottom-add-minus'>
          <Icon path={mdiMinusCircle}
            className='icon red'
            size={1.5}
            onClick={deleteRoutine}
          />
          <Icon path={mdiPlusCircle}
            className='icon blue'
            size={1.5}
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
