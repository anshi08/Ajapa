// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

async function getApprovedUser(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUsersByStatus/1',{
        method:"GET"
    })
    const response = await res.json()
    console.log("data",response)

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
s.stop(); 

Array.from(document.getElementsByClassName("delete")).forEach(item => item.addEventListener("click",(e)=>{
    let email = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    // console.log(email)
    rejectedUser(email)  
  }))

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


getApprovedUser()