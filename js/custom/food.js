window.addEventListener("DOMContentLoaded",async () =>{
    let eventdrpdwn =  document.getElementById("allEvents")
    let res = await showingAllEvents()
    res.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId;
        option.text = event.eventName  
        eventdrpdwn.appendChild(option)
      })

    let formSubmit = document.getElementById('btn')
    formSubmit.addEventListener("submit",async e =>{
        e.preventDefault()
        let eventId = document.getElementById("allEvents").value
        let date = document.getElementById("date").value
        let time = document.getElementById('time').value
        let foodDetail = await getFoodDetail(eventId,date,time)
        document.getElementById("totalCount").value = foodDetail.totalCount
        document.getElementById("presentCount").value = foodDetail.presentCount
        document.getElementById("foodTakenCount").value = foodDetail.foodTakenCount
     
        
    })
    let saveBtn = document.getElementById("save")
    saveBtn.addEventListener("click",async ()=>{
        if(document.getElementById('totalCount').value.length!==0 || document.getElementById("presentCount").value.length!==0){
            let eventId = document.getElementById("allEvents").value
            let date = document.getElementById("date").value
            let time = document.getElementById('time').value
            let foodDetail = await getFoodDetail(eventId,date,time)
            console.log("🚀 ~ file: food.js:18 ~ window.addEventListener ~ foodDetail:", foodDetail)
            await saveDetails(foodDetail)
        }else{
            alert("please Fetch the detail before saved")
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

async function saveFoodDetail(data){
    console.log("oo",data)
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveFoodDetails`,{
        // const response = await fetch(`http://192.168.29.217:8080/saveFoodDetails`,{
        method:"POST",
        headers: {
           "Content-type":"application/json;  charset=UTF-8",
        },
        "body":JSON.stringify(data)
   })
   const res = await response.json()
    return res;

}

async function getFoodDetail(eventId,entryDate,timings){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFoodDetail/${eventId}/${entryDate}/${timings}`)
    const res = await response.json()
    return res;

}

async function saveDetails(foodDetail){
    let eventId = document.getElementById("allEvents").value
    let date = document.getElementById("date").value
    let time = document.getElementById('time').value
    let foodTakenCount = +document.getElementById("foodTakenCount").value 
    let data = {
        "foodId": foodDetail.foodId,
        "eventId": +eventId,
        "entryDate": date,
        "timings": time,
        "presentCount": +foodDetail.presentCount,
        "totalCount": +foodDetail.totalCount,
        "foodTakenCount":   foodTakenCount
    }
    let res = await saveFoodDetail(data);
    console.log(res) 
}