

async function getTravelReportDateWise(evenId) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportDateWise/"+evenId,{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res;
}
async function getTravelReportDateWiseLeavning(evenId) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportDateWise/"+evenId+"/1",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res;
}


async function getAllEvents() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEvents",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res
}
async function getEventById(eventId){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchEvent/"+eventId,{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res
}


window.addEventListener("DOMContentLoaded",async(e) =>{
    let allEvents = await getAllEvents()
    let report1EventDDL = document.getElementById("report1Events")
    let tableofReport1 = document.getElementById("report1body")
    report1EventDDL.innerHTML=''
    allEvents.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId
        option.innerHTML=event.eventName
        report1EventDDL.appendChild(option)
    })

    report1EventDDL.addEventListener("change",async (e)=>{
        let dateWiseReports = await getTravelReportDateWise(e.target.value)
    
        tableofReport1.innerHTML=null
        dateWiseReports.forEach(report => {
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${report.travelDate}</td>
            <td>${report.totalPersons}</td>
            <td>${report.totalFamilies}</td>
            <td>${report.totalSeniorCitizens}</td>
            <td>${report.totalKids}</td>
            <td>${report.totalMaleMembers}</td>
            <td>${report.totalFemaleMembers}</td>
            `
            tableofReport1.appendChild(tr)
        })

    })
    let report1LeavingReaching = document.getElementById("report1LeavingReaching")
    report1LeavingReaching.addEventListener("change",async (e) =>{
        if(e.target.value === "Leaving Date"){
            let eventId = document.getElementById("report1Events").options[document.getElementById("report1Events").selectedIndex].value
           let eventSorted = await getTravelReportDateWiseLeavning(eventId)
           tableofReport1.innerHTML=null
           eventSorted.forEach(report => {
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${report.travelDate}</td>
            <td>${report.totalPersons}</td>
            <td>${report.totalFamilies}</td>
            <td>${report.totalSeniorCitizens}</td>
            <td>${report.totalKids}</td>
            <td>${report.totalMaleMembers}</td>
            <td>${report.totalFemaleMembers}</td>
            `
            tableofReport1.appendChild(tr)
           })
        }else{
            let eventId = document.getElementById("report1Events").options[document.getElementById("report1Events").selectedIndex].value
           let eventSorted = await getTravelReportDateWise(eventId)
           tableofReport1.innerHTML=null
           eventSorted.forEach(report => {
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${report.travelDate}</td>
            <td>${report.totalPersons}</td>
            <td>${report.totalFamilies}</td>
            <td>${report.totalSeniorCitizens}</td>
            <td>${report.totalKids}</td>
            <td>${report.totalMaleMembers}</td>
            <td>${report.totalFemaleMembers}</td>
            `
            tableofReport1.appendChild(tr)
           })
        }
    })
})