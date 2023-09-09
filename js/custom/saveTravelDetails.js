let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click",() =>{
    let city = getElementByIdName("from_city")
    let country = getElementByIdName("from_country")
    let arr_date = getElementByIdName("arrival_date")
    let arr_time = document.getElementById("arrival_time").value
    console.log(arr_time)
    let arr_transport = getElementByIdName("arrival_mode_of_transport")
    let train_num = getElementByIdName("arrival_train_number")
    let train_name = getElementByIdName("arrival_train_name")
    let dep_date = getElementByIdName("departure_date")
    let dep_time = document.getElementById("departure_time").value
    console.log(dep_time)
    let dep_transport = getElementByIdName("departure_mode_of_transport")
    let dep_trainNum = getElementByIdName("departure_train_number")
    let dep_trainName = getElementByIdName("departure_train_name")
    let desc = getElementByIdName("description")

    const data = {
        from_city: city,
        from_country: country,
        arrival_date: arr_date,
        arrival_time: arr_time,
        arrival_mode_of_transport: arr_transport,
        arrival_train_number: train_num,
        arrival_train_name: train_name,
        departure_date: dep_date,
        departure_time: dep_time,
        departure_mode_of_transport: dep_transport,
        departure_train_number: dep_trainNum,
        departure_train_name: dep_trainName,
        description: desc,
    }
     saveTravelDetails(data)
})

async function saveTravelDetails(data) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveTravelDetails",{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.json()
    console.log("Save",res)
    // return res;
}