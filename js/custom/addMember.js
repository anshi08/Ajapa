


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

async function getCountry(element) {
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


  function handleCountryChange(selectedCountry,stateElement) {
    console.log(`Selected country: ${selectedCountry}`);
    stateElement.value = "" ;
    stateElement.innerHTML = '';
    fetchStates(selectedCountry,stateElement);
    
  }

 async function fetchStates(countryId,stateElement,selectedStateValue){
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


  
  function handleStateChange(selectedState,cityElement) {
    cityElement.value='';
    cityElement.innerHTML = '';
    fetchCities(selectedState,cityElement)
  }

 async function fetchCities(stateId,cityElement,selectCityValue) {
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
    if(res.msg === 'Email already exists'){
        $('#alreadyUser').modal('show');
        document.getElementById("alreadyUserTxt").innerText = "Email Already exists"
    }
    else if(res.msg === 'Phone number already exists'){
        $('#alreadyUser').modal('show');
        document.getElementById("alreadyUserTxt").innerText = "Phone number already exists"
    }
    else{
        $('#pendingreq10').modal('show');
        clearAllFields();
        setTimeout(()=>{
            window.location.href = "showFamilyMembers.html"
        },2000)
    }
    return res;
    }
} catch (error) {

    console.error("An error occurred:", error);
}}


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
    chk.addEventListener("click",()=>{
        document.getElementById("emaildiv").style.display = document.getElementById("emaildiv").style.display === 'none' ? 'block':"none"
        document.getElementById("passwordiv").style.display = document.getElementById("passwordiv").style.display === 'none' ? 'block':"none"
    })
    getCountry(element)

    element.addEventListener('change', function (e) {
    const selectedCountry = e.target.value;
    handleCountryChange(selectedCountry,stateElement);
  });
  
    //StateElement Handler
    stateElement.addEventListener('change', function (e) {
        const selectedState = e.target.value;
        handleStateChange(selectedState,cityElement);
      });

    //CityElement Handler
    cityElement.addEventListener('change', function (e) {
        const selectedCity = e.target.value;
        handleCityChange(selectedCity);
      });

    //Submit Handler
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
            password:chk.checked ? 'abc@password':pw,
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


  // This code is precious
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
       getCountry(element);

       if (selectedOption.selected) {
        document.getElementById("state").style.backgroundColor = '#DCD6D0';
       let state = `<option value='${address.state.split(":")[0]}'>${address.state.split(":")[1]}</option>`
       document.getElementById("state").innerHTML = state;
       }
       const defaultValue = stateElement.getElementsByTagName("option");
    for (let i = 0; i < defaultValue.length; i++) {
    if (defaultValue[i].value === address.state.split(":")[0]) {
        defaultValue[i].selected = true;

        fetchStates(address.country.split(":")[0],stateElement,defaultValue[i].value);
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
   
           fetchCities(address.state.split(":")[0],cityElement,value[i].value);
       }
   }

    })
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