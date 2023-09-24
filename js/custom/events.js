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



btn.addEventListener("submit", async(e) =>{
    e.preventDefault();

    let event_name = getElementByIdName("event_name");
    let event_type = document.getElementById("event_type").value;
    let event_location = getElementByIdName("event_location");
    let start_date = getElementByIdName("start_date");
    let end_date = getElementByIdName("end_date");
    let start_time = document.getElementById("s_time").value;
    let end_time = document.getElementById("e_time").value;
    let file = getElementByIdName("file");

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
    events(data)
})

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
    ClearAllFields();
    $('#pendingDialog4').modal('show');
    setTimeout(() =>{
        window.location.href = "dashboard.html"
    },3000)
    return res
    } else {
        // Handle the case where the HTTP request was not successful
        displayError("Error: Failed to save event.");
      }
} catch (error) {

    console.error("An error occurred:", error);
}}