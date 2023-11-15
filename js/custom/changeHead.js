async function getFamilyMember(family_Id){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getFamilyMembers/${family_Id}`)
    const response = await res.json()

    return response
}

window.addEventListener("DOMContentLoaded",async () =>{
    let family_id = JSON.parse(localStorage.getItem("family_id"))
    let members = await getFamilyMember(family_id)
    let currentHead = members.filter(mem => mem.userType === "head")
    let allFamilyMemberExccedHead = members.filter(mem => mem.userType !== "head")
    allFamilyMemberExccedHead.forEach(member => {
        let option = document.createElement("option")
        option.value = member.id
        option.text = member.fullName
        document.getElementById("newHead").appendChild(option)
    })
    currentHead.forEach(member => {
        let option = document.createElement("option")
        option.value = member.id
        option.text = member.fullName
        document.getElementById("currentHead").appendChild(option)
    })

    document.getElementById("btn").addEventListener("click",async()=>{
        let family_id = JSON.parse(localStorage.getItem("family_id"))
        let userId =  document.getElementById("newHead").value
       let result = await changeHead(family_id,userId)
       if(result.token === "Changed"){
        alert("Head Changed")
        localStorage.clear()
        window.location.href = "login.html"

       }

    })


})

async function changeHead(familyId,userId){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeFamilyHead/${familyId}/${userId}`,{
        method:"POST",
    })
    const response = await res.json()
    console.log("🚀 ~ file: changeHead.js:40 ~ changeHead ~ response:", response)

    return response
}
