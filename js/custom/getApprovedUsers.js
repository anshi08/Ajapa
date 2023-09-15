function getElementFromString(string){
    const div = document.createElement("div")
    div.innerHTML = string
    return div.firstElementChild
}

async function getApprovedUsers(){
    
    const response = await fetch("http://192.168.29.52:8080/getUsersToApprove")
    const res = await response.json()
    res.reverse()
    console.log("<-->",res[0])

    document.getElementById("body").innerHTML = null
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.full_name}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.dob}</td>
        <td>${data.country}</td>
        <td>${data.state}</td>
        <td>${data.city}</td>
        <td><a href="#" class="approved">Approve</td>
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


}

getApprovedUsers()



async function approvedUsers(email) {
     const response = await fetch(`http://192.168.29.52:8080/changeStatus/${email}`,{
        method: "POST",
     })
     const res = await response.json()
     console.log("approved",res)
     window.location.href=""
}