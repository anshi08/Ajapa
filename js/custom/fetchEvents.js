async  function fetchDetails(){
    let id = window.location.href.split("?")[1].split("=")[1]
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchEvent/'+id)
    const response = await res.json()
    console.log(response)
    document.getElementById('event_name').value = response.eventName;
    document.getElementById('event_type').value = response.event_type;
    document.getElementById('event_location').value = response.event_location;
    document.getElementById('start_date').value = response.startDate?.split("T")[0];
    document.getElementById('end_date').value = response.endDate?.split("T")[0];
    // document.getElementById('listed_by').value = response.listed_by;
   
}
fetchDetails()


 async function getImg (){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEmail",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+JSON.parse(localStorage.getItem("data"))
        }
    })
    const res = await response.json()
    console.log("jjjj",res.Email)
    document.getElementById("event_pic").src = 'http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/'+res.Email+".jpg"
}

getImg()

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

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
let eventName = document.getElementById("event_name").value
let eventType = document.getElementById("event_type").value
let eventLocation = document.getElementById("event_location").value
let startDate = document.getElementById("start_date").value
let endDate = document.getElementById("end_date").value

const data = {
    eventName:eventName,
    event_type:eventType,
    event_location : eventLocation,
    startDate:startDate,
    endDate : endDate
}

    updateEvents(data);
})

function clearAllFields(){
   document.getElementById("event_name").value = '';
   document.getElementById("event_type").value = '';
   document.getElementById("event_location").value = '';
   document.getElementById("start_date").value = '';
   document.getElementById("end_date").value = '';
}

async function updateEvents(data) {
    let id = window.location.href.split("?")[1].split("=")[1]
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/editEvent/${id}` ,{
        method: "PUT",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    clearAllFields();
    displaySuccessMessage("Event Updated");
    setTimeout(()=>{
        window.location.href = "dashboard.html";
    },2000)
}

