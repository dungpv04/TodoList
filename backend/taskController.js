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

/*module.exports.get = async function get(){
    try{
        const connection = await sql.connect(config);
        const request = new sql.Request();
        const query = await request.query("select * from tasks");
        connection.close();
        return query.recordset;
    }
    catch(err){
        console.log(err);
        return null;
    }
}*/
