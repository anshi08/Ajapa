let next = document.getElementById("next")
let prev = document.getElementById("prev")
let currentPage = 1;
const eventsPerPage = 5;




async function getApprovedUser(first=1,last=5){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUsersByStatus/1/'+first+"/"+last,{
        method:"GET"
    })
    const response = await res.json()
    document.getElementById("body").innerHTML = null
    response.forEach(data => {
        if(data.id != 1){
        // console.log(data)
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td><a href="http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${data.email}.jpg" class="view">Profile</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.age}</td>
        <td>${data.country.split(":")[1]}</td>
        <td>${data.state.split(":")[1]}</td>
        <td>${data.city.split(":")[1]}</td>
        <td><a href="updateUser.html?email=${data.email}&id=${data.id}" class="btn btn-info delete">Edit</a></td>
         `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
        }
  
    })



    Array.from(document.getElementsByClassName("delete")).forEach(item => item.addEventListener("click",(e)=>{
    let email = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    // console.log(email)
    rejectedUser(email)  
    }))
return response
}


async function rejectedUser(email){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/rejectUser/${email}`,{
        method: "POST",
     })
     const res = await response.json()
     console.log("--",res)
     window.location.href="approvedUsers.html"   
     return res;
}

async function search(search,searchBasis){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/reptGetUserDetails/${search}/${searchBasis}`)
    const result = await response.json()
    return result;
}



window.addEventListener("DOMContentLoaded",async()=>{

    // Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);
await getApprovedUser()
s.stop(); 

let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener("click",async function(){
    let searchbox = document.getElementById("search").value
    let searchbasis = document.getElementById("searchbasis").value
    let response  = await search(searchbox,searchbasis)
    document.getElementById("body").innerHTML = null
    response.forEach(data => {
        if(data.id != 1){
        // console.log(data)
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td><a href="http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${data.email}.jpg" class="view">Profile</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.age}</td>
        <td>${data.country.split(":")[1]}</td>
        <td>${data.state.split(":")[1]}</td>
        <td>${data.city.split(":")[1]}</td>
        <td><a href="updateUser.html?email=${data.email}&id=${data.id}" class="btn btn-info delete">Edit</a></td>
        `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
        }
  
    })

})

let details = document.getElementById("details")
details.addEventListener("change",(e)=>{
    if(e.target.value === "pdf"){
  generatePDF(0)
    }else{
   let data = convertTableToJson()
   let wb = XLSX.utils.book_new();
   let ws = XLSX.utils.aoa_to_sheet(data);

   // Add the worksheet to the workbook
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

   // Save the workbook as an XLSX file
   XLSX.writeFile(wb, 'exported_data.xlsx');
    }
  

})


})


prev.addEventListener("click",async ()=>{
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
        console.log("prev",{first,last})
    
    document.getElementById("body").innerHTML = null

    next.style.display = 'block'
    let res = await getApprovedUser(first,last)
    console.log(res)
}
})

next.addEventListener("click",async()=>{
    currentPage++;
    let first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    console.log("Next2",{first,last})
    document.getElementById("body").innerHTML=""
    let res = await getApprovedUser(first,last)
    console.log("my",res)

            // To stop the spinner
    
    if(res.length === 0){
        document.getElementById("body").innerHTML = "<tr><td colspan='9'>No results to display</td></tr>";
        next.style.display = "none"
      
    }
    if(first===1)
    prev.style.display = "none"
})

function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }

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


  function convertTableToJson() {
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName('tr');
    var jsonArray = [];

    
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        var cells = rows[i].getElementsByTagName('td');
        var rowData = [];

        for (var j = 0; j < cells.length; j++) {
            var cellValue = cells[j].textContent;
            rowData.push(cellValue);
        }

        jsonArray.push(rowData);
    }
    console.log(jsonArray)
    return jsonArray;
}


setSessionTimeout();


