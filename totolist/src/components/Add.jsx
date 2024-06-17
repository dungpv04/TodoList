import { useEffect, useState } from "react"

function Add({tasks, setTask}){

    const[newTask, setNewTask] = useState('')
    const[alertMsg, setAlertMsg] = useState('')
    async function onSubmitHandle(){
        if(newTask.trim() !== ''){
            setTask([...tasks, {id: Math.random() ,name: newTask, status: false}])
            
            const option = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newTask })
            }
            const url = 'http://localhost:8080/tasks';
            const res = await fetch(url, option);
            const data = await res.json();
            setNewTask('')
            setAlertMsg('')
        }

        else setAlertMsg("Fill out task name !")
    }

    function onChangeHandle(e){
        setNewTask(e.target.value)
        setAlertMsg('')
    }

    return(
        <div id="add-box">
            <input type="text" value = {newTask} name="newTask" id="" placeholder="Things need to do..." onChange={(e) => onChangeHandle(e)} />
            <input type="submit" value="Add" onClick={onSubmitHandle} />
            <p className="alert-msg">{alertMsg}</p>
        </div>
    )
}
export default Add