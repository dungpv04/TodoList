import { useState } from "react";
import EditBox from "./EditBox";
function Edit({tasks, setTask, id}){
    const[isEdit, setEditStatus] = useState({status: false, label: "Edit"})
    function handleClick(){
        if(isEdit.status){
            setEditStatus({status: false, label: "Edit"})
        } 
        else setEditStatus({status: true, label: "Cancel"})
        
    }
    return(
        <>
        <input type="button" value={isEdit.label} onClick={handleClick}/>
        <EditBox setStatus = {setEditStatus} status = {isEdit.status} id={id} tasks = {tasks} setTask = {setTask}/>
        </>
    )
}
export default Edit