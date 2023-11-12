let data = JSON.parse(localStorage.getItem("signupData"))
// console.log(data)

async function verifyUser(otp,pno){


    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/verifyEmailOrPno/${otp}/${pno}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log(res)
    if(res.token ==="Invalid OTP"){
        $('#otpMessage').modal('show');
        document.getElementById("otp").value = '';
        localStorage.clear()
    }else{
        // Signup api please call here
        signup(data)
    }
  
}

async function loginWithEmailAndPno(pno,email){
    
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/sendOtpEmailOrPno/${pno}/${email}`,{
        method:"POST",
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.text()
    console.log("🚀 ~ file: signupverify.js:36 ~ loginWithEmailAndPno ~ res:", res)
    if(res == "OTP Sent"){
        document.getElementById("btn1").style.display = "block"
        document.getElementById("btn").style.display = "none"
        document.getElementById("phone").style.display = "none"
        document.getElementById("email").style.display = "none"
        document.getElementById("otp").style.display = 'block'
    }

}

document.getElementById("btn").addEventListener("click",(e)=>{
     pno =document.getElementById("phone").value
    let email = document.getElementById("email").value
    const combinedPhoneRegex = /^(\d{10}|[6-9]\d{9})$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/


    if(!combinedPhoneRegex.test(pno)){
        alert("Please Enter a Valid Phone Number")
    }
    else if(!emailRegex.test(email)){
        alert("Please Enter a Valid Email Address")
    }else{
        console.log(pno,email)
        loginWithEmailAndPno(pno,email)
    }
    })

document.getElementById("btn1").addEventListener("click",e =>{
    let otp = document.getElementById("otp").value
    let pno = +JSON.parse(localStorage.getItem("signupData")).mobileNum
    verifyUser(otp,pno)
})    



function isAuth(){
    if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
        // window.location.href = "login.html"
    }else{
        history.back()
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    isAuth()
    let data = JSON.parse(localStorage.getItem("signupData"))
    document.getElementById('email').value = data.email
    document.getElementById("phone").value = data.mobileNum
    document.getElementById("phone").setAttribute("disabled",true)
    document.getElementById("email").setAttribute("disabled",true)
    document.getElementById("otp").style.display = 'none'
})  

//SignUp Function
async function signup(data){
  
    try{
    const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/signup',{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    if(response.ok){
    const res = await response.json()
    console.log(res)
   if(res.msg === 'User exists'){
        $('#pendingDialog1').modal('show');
        document.getElementById("otp").value = '';
        setTimeout(()=>{
            window.location.href = "login.html"
        },3000)
    }else{
        $('#pendingDialog').modal('show');
        localStorage.clear()
        setTimeout(() => {
            window.location.href = "register.html"
        },3000);
    }
    
    return res;
    }
} catch (error) {

    console.error("An error occurred:", error);
}
}


function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();