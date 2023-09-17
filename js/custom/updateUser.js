

let rememberDateInput = document.getElementById("rememberDate");
let dontRememberDateInput = document.getElementById("dontRememberDate");
let element = document.getElementById("country")
let stateElement = document.getElementById("state")
let cityElement = document.getElementById("city")
let btn = document.getElementById("btn")
let diksha_dt = document.getElementById("diksha_dt")
let wNumber = document.getElementById("whatsapp_num")
let rememberMobInput = document.getElementById("rememberMob")
let dontRememberMob = document.getElementById("dontRememberMob")


function getElementByIdName(idName){
    return document.getElementById(idName).value
}

function displaySuccessMessage(message) {
    const successContainer = document.getElementById("successContainer");
    const successDiv = document.createElement("div");
    successDiv.classList.add("alert", "alert-success", "alert-dismissible", "fade", "show");
    successDiv.textContent = message;
    successContainer.appendChild(successDiv);

    // Clear the success message after a few seconds (optional)
    setTimeout(function () {
        successDiv.remove();
    }, 3000); // 3 seconds
}

diksha_dt.style.display = "none";

dontRememberMob.addEventListener("click" , () => {
    wNumber.value = ""
})

rememberDateInput.addEventListener("click", () => {
    // console.log("Remember date clicked");
    diksha_dt.style.display = "block";
});

dontRememberDateInput.addEventListener("click", () => {
    diksha_dt.style.display = "none";
});

btn.addEventListener("click", () => {

    let age = getElementByIdName("age")
    let mobileNum = getElementByIdName("mobile_num")
    let whatsapp_num = getElementByIdName("whatsapp_num")
    let email = getElementByIdName("email");
    let blood_grp = getElementByIdName("blood_grp")
    let diksha_dt_value = getElementByIdName("diksha_dt")
    let occupation = getElementByIdName("occupation")
    let file = getElementByIdName("file")
    let qualification = getElementByIdName("qualification")
    let address_linep = getElementByIdName("address_linep")
    let country_ele=document.getElementById("country");
    let state_ele=document.getElementById("state");
    let city_ele=document.getElementById("city");
    let pincode = getElementByIdName("pincode")
    
    let country = document.getElementById("country").value+":"+country_ele.options[country_ele.selectedIndex].text;
    let city = document.getElementById("city").value+":"+city_ele.options[city_ele.selectedIndex].text;
    let state = document.getElementById("state").value+":"+state_ele.options[state_ele.selectedIndex].text;

    //Validations
    if(age.trim() === ''){
        displayError("Enter Age");
        return;
    }

    const num = /^\d{10}$/;
    if(whatsapp_num.trim() === ''){
        clearDisplayError()
        displayError("WhatsApp number is required");
        return;
    }
     else if (!num.test(whatsapp_num)){
        clearDisplayError()
        displayError("Enter a valid 10-digit WhatsApp number");
        return;
    }


    if(blood_grp.trim() === ''){
        clearDisplayError()
        displayError("Enter Blood Group");
        return;
    }

    if(occupation.trim() === ''){
        clearDisplayError()
        displayError("Enter Occupation");
        return;
    }

    if(qualification.trim() === ''){
        clearDisplayError()
        displayError("Enter Qualification");
        return;
    }

    if(address_linep.trim() === ''){
        clearDisplayError()
        displayError("Enter Address");
        return;
    }
    if(state.trim === ''){
        clearDisplayError()
        displayError("Enter State");
        return;
    }

    const pin = /^\d{6}$/;
    if(pincode.trim() === ''){
        clearDisplayError()
        displayError("PinCode is required");
        return;
    }else if(!pin.test(pincode)){
        clearDisplayError()
        displayError("Pincode should be a 6-digit number")
    }

    const data = {
        age: age,
        mobileNum: mobileNum,
        whatsapp_num: whatsapp_num,
        email: email,
        blood_grp: blood_grp,
        diksha_dt: diksha_dt_value,
        occupation: occupation,
        file: file,
        qualification: qualification,
        address_linep: address_linep,
        country: country,
        city: city,
        state: state,
        pincode: pincode
    }
    updateProfile(data)
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

function clearFormFields() {
    document.getElementById("age").value = '';
    document.getElementById("mobile_num").value = '';
    document.getElementById("whatsapp_num").value = '';
    document.getElementById("email").value = '',
    document.getElementById("blood_grp").value = '';
    document.getElementById("diksha_dt").value = '';
    document.getElementById("occupation").value = '';
    document.getElementById("file").value = '';
    document.getElementById("qualification").value = '';
    document.getElementById("address_linep").value = '';
    document.getElementById("country").value = '';
    document.getElementById("city").value = '';
    document.getElementById("state").value = '';
    document.getElementById("pincode").value = '';
}

async function getCountry() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/countries",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("res" , res)
        //   Populate dropdown with state options
            res.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.id , country.name; // Assuming each state object has an "id" property
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
    cityElement.value = "" ;
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
    
  function handleCityChange(selectedCity) {
    console.log(`Selected City: ${selectedCity}`);
  }
    });

async function detailsOfUser(email) {
   
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUserDetails/${email}`,{   
        method: "GET",
        headers: {
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")),
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("res", res)
     document.getElementById("age").value = res.age;
    document.getElementById("mobile_num").value = res.mobileNum;
    rememberMobInput.addEventListener("click" , () => {
        document.getElementById("whatsapp_num").value = document.getElementById("mobile_num").value
    });
    document.getElementById("whatsapp_num").value = res.whatsapp_num
    let aa = res.country.split(":")
    document.getElementById("email").value = res.email;
    document.getElementById("blood_grp").value = res.blood_grp
    document.getElementById("diksha_dt").value =res.diksha_dt
    document.getElementById("occupation").value = res.occupation
    document.getElementById("qualification").value = res.qualification;
    document.getElementById("address_linep").value = res.address_linep   
    
    let string = `
    
    <div class="form-group">
    <label>Select a Country :</label>
    <select id="country" class="form-control">
        <!-- Options will be added dynamically -->
        <option>${aa[1]}</option>
    </select>
</div>
    
    `
    document.getElementById("country").innerHTML = string

    let a = res.state.split(":")
    console.log(a[1])    
    let st = `
    
    <div class="form-group">
    <label>Select a Country :</label>
    <select id="state" class="form-control">
        <!-- Options will be added dynamically -->
        <option>${a[1]}</option>
    </select>
</div>
    
    `
    document.getElementById("state").innerHTML = st

    let c = res.city.split(":")
    console.log(c[1])

    let cc = `
    <div class="form-group">
    <label>Select a Country :</label>
    <select id="city" class="form-control">
        <!-- Options will be added dynamically -->
        <option>${c[1]}</option>
    </select>
</div>
    
    `
    document.getElementById("city").innerHTML = cc
    document.getElementById("pincode").value = res.pincode
}
 

detailsOfUser(parseJwt(localStorage.getItem("data")).email);

//Fetching Values From the Token
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

async function updateProfile(data) {
  
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/updateUser",{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")),
                "Content-type":"application/json;  charset=UTF-8"
            }
        })
        if(response.ok){
        const res = await response.json()
        console.log("update",res)
        clearDisplayError();
        clearFormFields();
        displaySuccessMessage("Your profile has been updated.");
        

        setTimeout(() => {
            window.location.href = "dashboard.html"
        }, 2000)
        return res;
        }
        else {
            displayError("Error: Failed to update.");
        }
}