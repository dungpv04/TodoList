function Delete({tasks, setTask, id}){
    async function deleteTask(){
        const updatedTask = tasks.filter(task => task.id!==id)
        setTask(updatedTask)
        const option = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }
        const url = 'http://localhost:8080/tasks/' + id
        const del = await fetch(url, option)
    }
    return(
        <div>
            <input type="button" value="Delete" onClick={deleteTask}/>
        </div>
    )
}
export default Delete