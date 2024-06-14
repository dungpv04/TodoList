import { useState } from "react"
function EditBox({setStatus, status, id, tasks, setTask}){
    const [newTask, setNewTask] = useState('')
    function handleClick(){
        if(newTask.trim() !== ''){
            const updatedTask = tasks.map(task => task.id===id?{...task, name: newTask}: task)
            setTask(updatedTask)
            setNewTask('')
            setStatus({status: false, label: "Edit"})
        }
    }
    if(status){
        return(
            <>
                <input type="text" name="" id="" onChange={(e) => setNewTask(e.target.value)}/>
                <input type="button" value="Ok" onClick={handleClick}/>
            </>
        )
    }
    else return null
}
export default EditBox