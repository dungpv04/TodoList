import React, { useState } from "react"
import Edit from "./Edit"
import Delete from "./Delete"
function Task({tasks, setTask}){

    async function toggleTask(id){
        const updatedTask = tasks.map((task) => task.id===id?{...task, status: !task.status}: task)
        const changedTask = updatedTask.filter(x => x.id === id)
        setTask(updatedTask)
        console.log(changedTask[0])
        const option = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({status: changedTask[0].status})
        }
        const url = 'http://localhost:8080/tasks/' + changedTask[0].id + '/status'
        const res = await fetch(url, option);
        const data = await res.json();
    }

    return(
        <ul id="task-list">
            {tasks.map((task) =>(
                <li key={task.id} className={task.status ? 'completed' : ''}>
                    <span className="tasks" onClick={()=>toggleTask(task.id)}>{task.name}</span>
                    <Delete tasks={tasks} setTask={setTask} id={task.id} />
                    <Edit tasks = {tasks} setTask={setTask} id = {task.id}/>
                </li>
            ))}
        </ul>
    )
}
export default Task