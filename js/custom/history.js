window.addEventListener("DOMContentLoaded",()=>{
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const response = parseJwt(localStorage.getItem("data"))
    getHistory(response.id)

//     response.forEach(data => {
//     let tr = document.createElement("tr")
//     tr.innerHTML = `
//     <td>${data.event_name}</td>
//     <td>${data.event_type}</td>
//     <td>${data.event_location}</td>
//     <td>${data.start_date}</td>
//     <td>${data.end_date}</td>
//     <td>${data.listed_by}</td>
//     `
//     document.getElementById("body").appendChild(tr)
// })  

})
async function getHistory(id){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelByUserId/'+id)
    const response = await res.json()
    console.log(response) 
}

