let startTime = document.getElementById("start_time")
let endTime = document.getElementById("end_time")
const DropDownStatus = document.getElementById("event_type");

let dob = document.getElementById("start_date")
let today = new Date().toISOString().split('T')[0];
dob.setAttribute("min",today)

async  function fetchDetails(){
    let id = window.location.href.split("?")[1].split("=")[1]
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchEvent/'+id)
    const response = await res.json()
    console.log(response)
    document.getElementById('event_name').value = response.eventName;
    if(response.eventType === "offline"){
        startTime.style.display = "none"
        endTime.style.display = "none"
    }
    document.getElementById('event_type').value = response.eventType;
    document.getElementById('event_location').value = response.eventLocation;
    document.getElementById('lock_start_date').value = response.lockArrivalDate.split("T")[0];
    document.getElementById('start_date').value = response.startDate?.split("T")[0];
    document.getElementById('lock_end_date').value = response.lockDepartureDate.split("T")[0]
    document.getElementById('s_time').value = response.startTime
    document.getElementById('e_time').value = response.endTime
   
}
fetchDetails()

//DropDown for Event Type
DropDownStatus.addEventListener("change", () => {
    const option = DropDownStatus.value
    if(option === "online"){
    startTime.style.display = "block";
    endTime.style.display = "block";
    }
    else if(option === "offline"){
        startTime.style.display = "none";
        endTime.style.display = "none";
    }
})


 async function getImg (){

    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEmail",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+JSON.parse(localStorage.getItem("data"))
        }
    })
    const res = await response.json()
    let id = window.location.href.split("?")[1].split("=")[1]
    // alert(id)
    document.getElementById("event_pic").src = `http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/EventDoc/${id}.jpg`
    document.getElementById("event_pic").className = "img-fluid"
    return res;
}

getImg()

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
let eventName = document.getElementById("event_name").value
let eventType = document.getElementById("event_type").value;
let sTime = document.getElementById("s_time").value;
let eTime = document.getElementById("e_time").value;
let eventLocation = document.getElementById("event_location").value
let startLockDate =  document.getElementById('lock_start_date').value 
let startDate = document.getElementById("start_date").value
let endLockDate =  document.getElementById('lock_end_date').value 
let file = document.getElementById("file").files[0]


if (/[^A-Za-z\s]/.test(eventName)) {
    alert("Event Name should not contain special characters or numbers.");
} else if(/[^A-Za-z\s]/.test(eventLocation)){
    alert("Event Location should not contain special characters or numbers.");
}else if(eventType === "Select Type"){
    alert("Please Select an Event type")
}
else {
    const data = {
        eventName: eventName,
        eventType: eventType,
        startTime : sTime,
        endTime: eTime,
        eventLocation: eventLocation,
        lockArrivalDate : startLockDate,
        startDate: startDate,
        lockDepartureDate: endLockDate,
        file:file,
        listedBy : localStorage.getItem("role").replaceAll("\"","")
    }
    if (file) {
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        console.log("p",fileExtension)
        if (!allowedExtensions.includes(fileExtension)) {
            alert("Only jpg, jpeg, and png images are allowed.");
            return;
        }
        setEventImg(eventId,file)
    } else {
   
    }
    //  console.log("Mydata",data)
    
    updateEvents(data)
    
  
}
})

function clearAllFields(){
   document.getElementById("event_name").value = '';
   document.getElementById("event_type").value = '';
   document.getElementById("s_time").value = '';
   document.getElementById("e_time").value = '';
   document.getElementById("event_location").value = '';
   document.getElementById("start_date").value = '';
   document.getElementById('lock_start_date').value = '';
   document.getElementById('lock_end_date').value = '';
}

async function updateEvents(data) {
    console.log("jj",data)
    let id = window.location.href.split("?")[1].split("=")[1]
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/editEvent/${id}` ,{
        method: "PUT",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("pp",res)
    clearAllFields();
    $('#pendingDialog101').modal('show');
    setTimeout(()=>{
        window.location.href = "dashboard.html";
    },2000)
    return res;
}
let eventId = window.location.href.split("?")[1].split("=")[1]
// console.log(eventId)
const setEventImg = async (eventId,file) => {
    console.log("java",eventId,file)
    const form = new FormData();
    await form.append("eventId",eventId)
    await form.append("file",file)
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveEventD",{
    method:"POST",
    body:form,
    })
    const res = await response.json()
    console.log("IMG",res)
    return res;
}

function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();