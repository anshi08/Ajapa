let btn = document.getElementById("btn")
function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click", async () => {

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
    const key = await generateKey()
    console.log("mykey",key)
    const {encryptedData} = await encryptMessage(pwd,key)
    const newkey = await generateKeyInStringFormat(key)
    let newEncryptedData = encryptedData+"-->"+newkey
    
    
    // const data = {
    //      identifier:identifier,
    //      password:newEncryptedData
    // }
    const data ={
        identifier:identifier,
        password:pwd
    }
    console.log("hhhh",data )
    if(type==="admin"){
        AdminLogin(data)

    }else{
        signin(data);
   
    }
    
})


async function generateKey() {
    return await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }
async function generateKeyInStringFormat(key){
  const exportedKey = await crypto.subtle.exportKey('jwk', key);
  const keyString = JSON.stringify(exportedKey);
  return keyString;
}

  // Function to encrypt a message
async function encryptMessage(message, key) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
     // Convert the encrypted data and IV to Base64 strings
  const encryptedDataString = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
  const ivString = btoa(String.fromCharCode(...iv));

  return { encryptedData: encryptedDataString, iv: ivString };
  
  }
  
  


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
    console.log(data)
    try {
        const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/login",{
            // const response = await fetch('http://192.168.29.217:8080/login',{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json;  charset=UTF-8"
            }
        })
        if(response.ok){
        const res = await response.json()
        const userRole = res.type;
        const isAdmin = res.isAdmin;
       if(res.token == 'Invalid User Name'){
            clearDisplayError();
            displayError("Invalid User Name")
        }
        else if(res.token == 'Invalid Password'){
            clearDisplayError()
            displayError("Invalid Password")
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

function myFunction(){
let passwordInput = document.getElementById("pwd")
let passwordErr =  document.getElementById("passwordError")
    
    if(passwordInput.value.length < 5){
       passwordErr.style.display = "block"
       passwordErr.innerText = "Password must contain atleast 5 characters"
    }else{
       passwordErr.style.display = "none"
    }
}
