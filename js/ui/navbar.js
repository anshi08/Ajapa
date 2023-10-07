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
            let email = parseJwt(localStorage.getItem("data")).email
            document.getElementById("userPic").src = `http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${email}.jpg`
            document.getElementById("sidebarToggleTop").addEventListener("click",sidebarToggle,false)
            function sidebarToggle(){   
                    document.body.classList.toggle('sidebar-toggled');
                    document.querySelector('.sidebar').classList.toggle('toggled');
                
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
document.getElementById("notification")!==null ? document.getElementById("notification").innerHTML = res.length :""
    res.forEach(item => {
        let string = `
        <a class="dropdown-item d-flex align-items-center" href="getApprovedUsers.html" >
        <div class="mr-3">
            <div class="icon-circle bg-warning">
            <i class="fas fa-user-circle "></i>
            </div>
        </div>
        <div >
            <div class="small text-gray-500">${item.full_name}</div> 
            <div class="notificationHandler">${item.email}</div>
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


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}