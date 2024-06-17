import { useState } from "react"
function EditBox({setStatus, status, id, tasks, setTask}){
    const [newTask, setNewTask] = useState('')
    async function handleClick(){
        if(newTask.trim() !== ''){
            const updatedTask = tasks.map(task => task.id===id?{...task, name: newTask}: task)
            setTask(updatedTask)
            setNewTask('')
            setStatus({status: false, label: "Edit"})
            const option = {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: id, name: newTask })
            }
            const put = await fetch('http://localhost:8080/edit', option)
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