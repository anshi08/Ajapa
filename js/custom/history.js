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
})

async function getHistory(id){
    // Create a new spinner
    const target = document.getElementById('spinner-container');
    const s = new Spinner().spin(target);

    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelByUserId/'+id)
    const response = await res.json()
    console.log(response)
    response.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.arrivalDate?.split("T")[0]}</td>
        <td>${data.departureDate?.split("T")[0]}</td>
        <td>${data.fromCity.split(":")[1]}</td>
        <td>${data.fromCountry.split(":")[1]}</td>
        `
        document.getElementById("body").appendChild(tr)

    })  
    s.stop();
}

