// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

async function getUsers(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllAdminsNew")
    const res = await response.json()

    if(res.length===0){
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td colspan='3' align='center'>No Admin Found</td>`
        document.getElementById("body").appendChild(tr)
        s.stop(); 
        return;
    }

    res.forEach(data => {        
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.identifier}</td>
        <td>${data.password}</td>
        <td><a href="#" class="edit">${data.status===1?'Delete':"Restore"}</a></td>
        `
        document.getElementById("body").appendChild(tr)
         // To stop the spinner
         s.stop(); 
        
    })
    
    return res;
}


window.addEventListener("DOMContentLoaded",async ()=>{
    await getUsers()
    Array.from(document.getElementsByClassName("edit")).forEach(item => {
        item.addEventListener("click",(e)=>{
            e.preventDefault()
            deletAdmin(e.target.parentElement.previousElementSibling.previousElementSibling.innerText)
        })
    })
})

async function deletAdmin(id){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeAdminStatus/"+id,{
        method:"POST"
    })
    const res = await response.text()
    console.log(res)
    // window.location.href="showAdmins.html"
}


function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();