async function getAllFamilyMember(familyId){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFamilyMembers/${familyId}`,{
        method:"GET",
        headers: {
           "Content-type":"application/json;  charset=UTF-8"
        }
   })
   const res = await response.json()
   console.log(res)
 return res;

}



window.addEventListener("DOMContentLoaded",async ()=>{
    // let res = await getAllFamilyMember(localStorage.getItem("family_id"))
    let res = await getAllFamilyMember(127)
    let allUser = res.filter(res => res.id !== +localStorage.getItem("family_id") )

    allUser.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td><a href="#" class="deleted">Delete</td>
         `
        document.getElementById("body").appendChild(tr)
})


Array.from(document.getElementsByClassName("deleted")).forEach(item => {
    item.addEventListener("click",(e) =>{
        deleteFamilyMember(e.target.parentElement.previousElementSibling.previousElementSibling.innerText)

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
 return res;

}
