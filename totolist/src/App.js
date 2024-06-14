import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Task from './components/Task';
import Add from './components/Add';

function App() {
  const[tasks, setTask] = useState([])
  useEffect(() =>{
    fetch('http://localhost:8080/')
    .then((res) => {
      return res.json();
    })
    .then((data) => {setTask(data)});
  }, [])

  return (
    <div className="App">
      <Header />
      <Add tasks = {tasks} setTask = {setTask} />
      <Task tasks={tasks} setTask={setTask} />
    </div>
  )
}

export default App;
