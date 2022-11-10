import { useEffect, useState } from "react";
import "./App.css";

const LOCAL_STORAGE_DATA_KEY = "@GymCalendar:data";

function App() {
  const days = 60;
  const columns = 10;
  const localData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
  const [data, setData] = useState([]);

  const getNewData = () => {
    const arr = [...new Array(days)];
    return arr.map((d, i) => {
      return { day: i + 1, done: false };
    });
  };

  const handlerClickDay = (day) => {
    const newData = [...data];
    newData.find(d => d.day === day).done = !(newData.find(d => d.day === day).done);
    setData(newData);
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newData));
  }

  useEffect(() => {
    if (localData) {
      setData(JSON.parse(localData))
    } else {
      const newData = getNewData();
      setData(newData);
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newData));
    }
  }, [localData])

  return (
    <div className="Calendar">
      {data.map((d, i) => (
        <div key={d.day} style={{ width: `calc(${100/columns}% - 1px)`, }} className={`DayWrapper ${d.done ? "Done" : ""}`} onClick={() => handlerClickDay(d.day)}>
          <div className="Day">{d.day}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
