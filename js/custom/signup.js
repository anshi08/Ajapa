let btn = document.getElementById("btn")
let element = document.getElementById("country")
let stateElement = document.getElementById("state")
let cityElement = document.getElementById("city")
let phoneNumber = document.getElementById("mobile_num")
let phoneNumberValue = ""
let pwd = document.getElementById("pw").value;
let rp = document.getElementById("rpwd").value;
rpValue = ""
let dob = document.getElementById("dob")
let today = new Date().toISOString().split('T')[0];
dob.setAttribute("max",today)



function getElementByIdName(idName){
    return document.getElementById(idName).value
}


// window.addEventListener("DOMContentLoaded",async ()=>{
//     async function getCountriesCodeLocally (){
//         const res = await fetch('./countries.js')
//         const response = await res.json()
    
//         return response;
//     }
//     let code =   await getCountriesCodeLocally()

//     code.forEach(country=>{
//         const option = document.createElement("option");
//         option.value = country.id
//         option.text = country.phone
//         document.getElementById("phoneNumCountries").appendChild(option)
//     })
// })

      
btn.addEventListener("submit", (e) =>{
   
    e.preventDefault()
    let name = getElementByIdName("name");
    let gender = document.getElementById("gender").value;
    let dob = getElementByIdName("dob");
    let mobileNum = getElementByIdName("mobile_num")
    let email = getElementByIdName("email");
    let file = document.getElementById("file").files[0]
    let pw = getElementByIdName("pw");
    let rpwd = getElementByIdName("rpwd");
    let country_ele=document.getElementById("country");
    let state_ele=document.getElementById("state");
    let city_ele=document.getElementById("city");
    
    let country = document.getElementById("country").value+":"+country_ele.options[country_ele.selectedIndex].text;
    let city = document.getElementById("city").value+":"+city_ele.options[city_ele.selectedIndex].text;
    let state = document.getElementById("state").value+":"+state_ele.options[state_ele.selectedIndex].text;


    const data = {
        fullName: name,
        gender: gender,
        dob: dob, 
        mobileNum: mobileNum,
        email: email,
        file:file,
        password:pw,
        country: country,
        city: city,
        state: state,
        userType:"head"
    }

    if(phoneNumberValue ==="LessThan10Digit"){
        alert("Enter Valid 10 Digits Mobile Number")
        phoneNumber.focus()
        return;


    }else if(phoneNumberValue ==="InvalidDigit"){
        alert("Start Mobile Number with valid Digit")
        phoneNumber.focus()
        return;
    }
    else{
   signup(data);
    }

})

function clearAllFields() {
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("file").value = "";
    document.getElementById("mobile_num").value= '',
    document.getElementById("email").value = "";
    document.getElementById("pw").value = "";
    document.getElementById("rpwd").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
}

async function getCountry() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/countries",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
   
        //  dropdown 
            res.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.id; 
            option.text = country.name; 
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
    clearAllFields();
    document.getElementById("pwdErr").style.display  = "none"
    saveUserImg(data.file,data.email)
    // waitingResponse
    if(res.msg === 'User exists'){
        $('#pendingDialog1').modal('show');
    }else{
        $('#pendingDialog').modal('show');
    }
     
    setTimeout(()=>{
       window.location.href = "register.html"
    },4000)
    
    
    return res;
    }
} catch (error) {

    console.error("An error occurred:", error);
}}

//Validation for input
document.getElementById("name").addEventListener("input",e=>{
    if(e.target.value === 0 || e.target.value.length === 0){
        document.getElementById("NameErr").style.display = "block"
    }else{
        document.getElementById("NameErr").style.display = "none"
    }
})

document.getElementById("dob").addEventListener("input",e=>{
    if(e.target.value === 0 || e.target.value.length === 0){
        document.getElementById("dobErr").style.display = "block"   
    }else{
        document.getElementById("dobErr").style.display = "none"   
    }
})

document.getElementById("gender").addEventListener("focusout",e=>{
    if(e.target.value === "Select"){
        document.getElementById("genderErr").style.display = "block"  
        focus()
    }else{
        document.getElementById("genderErr").style.display = "none"  
    }
})


phoneNumber.addEventListener("focusout",(e)=>{
    const phoneRegex = /^\d{10}$/;
    const phoneRegex1 = /^[6-9]\d{9}$/;
    // Test the phone number against the regex pattern
    if(!phoneRegex.test(e.target.value)){
        document.getElementById("phoneNumberTxt").style.display = "block"       
        document.getElementById("phoneNumberTxt").innerText = "Phone Number must be 10 digit" 
        phoneNumberValue="LessThan10Digit"            
    }else if(!phoneRegex1.test(e.target.value)){
        document.getElementById("phoneNumberTxt").style.display = "block"       
        document.getElementById("phoneNumberTxt").innerText = "Phone Number start with a valid digit"
        phoneNumberValue="InvalidDigit"
    }
    else{
        document.getElementById("phoneNumberTxt").style.display = "none"   
        phoneNumberValue=""
    }
})

document.getElementById("pw").addEventListener("input",e=>{
    if(e.target.value === 0 || e.target.value.length === 0){
        document.getElementById("pwdTxt").innerText = "Enter Password"
        document.getElementById("pwdTxt").style.display = "block"   
    }else if(e.target.value.length <5){
        document.getElementById("pwdTxt").innerText = "Password Must be at least 5 characters long"
        document.getElementById("pwdTxt").style.display = "block"      
    }else{
        document.getElementById("pwdTxt").style.display = "none"  
    } 
})

function validatePasswords() {
    let rp = document.getElementById("rpwd").value;
    let pwd = document.getElementById("pw").value;
    let pwdErr = document.getElementById("pwdErr");
    let submitBtn = document.getElementById("submit");

    if (rp !== pwd) {
        pwdErr.style.display = "block";
        pwdErr.focus();
        submitBtn.disabled = true;
    } else {
        pwdErr.style.display = "none";
        submitBtn.disabled = false;
    }
}


document.getElementById("email").addEventListener("input",e=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(e.target.value)){
        document.getElementById("emailErr").style.display = "block"
        document.getElementById("emailErr").innerText = "Enter Valid Email Address"
    }else{
        document.getElementById("emailErr").style.display = "none"
    }
})


    // const getCountryCode = document.getElementById("phoneNumCountries")
    // // console.log(getCountryCode)
    // console.log(countriesCode)
    // countriesCode.forEach(country=>{
    //   console.log(country)
    //   const option = document.createElement("option")
    //   option.value = country.id;
    //   option.text = country.number
    
    //   getCountryCode.appendChild(option);
    // });


//Saving user Image
const saveUserImg = async (file,email) => {
    // console.log(file,email)
    const form = new FormData();
    await form.append("file",file)
    await form.append("email",email)
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveImage2",{
    method:"POST",
    body:form,
    })
    const res = await response.json()
    console.log("IMG",res)
    return res;
}