let btn = document.getElementById("btn")
let startTime = document.getElementById("start_time")
let endTime = document.getElementById("end_time")
const statusdd = document.getElementById("event_type");

let dob = document.getElementById("start_date")
let today = new Date().toISOString().split('T')[0];
dob.setAttribute("min",today)




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

document.getElementById("event_type").addEventListener("focusout",e=>{
    // console.log(e.target.value)
    if(e.target.value === "Select Type"){
        alert("Select Event Type")
    }
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

let shvirCheckbox = document.getElementById("shivir")

shvirCheckbox.addEventListener("change",e =>{
    if(e.target.checked){
        document.getElementById("shivirStartDate").style.display = "block"
        document.getElementById("shivirEndDate").style.display = "block"
    }else{
        document.getElementById("shivirStartDate").style.display = "none"
        document.getElementById("shivirEndDate").style.display = "none"
    }
})

btn.addEventListener("submit", async(e) =>{
    
    e.preventDefault();
 
    let event_name = getElementByIdName("event_name");
    let event_type = document.getElementById("event_type").value;
    let event_location = getElementByIdName("event_location");
    let lock_start_date = getElementByIdName("lock_start_date");
    let start_date = getElementByIdName("start_date");
    // let end_date = getElementByIdName("end_date");
    let lock_end_date = getElementByIdName("lock_end_date");
    let start_time = document.getElementById("s_time").value;
    let end_time = document.getElementById("e_time").value;
    let file = document.getElementById("file").files[0]
    let newListedBy;
    if(localStorage.getItem("role").trim().replaceAll("\"","") === "admin"){
        newListedBy = parseJwt(localStorage.getItem("data")).Identifier
    }else{
        newListedBy = localStorage.getItem("role")
    }

    const data = {
        eventName: event_name,
        eventType: event_type,
        eventLocation: event_location,
        startDate: new Date(start_date),
        endDate: null,
        lockArrivalDate:new Date(lock_start_date),
        lockDepartureDate:new Date(lock_end_date),
        startTime : start_time,
        endTime : end_time,
        file:file,
        listedBy: newListedBy
    }

    if (file) {
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        // console.log("p",fileExtension)
        if (!allowedExtensions.includes(fileExtension)) {
            alert("Only jpg, jpeg, and png images are allowed.");
            return;
        }
    } else {
        alert("Please select an image file.");
        return;
    }

    if(localStorage.getItem("role") === "super"){
        // alert("hii")
        if(shvirCheckbox.checked){
            data.shivirAvailable = shvirCheckbox.checked
            data.shivirStartDate = document.getElementById("shivir_start_date").value
            data.shivirEndDate = document.getElementById("shivir_end_date").value
        }
        console.log("mine",data)
        let {eventId} = events(data)
        setEventImg(eventId,file)
    }
    else{
        if(shvirCheckbox.checked){
            data.shivirAvailable = shvirCheckbox.checked
            data.shivirStartDate = document.getElementById("shivir_start_date").value
            data.shivirEndDate = document.getElementById("shivir_end_date").value
        }
        console.log("kkk",data)
        let {eventId} = await events(data)
        // alert("admin")
        saveEventPermission(eventId,parseJwt(localStorage.getItem("data")).Identifier,true,true)
        setEventImg(eventId,file)
    }

});

    // if(localStorage.getItem("role") === "super"){
    //     alert("hii")
    //     let {eventId} = events(data)
    //     setEventImg(eventId,file)
    // }
    // else{
    //     let {eventId} = await events(data)
    //     alert("admin")
    //     saveEventPermission(eventId,parseJwt(localStorage.getItem("data")).Identifier,true,true)
    //     setEventImg(eventId,file)
    // }

function ClearAllFields(){
    document.getElementById("event_name").value = '';
    document.getElementById("event_type").value = '';
    document.getElementById("event_location").value = '';
    document.getElementById("lock_start_date").value = '';
    document.getElementById("lock_end_date").value = '';
    document.getElementById("start_date").value = '';
    // document.getElementById("end_date").value = '';
    document.getElementById("s_time").value = '';
    document.getElementById("e_time").value = '';
    document.getElementById("file").value = '';
}

 const events = async (data) => {
    try{
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveEvent",{
        // const response = await fetch("http://192.168.29.217:8080/saveEvent",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    if(response.ok){
    const res = await response.json()
    console.log("kkk",res)      
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

async function saveEventPermission(eventId,adminId,canModify,canDelete){
    let canModify1 = "no"
    let canDelete1 = "no"
    if(canModify) canModify1 = "yes"
    if(canDelete) canDelete1 = "yes"
    const newObj = {
        eventId,
        adminId,
        canModify:canModify1,
        canDelete:canDelete1
    }

const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveEventPermission',{
    method:"POST",
    headers:{
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body:JSON.stringify(newObj)
})
const response = await res.text()
return response
}


const setEventImg = async (eventId,file) => {
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