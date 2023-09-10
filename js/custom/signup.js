let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click", () =>{

    let name = getElementByIdName("name");
    let gender = document.getElementById("gender").value;
    let dob = getElementByIdName("dob");
    let email = getElementByIdName("email");
    let pw = getElementByIdName("pw");
    let country = getElementByIdName("country");
    let city = getElementByIdName("city");

    if (name.trim() === "") {
        // clearDisplayError()        
        displayError("Full Name is required.");
        return;
    }

    if (gender === "") {
        clearDisplayError()
        displayError("Gender is required.");
        return;
    }

    if (dob.trim() === "") {
        clearDisplayError()
        displayError("Date of Birth is required.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        clearDisplayError()
        displayError("Please enter a valid Email address.");
        return;
    }

    if (email.trim() === "") {
        clearDisplayError()
        displayError("Email is required.");
        return;
    }

    if (pw.trim() === "") {
        clearDisplayError()
        displayError("Password is required.");
        return;
    } else if (pw.length < 8) {
        clearDisplayError()
        displayError("Password Must be at least 8 characters long");
        return;
    }

    if (country.trim() === "") {
        clearDisplayError()
        displayError("Country is required.");
        return;
    }

    if (city.trim() === "") {
        clearDisplayError()
        displayError("City is required.");
        return;
    }
    const data = {
        full_name: name,
        gender: gender,
        dob: dob, 
        email: email,
        password:pw,
        country: country,
        city: city,
    }
    signup(data);
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
    window.location.href = "index.html";
    return res;
    }
} catch (error) {

    console.error("An error occurred:", error);
}}


function isAuth(){
    if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
        // window.location.href = "register.html"
    }else{
        history.back()
    }
}

window.addEventListener("DOMContentLoaded",isAuth)