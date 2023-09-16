// res.forEach(data => {
//     let tr = document.createElement("tr")
//     tr.innerHTML = `
//     <td>${data.event_name}</td>
//     <td>${data.event_type}</td>
//     <td>${data.event_location}</td>
//     <td>${data.start_date}</td>
//     <td>${data.end_date}</td>
//     <td>${data.listed_by}</td>
//
//     <td style="display:none">${data.event_id}</td>
//     `
//     document.getElementById("body").appendChild(tr)
// })  

async function getTravelDetails(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllTravel",{
        method:"GET",
        headers:{
                "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json();
    console.log("Hurray",res)
}

getTravelDetails()