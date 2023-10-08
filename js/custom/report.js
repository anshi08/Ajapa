

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



async function getTravelReportFamilyWise(evenId) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportFamilyWise/"+evenId,{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res;
}


window.addEventListener("DOMContentLoaded",async(e) =>{
    let allEvents = await getAllEvents()
    let report1EventDDL = document.getElementById("report1Events")
    let report2EventDDL = document.getElementById("report2Events")
    let report3EventDDL = document.getElementById("report3Events")
    let tableofReport1 = document.getElementById("report1body")
    let tableofReport2 = document.getElementById("report2body")
    let tableofReport3 = document.getElementById("report3body")
    report1EventDDL.innerHTML=''
    report2EventDDL.innerHTML=''
    report3EventDDL.innerHTML=''
    allEvents.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId
        option.innerHTML=event.eventName
        report1EventDDL.appendChild(option)
    })
    allEvents.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId
        option.innerHTML=event.eventName
        report2EventDDL.appendChild(option)
    })
    allEvents.forEach(event => {
        let option = document.createElement("option")
        option.value = event.eventId
        option.innerHTML=event.eventName
        report3EventDDL.appendChild(option)
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


    report3EventDDL.addEventListener("change",async (e)=>{
        let familyWise = await getTravelReportFamilyWise(e.target.value)
        console.log('hi')
        tableofReport3.innerHTML=null
        familyWise.forEach(report => {
            console.log(report)
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${report.headName}</td>
            <td>  ${report.memberNames.map(name => `${name}<br>`).join('')}</td>
            <td>${report.totalPersons}</td>
            <td>${report.totalMaleMembers}</td>
            <td>${report.totalFemaleMembers}</td>
            <td>${report.totalKids}</td>
            <td>${report.totalSeniorCitizens}</td>
            <td>  ${report.reachingCity.map(city => `${city.split(":")[1]}<br>`).join('')}</td>
            <td>  ${report.reachingDate.map(date => `${date}<br>`).join('')}</td>
            <td>  ${report.reachingMode.map(mode => `${mode}<br>`).join('')}</td>
            <td>  ${report.reachingTrainDetails.map(detail => `${detail .split(":")[1]}<br>`).join('')}</td>
            <td>  ${report.leavingDate.map(date => `${date}<br>`).join('')}</td>
            <td>  ${report.leavingMode.map(mode => `${mode}<br>`).join('')}</td>
            <td>  ${report.leavingTrainDetails.map(detail => `${detail .split(":")[1]}<br>`).join('')}</td>
            <td> <img src="http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${report.emailId}"/></td>
            `
            tableofReport3.appendChild(tr)
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

document.getElementById("report1export").addEventListener("click",()=>generatePDF(0))
document.getElementById("report2export").addEventListener("click",()=>generatePDF(1))
document.getElementById("report3export").addEventListener("click",()=>generatePDF(2))

function generatePDF(idx) {
    html2canvas(document.getElementsByClassName('table')[idx], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500,
                }]
            };
            pdfMake.createPdf(docDefinition).download(`Report${idx+1}.pdf`);
        }
    });

  }
