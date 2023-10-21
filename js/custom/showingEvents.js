let currentPage = 1;
const eventsPerPage = 5;
let totalRecords;

//pendingDialog101s
if(JSON.parse(localStorage.getItem("role")) === "admin" || JSON.parse(localStorage.getItem("role")) === "head" || JSON.parse(localStorage.getItem("role")) === "member"){
    document.getElementById("pendingrequest") !==null ?document.getElementById("pendingrequest").style.display = "none"  :"" 
    document.getElementById("approvedUserCard") !==null ?document.getElementById("approvedUserCard").style.display = "none"  :"" 
    document.getElementById("rejectedUserCard") !==null ?document.getElementById("rejectedUserCard").style.display = "none"  :"" 
    document.getElementById("TotaleventsCard") !==null ?document.getElementById("TotaleventsCard").style.display = "none"  :"" 
}



let prev = document.getElementById("prev")
let next = document.getElementById("next")

// prev.style.display = "none"
window.addEventListener("DOMContentLoaded", async () => {

    

    const role = (JSON.parse(localStorage.getItem("role")))
    JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? document.getElementById("listedByCol").style.display = 'none' : ''
  
    if(role!="admin"){
        getAge()

    }

    if(role=="admin" || role=="super")
    getValueForDashboard()


            // Create a new spinner
    const target = document.getElementById('body');
    const s = new Spinner().spin(target);

    
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else{
        console.log("START")
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
       ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
        ${JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role")) === "head"
        ?`<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
        s.stop();

        
    }

         )
    Array.from(document.getElementsByClassName("deleteEvent")).forEach(item => {
        item.addEventListener("click",(e)=>{
            if(e.target.classList.contains("deleteEvent")){
                if(confirm("Are You sure you want to delete this event")){
                    let event = e.target.parentElement.nextElementSibling.innerText;
                    deleteEvent(event)
                }else{
                    alert("Sorry")
                }
            }
        })
    })  

next.addEventListener("click", async () => {
    currentPage++;
    const first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    // let lastChild  = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML)
    const role = (JSON.parse(localStorage.getItem("role")))
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else{
        console.log("next",{first,last,totalRecords})
        res = await showingAllEvents(first,last)
    }
    console.log("MYRES:",res)
    // prev.style.display = "block"
    document.getElementById("body").innerHTML = null

    const res1 = await res.filter(res => res.eventStatus!==2)

    if(res1.length === 0){
        // console.log("RESTORE",res1,{first,last})
        // currentPage++;
        // last = currentPage*eventsPerPage
        // console.log("llll",last)
        // if(last<totalRecords){
        //     currentPage++;
        //     last = currentPage*eventsPerPage
        //     console.log("llll",last)
        //     showingAllEvents
        // }
        document.getElementById("body").innerHTML = "<tr><td colspan='7'>No results to display</td></tr>";
        // next.style.display = "none"
        // prev.style.display = "block"
    }
    else{
        await res1.forEach(data => {
            let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
       ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
        ${JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role")) === "head"
        ?`<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
        s.stop();

        
    }

         )
}
})
})

prev.addEventListener("click", async () => {
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
    // let newFirstChild = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML,6)
    const role = (JSON.parse(localStorage.getItem("role")))
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else {
        console.log("prev",{first,last})
        res = await showingAllEvents(first,last)
    }
    
    // next.style.display = "block"
    // prev.style.display = "none"

    document.getElementById("body").innerHTML = null
    const res1 = await res.filter(res => res.eventStatus!==2)
    await res1.forEach(data => {
        let tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${data.eventName}</td>
    <td>${data.eventType}</td>
    <td>${data.eventLocation}</td>
    <td>${data.startDate?.split("T")[0]}</td>
   ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
    ${JSON.parse(localStorage.getItem("role")) === "member" ||
    JSON.parse(localStorage.getItem("role")) === "head"
    ?`<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` : ''}
    ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
    ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
    <td style="display:none">${data.eventId}</td>
    `
    document.getElementById("body").appendChild(tr)
    // s.stop();
})    
}
})
async function showingAllEvents(first=1,last=5) {

    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEvents/${first}/${last}`,{
         method:"GET",
         headers: {
            "Content-type":"application/json;  charset=UTF-8"
         }
    })
    const res = await response.json()
    totalRecords = res.size
    console.log("TotalRecords",totalRecords)
    return res.data;
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

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()
async function getAge(){
    let id = parseJwt(localStorage.getItem("data")).id
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAge/'+id)
    const response = await res.text()
   if(response!=="yes"){
    $('#pendingDialog101').modal('show');
   }
}



async function getValueForDashboard(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getValuesForDashBoard')
    const response = await res.json()
    document.getElementById("totalevents").innerHTML = response.total_events
    document.getElementById("rejectUser").innerHTML=response.rejected_users
    document.getElementById("approvedUser").innerHTML = response.approved_users
    document.getElementById("p_request").innerHTML = response.pending_users
}