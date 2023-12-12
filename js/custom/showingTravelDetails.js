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
    res.forEach((myres)=>{
    let option = document.createElement("option")
    option.innerText = myres.eventName,
    option.value = myres.eventId
    document.getElementById("selectEvent").appendChild(option)
    })
}
let travelDetailsById;

window.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("selectEvent").addEventListener("change",async (e)=>{
        let eventId = e.target.value
        document.getElementById("shivirFilter").checked = false
        travelDetailsById = await getTravelDetailsById(eventId)

        
    })
    getTravelDetails()
    document.getElementById("shivirFilter").addEventListener("change",async (e)=>{
        if(e.target.checked){
            if(document.getElementById("selectEvent").value === 'Select'){
                alert("Please Select the Event")
                document.getElementById("shivirFilter").checked = false
                return;
            }else{
              let result = travelDetailsById.filter(detail => detail.attendingShivir)
              
              document.getElementById("body").innerHTML=""
              if(result.length===0){
                console.log("TEST",result.length)
                let tr = document.createElement("tr")
                tr.innerHTML = `
                <td colspan="10" align="center">No Data Found</td>
                `
                document.getElementById("body").appendChild(tr)
              }else{
              result.forEach(data => {
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
              // To stop the spinner
              // s.stop(); 
              
            
          })
        } 
            }
        }else{
            if(document.getElementById("selectEvent").value === 'Select'){
                alert("Please Select the Event")
                document.getElementById("shivirFilter").checked = false
                return;
            }else{
                let eventId =document.getElementById("selectEvent").value 
                travelDetailsById = await getTravelDetailsById(eventId)
            }
        }
    })
})




//Getting Details By Event Id
async function getTravelDetailsById(id){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllTravelEventUser/"+id,{
        method:"GET",
        headers:{
                "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json();
    console.log(res)
    document.getElementById("body").innerHTML=""
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
    // To stop the spinner
    // s.stop(); 
    
  
})
return res;
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