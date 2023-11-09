

let next = document.getElementById("next")
let prev = document.getElementById("prev")
let currentPage = 1;
const eventsPerPage = 5;



async function rejectedUsers(first=1,last=5){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUsersByStatus/2/'+first+"/"+last,{
        method:"GET"
    })
    const response = await res.json()
    response.reverse()

    document.getElementById("body").innerHTML = null
    response.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.dob}</td>
        <td>${data.country.split(":")[1]}</td>
        <td>${data.state.split(":")[1]}</td>
        <td>${data.city.split(":")[1]}</td>
        <td><a href="#" class="btn btn-success restore">Restore</a></td>
         `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
     
})
Array.from(document.getElementsByClassName("restore")).forEach(item => item.addEventListener("click",(e)=>{
  restoreUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText)  
}))

async function restoreUser(email){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeStatusRestore/${email}`,{
        method:"POST"
    })
    const response = await res.json()
    alert("User now in Pending Status")
    window.location.href='getApprovedUsers.html'
    return response;
}
return response
}


window.addEventListener("DOMContentLoaded",async()=>{
// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);
await rejectedUsers()
s.stop()

})

prev.addEventListener("click",async ()=>{
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
        console.log("prev",{first,last})
    
    document.getElementById("body").innerHTML = null

    next.style.display = 'block'
    let res = await rejectedUsers(first,last)
    console.log(res)
}
})

next.addEventListener("click",async()=>{
    currentPage++;
    let first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    console.log("Next2",{first,last})
    document.getElementById("body").innerHTML=""
    let res = await rejectedUsers(first,last)
    console.log("my",res)

            // To stop the spinner
    
    if(res.length === 0){
        document.getElementById("body").innerHTML = "<tr><td colspan='7'>No results to display</td></tr>";
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
setSessionTimeout();