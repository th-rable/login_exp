"use strict";

class UserStorage{
    static #users = {
        id: ["admin1","admin2","admin3"],
        psword: ["1234","2345","3456"],
        name: ["이름1","이름2","이름3"],
    };

    static getUsers(...fields){
        const users = this.#users;
        const newUsers = fields.reduce((newUsers,field) => {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;