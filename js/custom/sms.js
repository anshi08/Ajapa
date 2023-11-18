window.addEventListener("DOMContentLoaded",async () =>{
    const res = await showingAllEvents()
    let eventdrpdwn =  document.getElementById("allEvents")
    
    res.forEach(event => {
      let option = document.createElement("option")
      option.value = event.eventId;
      option.text = event.eventName  
      eventdrpdwn.appendChild(option)
    })

    document.getElementById("btn").addEventListener("submit",e =>{
        e.preventDefault()
        let eventId = document.getElementById("allEvents").value
        let check = document.getElementById("check").value
        let msg = document.getElementById("msg").value
        let res = sendMessage(eventId,check,msg)
        if(res=="Sent"){
            alert("Message Sent!!")
        }
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

async function sendMessage(eventId,check,message){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/sendCusmtomSMS/${eventId}/${check}/${message}`,{
        method:"POST",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
         }
    })
    const res = await response.text()
    console.log("🚀 ~ file: sms.js:43 ~ sendMessage ~ res:", res)
    return res;

}