const nowpw =  document.querySelector("#nowpw"),
    newpw = document.querySelector("#newpw"),
    checkpw = document.querySelector("#checkpw"),
    button = document.querySelector("#chbutton");

button.addEventListener("click",change);

function change(){
    if(newpw.value != checkpw.value){
        alert("새로운 비밀번호가 서로 다릅니다.");
        return;
    }
    
    fetch("/chpsword",{
        method :"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({nowpw:nowpw.value, newpw:newpw.value}),
    }).then((res)=> res.json())
    .then((res)=>{
        
        alert(res.msg);
        if(res.success){
            location.href="/login";
        }
        
    })
}