let btn = document.getElementById("btn")
let element = document.getElementById("from_country")
let stateElement = document.getElementById("from_state")
let cityElement= document.getElementById("from_city")
let id = window.location.href.split("?")[1].split("=")[1]
// console.log(id)

getDetailOfEvent(id)

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

async function getDetailOfEvent(id){
const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchEvent/${id}`)
const response = await res.json()
const startDate = response.startDate.split("T")[0]
const lock_startDate = response.lockArrivalDate.split("T")[0]
const endDate = response.endDate.split("T")[0]
const lock_endDate = response.lockDepartureDate.split("T")[0]
document.getElementById("arrival_date").setAttribute("min",lock_startDate)
document.getElementById("arrival_date").setAttribute("max",startDate)
document.getElementById("departure_date").setAttribute("min",endDate)
document.getElementById("departure_date").setAttribute("max",lock_endDate)
}

//Validations
document.getElementById("arrival_date").addEventListener("input",e =>{
    if(e.target.value === 0 || e.target.value.length === 0){
       document.getElementById("ArrivaldateErr").style.display = "block"
    }else{
        document.getElementById("ArrivaldateErr").style.display = "none"
    }
})

document.getElementById("arrival_time").addEventListener("input",e =>{
    if(e.target.value === 0 || e.target.value.length === 0){
       document.getElementById("ArrivalTimeErr").style.display = "block"
    }else{
        document.getElementById("ArrivalTimeErr").style.display = "none"
    }
})

document.getElementById("arrival_train_number").addEventListener("input",e =>{
    if(e.target.value === 0 || e.target.value.length === 0){
       document.getElementById("trainErr").style.display = "block"
    }else{
        document.getElementById("trainErr").style.display = "none"
    }
})

// document.getElementById("arrival_train_name").addEventListener("input",e =>{
//     if(e.target.value === 0 || e.target.value.length === 0){
//        document.getElementById("NameErr").style.display = "block"
//     }else{
//         document.getElementById("NameErr").style.display = "none"
//     }
// })

document.getElementById("departure_date").addEventListener("input",e =>{
    if(e.target.value === 0 || e.target.value.length === 0){
       document.getElementById("depdateErr").style.display = "block"
    }else{
        document.getElementById("depdateErr").style.display = "none"
    }
})

document.getElementById("departure_time").addEventListener("input",e =>{
    if(e.target.value === 0 || e.target.value.length === 0){
       document.getElementById("depTimeErr").style.display = "block"
    }else{
        document.getElementById("depTimeErr").style.display = "none"
    }
})

// document.getElementById("departure_train_number").addEventListener("input",e =>{
//     if(e.target.value === 0 || e.target.value.length === 0){
//        document.getElementById("Err").style.display = "block"
//     }else{
//         document.getElementById("Err").style.display = "none"
//     }
// })

// document.getElementById("departure_train_name").addEventListener("input",e =>{
//     if(e.target.value === 0 || e.target.value.length === 0){
//        document.getElementById("Err1").style.display = "block"
//     }else{
//         document.getElementById("Err1").style.display = "none"
//     }
// })

btn.addEventListener("submit", async (e) =>{

    e.preventDefault(); 
    let e_id = document.getElementById("e_id").value = id;
    let country_ele=document.getElementById("from_country");
    let city_ele=document.getElementById("from_city");
    let state_ele = document.getElementById("from_state");
    
    let country = document.getElementById("from_country").value+":"+country_ele.options[country_ele.selectedIndex].text;
    let city = document.getElementById("from_city").value+":"+city_ele.options[city_ele.selectedIndex].text;
    let state = document.getElementById("from_state").value+":"+state_ele.options[state_ele.selectedIndex].text;
    let arr_date = getElementByIdName("arrival_date")
    let arr_time = document.getElementById("arrival_time").value
    let arr_transport = document.getElementById("arrival_mode_of_transport").value

    let dep_date = getElementByIdName("departure_date")
    let dep_time = document.getElementById("departure_time").value
    let dep_transport = document.getElementById("departure_mode_of_transport").value
    // let dep_trainName = getElementByIdName("departure_train_name")
    let desc = getElementByIdName("description")
    let uid = parseJwt(localStorage.getItem("data")).id
    let userName = parseJwt(localStorage.getItem("data")).full_name
    

// Validate each field
    // if (city.trim() === "") {
    //     clearDisplayError()
    //     displayError("City is required.");
    //     return;
    // }

    // if (country.trim() === "") {
    //     clearDisplayError()
    //     displayError("Country is required.");
    //     return;
    // }

    // if (arr_date.trim() === "") {
    //     clearDisplayError()
    //     displayError("Arrival Date is required.");
    //     return;
    // }

    // if (arr_time.trim() === "") {
    //     clearDisplayError()
    //     displayError("Arrival Time is required.");
    //     return;
    // }

    // if (arr_transport.trim() === "") {
    //     clearDisplayError()
    //     displayError("Arrival Mode of Transport is required.");
    //     return;
    // }

    // if (train_num.trim() === "") {
    //     clearDisplayError()
    //     displayError("Arrival train number is required.");
    //     return;
    // }

    // if (train_name.trim() === "") {
    //     clearDisplayError()
    //     displayError("Arrival train name is required.");
    //     return;
    // }

    // if (dep_date.trim() === "") {
    //     clearDisplayError()
    //     displayError("Departure Date is required.");
    //     return;
    // }

    // if (dep_time.trim() === "") {
    //     clearDisplayError()
    //     displayError("Departure time is required.");
    //     return;
    // }

    // if (dep_transport.trim() === "") {
    //     clearDisplayError()
    //     displayError("Departure Transport is required.");
    //     return;
    // }

    // if (dep_trainNum.trim() === "") {
    //     clearDisplayError()
    //     displayError("Depature Transport Number is required.");
    //     return;
    // }

    // if (dep_trainName.trim() === "") {
    //     clearDisplayError()
    //     displayError("Depature Transport Name is required.");
    //     return;
    // }
    let data = {}
    if(arr_transport==="Train" && dep_transport==="Train"){//write condition for both arrival and departue mode of transport
        data = {
            eventId: e_id,
            fromCity: city,
            fromCountry: country,
            fromState: state,
            arrivalDate: arr_date,
            arrivalTime: arr_time,
            arrivalModeOfTransport: arr_transport,
            arrivalTrainNumber: getElementByIdName("train_number").split("--")[0].replace("[","").replace("]",""),
            arrivalTrainName: getElementByIdName("train_number").split("--")[1],
            departureDate: dep_date,
            departureTime: dep_time,
            departureModeOfTransport: dep_transport,
            departureTrainNumber: getElementByIdName("train_number_1").split("--")[0].replace("[","").replace("]",""),
            departureTrainName:  getElementByIdName("train_number_1").split("--")[1],
            description: desc,
            userId : uid,
            userName:userName
        }
    }
    else if( arr_transport==="Train" && dep_transport!=="Train"){
        data = {
            eventId: e_id,
            fromCity: city,
            fromCountry: country,
            fromState: state,
            arrivalDate: arr_date,
            arrivalTime: arr_time,
            arrivalModeOfTransport: arr_transport,
            arrivalTrainNumber: getElementByIdName("train_number").split("--")[0].replace("[","").replace("]",""),
            arrivalTrainName: getElementByIdName("train_number").split("--")[1],
            departureDate: dep_date,
            departureTime: dep_time,
            departureModeOfTransport: dep_transport,
            description: desc,
            userId : uid,
            userName:userName
        }
    }else if(arr_transport!=="Train" && dep_transport==="Train"){
        data = {
            eventId: e_id,
            fromCity: city,
            fromCountry: country,
            fromState: state,
            arrivalDate: arr_date,
            arrivalTime: arr_time,
            arrivalModeOfTransport: arr_transport,
            departureDate: dep_date,
            departureTime: dep_time,
            departureModeOfTransport: dep_transport,
            departureTrainNumber: getElementByIdName("train_number_1").split("--")[0].replace("[","").replace("]",""),
            departureTrainName:  getElementByIdName("train_number_1").split("--")[1],
            description: desc,
            userId : uid,
            userName:userName
        }
    }
    else{
        data = {
            eventId: e_id,
            fromCity: city,
            fromCountry: country,
            fromState: state,
            arrivalDate: arr_date,
            arrivalTime: arr_time,
            arrivalModeOfTransport: arr_transport,
            departureDate: dep_date,
            departureTime: dep_time,
            departureModeOfTransport: dep_transport,
            description: desc,
            userId : uid,
            userName:userName
        }
    }
    // console.log(data,"MYDATA")
    //  saveTravelDetails(data)
    setTravelDetailsonLocalStorage(parseJwt(localStorage.getItem("data")).id,data) 
})

function clearAllFields(){
    document.getElementById("from_city").value = '';
    document.getElementById("from_country").value = '',
    document.getElementById("arrival_date").value = '',
    document.getElementById("arrival_time").value = '',
    document.getElementById("arrival_mode_of_transport").value = '',
    document.getElementById("arrival_train_number").value = '',
    // document.getElementById("arrival_train_name").value = '',  
    document.getElementById("departure_date").value = '',
    document.getElementById("departure_time").value = '',
    document.getElementById("departure_mode_of_transport").value = '',
    document.getElementById("departure_train_number").value = '',  
    // document.getElementById("departure_train_name").value = '',  
    document.getElementById("description").value = ''
}
async function getCountry() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/countries",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    // console.log("res" , res)
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
    fetchStates(selectedCountry);
    // countryId = ""; // or countryId = "";
    stateElement.value = "" ;
  }

  stateElement.addEventListener("change",e =>{
    console.log(e.target.value)
    fetchCities(e.target.value)

  })

async function fetchStates(countryId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/states/${countryId}`,{
        method:"GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    const res = await response.json()
    // console.log("res",res)

    stateElement.innerHTML = '';

res.forEach((state) => {
    const option = document.createElement('option');
    option.value = state.id;
    option.text = state.name;
    stateElement.appendChild(option);
  });
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
    cityElement.innerHTML=""
    res.forEach((city) => {
        const option = document.createElement('option');
        option.value = city.id;
        option.text = city.name;
        cityElement.appendChild(option);
      });
  }

async function saveTravelDetails(data) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveTravelDetails",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.json()
    console.log("Save",res)
    clearAllFields();
    $('#pendingDialog2').modal('show');
    setTimeout(()=> {
        window.location.href = "dashboard.html"
    },2000)
    return res;
}

window.addEventListener("DOMContentLoaded",async ()=>{
    document.getElementById("arrival_mode_of_transport").addEventListener("change",e =>{
        
        if(e.target.value === "Train"){
            document.getElementById("arrival_train_number").style.display = "block"
            document.getElementById("transport").style.display = "block"
            const searchInput = document.getElementById("arrival_train_number");
            searchInput.addEventListener("input", debounce(()=>handleInput(searchInput), 300)); // Add debouncing to reduce API requests
        }else{
            document.getElementById("arrival_train_number").style.display = "none"
            document.getElementById("transport").style.display = "none"
        }

    })
    document.getElementById("departure_mode_of_transport").addEventListener("change",e =>{
     
        if(e.target.value === "Train"){
            document.getElementById("departure_train_number").style.display = "block"
            document.getElementById("transport1").style.display = "block"
            const searchInput1 = document.getElementById("departure_train_number");
            searchInput1.addEventListener("input", debounce(()=>handleInput1(searchInput1), 300)); // Add
        }else{
            document.getElementById("departure_train_number").style.display = "none"
            document.getElementById("transport1").style.display = "none"
        }
    })
    let ddl =  await getAllFamilyMember(localStorage.getItem("family_id"))

    ddl.forEach(person => {
        let option = document.createElement("option")
        option.value= person.id
        option.innerText=person.fullName
        document.getElementById("familyDDL").appendChild(option)
    })
    document.getElementById("familyDDL").addEventListener("change", async (e) =>{
       let id = e.target.value
       let details =  await getTravelDetailsFromId(id)
        if(!details){
            alert("This user having no travels history")
        }
        else{
            console.log(details)
       let DDLC = details.fromCountry.split(":")
       let string = 
      `  <div class="form-group">
      <label>Select a Country :</label>
      <select id="from_country" class="form-control" required>
          <!-- Options will be added dynamically -->
          <option value="${DDLC[0]}">${DDLC[1]}</option>
      </select>
  </div>`
       document.getElementById("from_country").innerHTML = string

      let DDLState = details.fromState.split(":")
      let state1 = `
      <option value="${DDLState[0]}">${DDLState[1]}</option>
      ` 
      document.getElementById("from_state").innerHTML = state1

       //City DDL
       let DDLCity = details.fromCity.split(":")
       let city1 = 
      `  <div class="form-group">
      <label>Select a Country :</label>
      <select id="from_country" class="form-control" required>
          <!-- Options will be added dynamically -->
          <option value="${DDLCity[0]}">${DDLCity[1]}</option>
      </select>
  </div>`
       document.getElementById("from_city").innerHTML = city1

    document.getElementById("arrival_date").value = details.arrivalDate
    document.getElementById("departure_date").value = details.departureDate
    document.getElementById("arrival_time").value = details.arrivalTime
    document.getElementById("departure_time").value = details.departureTime
    
//    if(document.getElementById("arrival_mode_of_transport").value !== "Train" ){
//     document.getElementById("arrival_mode_of_transport").value = details.arrivalModeOfTransport
//     document.getElementById("transport").style.display = "none"  

//    }else{
//     document.getElementById("transport").style.display="block"
//     document.getElementById("arrival_train_number").value = details.arrivalTrainNumber

//    }

//     if(document.getElementById("departure_mode_of_transport").value !== "Train"){
//         document.getElementById("departure_mode_of_transport").value = details.departureModeOfTransport
//         document.getElementById("transport1").style.display = "none"    
//     }
//     else{
//         document.getElementById("transport1").style.display="block"
//         document.getElementById("departure_train_number").value = details.departureTrainNumber
//     }
if (details.arrivalModeOfTransport === "Train") {
    document.getElementById("arrival_mode_of_transport").value = "Train";
    document.getElementById("arrival_train_number").style.display = "block";
    document.getElementById("transport").style.display="block"
    document.getElementById("arrival_train_number").value = details.arrivalTrainNumber
  } else {
    document.getElementById("arrival_mode_of_transport").value = details.arrivalModeOfTransport
    document.getElementById("transport").style.display = "none" 
    document.getElementById("arrival_train_number").style.display = "block";
  }

  if (details.departureModeOfTransport === "Train") {
    document.getElementById("departure_mode_of_transport").value = "Train"
    document.getElementById("departure_train_number").style.display="block"
    document.getElementById("transport1").style.display="block"
    document.getElementById("departure_train_number").value = details.departureTrainNumber
  } else {
    document.getElementById("departure_mode_of_transport").value = details.departureModeOfTransport
    document.getElementById("departure_train_number").style.display="none"
    document.getElementById("transport1").style.display="none"
  }
    }

    
    })

})


async function getTrainDetails(searchName="Rajdhani"){
    const url = 'https://trains.p.rapidapi.com/';

try {
    const response = await fetch(url,{
        method:"POST",
        headers:{
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c57cf769e6msh3ad30e8aa5173a6p15e7ecjsna8d07b651732',
            'X-RapidAPI-Host': 'trains.p.rapidapi.com'
        },
        body: JSON.stringify({ search: searchName })
    })
    const res = await response.json()
    return res;
} catch (error) {
	console.error(error);
}
}

// Debounce function to limit API requests
function debounce(func, wait) {
    let timeout;
    return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        func.apply(context, args);
    }, wait);
    };
}

async function handleInput(searchInput) {
        const searchTerm = searchInput.value.trim();
        console.log(searchTerm)
        if (searchTerm.length === 0) {
            document.getElementById("train_detail_label").style.display = "none" 
            return; // No need to perform a search if the input is empty
        }

        try {
            // Fetch search results from an API (replace with your API endpoint)
            document.getElementById("train_number").style.display = "block" 
            document.getElementById("train_detail_label").style.display = "block"
            const data = await getTrainDetails(searchTerm);
            // Display search results
            let select = document.getElementById("train_number")
            if (data && data.length > 0) {
                console.log(data)
            data.forEach(result => {
                const resultItem = document.createElement("option");
                resultItem.innerText = `[${result.train_num}]--${result.name}`; // Replace with the property that contains the result text
                select.appendChild(resultItem);
            });
            } else {
            const noResultsMessage = document.createElement("div");
            noResultsMessage.textContent = "No results found";
            // searchResults.appendChild(noResultsMessage);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
}

async function handleInput1(searchInput) {
            const searchTerm = searchInput.value.trim();
            console.log(searchTerm)
            if (searchTerm.length === 0) {
                document.getElementById("train_detail_label").style.display = "none" 
                return; // No need to perform a search if the input is empty
            }
    
            try {
                // Fetch search results from an API (replace with your API endpoint)
                document.getElementById("train_number_1").style.display = "block" 
                document.getElementById("train_detail_label_1").style.display = "block"
                const data = await getTrainDetails(searchTerm);
                // Display search results
                let select = document.getElementById("train_number_1")
                if (data && data.length > 0) {
                    console.log(data)
                data.forEach(result => {
                    console.log(result)
                    const resultItem = document.createElement("option");
                    resultItem.innerText = `[${result.train_num}]--${result.name}`; // Replace with the property that contains the result text
                    select.appendChild(resultItem);
                });
                } else {
                const noResultsMessage = document.createElement("div");
                noResultsMessage.textContent = "No results found";
                // searchResults.appendChild(noResultsMessage);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
}


async function getAllFamilyMember(familyId){
 const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFamilyMembers/${familyId}`,{
        method:"GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res;
            
}


function setTravelDetailsonLocalStorage(id,data){
    localStorage.setItem(id,JSON.stringify(data))

}

function getTravelDetailsFromId(id){
    return JSON.parse(localStorage.getItem(id))
}


