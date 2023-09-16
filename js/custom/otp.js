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

document.getElementById("btn1").addEventListener("click",()=>{
    let otp = document.getElementById("otpfinder2s").value
    verifyUser(otp,pno)
    if(res.token == 'Invalid User information (0)'){
        alert("Invalid User")
    }else {
        localStorage.setItem("data",JSON.stringify(res.token)) 
        window.location.href = "dashboard.html";
    }
})

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
    console.log("Done" ,res)
}

document.getElementById("btn").addEventListener("click",()=>{
let pno =document.getElementById("identifier").value
loginWithPhone(pno)
})

