// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

async function showPermission(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEventsWitPermissions")
    const res = await response.json()
    console.log(res)
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.listedBy}</td>
        <td>${data.canModify}</td>
        <td>${data.canDelete}</td>
        `
        document.getElementById("body").appendChild(tr)
           // To stop the spinner
           s.stop(); 
      
    })
    return res
}

window.addEventListener("DOMContentLoaded",()=>{
    showPermission()
})

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()