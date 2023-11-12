async function getDetails(eventId) {
    // console.log("ppp",data)
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchRegisteredUserByEvent/${eventId}`,{
        method:"GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.json()
    return res;
}

window.addEventListener("DOMContentLoaded",async ()=>{

    let eventId,allUser;
    const res = await showingAllEvents()
    let eventdrpdwn =  document.getElementById("allEvents")
    res.forEach(event => {
      let option = document.createElement("option")
      option.value = event.eventId;
      option.text = event.eventName  
      eventdrpdwn.appendChild(option)
    })

    eventdrpdwn.addEventListener("change",async e =>{
        let details = await getDetails(e.target.value)
        allUser = details
        eventId = e.target.value
        if(details.length===0){
            let tr = document.createElement('tr')
            tr.innerHTML = `<td colspan="5" align='center'>No Member is attending this event</td>`
            console.log(tr)
            document.getElementById("body").appendChild(tr)
            return;
        }
            document.getElementById("body").innerHTML = null
        details.forEach(info =>{
        
            let tr = document.createElement("tr")
            tr.innerHTML=`
            <td style='display:none'>${info.user.id}</td>
            <td>${info.user.fullName}</td>
            <td>${info.user.email}</td>
            <td>${info.user.dob}</td>
            <td>${info.user.mobileNum}</td>
            <td><input type='checkbox' class="present"/></td>
            `
            document.getElementById("body").appendChild(tr)
        })
    })
    document.getElementById("submit").addEventListener("click",function(){
        let table = document.getElementById("body");
        let selectedUser = []
        // Get all rows in the table
        let rows = table.getElementsByTagName("tr");
        
       Array.from(rows).forEach(row => {
        if(row.lastElementChild.firstChild.checked){
            selectedUser.push(row.firstElementChild.innerHTML)
        }
       })

       let events = []
       let isPresent = []
       selectedUser.forEach(user =>{
            events.push(eventId);
            isPresent.push(true)
       })
       console.log({selectedUser,events,isPresent})
       saveAttendance({users:selectedUser,events,isPresent})
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

async function saveAttendance(data) {
    // console.log("ppp",data)
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveAttendance",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.json()
    console.log(res)
        // clearAllFields();
        // $('#pendingDialog2').modal('show');
        // setTimeout(()=> {
        //     window.location.href = "history.html"
        // },2000)
    return res;
}