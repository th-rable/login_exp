"use strict";

const UserStorage = require("./UserStorage");
const CryptoJs = require("crypto-js");

class User{
    constructor(body){
        this.body = body;
    }

    async login(){
        const client = this.body;
        const client_ps = CryptoJs.SHA256(client.psword).toString();
        //console.log(client_ps);

        try {
            const data = await UserStorage.getUserInfo(client.id);
            if(data == undefined){
                return {success: false, msg: "존재하지 않는 아이디입니다."};
            }
            const {id, psword} = data;


            if(id){
                if(id === client.id && psword === client_ps){
                    return {success: true};
                }
                return {success: false, msg: "비밀번호가 틀렸습니다."};
            }
            return {success: false, msg: "존재하지 않는 아이디입니다."};
        } catch (error) {
            return {success: false, msg: error};
        }

        
    }

    async register(){
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {

            return{success: false, msg: "사용 불가능한 아이디입니다."};
        }
        
    }
 }

 module.exports = User;