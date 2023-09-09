let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click",() =>{

    let event_name = getElementByIdName("event_name");
    let event_type = getElementByIdName("event_type");
    let event_location = getElementByIdName("event_location");
    let start_date = getElementByIdName("start_date");
    let end_date = getElementByIdName("end_date");
    let listed_by = getElementByIdName("listed_by");
    let event_status = getElementByIdName("event_status");
    let file = getElementByIdName("file");

    const data = {
        event_name: event_name,
        event_type: event_type,
        event_location: event_location,
        start_date: start_date,
        end_date: end_date,
        listed_by: listed_by,
        event_status: event_status,
        file:file,
    }
    events(data)
})

 const events = async (data) => {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveEvent",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log("RES",res)
}