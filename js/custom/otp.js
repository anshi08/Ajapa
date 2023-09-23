async function loginWithPhone(pno) {
    console.log(pno)
    const response = await fetch(`http://192.168.29.52:8080/loginWithSmsOTP1/${pno}`,{
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
    const response = await fetch(`http://192.168.29.52:8080/verifySmsOTP1/${otp}/${pno}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("Done" ,res)

    if(res.token == 'Invalid User information'){
        alert("Invalid User")
    }else {
        localStorage.setItem("data",JSON.stringify(res.token)) 
        localStorage.setItem("type",JSON.stringify(res.type)) 
        window.location.href = "dashboard.html";
    }

}

document.getElementById("btn").addEventListener("submit",()=>{
let pno =document.getElementById("identifier").value
loginWithPhone(pno)
})


document.getElementById("btn1").addEventListener("submit",()=>{
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