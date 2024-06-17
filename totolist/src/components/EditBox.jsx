import { useState } from "react"
function EditBox({setStatus, status, id, tasks, setTask}){
    const [newTask, setNewTask] = useState('')
    async function handleClick(){
        if(newTask.trim() !== ''){
            const updatedTask = tasks.map(task => task.id===id?{...task, name: newTask}: task)
            setTask(updatedTask)
            setStatus({status: false, label: "Edit"})
            const option = {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: newTask })
            }
            const url = 'http://localhost:8080/tasks/' + id + '/name'
            const put = await fetch(url, option)
            setNewTask('')
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