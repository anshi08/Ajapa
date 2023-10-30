function getElementFromString(string){
    const div = document.createElement("div")
    div.innerHTML = string
    return div.firstElementChild
}

async function getApprovedUsers(){
    
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUsersByStatus/0")
    const res = await response.json()
    // res.reverse()

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
        <td><a href="#" class="approved">Approve</td>
        <td><a href="#" class="rejected">Reject</td>
         `
        document.getElementById("body").appendChild(tr)
})


Array.from(document.getElementsByClassName("approved")).forEach(item =>{
    item.addEventListener("click",e => {
        if(e.target.classList.contains("approved")){
            if(confirm("Are You sure you want to approve")){
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


}

getApprovedUsers()



async function approvedUsers(email) {
     const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeStatus/${email}`,{
        method: "POST",
     })
     const res = await response.json()
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
function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()