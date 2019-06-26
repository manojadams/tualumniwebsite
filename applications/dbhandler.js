const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit : 500,
    host: 'localhost',
    user: 'root',
    password: 'TUAA@10_jan',
    database: 'tuaa'
});


execQuery=(queryStr)=>{
   return new Promise((accept,reject)=>{
    connectionPool.query(queryStr, (err, rows, field) => {
        if(err){
            reject(err);
        }
        else{
            accept(rows,field)
        }
    });
   });

}

module.exports={
    execQuery
}
