//pendingDialog101
if(JSON.parse(localStorage.getItem("role")) === "member" ||JSON.parse(localStorage.getItem("role")) === "head")
window.addEventListener("DOMContentLoaded",()=>{
    $('#pendingDialog101').modal('show');
    document.getElementById("pendingrequest").style.display = "none"
})

let prev = document.getElementById("prev")
let next = document.getElementById("next")


next.addEventListener("click", async () => {
 
    let lastChild  = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML)
  
    let res = await showingAllEvents(lastChild,+lastChild+10)
    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.endDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        ${JSON.parse(localStorage.getItem("role")) === "super" ?`<td><a href='showEventsDetails.html?id=${data.eventId}'>Edit</a></td>` :''}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
    })
})

prev.addEventListener("click", async () => {
    let firstChild = (document.getElementById("body").firstElementChild.lastElementChild.innerHTML)
    let res = await showingAllEvents(+firstChild-10,+firstChild-1)
    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.endDate?.split("T")[0]}</td>
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
    console.log("ii",res)
    // if(res[0]?.eventId===2){

    //     document.getElementById("prev").style.display = 'none'
    // }else{
    //     document.getElementById("prev").style.display = 'block'
    // }
    return res;

}
window.addEventListener("DOMContentLoaded",async ()=>{

            // Create a new spinner
    const target = document.getElementById('body');
    const s = new Spinner().spin(target);
       
    let res = await showingAllEvents()
        const role = (JSON.parse(localStorage.getItem("role")))
        if(res.length==0){
            s.stop();
        }
        if(role === "member" || role === "head") {
            document.getElementById("Book").style.display = "block"
            document.getElementById("showDetails").style.display = "none";
            // document.getElementById("deleteDetails").style.display = "none";
            
        }
        if(role === "super") {
            document.getElementById("showDetails").style.display = "block";
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
        <td>${data.endDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        ${JSON.parse(localStorage.getItem("role")) === "member" ||
        JSON.parse(localStorage.getItem("role")) === "head"
        ?`<td><a href='addTravelDetails.html?id=${data.eventId}' class="btn btn-primary">Book</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" ?`<td><a href='showEventsDetails.html?id=${data.eventId}'>Edit</a></td>` : ''}
        ${JSON.parse(localStorage.getItem("role")) === "super" ?`<td class="deleteEvent"><a href="#">Delete</a></td>` : ''}
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
        s.stop();
        
    }

    )
    Array.from(document.getElementsByClassName("deleteEvent")).forEach(item => {
        item.addEventListener("click",(e)=>{
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
    document.getElementById("totalevents").innerText = res
    // console.log("All Events" ,res)
    return res;
}

getAllEvents()

async function getAllPendingRequest(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getNumberOfUnapprovedUsers",{
        method:"GET"
    })
    const res = await response.json()
    // console.log("hii",res)
    document.getElementById("p_request").innerText = res
    return res;
}

getAllPendingRequest()

if(localStorage.getItem("role").replaceAll("\"","") === "member"){
    document.getElementById("pendingrequest").style.display = "none"
}


document.getElementById("pendingrequest").addEventListener("click",()=>{
    window.location.href="getApprovedUsers.html"
})

async function deleteEvent(eventId){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/deleteEvent/${eventId}`,{
        method:"POST"
    })
    const response = await res.text()
    window.location.href="showEvents.html"
}