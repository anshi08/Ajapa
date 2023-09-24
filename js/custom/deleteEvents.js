async function getDeletedEvents(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEvents')
    const response = await res.json()
    return response.filter(res => res.event_status === 2)
}



window.addEventListener("DOMContentLoaded",async ()=>{
    let res = await getDeletedEvents()
     res.forEach(data => {
        console.log(data)
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.event_type}</td>
        <td>${data.event_location}</td>
        <td>${data.startDate?.split("T")[0]}</td>
        <td>${data.endDate?.split("T")[0]}</td>
        <td>${data.listed_by}</td>
        <td style="display:none">${data.event_id}</td>
        `
        document.getElementById("body").appendChild(tr)
        // s.stop();
        
    }

    )
})