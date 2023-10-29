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
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.dob}</td>
        <td>${data.country.split(":")[1]}</td>
        <td>${data.state.split(":")[1]}</td>
        <td>${data.city.split(":")[1]}</td>
        <td><a href="#" class="btn btn-danger delete">Delete</a></td>
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

window.addEventListener("DOMContentLoaded",async()=>{

    // Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);
await getApprovedUser()
s.stop(); 

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
        document.getElementById("body").innerHTML = "<tr><td colspan='7'>No results to display</td></tr>";
        next.style.display = "none"
      
    }
    if(first===1)
    prev.style.display = "none"
})



