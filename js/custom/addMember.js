let btn = document.getElementById("btn")
let element = document.getElementById("country")
let stateElement = document.getElementById("state")
let cityElement = document.getElementById("city")
let phoneNumber = document.getElementById("mobile_num")
let chk = document.getElementById("chk")
let  phoneNumberIsValid = ""
let dob = document.getElementById("dob")
let today = new Date().toISOString().split('T')[0];
dob.setAttribute("max",today)


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
    let pw = getElementByIdName("pw");
    // let rpwd = getElementByIdName("rpwd");
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
        email: chk.checked ? null :email,
        password:chk.checked ? 'abc@password':password,
        country: country,
        city: city,
        state: state,
        userType:"member",
        status: 1
    }

    if(gender==="Select"){
        alert("Please Choose the gender")
        document.getElementById("gender").focus()
        return;

    }else if(phoneNumberIsValid==="LessThan10Digit"){
        alert("Enter a valid 10 Digits Mobile Number")
        phoneNumber.focus()
        return;


    }else if(phoneNumberIsValid==="InvalidDigit"){
        alert("Mobile Number starts with a valid digit")
        phoneNumber.focus()
        return;
    }else{
   signup(data);
    }

 
})

function clearAllFields() {
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("mobile_num").value= '',
    document.getElementById("email").value = "";
    document.getElementById("pw").value = "";
    // document.getElementById("rpwd").value = "";
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
    const newres = await response.json()
    const res = newres.filter(item => item.name!=='Pakistan')
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
    res?.forEach((state) => {
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
    if(res.msg === 'User exists'){
        $('#alreadyUser').modal('show');
    }else{
        $('#pendingreq10').modal('show');
        // clearAllFields();
        // setTimeout(()=>{
        //     window.location.href = "showFamilyMembers.html"
        // },2000)
    }
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

phoneNumber.addEventListener("focusout",(e)=>{
    const phoneRegex = /^\d{10}$/;
    const phoneRegex1 = /^[6-9]\d{9}$/;
    // Test the phone number against the regex pattern
    if(!phoneRegex.test(e.target.value)){
        document.getElementById("phoneNumberTxt").style.display = "block"       
        document.getElementById("phoneNumberTxt").innerText = "Phone Number must be 10 digit" 
        phoneNumberIsValid="LessThan10Digit"            
    }else if(!phoneRegex1.test(e.target.value)){
        document.getElementById("phoneNumberTxt").style.display = "block"       
        document.getElementById("phoneNumberTxt").innerText = "Phone Number start with a valid digit"    
        phoneNumberIsValid="InvalidDigit"
    }
    else{
        document.getElementById("phoneNumberTxt").style.display = "none"   
        phoneNumberIsValid=""
    }
})

document.getElementById("email").addEventListener("focusout",e=>{
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
    if (myres.userType === "head") {
        option.innerText = `${myres.fullName} [Head]`;
    } else {
        option.innerText = myres.fullName;
    }
    
    option.value = myres.id;
    document.getElementById("sel1").appendChild(option);
});
   return response;

}

window.addEventListener("DOMContentLoaded",async ()=>{
  const allFamilyMembers =   await getAllFamilyMembers(localStorage.getItem("family_id"))
  let countrySelectBox  = document.getElementById("sel1")

    countrySelectBox.addEventListener("change",(e)=>{
       let address = allFamilyMembers.filter(mem => mem.id===+e.target.value)[0]
       let option = document.createElement("option")
       let selectedOption = countrySelectBox.options[countrySelectBox.selectedIndex];
       console.log("p",selectedOption)

       option.innerText = address.country.split(":")[1]
       option.value = address.country.split(":")[0]
       if (selectedOption.selected) {
        document.getElementById("country").style.backgroundColor = '#DCD6D0';
        let country = `<option value='${address.country.split(":")[0]}'>${address.country.split(":")[1]}</option>`
        document.getElementById("country").innerHTML = country
      }
       getCountry();

       if (selectedOption.selected) {
        document.getElementById("state").style.backgroundColor = '#DCD6D0';
       let state = `<option value='${address.state.split(":")[0]}'>${address.state.split(":")[1]}</option>`
       document.getElementById("state").innerHTML = state;
       }
       const defaultValue = stateElement.getElementsByTagName("option");
    for (let i = 0; i < defaultValue.length; i++) {
    if (defaultValue[i].value === address.state.split(":")[0]) {
        defaultValue[i].selected = true;

        fetchStates(address.country.split(":")[0],defaultValue[i].value);
    }
}
    
    if (selectedOption.selected) {
    document.getElementById("city").style.backgroundColor = '#DCD6D0';
       let city = `<option value='${address.city.split(":")[0]}'>${address.city.split(":")[1]}</option>`
       document.getElementById("city").innerHTML = city;
    }
       const value = stateElement.getElementsByTagName("option");
       for (let i = 0; i < value.length; i++) {
       if (value[i].value === address.state.split(":")[0]) {
           value[i].selected = true;
   
           fetchCities(address.state.split(":")[0],value[i].value);
       }
   }

    })
})

chk.addEventListener("click",()=>{
document.getElementById("emaildiv").style.display = document.getElementById("emaildiv").style.display === 'none' ? 'block':"none"
document.getElementById("passwordiv").style.display = document.getElementById("passwordiv").style.display === 'none' ? 'block':"none"

})



function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();