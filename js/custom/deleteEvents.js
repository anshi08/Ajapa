// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

async function getDeletedEvents(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEvents')
    const response = await res.json()
    return response.filter(res => res.eventStatus === 2)
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
        
    }

    )
})

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()