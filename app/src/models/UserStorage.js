"use strict";

var db = require("../config/db");
const CryptoJs = require("crypto-js");

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

        const userPs = CryptoJs.SHA256(userInfo.psword).toString();
        //console.log(userPs);
        return new Promise((resolve,reject)=>{
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(query,[userInfo.id,userInfo.name,userPs],(err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }

    static async changePw(id, newpw){
        db = require("../config/db");

        const userPs = CryptoJs.SHA256(newpw).toString();
        return new Promise((resolve,reject)=>{
            const query = "UPDATE users SET psword = ? WHERE id = ?;";
            db.query(query,[userPs,id],(err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }

        
}

module.exports = UserStorage;