let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click", () => {

    let identifier = getElementByIdName("identifier")
    let pwd = getElementByIdName("pwd")
    let type = document.getElementById("type").value
    const identifierPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^\d{10}$/;
    if (!identifierPattern || !phoneRegex) {
        clearDisplayError()
        displayError("identifier or Phone number is required");
        return;
    }else if(!identifierPattern.test(identifier) && !phoneRegex.test(identifier)){
        clearDisplayError()
        displayError("Enter a valid Email or Phone Number");
        return;
    }

    if (pwd.length < 5) {
        clearDisplayError()
        displayError("Password Must be at least 5 characters long");
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