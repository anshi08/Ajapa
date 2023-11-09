let next = document.getElementById("next")
let prev = document.getElementById("prev")
let currentPage = 1;
const eventsPerPage = 5;


function getElementFromString(string){
    const div = document.createElement("div")
    div.innerHTML = string
    return div.firstElementChild
}

async function getApprovedUsers(first=1,last=5){
    
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUsersByStatus/0/"+first+"/"+last)
    const res = await response.json()
    console.log(res)
    res.reverse()

    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.dob}</td>
        <td>${data.country.split(":")[1]}</td>
        <td>${data.state.split(":")[1]}</td>
        <td>${data.city.split(":")[1]}</td>
        <td><a href="http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${data.email}.jpg" class="view">View</td>
        <td><a href="#" class="approved">Approve</td>
        <td><a href="#" class="rejected">Reject</td>
         `
        document.getElementById("body").appendChild(tr)
})


Array.from(document.getElementsByClassName("approved")).forEach(item =>{
    item.addEventListener("click",e => {
        if(e.target.classList.contains("approved")){
            if(confirm("Are you sure you want to approve")){
                let email = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
                    approvedUsers(email)
            }else{
                alert("Sorry!!!")
            }
        }
    })
})

Array.from(document.getElementsByClassName("rejected")).forEach(item =>{
    item.addEventListener("click",e => {
        if(e.target.classList.contains("rejected")){
            if(confirm("Are You sure you want to Reject")){
                let email = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
                    rejectedUser(email)
            }else{
                alert("Okay!!")
            }
        }
    })
})

return res
}

window.addEventListener("DOMContentLoaded",async ()=>{
    await getApprovedUsers()
})





async function approvedUsers(email) {
     const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeStatus/${email}`,{
        method: "POST",
     })
     const res = await response.json()
    //  console.log("jj",res)
     window.location.href="dashboard.html"
     return res;
}

async function rejectedUser(email){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/rejectUser/${email}`,{
        method: "POST",
     })
     const res = await response.json()
     window.location.href="dashboard.html"   
     return res;
}


prev.addEventListener("click",async ()=>{
    if (currentPage > 1) {
        currentPage--;
        const first = (currentPage - 1) * eventsPerPage + 1;
        const last = currentPage * eventsPerPage;
        console.log("prev",{first,last})
    
    document.getElementById("body").innerHTML = null

    next.style.display = 'block'
    let res = await getApprovedUsers(first,last)
    console.log(res)
}
})


next.addEventListener("click",async()=>{
    currentPage++;
    let first = (currentPage - 1) * eventsPerPage + 1;
    let last = currentPage * eventsPerPage;
    console.log("Next2",{first,last})
    document.getElementById("body").innerHTML=""
    let res = await getApprovedUsers(first,last)
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