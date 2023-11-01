"use strict";

var db = require("../config/db");

class UserStorage{

    static getUserInfo(id){
        db = require("../config/db");
        return new Promise((resolve,reject)=>{
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query,[id],(err,data)=>{
                if(err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    
    static async save(userInfo){
        db = require("../config/db");
        return new Promise((resolve,reject)=>{
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(query,[userInfo.id,userInfo.name,userInfo.psword],(err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }

        
}

module.exports = UserStorage;