// Create a new spinner
const target = document.getElementById('spinner-container');
const spinner = new Spinner().spin(target);

async function getTravelDetails(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllTravels",{
        method:"GET",
        headers:{
                "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json();
    console.log("Hurray",res)

    res.forEach(data => {
    let tr = document.createElement("tr")
    tr.innerHTML = `
    <td>${data.event_id}</td>
    <td>${data.from_country.split(":")[1]}</td>
    <td>${data.from_city.split(":")[1]}</td>
    <td>${data.arrival_date.split("T")[0]}</td>
    <td>${data.arrival_time}</td>
    <td>${data.arrival_mode_of_transport}</td>
    <td>${data.departure_date.split("T")[0]}</td>
    <td>${data.departure_time}</td>
    <td>${data.departure_mode_of_transport}</td>
    <td>${data.description}</td>
    `
    document.getElementById("body").appendChild(tr)
    // To stop the spinner
    spinner.stop();
}) 

}

getTravelDetails()