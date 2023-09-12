function getElementFromString(string){
    const div = document.createElement("div")
    div.innerHTML = string
    return div.firstElementChild
}

function loadContent() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('customnavbar').innerHTML = data;   
            if(JSON.parse(localStorage.getItem("role")) === "super"){
                document.getElementById("notificationIcon").style.display = "block"
            }

        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();

async function getUsersApprove() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUsersToApprove",{
        method:"GET",
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
document.getElementById("notification").innerHTML = res.length
    res.forEach(item => {
        let string = `
        <a class="dropdown-item d-flex align-items-center" href="#" >
        <div class="mr-3">
            <div class="icon-circle bg-warning">
                <i class="fas fa-exclamation-triangle text-white"></i>
            </div>
        </div>
        <div >
            <div class="small text-gray-500">${item.full_name}</div> 
            <div class="notificationHandler">${item.email} -- ${item.mobile_num}</div>
        </div>
    </a>

        `

        document.getElementById("showNotification").appendChild(getElementFromString(string))
    })

    Array.from(document.getElementsByClassName("notificationHandler")).forEach(item =>{
        item.addEventListener("click",(e)=>{
            let email = e.target.innerText.split("--")[0]
            approvedUsers(email)
        })
    })

}

getUsersApprove();

async function approvedUsers(email) {
     const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changeStatus/${email}`,{
        method: "POST",
     })
     const res = await response.json()
     console.log("approved",res)
}


