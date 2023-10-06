async function loginWithPhone(pno) {
    console.log(pno)
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/loginWithSmsOTP1/${pno}`,{
                                method:"POST",
                                })

const res = await response.text()
console.log("hii",res)
if(res === "OTP Sent")
document.getElementById("otpfinder1").style.display ="block"
document.getElementById("btn1").style.display =  "block"
document.getElementById("btn").style.display =  "none"
}

async function verifyUser(otp,pno){
    console.log(otp,pno)
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/verifySmsOTP1/${otp}/${pno}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()

    if(res.token == 'No user found'){
        alert("No user found")
    }else {
        localStorage.setItem("data",JSON.stringify(res.token)) 
        localStorage.setItem("role",JSON.stringify(res.type)) 
        console.log("Hello",res)
        window.location.href = "dashboard.html";
    }

}

document.getElementById("btn").addEventListener("click",(e)=>{
    e.preventDefault(); 
    let pno =document.getElementById("identifier").value
    const phoneRegex = /^\d{10}$/;
    const phoneRegex1 = /^[6-9]\d{9}$/;
    if(!pno){
       alert("Number required");
    }else if(!phoneRegex.test(pno)){
        alert("Enter Valid 10 digit Number");
    }else if(!phoneRegex1.test(pno)){
        alert("Enter Number with Valid Digit");
    }else{
       loginWithPhone(pno)
    }
})

document.getElementById("btn1").addEventListener("click",()=>{
    let otp = document.getElementById("otpfinder2s").value
    let newpno = document.getElementById("identifier").value
    verifyUser(otp,newpno)
    
})

function isAuth(){
    if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
        // window.location.href = "login.html"
    }else{
        history.back()
    }
}

window.addEventListener("DOMContentLoaded",isAuth)