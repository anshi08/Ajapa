async function loginWithPhone(pno) {
    console.log(pno)
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/loginWithSmsOTP1/${pno}`,{
                                method:"POST",
                                })

const res = await response.text()
console.log("l",res)
if(res === 'Sorry... You are not a registered user'){
    $('#otpMessage').modal('show');
    document.getElementById("identifier").value = '';
    setTimeout(() => {
        window.location.href = "otpLogin.html"
    }, 2000);
}
else if(res === "OTP Sent"){
document.getElementById("otpfinder1").style.display ="block"
document.getElementById("btn1").style.display =  "block"
document.getElementById("btn").style.display =  "none"
}
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
    console.log(res)
    const userRole = res.type;
    const isAdmin = res.isAdmin;
  if(res.token == 'No user found'){
        alert("No user found")
        window.location.href = "otpLogin.html";
    }else if(res.token == 'Invalid OTP'){
       alert("Incorrect OTP")
       document.getElementById("otpfinder2s").value = '';
    }
    else if (res.token == "Unapproved User"){
        // clearDisplayError()
        alert("Unapproved User")
        // displayError("You're are not approved")
    }
    else {
        localStorage.setItem("data",JSON.stringify(res.token)) 
        localStorage.setItem("role",JSON.stringify(userRole))
        localStorage.setItem("isAdmin",JSON.stringify(isAdmin))
        localStorage.setItem("family_id",JSON.stringify(parseJwt(res.token).familyId))
        window.location.href = "dashboard.html";
    }

}

document.getElementById("btn").addEventListener("click",(e)=>{
    e.preventDefault(); 
    let pno =document.getElementById("identifier").value
    const combinedPhoneRegex = /^(\d{10}|[6-9]\d{9})$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    function areAllCharactersNumbers(inputString) {
        // Use a regular expression to check if all characters are numbers
        return /^\d+$/.test(inputString);
    }

    if(pno.length===0){
        alert("Please Enter Email or Phone Number")
    }else if(areAllCharactersNumbers(pno)){
        if (!combinedPhoneRegex.test(pno)) {
            alert('Please Enter a Valid Phone number')
        }else{
            loginWithPhone(pno)
        }
    }
    else if(!emailRegex.test(pno)){
        alert("Please Enter a Valid Email Address")
    }else{
        loginWithPhone(pno)
    }
    })

    // if(!pno){
    //    alert("Number or Email is required");
    // }else if(!phoneRegex.test(pno)){
    //     alert("Enter Valid 10 digit Number");
    // }else if(!phoneRegex1.test(pno)){
    //     alert("Enter Number with Valid Digit");
    // }else if(!emailRegex.test(pno)){
    //     alert("Enter Proper Email Address");
    // }else{
    //    loginWithPhone(pno)
    // }

document.getElementById("btn1").addEventListener("click",()=>{
    let otp = document.getElementById("otpfinder2s").value
    let newpno = document.getElementById("identifier").value
    if(document.getElementById("otpfinder2s").value === ''){
        alert("Enter Otp")
    }else{
        verifyUser(otp,newpno)
    }

})

function isAuth(){
    if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
        // window.location.href = "login.html"
    }else{
        history.back()
    }
}

window.addEventListener("DOMContentLoaded",isAuth)

//Validation
// document.getElementById("identifier").addEventListener("input",(e)=>{
    
//     const phoneRegex = /^\d{10}$/;
//     const phoneRegex1 = /^[6-9]\d{9}$/;
//     // Test the phone number against the regex pattern
//     if(!phoneRegex.test(e.target.value)){
//         document.getElementById("numErr").style.display = "block"       
//         document.getElementById("numErr").innerText = "Phone Number must be 10 digit"  
//     }else if(!phoneRegex1.test(e.target.value)){
//         document.getElementById("numErr").style.display = "block"       
//         document.getElementById("numErr").innerText = "Phone Number start with a valid digit" 
//     }
//     else{
//         document.getElementById("numErr").style.display = "none"   
//     }
// })


function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();

function displayError(errorMessage) {
    const errorContainer = document.getElementById("errorContainer");
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger");
    errorDiv.textContent = errorMessage;
    errorContainer.appendChild(errorDiv);
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}