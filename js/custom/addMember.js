let btn = document.getElementById("btn")
let element = document.getElementById("country")
let stateElement = document.getElementById("state")
let cityElement = document.getElementById("city")
let phoneNumber = document.getElementById("mobile_num")


function getElementByIdName(idName){
    return document.getElementById(idName).value
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
      
btn.addEventListener("submit", (e) =>{
   
    e.preventDefault()
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


    if(rpwd.trim() === "")
    {
        document.getElementById("pwdErr").innerHTML = "<span style='color: red;'>Re-type Password</span>";
        return;
    }else if (rpwd != pw) {
        document.getElementById("pwdErr").innerHTML = "<span style='color: red;'>Password does not Match</span>";
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
        state: state,
        userType:"member"
    }
    signup(data);
})

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

 async function fetchStates(countryId,selectedStateValue){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/states/${countryId}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    const res = await response.json()
    stateElement.innerHTML = '';
    res.forEach((state) => {
    const option = document.createElement('option');
    option.value = state.id;
    option.text = state.name;
    stateElement.appendChild(option);

  });
  //Selecting Default Value
  const defaultStateOption = stateElement.querySelector(`option[value="${selectedStateValue}"]`);
  if (defaultStateOption) {
      defaultStateOption.selected = true;
  }
}

 stateElement.addEventListener('change', function (e) {
    const selectedState = e.target.value;
    handleStateChange(selectedState);
  });
  
  function handleStateChange(selectedState) {
    cityElement.value='';
    cityElement.innerHTML = '';
    fetchCities(selectedState)
  }

 async function fetchCities(stateId,selectCityValue) {
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/cities/${stateId}`,{
        method:"GET",
        headers:{
                "Content-type": "application/json; charset=UTF-8"
        }
    })
    const res = await response.json()
    res.forEach((city) => {
        const option = document.createElement('option');
        option.value = city.id;
        option.text = city.name;
        cityElement.appendChild(option);
      });

  //Selecting Default Value
  const defaultCityOption = cityElement.querySelector(`option[value="${selectCityValue}"]`);
  if (defaultCityOption) {
      defaultCityOption.selected = true;
  }
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
    const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/signup2',{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")),
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    if(response.ok){
    const res = await response.json()
    console.log(res)
    clearAllFields();
    document.getElementById("pwdErr").style.display  = "none"
    // waitingResponse
    $('#pending').modal('show');
    // setTimeout(()=>{
    //     window.location.href = "dashboard.html"
    // },2000)
       
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

phoneNumber.addEventListener("input",(e)=>{
    const phoneRegex = /^\d{10}$/;
    const phoneRegex1 = /^[6-9]\d{9}$/;
    // Test the phone number against the regex pattern
    if(!phoneRegex.test(e.target.value)){
        document.getElementById("phoneNumberTxt").style.display = "block"       
        document.getElementById("phoneNumberTxt").innerText = "Phone Number must be 10 digit"             
    }else if(!phoneRegex1.test(e.target.value)){
        document.getElementById("phoneNumberTxt").style.display = "block"       
        document.getElementById("phoneNumberTxt").innerText = "Phone Number start with a valid digit"    
    }
    else{
        document.getElementById("phoneNumberTxt").style.display = "none"   
    }
})

document.getElementById("email").addEventListener("input",e=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(e.target.value)){
        document.getElementById("emailErr").style.display = "block"
        document.getElementById("emailErr").innerText = "Enter Valid Email Address"
    }else{
        document.getElementById("emailErr").style.display = "none"
    }
})


async function getAllFamilyMembers(family_id){
    const res  = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFamilyMembers/${family_id}`)
   const response = await res.json()
   console.log(response)
   response.forEach((myres)=>{
    let option = document.createElement("option")
    option.innerText = myres.fullName
    option.value = myres.id
    document.getElementById("sel1").appendChild(option)
   })
   return response;

}

window.addEventListener("DOMContentLoaded",async ()=>{
  const allFamilyMembers =   await getAllFamilyMembers(localStorage.getItem("family_id"))
  let countrySelectBox  = document.getElementById("sel1")



    countrySelectBox.addEventListener("change",(e)=>{
       let address = allFamilyMembers.filter(mem => mem.id===+e.target.value)[0]
       let option = document.createElement("option")
       option.innerText = address.country.split(":")[1]
       option.value = address.country.split(":")[0]
       let country = `<option value='${address.country.split(":")[0]}'>${address.country.split(":")[1]}</option>`
       document.getElementById("country").innerHTML = country
       getCountry();

       let state = `<option value='${address.state.split(":")[0]}'>${address.state.split(":")[1]}</option>`
       document.getElementById("state").innerHTML = state;
       const defaultValue = stateElement.getElementsByTagName("option");
    for (let i = 0; i < defaultValue.length; i++) {
    if (defaultValue[i].value === address.state.split(":")[0]) {
        defaultValue[i].selected = true;

        fetchStates(address.country.split(":")[0],defaultValue[i].value);
    }
}
    
       let city = `<option value='${address.city.split(":")[0]}'>${address.city.split(":")[1]}</option>`
       document.getElementById("city").innerHTML = city;
       const value = stateElement.getElementsByTagName("option");
       for (let i = 0; i < value.length; i++) {
       if (value[i].value === address.state.split(":")[0]) {
           value[i].selected = true;
   
           fetchCities(address.state.split(":")[0],value[i].value);
       }
   }

    })
})