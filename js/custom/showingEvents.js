//pendingDialog101
if(JSON.parse(localStorage.getItem("role")) === "member" ||JSON.parse(localStorage.getItem("role")) === "head")
window.addEventListener("DOMContentLoaded",()=>{
    async function getAge(){
        let id = parseJwt(localStorage.getItem("data")).id
        const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAge/'+id)
        const response = await res.text()
       if(response!=="yes"){
        $('#pendingDialog101').modal('show');
       }
    }
    getAge()

    
})

if(JSON.parse(localStorage.getItem("role")) === "admin" || JSON.parse(localStorage.getItem("role")) === "head" 
|| JSON.parse(localStorage.getItem("role")) === "member"
){
    document.getElementById("pendingrequest") !==null ?document.getElementById("pendingrequest").style.display = "none"  :"" 
}

let prev = document.getElementById("prev")
let next = document.getElementById("next")


next.addEventListener("click", async () => {
 
    let lastChild  = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML)
    const role = (JSON.parse(localStorage.getItem("role")))
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else{
        res = await showingAllEvents(lastChild,+lastChild+10)
    }
    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        ${JSON.parse(localStorage.getItem("role")) === "super" ?`<td><a href='showEventsDetails.html?id=${data.eventId}'>Edit</a></td>` :''}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
        s.stop();
    })
})

prev.addEventListener("click", async () => {
    let firstChild = (document.getElementById("body").firstElementChild.lastElementChild.innerHTML)
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else{
        res = await showingAllEvents(lastChild,+lastChild+10)
    }
    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        <td><a href='cards.html?id=${data.eventId}'>Edit</a></td>
        
        ${JSON.parse(localStorage.getItem("role")) === "super" ?`<td><a href='showEventsDetails.html?id=${data.eventId}'>Edit</a></td>` :''}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
        
    })
})
async function showingAllEvents(first=1,last=11 ) {

    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEvents/${first}/${last}`,{
         method:"GET",
         headers: {
            "Content-type":"application/json;  charset=UTF-8"
         }
    })
    const res = await response.json()
    return res;

}



async function showingOnlyAdminEvents(adminId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEventWithPermissions/${adminId}`,{
        method:"GET",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.json()
   console.log("iikk",res)
   return res;  
}

window.addEventListener("DOMContentLoaded",async ()=>{

            // Create a new spinner
    const target = document.getElementById('body');
    const s = new Spinner().spin(target);

    
    const role = (JSON.parse(localStorage.getItem("role")))
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else{
        res = await showingAllEvents()
    }


        if(res.length==0){
            s.stop();
        }
        if(role === "member" || role === "head") {
            document.getElementById("Book").style.visibility = "visible"
            document.getElementById("showDetails")!==null ? document.getElementById("showDetails").style.display = "none" :"";
            // document.getElementById("deleteDetails").style.display = "none";
            document.getElementById("deleteEventCol")!==null ? document.getElementById("deleteEventCol").style.display = "none" :""
        }
        if(role === "super" || role === "admin") {
            document.getElementById("showDetails")!==null ? document.getElementById("showDetails").style.display = "block" :""
            // document.getElementById("deleteDetails").style.display = "block";          
                document.getElementById("Book").style.display = "none";
    

      
        }
        const res1 = await res.filter(res => res.eventStatus!==2)
    

        await res1.forEach(data => {
            let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        ${JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role")) === "head"
        ?`<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td class="deleteEvent"><a href="#">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
        s.stop();

        
    }

    )
    Array.from(document.getElementsByClassName("deleteEvent")).forEach(item => {
        item.addEventListener("click",(e)=>{
            alert("Are you sure you want to delete")
            deleteEvent(e.target.parentElement.nextElementSibling.innerText)
        })
    })  
})


function getElementByString(str){  
    let div = document.createElement("div")
    div.innerHTML =str
    return div.firstElementChild
}

async function getAllEvents(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getNumberOfEvents",{
        method:"GET"
    })
    const res = await response.json()
    console.log("hi",res)
    document.getElementById("totalevents")!==null ? document.getElementById("totalevents").innerText = res : ""
    // console.log("All Events" ,res)
    return res;
}

getAllEvents()

async function getAllPendingRequest(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getNumberOfUnapprovedUsers",{
        method:"GET"
    })
    const res = await response.json()
    console.log("hii",res)
    document.getElementById("p_request")!==null ?  document.getElementById("p_request").innerText = res :""
    return res;
}

getAllPendingRequest()

if(localStorage.getItem("role").replaceAll("\"","") === "member"){
    document.getElementById("pendingrequest").style.display = "none"
}


document.getElementById("pendingrequest")?.addEventListener("click",()=>{
    window.location.href="getApprovedUsers.html"
})

async function deleteEvent(eventId){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/deleteEvent/${eventId}`,{
        method:"POST"
    })
    const response = await res.text()
    window.location.href="showEvents.html"
}