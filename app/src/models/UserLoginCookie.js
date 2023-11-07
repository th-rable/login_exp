let userLoginCookie = {
    id:[],
    key:[],
};

class UserLoginCookie{
    static getCookie(id){
        let i=0;
        for(; i<userLoginCookie.id.length;i++){
            if(userLoginCookie.id[i]==id){
                return userLoginCookie.key[i];
            }
        }
        return null;
    }
    static async genCookie(id){
        await this.delCookie(id);
        let key = Math.random().toString();
        await userLoginCookie.id.push(id);
        await userLoginCookie.key.push(key);
        
        return key;
    }
    static async delCookie(id){
        let i=0;
        for(; i<userLoginCookie.id.length;i++){
            if(userLoginCookie.id[i]==id){
                await userLoginCookie.id.splice(i,1);
                await userLoginCookie.key.splice(i,1);

                return;
            }
        }
        
    }
    static async checklogin(req){
        let cookie = await req.cookies;
        if(cookie.login == 'true'){
            let key = UserLoginCookie.getCookie(cookie.loginid);
            if(key == null) return {success: false, msg: "로그인이 필요합니다."};
            else if(key != cookie.key){
                return {success: false, msg: "자동 로그아웃 되었습니다."};
            }
            else return {success: true, msg: "", id: cookie.loginid};
        }
    
        return {success: false, msg: "로그인이 필요합니다."};
    }
}

module.exports = UserLoginCookie;