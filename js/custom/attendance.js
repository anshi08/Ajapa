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
        document.getElementById("totalPeople").innerHTML = null
        document.getElementById("attendend").innerHTML = null
        allUser = details
        eventId = e.target.value
        document.getElementById("body").innerHTML = null
        if(details.length===0){
            let tr = document.createElement('tr')
            tr.innerHTML = `<td colspan="6" align='center'>No Member is attending this event</td>`
 
            document.getElementById("body").appendChild(tr)
            return;
        }
        console.log(details)

        await details.forEach(info =>{
            let tr = document.createElement("tr")
            tr.innerHTML=`
            <td style='display:none'>${info.user.id}</td>
            <td>${info.user.fullName}</td>
            <td>${info.user.email}</td>
            <td>${info.user.dob}</td>
            <td>${info.user.mobileNum}</td>
            <td><input type='checkbox' class="present" ${info.present ? 'checked':""}  /></td>
            <td><input type='text' class='form-control' value=${info.hallNo} /></td>
            <td class="bellIcon"><i class="fa fa-bell"></i></td>
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

        //Bell Event Listener
        Array.from(document.getElementsByClassName("bellIcon")).forEach(bellTd => {
            bellTd.addEventListener("click",async e =>{
                
                let hallNo = e.target.parentElement.previousElementSibling.children[0].value
                let mobileNum = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
               const res = await notifySelectedPerson(mobileNum,hallNo)
                bellTd.firstElementChild.style.color = "red"
                if(res === "Message Sent"){
                    alert("Message Sent")
                    
                }
            })
        })

    })
    // document.getElementById("submit").addEventListener("click",function(){
    //     let table = document.getElementById("body");
    //     let selectedUser = []
    //     let hallNo = []
    //     // Get all rows in the table
    //     let rows = table.getElementsByTagName("tr");
    //     let isPresent = []
    //    Array.from(rows).forEach(row => {
    //     console.log("row",row.children[row.childElementCount-2].firstElementChild.checked)
    //     if(row.children[row.childElementCount-2].firstElementChild.checked){
    //         isPresent.push(true)
    //     }else{
    //         isPresent.push(false)
    //     }
    //     selectedUser.push(row.firstElementChild.innerHTML)
    //     hallNo.push(row.children[row.childElementCount-1].firstElementChild.value)
    // })

    //    let events = []
    
    //    selectedUser.forEach(user =>{
    //         events.push(eventId);
           
    //    })
    //    console.log({selectedUser,events,isPresent,hallNo})
    //    saveAttendance({users:selectedUser,events,isPresent,hallNo})
    // })

    let print = document.getElementById("print")
    print.addEventListener("click",()=>{
        window.print()
    })

    let notify = document.getElementById("notify")
    notify.addEventListener("click",()=>{
        let table = document.getElementById("body");
        let selectedUser = []
        let hallNo = []
        // Get all rows in the table
        let rows = table.getElementsByTagName("tr");
        let isPresent = []
       Array.from(rows).forEach(row => {
        console.log("row",row.children[row.childElementCount-2].firstElementChild.checked)
        if(row.children[row.childElementCount-2].firstElementChild.checked){
            isPresent.push(true)
        }else{
            isPresent.push(false)
        }
        selectedUser.push(row.firstElementChild.innerHTML)
        hallNo.push(row.children[row.childElementCount-1].firstElementChild.value)
    })

       let events = []
    
       selectedUser.forEach(user =>{
            events.push(eventId);
           
       })
       sendRoomBookingStatus({users:selectedUser,events,isPresent,hallNo})
       
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
        // const response = await fetch("http://192.168.29.218:8080/saveAttendance",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.json()
    console.log("rews",res)
    if(res.message === 'Attendance marked'){
        $('#attendanceBox').modal('show');
    }
        // clearAllFields();
        
        setTimeout(()=> {
            window.location.href = "dashboard.html"
        },2000)
    return res;
}

async function sendRoomBookingStatus(data){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/sendRoomBookingStatus",{
        // const response = await fetch("http://192.168.29.217:8080/saveAttendance",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.json()
    if(res.message === 'SMS Sent'){
        $('#attendanceBox').modal('show');
    }
        
        setTimeout(()=> {
            window.location.href = "dashboard.html"
        },2000)
    return res;
}

async function notifySelectedPerson(pno,hallNo){
    //http://localhost:8080/sendHallNotification/9760705107/hello
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/sendHallNotification/${pno}/${hallNo}`,{
        method:"GET",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.text()
   console.log("Myres",res)
   return res;
}