window.addEventListener("DOMContentLoaded",async ()=>{
    let tbody = document.getElementById("body")
    let eventdrpdwn =  document.getElementById("allEvents")
    let res = await showingAllEvents()
    res.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId;
        option.text = event.eventName  
        eventdrpdwn.appendChild(option)
      })
    eventdrpdwn.addEventListener("change",async e =>{
        let details = await getFoodDetails(e.target.value)
        console.log(details)
        tbody.innerHTML = null;

        details.forEach(detail =>{
            let tr = document.createElement("tr")
            console.log(detail.entryDate)
            tr.innerHTML = `
            <td>${detail.entryDate}</td>
            <td>${detail.timings}</td>
            <td>${detail.presentCount}</td>
            <td>${detail.foodTakenCount}</td>
            <td>${detail.totalCount}</td>
            `
            tbody.appendChild(tr)
        })

        
    })
})



async function showingAllEvents(first=1,last=100) {

    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEvents/${first}/${last}`,{
         method:"GET",
         headers: {
            "Content-type":"application/json;  charset=UTF-8"
         }
    })
    const res = await response.json()
    return res.data;
}

async function getFoodDetails(eventId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFoodDetails/${eventId}`,{
        method:"GET",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.json()

   return res;
 
}
