window.addEventListener("DOMContentLoaded" , ()=> {
    const name = parseJwt(localStorage.getItem("data"))
    console.log(name.fullName)
    document.getElementById("username").innerText = name.fullName

})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}



function loadContent() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('accordionSidebar').innerHTML = data;
            if(JSON.parse(localStorage.getItem("role")) === "super"){
                console.log("SSS");
                document.getElementById("username").innerText = name.fullName
                document.getElementById("addAdmins").style.display = "block"
                document.getElementById("showAdmins").style.display = "block"
                document.getElementById("rejectUsers").style.display = "block"
                document.getElementById("deletedEvents").style.display = "block"
                document.getElementById("addMembers").style.display = "none"
                document.getElementById("updateProfile").style.display = "none"
                document.getElementById("addDetailsTab").style.display = "none"
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("addTravelDetails").style.display = "none"
                document.getElementById("events").style.display = "block"

            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();
