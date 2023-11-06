const mysql = require("mysql2");
const db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    database: process.env.DB_DATABASE,
};

var connection;

function handleDisconnect(){
    connection = mysql.createConnection(db_config);

    connection.connect(function(err){
        if(err){
            console.log("error when connect to db");
            handleDisconnect();
            return;
        }
    });

    module.exports = connection;

    connection.on('error', function(err){
        //console.log("db 재연결");
        handleDisconnect();
    })
}

handleDisconnect();




