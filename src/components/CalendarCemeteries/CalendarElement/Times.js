import React, { useState, useEffect } from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';
import { useSelector } from 'react-redux';

// const times = ['07:00','07:15','07:30','07:45','08:00','08:15','08:30','08:45','09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45']
const times = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];

function Times(props) {

  const [event, setEvent] = useState('');
  const [info, setInfo] = useState(false);

  function setTime(time) {
    if (windowVisibility === false) {
      setInfo(true);
      // setEvent(e.target.innerText);
      setEvent(time);
    }
  }

  const [windowVisibility, setWindowVisibility] = useState(false);

  const openWindow = () => {
    if (windowVisibility === false) {
      setWindowVisibility(true);
    }
  };

  // API

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/polls//')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  // <div>
  //   <h1>Posts:</h1>
  //   <ul>
  //     {data.map(post => (
  //       <li key={post.id}>{post.title}</li>
  //     ))}
  //   </ul>
  // </div>

  // baza danych będzie dość obszerna, dynamiczne godziny będą powodować wolniejsze ładowanie strony, proponuje zrobić na stałe 'czasy' co 15 min i na końcu dat dodatkowe pole terminu, 
      // jesli zostanie wypelnione pojawi sie nowe puste pole 

      // https://chat.openai.com/?model=text-davinci-002-render-sha

      
  
return (
  <> 
    {windowVisibility && (
      <div className={styles.windowBackground}>
        <div className={styles.window}>
          <Box windowVisibility={windowVisibility} 
            setWindowVisibility={setWindowVisibility} 
            setEvent={setEvent} 
            event={event} 
            date={props.date} 
            fixedDate={props.fixedDate} 
            dayOfTheWeek={props.dayOfTheWeek} 
            day={props.day} 
            month={props.month} 
            year={props.year}
          />
        </div>
      </div>
    )}

    <div className="times">
      {times.map(time => {
        // if (time === '07:15'){
        return (
          <div className={styles.timeBox}>
            <div className={styles.leftWrapper}>
              <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate}</span>

              <div>
                <p>

                </p>
              </div>
            </div>

            <div className={styles.rightWrapper}>
              <button onClick={()=> {
                setTime(time);
                openWindow();
              }}> DODAJ </button>
            </div>
          </div>

          
        )
            // }
      })}
      





      {/* <div>
        {info ? `Your appointment is set to ${event} | ${props.date.toDateString()}` : null}
      </div> */}
    </div>
  </>
  )
}

export default Times;