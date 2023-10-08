let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click", () => {

    let identifier = getElementByIdName("identifier")
    let pwd = getElementByIdName("pwd")
    let type = document.getElementById("type").value

    function areAllCharactersNumbers(inputString) {
        // Use a regular expression to check if all characters are numbers
        return /^\d+$/.test(inputString);
    }

    const identifierPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ;
    const phoneRegex = /^\d{10}$/;

    if(identifier.length == 0 || pwd.length == 0 ){
        alert("Enter Email and Password")
        return;
    }
if(areAllCharactersNumbers(identifier)){
    if (!phoneRegex.test(identifier)) {
        alert('Please Enter a Valid Phone number')
        return;
    }
}else if(!identifierPattern.test(identifier)){
    alert("Please Enter a Valid Email Address")
    return; 
}
    const data = {
         identifier:identifier,
         password:pwd
    }
    if(type==="admin"){
        AdminLogin(data)

    }else{
        signin(data);
   
    }
    
})

function displayError(errorMessage) {
    const errorContainer = document.getElementById("errorContainer");
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger");
    errorDiv.textContent = errorMessage;
    errorContainer.appendChild(errorDiv);
}

function clearDisplayError(){
    // Clear previous error messages
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.innerHTML = '';
}



async function signin(data) {
    try {
        const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json;  charset=UTF-8"
            }
        })
        if(response.ok){
        const res = await response.json()
        console.log(res)
        const userRole = res.type;
        const isAdmin = res.isAdmin;
       if(res.token == 'Invalid User information'){
            clearDisplayError();
            displayError("Invalid User")
        }
        else if (res.token == "Unapproved User"){
            clearDisplayError()
            displayError("You're are not apporved!!!")
        }
        else{
        clearDisplayError();
        localStorage.setItem("data",JSON.stringify(res.token)) 
        localStorage.setItem("role",JSON.stringify(userRole))
        localStorage.setItem("isAdmin",JSON.stringify(isAdmin))
        localStorage.setItem("family_id",JSON.stringify(parseJwt(res.token).familyId))
        window.location.href = "dashboard.html";
        }
        }

} catch (error) {
    console.error("An error occurred:", error);
}}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

async function AdminLogin(data){
    try {
        const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/adminLogin",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json;  charset=UTF-8"
            }
        })
        const res = await response.json()
        if (res.token == "No data matches your input"){
            clearDisplayError()
            displayError("You are not Admin")
        }
        else{
        localStorage.setItem("data",JSON.stringify(res.token))
        localStorage.setItem("role",JSON.stringify(res.type))
        window.location.href = "dashboard.html"
        }
    } catch (error) {
        console.log(error)
    }
}



function isAuth(){
    
    if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
        // window.location.href = "login.html"
    }else{
        // history.back()
        // alert('hi')
        window.location= "dashboard.html"
    }
}

window.addEventListener("DOMContentLoaded",isAuth)

//Validation
// document.getElementById("identifier").addEventListener("input",(e)=>{
//     const phoneRegex1 = /^\d{10}$/;
//     const phoneRegex2 = /^[6-9]\d{9}$/;
//     // Test the phone number against the regex pattern
//     if(!phoneRegex1.test(e.target.value)){
//         document.getElementById("inputError").style.display = "block"       
//         document.getElementById("inputError").innerText = "Phone Number must be 10 digit"             
//     }else if(!phoneRegex2.test(e.target.value)){
//         document.getElementById("inputError").style.display = "block"       
//         document.getElementById("inputError").innerText = "Phone Number start with a valid digit"    
//     }
//     else{
//         document.getElementById("inputError").style.display = "none"   
//     }
// })

// document.getElementById("identifier").addEventListener("input",e=>{
//     const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
//     if(!emailPattern.test(e.target.value)){
//         document.getElementById("inputError").style.display = "block"
//         document.getElementById("inputError").innerText = "Enter Valid Email Address"
//     }else{
//         document.getElementById("inputError").style.display = "none"
//     }
// })

document.getElementById("pwd").addEventListener("input",e=>{
    
    if(e.target.value.length < 5){
        document.getElementById("passwordError").style.display = "block"
        document.getElementById("passwordError").innerText = "Password must contain atleast 5 characters"
    }else{
        document.getElementById("passwordError").style.display = "none"
    }
})