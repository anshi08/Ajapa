async function getAllFamilyMember(familyId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFamilyMembers/${familyId}`,{
        method:"GET",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.json()
   return res;

}

window.addEventListener("DOMContentLoaded",async ()=>{
    let res = await getAllFamilyMember(localStorage.getItem("family_id"))
    let deleteMember = document.getElementById("deleteMember")
    JSON.parse(localStorage.getItem('role')) === 'member' ? deleteMember.style.display="none":""
    // let res = await getAllFamilyMember(120)
    // let allUser = res.filter(res => res.id !== +localStorage.getItem("family_id") )
    let allUser = res

    allUser.forEach(data => {
        let tr = document.createElement("tr")
        if(data.userType==="head"){
            tr.style.backgroundColor="#7f2c00"
            tr.style.color = '#FFFFFF'
        }
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        ${data.userType==="head" ? JSON.parse(localStorage.getItem("role")) === "member" ?'' :   '<td>head</td>' :`${JSON.parse(localStorage.getItem('role')) === 'member' ? '':`<td><a href="#" class="deleted">Delete</td>`}`}`
        document.getElementById("body").appendChild(tr)
})


Array.from(document.getElementsByClassName("deleted")).forEach(item => {
    item.addEventListener("click",(e) =>{
        let emailId = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
        deleteFamilyMember(emailId)
        // location.reload();
    })
})

})


async function deleteFamilyMember(emailId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/deleteUser/${emailId}`,{
        method:"POST",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.json()
   console.log(res)
   if (res.token === 'deleted') {
        location.reload();
}
return res

}

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()