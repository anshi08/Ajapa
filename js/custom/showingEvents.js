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

    let searchFilter = document.getElementById("searchFilter")
    searchFilter?.addEventListener("input",async(e) =>{
      let res =   await searchEvents(e.target.value)
      console.log(e.target.value.length)
      if(e.target.value.length===0) window.location.reload()
      document.getElementById("body").innerHTML = null
      await res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
    ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
        ${JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role")) === "head"
        ?data.bookingStatus === 1 ? `<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` :`<td><a href='#' class="btn btn-primary disabled">Close</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
        <td style="display:none">${data.eventId}</td>
    ${((JSON.parse(localStorage.getItem("role")) === "super" || JSON.parse(localStorage.getItem("role")) === "admin") && pageName!="dashboard.html") ? 
    `<td class='sliderList'><label class="switch"><input type="checkbox"><span class="slider"  ></span></label></td>`
    :
    ''
        }
        <td style='display:none'>${data.bookingStatus}</td>
        `
        document.getElementById("body").appendChild(tr)
})
 
    })
    
   let pageName = window.location.href.split("/")[window.location.href.split("/").length-1]
   const role = (JSON.parse(localStorage.getItem("role")))
    if(role==="super" || role === "admin"){
        // getValueForDashboard()
        // document.getElementById("bookingStatus").style.display = "block"
        document.getElementById("bookingStatus") !==null ?
        document.getElementById("bookingStatus").style.display = "block"  :"" 
    }

        JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role"))==="head"  ? 
        document.getElementById("listedByCol").style.display = 'none' : ''
  
    if(role!="admin"){
        getAge()

    }

    if(role=="admin" || role=="super")
    getValueForDashboard()


            // Create a new spinner
    const target = document.getElementById('body');
    const s = new Spinner().spin(target);

    
    let res =[]

    if(role === "admin"){
        
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier)
    }else if(role==="super"){
        
        res = await showingAllEvents()

    }else{
        res = await showingAllEventsByStatus(1);
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

        await res.forEach(data => {
            let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
       ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
        ${JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role")) === "head"
        ?data.bookingStatus === 1 ? `<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` :`<td><a href='#' class="btn btn-primary disabled">Close</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
        <td style="display:none">${data.eventId}</td>
       ${((JSON.parse(localStorage.getItem("role")) === "super" || JSON.parse(localStorage.getItem("role")) === "admin") && pageName!="dashboard.html") ? 
       `<td class='sliderList'><label class="switch"><input type="checkbox"><span class="slider"  ></span></label></td>`
       :
       ''
        }
        <td style='display:none'>${data.bookingStatus}</td>
        `
        
        document.getElementById("body").appendChild(tr)
    })
         s.stop();

    Array.from(document.getElementsByClassName('sliderList'),(item) =>{
        if(+item.nextElementSibling.innerHTML===0){
            
            item.firstElementChild.lastElementChild.style.backgroundColor = '#2196F3'
            item.firstElementChild.lastElementChild.classList.add('on');


        }
    })

    Array.from(document.getElementsByClassName("deleteEvent")).forEach(item => {
        item.addEventListener("click",(e)=>{
            if(e.target.classList.contains("deleteEvent")){
                if(confirm("Are You sure you want to delete this event")){
                    let event = e.target.parentElement.nextElementSibling.innerText;
                    deleteEvent(event,2)
                }else{
                    alert("Sorry")
                }
            }
        })
    })
    Array.from(document.getElementsByClassName("switch")).forEach(item => {
          
         item.children[0].addEventListener("click",(e)=>{
     
            if(item.parentElement.nextElementSibling.innerText == 1){
                changeStatus(e.target.parentElement.parentElement.previousElementSibling.innerText,0)  
            }
        else{
            changeStatus(e.target.parentElement.parentElement.previousElementSibling.innerText,1)
            
        }

      })
    })  

next.addEventListener("click", async () => {
    currentPage++;
    let first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    console.log("Next",{first,last})
    // let lastChild  = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML)
    const role = (JSON.parse(localStorage.getItem("role")))
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier,first,last)
    }else if(role === "super"){
        res = await showingAllEvents(first,last)
    }else{
        res = await showingAllEventsByStatus(1,first,last)
    }
    // prev.style.display = "block"
    document.getElementById("body").innerHTML = null

    console.log("Status 1",res)
    prev.style.display = "block"

    if(res.length === 0){
        document.getElementById("body").innerHTML = "<tr><td colspan='8'>No results to display</td></tr>";
        next.style.display = "none"
      
    }
    else{
       
        await res.forEach(data => {
            let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
       ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
       ${JSON.parse(localStorage.getItem("role")) === "member" ||
       JSON.parse(localStorage.getItem("role")) === "head"
       ?data.bookingStatus === 1 ? `<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` :`<td><a href='#' class="btn btn-primary disabled">Close</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
        ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
        <td style="display:none">${data.eventId}</td>
        ${JSON.parse(localStorage.getItem("role")) === "super" || JSON.parse(localStorage.getItem("role")) === "admin" ? 
        `<td class='sliderList'><label class="switch"><input type="checkbox"><span class="slider"  ></span></label></td>`
        :
        ''
         }
         <td style='display:none'>${data.bookingStatus}</td>
         `
        document.getElementById("body").appendChild(tr)
        s.stop();

        Array.from(document.getElementsByClassName('sliderList'),(item) =>{
            console.log(item.firstElementChild.lastElementChild,item.nextElementSibling)
            if(+item.nextElementSibling.innerHTML===0){
                console.log("kk")
                item.firstElementChild.lastElementChild.style.backgroundColor = '#2196F3'
                item.firstElementChild.lastElementChild.classList.add('on');
    
    
            }
        })

    }

         )
         
         Array.from(document.getElementsByClassName("deleteEvent")).forEach(item => {
            item.addEventListener("click",(e)=>{
                if(e.target.classList.contains("deleteEvent")){
                    if(confirm("Are You sure you want to delete this event")){
                        let event = e.target.parentElement.nextElementSibling.innerText;
                        deleteEvent(event,2)
                    }else{
                        alert("Sorry")
                    }
                }
            })
        })
         Array.from(document.getElementsByClassName("switch")).forEach(item => {
          
            item.children[0].addEventListener("click",(e)=>{
               if(item.parentElement.nextElementSibling.innerText == 1){
                   changeStatus(e.target.parentElement.parentElement.previousElementSibling.innerText,0)
             
               }
           else{
               changeStatus(e.target.parentElement.parentElement.previousElementSibling.innerText,1)
               
           }
   
         })
       }) 
}
})
})

prev.addEventListener("click", async () => {
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
        console.log("prev",{first,last})
    // let newFirstChild = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML,6)
    const role = (JSON.parse(localStorage.getItem("role")))
    let res 
    if(role === "admin"){
        res = await showingOnlyAdminEvents(parseJwt(localStorage.getItem("data")).Identifier,first,last)
    }else if(role==="super"){
        res = await showingAllEvents(first,last)
    }else{
        res = await showingAllEventsByStatus(1,first,last)
    }
    if(first===1)
     prev.style.display = "none"
    // next.style.display = "block"
   

    document.getElementById("body").innerHTML = null

    next.style.display = 'block'
    await res.forEach(data => {
        let tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${data.eventName}</td>
    <td>${data.eventType}</td>
    <td>${data.eventLocation}</td>
    <td>${data.startDate?.split("T")[0]}</td>
   ${JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role"))==="head"  ? '' :`<td>${data.listedBy?.replaceAll("\"","")}</td>`}
   ${JSON.parse(localStorage.getItem("role")) === "member" ||
   JSON.parse(localStorage.getItem("role")) === "head"
   ?data.bookingStatus === 1 ? `<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Register</a></td>` :`<td><a href='#' class="btn btn-primary disabled">Close</a></td>` : ''}
    ${JSON.parse(localStorage.getItem("role")) === "super" || data.canModify==="yes" ?document.getElementById('showDetails')!==null ? "<td><a href='showEventsDetails.html?id="+data.eventId+"'>Edit</a></td>" : '':""}
    ${JSON.parse(localStorage.getItem("role")) === "super" || data.canDelete==="yes" ?document.getElementById('deleteEventCol')!==null ? `<td><a href="#" class="deleteEvent">Delete</a></td>` : JSON.parse(localStorage.getItem("role")) === "member" || JSON.parse(localStorage.getItem("role")) === "head" ? '' : document.getElementById('deleteEventCol')!==null ? '<td class="deleteEvent"><a href="#">Delete1</a></td>':"":""}
    <td style="display:none">${data.eventId}</td>
        ${JSON.parse(localStorage.getItem("role")) === "super" || JSON.parse(localStorage.getItem("role")) === "admin" ? 
        `<td class='sliderList'><label class="switch"><input type="checkbox"><span class="slider"  ></span></label></td>`
        :
        ''
         }
         <td style='display:none'>${data.bookingStatus}</td>
    `
    document.getElementById("body").appendChild(tr)
    // s.stop();

    Array.from(document.getElementsByClassName('sliderList'),(item) =>{
        console.log(item.firstElementChild.lastElementChild,item.nextElementSibling)
        if(+item.nextElementSibling.innerHTML===0){
            console.log("kk")
            item.firstElementChild.lastElementChild.style.backgroundColor = '#2196F3'
            item.firstElementChild.lastElementChild.classList.add('on');


        }
    })
})
Array.from(document.getElementsByClassName("deleteEvent")).forEach(item => {
    item.addEventListener("click",(e)=>{
        if(e.target.classList.contains("deleteEvent")){
            if(confirm("Are You sure you want to delete this event")){
                let event = e.target.parentElement.nextElementSibling.innerText;
                deleteEvent(event,2)
            }else{
                alert("Sorry")
            }
        }
    })
})
Array.from(document.getElementsByClassName("switch")).forEach(item => {
          
    item.children[0].addEventListener("click",(e)=>{
       if(item.parentElement.nextElementSibling.innerText == 1){
           changeStatus(e.target.parentElement.parentElement.previousElementSibling.innerText,0)
     
       }
   else{
       changeStatus(e.target.parentElement.parentElement.previousElementSibling.innerText,1)
       
   }

 })
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
    return res.data;
}


async function showingAllEventsByStatus(status,first=1,last=5) {

    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEventsByStatus/${status}/${first}/${last}`,{
         method:"GET",
         headers: {
            "Content-type":"application/json;  charset=UTF-8"
         }
    })
    const res = await response.json()
    totalRecords = res.size
    return res.data;
}








async function showingOnlyAdminEvents(adminId,first=1,last=5){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEventWithPermissions/${adminId}/${first}/${last}`,{
        method:"GET",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.json()
   console.log("mm",res)
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

document.getElementById("TotaleventsCard").addEventListener("click",()=>{
   window.location.href="showEvents.html"
})

document.getElementById("rejectedUserCard").addEventListener("click",()=>{
    window.location.href="rejectUsers.html"
})

document.getElementById("approvedUserCard").addEventListener("click",()=>{
    window.location.href="approvedUsers.html"
})

async function deleteEvent(eventId,status){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeEventStatus/${eventId}/${status}`,{
        method:"POST"
    })
    const response = await res.text()
    console.log("🚀 ~ file: showingEvents.js:295 ~ deleteEvent ~ response:", response)
    // window.location.href="showEvents.html"  
}

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
    document.getElementById("totalevents").innerHTML = response?.total_events
    document.getElementById("rejectUser").innerHTML=response?.rejected_users
    document.getElementById("approvedUser").innerHTML = response?.approved_users.length-1
    document.getElementById("p_request").innerHTML = response?.pending_users
}

async function changeStatus(eventId,status){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeBookingStatus/${eventId}/${status}`,{
        method:"POST"
    })
    const response = await res.text()
    if(response == "Event Booking Status Changed"){
        window.location.reload()
    }

}

async function searchEvents(name){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/reptGetEventDetails/${name}`)
    const response = await res.json()
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

searchInput?.addEventListener("input", debounce(()=>handleInput(searchInput), 300)); // Add debouncing to reduce API requests
// Debounce function to limit API requests
function debounce(func, wait) {
    let timeout;
    return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        func.apply(context, args);
    }, wait);
    };
}


