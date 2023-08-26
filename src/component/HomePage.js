import React, {useState,useEffect} from 'react'
import moment from 'moment-timezone';
import data from './API/demo.js'

function HomePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [targetTimezone, setTargetTimezone] = useState('UTC');
    const [scheduleData, setScheduleData] = useState(data);
    const [checkedItems, setCheckedItems] = useState({});
  
    const utcTime = moment('08:00:00', 'hh:mm:ss'); // UTC time in HH:mm:ss format
    const utcDateTime = moment.utc(utcTime, 'HH:mm:ss');
    let times = []

    
  for (let i = 0; i < 31; i++) { 
    const indiaTimeWithInterval = utcDateTime.clone().tz(targetTimezone).add(i*30, 'minutes').format('hh:mm A');
    times.push(indiaTimeWithInterval);
  }
    const handleMoveWeek = (weeks) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + weeks * 7);
        setCurrentDate(newDate);
      };
   
    const handleTimezoneChange = (timezone) => {
      setTargetTimezone(timezone);
    };

    const workingDays=['Mon','Tue','Wed', 'Thur','Fri']
    
    function handleCheckboxChange(event,id) {
      const { checked } = event.target;
      setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [id]: checked,
      }));
      // setScheduleData([...scheduleData,checkedItems])s
    }
    
  
  return (
    <>
    <div style={{display:'flex', justifyContent:'space-between',paddingRight:'20px',paddingLeft:'20px'}}>
        <button onClick={() => handleMoveWeek(-1)}>Previous Week</button>
        <p>{currentDate.toDateString()}</p>
      <button onClick={() => handleMoveWeek(1)}>Next Week</button>
    </div>

    <div style={{paddingRight:'20px',paddingLeft:'20px',marginTop:'30px'}}>
    <select style={{width:'100%',padding:'10px'}} onChange={(e) => handleTimezoneChange(e.target.value)}>
        <option value="UTC">UTC</option>
        <option value="Asia/Kolkata">Asia/Kolkata</option>
      </select>
      
    </div>

      <div style={{paddingRight:'20px',paddingLeft:'20px'}}>
      <h2>Weekly Working Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th style={{}}>Time</th>
          </tr>
        </thead>
        <tbody>
          {workingDays.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {times.map((time,id) => (
                <td key={id} colSpan={2} >
                  <input type="checkbox"
                  onChange={(e)=>handleCheckboxChange(e,id)}/>{time}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  )
}

export default HomePage