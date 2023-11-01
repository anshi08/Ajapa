let prev = document.getElementById("prev")
let next = document.getElementById("next")
let currentPage = 1;
const eventsPerPage = 5;
let id = ''


window.addEventListener("DOMContentLoaded",async()=>{
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const response = parseJwt(localStorage.getItem("data"))
     id = response.id
    await getHistory(id)
  Array.from(document.getElementsByClassName("delete")).forEach(item => {
    item.addEventListener("click",async(e) =>{
        
        await deleteEvent(e.target.parentElement.nextElementSibling.innerHTML)
        window.location.reload()
    })
  })
})

prev.addEventListener("click",async ()=>{
  
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
        // console.log("prev",{first,last})
    
    document.getElementById("body").innerHTML = null

    next.style.display = 'block'
    let {response} = await getHistory(id,first,last)
    // console.log(response)
}
})

next.addEventListener("click",async()=>{
    currentPage++;
    let first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    // console.log("Next2",{first,last},id)
    document.getElementById("body").innerHTML=""
    let {response} = await getHistory(id,first,last)
            // To stop the spinner
    
    if(response.length === 0){
        document.getElementById("body").innerHTML = "<tr><td colspan='7'>No results to display</td></tr>";
        next.style.display = "none"
      
    }
    if(first===1)
    prev.style.display = "none"
})

async function getHistory(id,first=1,last=5){
    // Create a new spinner
    const target = document.getElementById('spinner-container');
    const s = new Spinner().spin(target);

    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelByUserId/'+id+"/"+first+"/"+last)
    const res1 = await res.json()

    const response = await res1.data
    // console.log("2",response)
    const currentTime = await res1.currentDate
    

    response.forEach(data => {
     
        let tr = document.createElement("tr")
        // console.log("data20",data)
        let params = data
        // console.log(params)
        var urlParam = []

        for (let i in params){
        urlParam.push(encodeURI(i) + "=" + encodeURI(params[i]));
        // console.log("oo",ur  lParam)
        }
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.arrivalDate?.split("T")[0]}</td>
        <td>${data.departureDate?.split("T")[0]}</td>
        <td>${data.fromCity.split(":")[1]}</td>
        <td>${data.fromCountry.split(":")[1]}</td>
        <td><a href=${isFirstDateGreater(new Date(data.arrivalDate),new Date()) ? `updateTravelDetail.html?${urlParam.join("&")}`:"#"} class="btn btn-info">Edit</a></td>   
        <td><button class="btn btn-danger delete">Delete</button></td>
        <td style='display:none'>${data.travelId}</td>        
        `
        document.getElementById("body").appendChild(tr)

    })  
    s.stop();
    return {response,currentTime}
}

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}


async function deleteEvent(travelId){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/deleteTravelDetails/'+travelId,{
        method:"DELETE"
    })
    const res1 = await res.json()
    // console.log("res",res1)
}

function isFirstDateGreater(date1, date2) {
    // Convert dates to timestamps using getTime()
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();

    // Compare timestamps
    return timestamp1 > timestamp2;
}



checkSessionExpireOrNot()

