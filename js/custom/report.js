

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

//Report 2  {reaching date ke acc}
async function getTravelReportDateWise2(evenId) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportDateWise2/"+evenId,{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    return res;
}
//Report 2  {leaving date ke acc}
async function getTravelReportDateWise2Leaving(evenId) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportDateWise2/"+evenId+"/1",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log(res)
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
async function getTravelReportFamilyWise(eventId) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportFamilyWise/"+eventId,{
        // const response = await fetch('http://192.168.29.217:8080/getTravelReportFamilyWise/'+eventId,{
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
    // report1EventDDL.innerHTML=''
    // report2EventDDL.innerHTML=''
    // report3EventDDL.innerHTML=''
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

    // trainNames[index]=trainNames[index]+","+travelTrainDetails;
    report2EventDDL.addEventListener("change",async (e)=>{
        let dateWiseReports2 = await getTravelReportDateWise2(e.target.value)
        console.log("🚀 ~ file: report.js:134 ~ report2EventDDL.addEventListener ~ dateWiseReports2:", dateWiseReports2)
        let slot1 =  new hashMap()
        let slot2 =  new hashMap()
        let slot3 =  new hashMap()
        let slot4 =  new hashMap()
        

    
        tableofReport2.innerHTML=null
        dateWiseReports2.forEach(report => {
            report.trainNames.forEach((train,index) =>{
           
                train.trim(",").split(",").forEach((name,idx) =>{
                    if(index===0){
                        if(name.length!==0)
                        slot1.put(name.replaceAll("'",""))
                    }
                    
                  
                    else if(index===1){
                        if(name.length!==0)
                        slot2.put(name.replaceAll("'",""))
                    }
                 
                    else if(index===2){
                        if(name.length!==0)
                        slot3.put(name.replaceAll("'",""))
                    }
                  
                    else{
                        if(name.length!==0)
                        slot4.put(name.replaceAll("'",""))
                    }
               
                })
               

            })
           let slot1row =  Object.keys(slot1.hashDict).map(key => "["+key+"--"+slot1.get(key)+"]")
           let slot2row =  Object.keys(slot2.hashDict).map(key => "["+key+"--"+slot2.get(key)+"]")
           let slot3row =  Object.keys(slot3.hashDict).map(key => "["+key+"--"+slot3.get(key)+"]")
           let slot4row =  Object.keys(slot4.hashDict).map(key => "["+key+"--"+slot4.get(key)+"]")
           


            
        
            let tr = document.createElement("tr")
            tr.innerHTML = `
            <td>${report.travelDate}</td>
            <td>${report.totalPersons}</td>
            <td>${report.totalFamilies}</td>
            <td>${`12 AM-7 AM [${report.trainPerson[0]} T / ${report.flightPerson[0]} F / ${report.roadPerson[0]} R] <br/>7 AM-12 Noon [${report.trainPerson[1]} T / ${report.flightPerson[1]} F / ${report.roadPerson[1]} R] <br/>12 Noon-5 PM [${report.trainPerson[2]} T / ${report.flightPerson[2]} F / ${report.roadPerson[2]} R] <br/>5 PM-12 AM [${report.trainPerson[3]} T / ${report.flightPerson[3]} F / ${report.roadPerson[3]} R] `}</td>
            <td>${slot1row.map(item => item)}<br/>
               ${slot2row.map(item => item)}<br/>
               ${slot3row.map(item => item)}<br/>
               ${slot4row.map(item => item)}<br/> 
            </td>
         
            `
            tableofReport2.appendChild(tr)
        })  

    })


    report3EventDDL.addEventListener("change",async (e)=>{
        console.log("kk",e.target.value)
        let familyWise = await getTravelReportFamilyWise(e.target.value)
        tableofReport3.innerHTML=null
        
        familyWise.forEach((report,idx) =>{
            let particularMember = familyWise[idx].memberNames.map(member => familyWise[idx])
            particularMember.forEach((item,idx) => {
                let tr  = document.createElement("tr")
                let headTr = '<td style="background-color:white"></td>'
                let totalKidTr = `<td style="background-color:white"></td>`
                let totalSeniorCitizens = `<td style="background-color:white;"></td>`
                if(idx===0) {
                    headTr = `<td> <a href="userProfile.html?id=${item.headId}">${item.headName}</a></td>`
                    totalKidTr = ` <td>${item.totalKids}</td>`
                    totalSeniorCitizens = `  <td>${item.totalSeniorCitizens}</td>`
                }
                tr.innerHTML = `
                ${headTr}
                <td><a href=userProfile.html?id=${item.memberId[idx]}>${item.memberNames[idx].split(" ")[0]}/ [${item.memberGender[idx] === "Male"? "M":"F"}/ ${item.memberAge[idx]}]</a></td>
                <td>${item.memberMobileNumber.length===0 ? "NA":item.memberMobileNumber[idx]}</td>
                <td>${item.totalPersons}</td>
                ${totalKidTr}
                ${totalSeniorCitizens}
                <td>${item.reachingCity[idx].split(":")[1]}</td>
                <td>${item.reachingDate[idx]}</td>
                <td>${item.reachingMode[idx]}</td>
                <td>${item.reachingTrainDetails[idx] === null || item.reachingTrainDetails[idx].trim().length===0 ? "NA": item.reachingTrainDetails[idx]}</td>
                <td>${item.leavingDate[idx]}</td>
                <td>${item.leavingMode[idx]}</td>
                <td>${item.leavingTrainDetails[idx] === null || item.leavingTrainDetails[idx].trim().length===0 ? "NA" : item.leavingTrainDetails[idx]}</td>
                <td> <img src="http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${report.emailId}"/></td>
                `
                tableofReport3.appendChild(tr)
            })

       
         

        })
            
     

    })
    


    let report1LeavingReaching = document.getElementById("report1LeavingReaching")
    report1LeavingReaching.addEventListener("change",async (e) =>{
        if(e.target.value === "Departure Date"){
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

//Report 2
let report2LeavingReaching = document.getElementById("report2LeavingReaching")
report2LeavingReaching.addEventListener("change",async (e) =>{
    if(e.target.value === "Departure Date"){
        let eventId = document.getElementById("report2Events").options[document.getElementById("report2Events").selectedIndex].value
       let eventSorted = await getTravelReportDateWise2Leaving(eventId)
       
       document.getElementById("report2body").innerHTML=null

    let slot1 =  new hashMap()
    let slot2 =  new hashMap()
    let slot3 =  new hashMap()
    let slot4 =  new hashMap()

    eventSorted.forEach(report => {
        report.trainNames.forEach((train,index) =>{
       
            train.trim(",").split(",").forEach((name,idx) =>{
                if(index===0){
                    if(name.length!==0)
                    slot1.put(name.replaceAll("'",""))
                }
                
              
                else if(index===1){
                    if(name.length!==0)
                    slot2.put(name.replaceAll("'",""))
                }
             
                else if(index===2){
                    if(name.length!==0)
                    slot3.put(name.replaceAll("'",""))
                }
              
                else{
                    if(name.length!==0)
                    slot4.put(name.replaceAll("'",""))
                }
           
            })
           

        })
       let slot1row =  Object.keys(slot1.hashDict).map(key => "["+key+"--"+slot1.get(key)+"]")
       let slot2row =  Object.keys(slot2.hashDict).map(key => "["+key+"--"+slot2.get(key)+"]")
       let slot3row =  Object.keys(slot3.hashDict).map(key => "["+key+"--"+slot3.get(key)+"]")
       let slot4row =  Object.keys(slot4.hashDict).map(key => "["+key+"--"+slot4.get(key)+"]")
       


        
    
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${report.travelDate}</td>
        <td>${report.totalPersons}</td>
        <td>${report.totalFamilies}</td>
        <td>${`12 AM-7 AM [${report.trainPerson[0]} T / ${report.flightPerson[0]} F / ${report.roadPerson[0]} R] <br/>7 AM-12 Noon [${report.trainPerson[1]} T / ${report.flightPerson[1]} F / ${report.roadPerson[1]} R] <br/>12 Noon-5 PM [${report.trainPerson[2]} T / ${report.flightPerson[2]} F / ${report.roadPerson[2]} R] <br/>5 PM-12 AM [${report.trainPerson[3]} T / ${report.flightPerson[3]} F / ${report.roadPerson[3]} R] `}</td>
        <td>${slot1row.map(item => item)}<br/>
           ${slot2row.map(item => item)}<br/>
           ${slot3row.map(item => item)}<br/>
           ${slot4row.map(item => item)}<br/> 
        </td>
     
        `
        document.getElementById("report2body").appendChild(tr)
    })
    }else{
        let eventId = document.getElementById("report2Events").options[document.getElementById("report2Events").selectedIndex].value
       let eventSorted = await getTravelReportDateWise2(eventId)
 
       document.getElementById("report2body").innerHTML=null

    let slot1 =  new hashMap()
    let slot2 =  new hashMap()
    let slot3 =  new hashMap()
    let slot4 =  new hashMap()

    eventSorted.forEach(report => {
        report.trainNames.forEach((train,index) =>{
       
            train.trim(",").split(",").forEach((name,idx) =>{
                if(index===0){
                    if(name.length!==0)
                    slot1.put(name.replaceAll("'",""))
                }
                
              
                else if(index===1){
                    if(name.length!==0)
                    slot2.put(name.replaceAll("'",""))
                }
             
                else if(index===2){
                    if(name.length!==0)
                    slot3.put(name.replaceAll("'",""))
                }
              
                else{
                    if(name.length!==0)
                    slot4.put(name.replaceAll("'",""))
                }
           
            })
           

        })
       let slot1row =  Object.keys(slot1.hashDict).map(key => "["+key+"--"+slot1.get(key)+"]")
       let slot2row =  Object.keys(slot2.hashDict).map(key => "["+key+"--"+slot2.get(key)+"]")
       let slot3row =  Object.keys(slot3.hashDict).map(key => "["+key+"--"+slot3.get(key)+"]")
       let slot4row =  Object.keys(slot4.hashDict).map(key => "["+key+"--"+slot4.get(key)+"]")
       


        
    
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${report.travelDate}</td>
        <td>${report.totalPersons}</td>
        <td>${report.totalFamilies}</td>
        <td>${`12 AM-7 AM [${report.trainPerson[0]} T / ${report.flightPerson[0]} F / ${report.roadPerson[0]} R] <br/>7 AM-12 Noon [${report.trainPerson[1]} T / ${report.flightPerson[1]} F / ${report.roadPerson[1]} R] <br/>12 Noon-5 PM [${report.trainPerson[2]} T / ${report.flightPerson[2]} F / ${report.roadPerson[2]} R] <br/>5 PM-12 AM [${report.trainPerson[3]} T / ${report.flightPerson[3]} F / ${report.roadPerson[3]} R] `}</td>
        <td>${slot1row.map(item => item)}<br/>
           ${slot2row.map(item => item)}<br/>
           ${slot3row.map(item => item)}<br/>
           ${slot4row.map(item => item)}<br/> 
        </td>
     
        `
        document.getElementById("report2body").appendChild(tr)
    })  
    }
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

function setSessionTimeout() {
const timeoutInMilliseconds = 43200000; // 12 hours

setTimeout(() => {
    alert('Your session has timed out. You are now logged out.');
    localStorage.clear();
    window.location.href = 'login.html';
}, timeoutInMilliseconds);
}
setSessionTimeout();




let hashMap=function(){
    this.hashDict={};//dictionary
    this.size=0;
    this.debug=true;
    return this;
    }

  hashMap.prototype.put = function (_key) {
 
    if (!this.hashDict.hasOwnProperty(_key)) {
        // If the key is not already in the hash map, add it with count 1
        this.hashDict[_key] = 1;
        ++this.size;
     
    } else {
        // If the key is already in the hash map, increment the count
        this.hashDict[_key] += 1;
    }

}
        hashMap.prototype.getCount = function (_key) {
            // Retrieve the count associated with the given key
            return this.hashDict[_key] || 0;
        };
        hashMap.prototype.getAllEntries = function () {
            // Return an array of objects containing all key-value pairs
            return Object.entries(this.hashDict).map(([key, value]) => ({ key, value }));
        };
        hashMap.prototype.clear = function () {
            this.hashDict = {};
            this.size = 0;
        };
        hashMap.prototype.get = function (_key) {
            return this.hashDict[_key];
        }
        