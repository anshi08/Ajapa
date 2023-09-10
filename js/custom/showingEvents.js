let prev = document.getElementById("prev")
let next = document.getElementById("next")




next.addEventListener("click", async () => {
    let lastChild  = (document.getElementById("body").lastElementChild.lastElementChild.innerHTML)
    let res = await showingAllEvents(lastChild,+lastChild+10)
    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.event_name}</td>
        <td>${data.event_type}</td>
        <td>${data.event_location}</td>
        <td>${data.start_date}</td>
        <td>${data.end_date}</td>
        <td>${data.listed_by}</td>
        <td><a href='cards.html?id=${data.event_id}'>Edit</a></td>
        <td style="display:none">${data.event_id}</td>
        `
        document.getElementById("body").appendChild(tr)
    })
})

prev.addEventListener("click", async () => {
    let firstChild = (document.getElementById("body").firstElementChild.lastElementChild.innerHTML)
    let res = await showingAllEvents(+firstChild-10,+firstChild-1)
    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.event_name}</td>
        <td>${data.event_type}</td>
        <td>${data.event_location}</td>
        <td>${data.start_date}</td>
        <td>${data.end_date}</td>
        <td>${data.listed_by}</td>
        <td><a href='cards.html?id=${data.event_id}'>Edit</a></td>
        <td style="display:none">${data.event_id}</td>
        `
        document.getElementById("body").appendChild(tr)
    })
})

async function showingAllEvents(first=1,last=10) {
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEvents/${first}/${last}`,{
         method:"GET",
         headers: {
            "Content-type":"application/json;  charset=UTF-8"
         }
    })
    const res = await response.json()
    
    if(res[0].event_id===2){
        document.getElementById("prev").style.display = 'none'
    }else{
        document.getElementById("prev").style.display = 'block'
    }
    return res;
}


window.addEventListener("DOMContentLoaded",async ()=>{
    let res = await showingAllEvents()
        res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.event_name}</td>
        <td>${data.event_type}</td>
        <td>${data.event_location}</td>
        <td>${data.start_date}</td>
        <td>${data.end_date}</td>
        <td>${data.listed_by}</td>
        <td><a href='cards.html?id=${data.event_id}'>Edit</a></td>
        <td style="display:none">${data.event_id}</td>
        `
        document.getElementById("body").appendChild(tr)
    })  
})




function getElementByString(str){  
    let div = document.createElement("div")
    div.innerHTML =str
    return div.firstElementChild
}