async  function fetchDetails(){
    let id = window.location.href.split("?")[1].split("=")[1]
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchEvent/'+id)
    const response = await res.json()
    console.log(response)
    document.getElementById('event_name').value = response.eventName;
    document.getElementById('event_type').value = response.eventType;
    document.getElementById('event_location').value = response.eventLocation;
    document.getElementById('start_date').value = response.startDate?.split("T")[0];
   
}
fetchDetails()


 async function getImg (){

    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEmail",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+JSON.parse(localStorage.getItem("data"))
        }
    })
    const res = await response.json()
    let id = window.location.href.split("?")[1].split("=")[1]
    // alert(id)
    document.getElementById("event_pic").src = `http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/EventDoc/${id}.jpg`
    document.getElementById("event_pic").className = "img-fluid"
    return res;
}

getImg()

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
let eventName = document.getElementById("event_name").value
let eventType = document.getElementById("event_type").value;
let eventLocation = document.getElementById("event_location").value
let startDate = document.getElementById("start_date").value
// let endDate = document.getElementById("end_date").value

if (/[^A-Za-z\s]/.test(eventName)) {
    alert("Event Name should not contain special characters or numbers.");
} else if(/[^A-Za-z\s]/.test(eventLocation)){
    alert("Event Location should not contain special characters or numbers.");
}else if(eventType === "Select Type"){
    alert("Please Select an Event type")
}
else {
    const data = {
        eventName: eventName,
        eventType: eventType,
        eventLocation: eventLocation,
        startDate: startDate,
        listedBy : localStorage.getItem("role").replaceAll("\"","")
    }
    //  console.log("Mydata",data)
    updateEvents(data);
}
})

function clearAllFields(){
   document.getElementById("event_name").value = '';
   document.getElementById("event_type").value = '';
   document.getElementById("event_location").value = '';
   document.getElementById("start_date").value = '';
//    document.getElementById("end_date").value = '';
}

async function updateEvents(data) {
    let id = window.location.href.split("?")[1].split("=")[1]
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/editEvent/${id}` ,{
        method: "PUT",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("pp",res)
    clearAllFields();
    $('#pendingDialog101').modal('show');
    setTimeout(()=>{
        window.location.href = "dashboard.html";
    },2000)
    return res;
}

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()