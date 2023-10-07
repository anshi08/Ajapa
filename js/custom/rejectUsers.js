// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

async function rejectedUsers(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getRejectedUsers',{
        method:"GET"
    })
    const response = await res.json()
    console.log("data",response)
    response.reverse()

    document.getElementById("body").innerHTML = null
    response.forEach(data => {
        console.log(data)
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
s.stop(); 

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
}

}

rejectedUsers()