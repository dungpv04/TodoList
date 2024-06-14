import React from "react"
import Edit from "./Edit"
import Delete from "./Delete"
function Task({tasks, setTask}){

    function toggleTask(id){
        const updatedTask = tasks.map((task) => task.id===id?{...task, status: !task.status}: task)
        setTask(updatedTask)
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