let btn = document.getElementById("btn")
let element = document.getElementById("from_country")
let stateElement = document.getElementById("from_city")
let id = window.location.href.split("?")[1].split("=")[1]
// console.log(id)

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

btn.addEventListener("click", async (e) =>{

    e.preventDefault(); 
    let e_id = document.getElementById("e_id").value = id;
    let country_ele=document.getElementById("from_country");
    let city_ele=document.getElementById("from_city");
    
    let country = document.getElementById("from_country").value+":"+country_ele.options[country_ele.selectedIndex].text;
    let city = document.getElementById("from_city").value+":"+city_ele.options[city_ele.selectedIndex].text;
    let arr_date = getElementByIdName("arrival_date")
    let arr_time = document.getElementById("arrival_time").value
    let arr_transport = document.getElementById("arrival_mode_of_transport").value
    let train_num = getElementByIdName("arrival_train_number")
    let train_name = getElementByIdName("arrival_train_name")
    let dep_date = getElementByIdName("departure_date")
    let dep_time = document.getElementById("departure_time").value
    let dep_transport = document.getElementById("departure_mode_of_transport").value
    let dep_trainNum = getElementByIdName("departure_train_number")
    let dep_trainName = getElementByIdName("departure_train_name")
    let desc = getElementByIdName("description")

// Validate each field
    if (city.trim() === "") {
        clearDisplayError()
        displayError("City is required.");
        return;
    }

    if (country.trim() === "") {
        clearDisplayError()
        displayError("Country is required.");
        return;
    }

    if (arr_date.trim() === "") {
        clearDisplayError()
        displayError("Arrival Date is required.");
        return;
    }

    if (arr_time.trim() === "") {
        clearDisplayError()
        displayError("Arrival Time is required.");
        return;
    }

    if (arr_transport.trim() === "") {
        clearDisplayError()
        displayError("Arrival Mode of Transport is required.");
        return;
    }

    if (train_num.trim() === "") {
        clearDisplayError()
        displayError("Arrival train number is required.");
        return;
    }

    if (train_name.trim() === "") {
        clearDisplayError()
        displayError("Arrival train name is required.");
        return;
    }

    if (dep_date.trim() === "") {
        clearDisplayError()
        displayError("Departure Date is required.");
        return;
    }

    if (dep_time.trim() === "") {
        clearDisplayError()
        displayError("Departure time is required.");
        return;
    }

    if (dep_transport.trim() === "") {
        clearDisplayError()
        displayError("Departure Transport is required.");
        return;
    }

    if (dep_trainNum.trim() === "") {
        clearDisplayError()
        displayError("Depature Transport Number is required.");
        return;
    }

    if (dep_trainName.trim() === "") {
        clearDisplayError()
        displayError("Depature Transport Name is required.");
        return;
    }
    const data = {
        event_id: e_id,
        from_city: city,
        from_country: country,
        arrival_date: arr_date,
        arrival_time: arr_time,
        arrival_mode_of_transport: arr_transport,
        arrival_train_number: train_num,
        arrival_train_name: train_name,
        departure_date: dep_date,
        departure_time: dep_time,
        departure_mode_of_transport: dep_transport,
        departure_train_number: dep_trainNum,
        departure_train_name: dep_trainName,
        description: desc,
    }
     saveTravelDetails(data)
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

function clearAllFields(){
    document.getElementById("from_city").value = '';
    document.getElementById("from_country").value = '',
    document.getElementById("arrival_date").value = '',
    document.getElementById("arrival_time").value = '',
    document.getElementById("arrival_mode_of_transport").value = '',
    document.getElementById("arrival_train_number").value = '',
    document.getElementById("arrival_train_name").value = '',  
    document.getElementById("departure_date").value = '',
    document.getElementById("departure_time").value = '',
    document.getElementById("departure_mode_of_transport").value = '',
    document.getElementById("departure_train_number").value = '',  //nhi
    document.getElementById("departure_train_name").value = '',  
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
    console.log("res" , res)
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
    clearDisplayError();
    clearAllFields();
    displaySuccessMessage("Travel details Added Successfully.");
    setTimeout(()=> {
        window.location.href = "dashboard.html"
    },2000)
    return res;
}