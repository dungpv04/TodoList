var sql = require('mssql/msnodesqlv8')

var config = {
    
    server: 'DESKTOP-CKTBGDM\\SQLEXPRESS',
    database: 'nodejs',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

async function CreateConnection(){
    try{
        return await sql.connect(config);
    }
    catch(err){
        console.log(err);
    }
}

async function ExecuteQuery(queryStr, params = []){
    try{
        const connection = await CreateConnection();
        const request = new sql.Request();
        const query = await request.query(queryStr);
        connection.close();
        return query.recordset;
    }
    catch(err){
        console.log(err);
    }
}

module.exports.get = async function get(){
    const query = "select * from tasks";
    return await ExecuteQuery(query);
}

module.exports.post = async function post(task){
    const query = 'insert into tasks(name ,status) values(' + "'" + task + "'" + ', 0)'
    console.log(task)
    try{
        const post = await ExecuteQuery(query);
        return true
    }
    catch(err){
        console.log(err);
        return false;
    }
}

module.exports.patch = async function patchStatus(id, task, prop){
    var final;
    console.log(id)
    if(task.status)
        final = 1;
    else final = 0;
    let query = '';
    if(prop === "status") query = 'update tasks set status = ' + final + ' where id = ' + id;
    else if(prop === "edit") query = 'update tasks set name = ' + "'" + task.name + "'" + ' where id = ' + id;
    const patch = await ExecuteQuery(query)
}

module.exports.delete = async function deleteTask(id){
    const query = 'delete from tasks where id = ' + id;
    const del = await ExecuteQuery(query);
}