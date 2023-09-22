let btn = document.getElementById("btn")
let startTime = document.getElementById("start_time")
let endTime = document.getElementById("end_time")
const statusdd = document.getElementById("event_type");

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

startTime.style.display = "none";
endTime.style.display = "none";

statusdd.addEventListener("change", () => {
    const option = statusdd.value
    if(option === "online"){
    startTime.style.display = "block";
    endTime.style.display = "block";
    }
    else if(option === "offline"){
        startTime.style.display = "none";
        endTime.style.display = "none";
    }
})

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

// Validation

document.getElementById("event_name").addEventListener("input",(e)=>{
    
    if(e.target.value.length===0){
        document.getElementById("eventNameError").style.display = "block"
    }else{
        document.getElementById("eventNameError").style.display = "none"
    }
})

document.getElementById("event_location").addEventListener("input",e =>{
    if(e.target.value.length===0){
        document.getElementById("eventLocationError").style.display = "block"
    }else{
        document.getElementById("eventLocationError").style.display = "none"
    }
})



btn.addEventListener("click", async(e) =>{
    e.preventDefault();

    let event_name = getElementByIdName("event_name");
    let event_type = document.getElementById("event_type").value;
    let event_location = getElementByIdName("event_location");
    let start_date = getElementByIdName("start_date");
    let end_date = getElementByIdName("end_date");
    let start_time = document.getElementById("s_time").value;
    let end_time = document.getElementById("e_time").value;
    let file = getElementByIdName("file");

    // Validate each field
    if (event_name.trim() === "") {
        displayError("Event Name is required");
        return;
    }
   
    if (event_type.trim() === "") {
        clearDisplayError()
        displayError("Event Type is required");
        return;
    }

    if (event_location.trim() === "") {
        clearDisplayError()
        displayError("Event Location is required");
        return;
    }

    if (start_date.trim() === "") {
        clearDisplayError()
        displayError("Start Date is required");
        return;
    }

    if (end_date.trim() === "") {
        clearDisplayError()
        displayError("End Date is required");
        return;
    }

    const data = {
        eventName: event_name,
        event_type: event_type,
        event_location: event_location,
        startDate: new Date(start_date),
        endDate: new Date(end_date),
        start_time : start_time,
        end_time : end_time,
        file:file,
        listed_by:localStorage.getItem("role")
    }
    console.log("DATA",data)
    events(data)
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

function ClearAllFields(){
    document.getElementById("event_name").value = '';
    document.getElementById("event_type").value = '';
    document.getElementById("event_location").value = '';
    document.getElementById("start_date").value = '';
    document.getElementById("end_date").value = '';
    document.getElementById("s_time").value = '';
    document.getElementById("e_time").value = '';
    document.getElementById("file").value = '';
}

 const events = async (data) => {
    console.log(data)
    try{
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveEvent",{
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
    ClearAllFields();
    displaySuccessMessage("Event Added");
    setTimeout(() =>{
        window.location.href = "dashboard.html"
    },2000)
    return res
    } else {
        // Handle the case where the HTTP request was not successful
        displayError("Error: Failed to save event.");
      }
} catch (error) {

    console.error("An error occurred:", error);
}}