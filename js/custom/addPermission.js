window.addEventListener("DOMContentLoaded",async ()=>{
   let adminDDL = document.getElementById("adminName")
   let eventDDL = document.getElementById("eventName")
    let allEvents = await getAllEvents()
    allEvents.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId
        option.innerText=event.eventName
        eventDDL.appendChild(option)
    })
    let allAdmins = await getAllAdmins()
    allAdmins.forEach(event => {
        let option = document.createElement("option")
        option.value = event.identifier
        option.innerText=event.identifier
        adminDDL.appendChild(option)
    })
    document.getElementById("savePermission").addEventListener("click",()=>{
        let adminId = document.getElementById("adminName").value
        let eventId = document.getElementById("eventName").value
        // console.log(adminId,eventId)
        let canModify = document.getElementById("modify").checked
        let deletePermission = document.getElementById("delete").checked
        if(!document.getElementById("modify").checked && !document.getElementById("delete").checked){
            alert("Give Permission")
            return false;
        }else{
            if(document.getElementById("modify").checked || document.getElementById("delete").checked){
                saveEventPermission(eventId,adminId,canModify,deletePermission)
            } 
        window.location.href= "dashboard.html"
        }
    })
})

async function getAllEvents(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEvents')
    const response = await res.json()
    return response
}

async function getAllAdmins(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllAdminsNew')
    const response = await res.json()
    return response
}


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
    console.log(newObj)
    const response = await res.text()
    console.log(response,"hi")
    return response
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