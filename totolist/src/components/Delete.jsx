function Delete({tasks, setTask, id}){
    function deleteTask(){
        const updatedTask = tasks.filter(task => task.id!==id)
        setTask(updatedTask)
    }
    return(
        <div>
            <input type="button" value="Delete" onClick={deleteTask}/>
        </div>
    )
}
export default Delete