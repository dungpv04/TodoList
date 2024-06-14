import { useState } from "react"

function Add({tasks, setTask}){

    const[newTask, setNewTask] = useState('')
    const[alertMsg, setAlertMsg] = useState('')
    function onSubmitHandle(){
        if(newTask.trim() !== ''){
            setTask([...tasks, {id: Math.random() ,name: newTask, status: false}])
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