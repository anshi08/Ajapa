// // Create a new spinner
// const target = document.getElementById('spinner-container');
// const s = new Spinner().spin(target);

async function getTravelDetails(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEvents",{
        method:"GET",
        headers:{
                "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json();
    console.log("Hurra2y",res)
    res.forEach((myres)=>{
    let option = document.createElement("option")
    option.innerText = myres.eventName,
    option.value = myres.eventId
    document.getElementById("selectEvent").appendChild(option)
    })
}


    document.getElementById("selectEvent").addEventListener("change",async (e)=>{
        // console.log(e.target.value)
        let eventId = e.target.value
        let travelDetailsById = await getTravelDetailsById(eventId)
        // return travelDetailsById
        return eventId;
    })
getTravelDetails()




async function getTravelDetailsById(id){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelByEventId/"+id,{
        method:"GET",
        headers:{
                "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json();
    console.log(res)
    res.forEach(data => {
    let tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${data.userName}</td>
    <td>${data.fromCountry.split(":")[1]}</td>
    <td>${data.fromCity.split(":")[1]}</td>
    <td>${data.arrivalDate.split("T")[0]}</td>
    <td>${data.arrivalTime}</td>
    <td>${data.arrivalModeOfTransport}</td>
    <td>${data.departureDate.split("T")[0] }</td>
    <td>${data.departureTime}</td>
    <td>${data.departureModeOfTransport}</td>
    <td>${data.description}</td>
    `
    document.getElementById("body").appendChild(tr)
//     // To stop the spinner
//     s.stop(); 
  
})
return res;
}