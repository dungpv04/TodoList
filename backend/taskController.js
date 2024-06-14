var sql = require('mssql/msnodesqlv8')

var config = {
    
    server: 'DESKTOP-CKTBGDM\\SQLEXPRESS',
    database: 'nodejs',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

module.exports.get = async function get(){
    try{
        const connection = await sql.connect(config);
        const request = new sql.Request();
        const query = await request.query("select * from tasks");
        return query.recordset;
    }
    catch(err){
        console.log(err);
        return null;
    }
    
}