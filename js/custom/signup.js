let btn = document.getElementById("btn")
let element = document.getElementById("country")
let stateElement = document.getElementById("state")
let cityElement = document.getElementById("city")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}
      
btn.addEventListener("click", () =>{

    let name = getElementByIdName("name");
    let gender = document.getElementById("gender").value;
    let dob = getElementByIdName("dob");
    let mobileNum = getElementByIdName("mobile_num")
    let email = getElementByIdName("email");
    let pw = getElementByIdName("pw");
    let rpwd = getElementByIdName("rpwd");
    let country_ele=document.getElementById("country");
    let state_ele=document.getElementById("state");
    let city_ele=document.getElementById("city");
    
    let country = document.getElementById("country").value+":"+country_ele.options[country_ele.selectedIndex].text;
    let city = document.getElementById("city").value+":"+city_ele.options[city_ele.selectedIndex].text;
    let state = document.getElementById("state").value+":"+state_ele.options[state_ele.selectedIndex].text;

    if (name.trim() === "") {
        clearDisplayError()        
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

    const phoneRegex = /^\d{10}$/;
    if(mobileNum.trim() === ''){
        clearDisplayError()
        displayError("Mobile number is required");
        return;
    }else if (!phoneRegex.test(mobileNum)){
        clearDisplayError()
        displayError("Enter a valid 10-digit mobile number");
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

    if(rpwd.trim() === "")
    {
        document.getElementById("pwdErr").innerHTML = "<span style='color: red;'>Re-type Password</span>";
        return;
    }else if(rpwd === pw){
        document.getElementById("pwdErr").innerHTML = "<span style='color: green;'>Password Matched</span>";
    } else {
        document.getElementById("pwdErr").innerHTML = "<span style='color: red;'>Password does not Match</span>";
        return;
    }

    if (country.trim() === "") {
        clearDisplayError()
        displayError("Country is required.");
        return;
    }
    if (state.trim() === ""){
        clearDisplayError()
        displayError("State is required.");
        return;
    }
    if (city.trim() === "") {
        clearDisplayError()
        displayError("City is required.");
        return;
    }
    const data = {
        fullName: name,
        gender: gender,
        dob: dob, 
        mobileNum: mobileNum,
        email: email,
        password:pw,
        country: country,
        city: city,
        state: state
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

function waitingResponse(message){
    const waitingMsg = document.getElementById("waitingMsg");
    const successDiv = document.createElement("div");
    successDiv.classList.add("alert", "alert-info", "alert-dismissible", "fade", "show");
    successDiv.textContent = message;
    waitingMsg.appendChild(successDiv);

    // Clear the success message after a few seconds (optional)
    setTimeout(function () {
        successDiv.remove();
    }, 6000); // 6 seconds
}

function clearDisplayError(){
    // Clear previous error messages
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.innerHTML = '';
}

function clearAllFields() {
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("mobile_num").value= '',
    document.getElementById("email").value = "";
    document.getElementById("pw").value = "";
    document.getElementById("rpwd").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    clearDisplayError();
}

async function getCountry() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/countries",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
   
        //   Populate dropdown with state options
            res.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.id; // Assuming each state object has an "id" property
            option.text = country.name; // Assuming each state object has a "name" property
            element.appendChild(option);
          });

}

getCountry()

element.addEventListener('change', function (e) {
    const selectedCountry = e.target.value;
    handleCountryChange(selectedCountry);
  });
  
  function handleCountryChange(selectedCountry) {
    console.log(`Selected country: ${selectedCountry}`);
    stateElement.value = "" ;
    stateElement.innerHTML = '';
    fetchStates(selectedCountry);
    
  }

async function fetchStates(countryId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/states/${countryId}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    const res = await response.json()
    console.log("res",res)

    stateElement.innerHTML = '';

res.forEach((state) => {
    const option = document.createElement('option');
    option.value = state.id;
    option.text = state.name;
    stateElement.appendChild(option);
  });
}

stateElement.addEventListener('change', function (e) {
    const selectedState = e.target.value;
    handleStateChange(selectedState);
  });
  
  function handleStateChange(selectedState) {
    console.log(`Selected State: ${selectedState}`);
    cityElement.value='';
    cityElement.innerHTML = '';
    fetchCities(selectedState)
  }

async function fetchCities(stateId) {
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/cities/${stateId}`,{
        method:"GET",
        headers:{
                "Content-type": "application/json; charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("res",res)

    res.forEach((city) => {
        const option = document.createElement('option');
        option.value = city.id;
        option.text = city.name;
        cityElement.appendChild(option);
      });
  }

  cityElement.addEventListener('change', function (e) {
    const selectedCity = e.target.value;
    handleCityChange(selectedCity);
  });

  function handleCityChange(selectedCity) {
    console.log(`Selected City: ${selectedCity}`);
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
    clearDisplayError();
    clearAllFields();
    waitingResponse("Please wait for admin approval before logging in.")
    return res;
    }
} catch (error) {

    console.error("An error occurred:", error);
}}
// function isAuth(){
//     if(localStorage.getItem("data")===null || localStorage.getItem("data")===''){
//         window.location.href = "dashboard.html";
//     }else{
//         alert("You are not authorized to access the dashboard.");
//         // history.back()
//     }
// }

// btn.addEventListener("click",isAuth)