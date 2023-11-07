"use strict";

const User = require("../../models/User");
const UserLoginCookie = require("../../models/UserLoginCookie");
const UserStorage = require("../../models/UserStorage");

const output = {
    home: (req, res)=>{ 
        res.render("home/index");
        
    },    
    login: (req, res)=>{
        let cookie = req.cookies;

        if(cookie.login=='true')
        {
            return res.redirect("../profile");
        }
        else{
            res.render("home/login");
        }
        
    },
    register:(req,res)=>{
        let cookie = req.cookies;

        if(cookie.login=='true')
        {
            return res.redirect("../profile");
        }
        else{
            res.render("home/register");
        }
    },
    profile: async (req,res)=>{
        
        let response = await UserLoginCookie.checklogin(req);
        if(response.success){
            res.render("home/profile");
        }
        else{
            
            await res.cookie('login',false);
            await res.cookie('loginid',null);
            await res.cookie('key',null);

            await res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            await res.write("<script>alert(\""+response.msg+"\")</script>");
            await res.write("<script>window.location=\"../login\"</script>");
            
        }
        
    }
};


const process = {
    login: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.login();

        if(response.success){
        
            const key = await UserLoginCookie.genCookie(response.loginid);
            await res.cookie('key',key);
            await res.cookie('login',true);
            await res.cookie('loginid',response.loginid);
            console.log(response.loginid);

        }else{
            await res.cookie('key',null);
            await res.cookie('login',false);
            await res.cookie('loginid',null);
        }
        return await res.json(response);
        
    },
    register: async (req,res)=>{
        const user = new User(req.body);
        const response = await user.register();

        return res.json(response);
    },
    logout: async(req,res)=>{
        
        
        let response = await UserLoginCookie.checklogin(req);
        
        await res.cookie('key',null);
        await res.cookie('login',false);
        await res.cookie('loginid',null);
        
        if(response.success){
            await UserLoginCookie.delCookie(response.id);
            return res.json({success:true,msg:"로그아웃 했습니다."});
        }

        return res.json({success:false,msg:response.msg});
        
    },
    profile: async(req,res)=>{
        let response = await UserLoginCookie.checklogin(req);
        const data = await UserStorage.getUserInfo(response.id);
        return res.json({name:data.name});
    }
};



module.exports = {
    output,
    process,
    
};