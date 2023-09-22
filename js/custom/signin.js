let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click", () => {

    let identifier = getElementByIdName("identifier")
    let pwd = getElementByIdName("pwd")

    const identifierPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^\d{10}$/;
    if (!identifierPattern || !phoneRegex) {
        clearDisplayError()
        displayError("identifier or Phone number is required");
        return;
    }else if(!identifierPattern.test(identifier) && !phoneRegex.test(identifier)){
        clearDisplayError()
        displayError("Enter a valid identifier or Phone Number");
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
    signin(data);
    
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
        window.location.href = "dashboard.html";
        }
        
        }

} catch (error) {
    console.error("An error occurred:", error);
}}


function isAuth(){
    if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
        // window.location.href = "login.html"
    }else{
        history.back()
    }
}

window.addEventListener("DOMContentLoaded",isAuth)