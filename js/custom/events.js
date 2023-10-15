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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}



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
        // console.log("admin",newListedBy)
    }else{
        newListedBy = localStorage.getItem("role")
        console.log("super",newListedBy)
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

    if(localStorage.getItem("role") === "super"){
        let {eventId} = events(data)
        console.log(eventId)
        // setEventImg(eventId,file)
    }
    else{
        let {eventId} = await events(data)
        // saveEventPermission(eventId,parseJwt(localStorage.getItem("data")).Identifier,true,true)
        // setEventImg(eventId,file)
    }

})

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
    console.log("mydata",data)
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


function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()