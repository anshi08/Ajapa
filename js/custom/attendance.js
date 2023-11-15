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
        document.getElementById("body").innerHTML = null
        if(details.length===0){
            let tr = document.createElement('tr')
            tr.innerHTML = `<td colspan="5" align='center'>No Member is attending this event</td>`
 
            document.getElementById("body").appendChild(tr)
            return;
        }

        details.forEach(info =>{
        
            let tr = document.createElement("tr")
            tr.innerHTML=`
            <td style='display:none'>${info.user.id}</td>
            <td>${info.user.fullName}</td>
            <td>${info.user.email}</td>
            <td>${info.user.dob}</td>
            <td>${info.user.mobileNum}</td>
            <td><input type='checkbox' class="present" ${info.present ? 'checked':""}  /></td>
            `
            document.getElementById("body").appendChild(tr)
        })
        document.getElementById("totalPeople").innerText = "Total -: "+details.length
        let sum = 0;
        const totalPresent = details.reduce((acc,curr)=>{
        curr.present ? acc++:acc
            return acc;
        },0)
        document.getElementById("attendend").innerText = "Present -: "+totalPresent


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

    let print = document.getElementById("print")
    print.addEventListener("click",()=>{
        window.print()
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
    if(res.message === 'Attendance marked'){
        $('#attendanceBox').modal('show');
    }
        // clearAllFields();
        
        setTimeout(()=> {
            window.location.href = "dashboard.html"
        },2000)
    return res;
}