const logoutBtn = document.querySelector("#logout");
const nameTx = document.querySelector("#name");
const chpwBtn = document.querySelector("#changepsword");

logoutBtn.addEventListener("click", logout);
chpwBtn.addEventListener("click", chpsword);

fetch("/profile",{
    method: "POST",
}).then((res)=>res.json())
.then((res) => {
    nameTx.innerText=res.name+"님의 프로필입니다.";
}).catch((err)=>{
    
});

function logout(){
    
    fetch("/logout",{
        method: "POST",
    }).then((res)=>res.json())
    .then((res) => {
        alert(res.msg);
        location.href="/login";
    }).catch((err)=>{
        
    });
}

function chpsword(){
    location.href="/chpsword";
    return;
}