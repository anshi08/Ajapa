let currentPage = 1;
const eventsPerPage = 5;
let totalRecords;

let prev = document.getElementById("prev")
let next = document.getElementById("next")

// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

async function getDeletedEvents(status=2,start=1,end=5){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEventsByStatus/${status}/${start}/${end}`)
    const response = await res.json()
    return response.data
}



window.addEventListener("DOMContentLoaded",async ()=>{
    let res = await getDeletedEvents()
     res.forEach(data => {
        console.log(data)
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
         s.stop(); 
        
    })
})


next.addEventListener("click", async () => {
    currentPage++;
    let first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    console.log("Next",{first,last})
    document.getElementById("body").innerHTML=""
    let res = await getDeletedEvents(2,first,last)
     res.forEach(data => {
        console.log(data)
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
         s.stop(); 
        
    })
    if(res.length === 0){
        document.getElementById("body").innerHTML = "<tr><td colspan='7'>No results to display</td></tr>";
        next.style.display = "none"
      
    }
    if(first===1)
    prev.style.display = "none"
})


prev.addEventListener("click", async () => {
  
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
        console.log("prev",{first,last})

    document.getElementById("body").innerHTML = null

    next.style.display = 'block'
    let res = await getDeletedEvents(2,first,last)
     res.forEach(data => {
        console.log(data)
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.eventType}</td>
        <td>${data.eventLocation}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.listedBy}</td>
        <td style="display:none">${data.eventId}</td>
        `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
         s.stop(); 
        

    })
}
})

function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();