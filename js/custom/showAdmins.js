async function getUsers(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllAdmins")
    const res = await response.json()
    res.forEach(data => {
        if(data.id !== 1){
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td><p style="display:none">${data.id}</p><a href="#" class="edit">Delete</a></td>
        `
        document.getElementById("body").appendChild(tr)
        }
    })
    
    return res;
}


window.addEventListener("DOMContentLoaded",async ()=>{
    await getUsers()
    Array.from(document.getElementsByClassName("edit")).forEach(item => {
        item.addEventListener("click",(e)=>{
            e.preventDefault()

            deletAdmin(e.target.previousElementSibling.innerText)
        })
    })
})

async function deletAdmin(id){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeAdminStatus/"+id,{
        method:"POST"
    })
    const res = await response.text()
    window.location.href="showAdmins.html"
}