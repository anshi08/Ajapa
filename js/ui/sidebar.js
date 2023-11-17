
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
            const token = localStorage.getItem("data");
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('accordionSidebar').innerHTML = data;
            if(JSON.parse(localStorage.getItem("role")) === "super"){
                document.getElementById("showMembers").style.display = "none"
                document.getElementById("attendance").style.display = "block"
                document.getElementById("reports").style.display = "block"
                document.getElementById("addPermission").style.display = "block"
                document.getElementById("showPermission").style.display = "block"
                document.getElementById("addAdmins").style.display = "block"
                document.getElementById("showAdmins").style.display = "block"
                document.getElementById("approveUsers").style.display = "block"
                document.getElementById("rejectUsers").style.display = "block"
                document.getElementById("deletedEvents").style.display = "block"
                document.getElementById("addMembers").style.display = "none"
                document.getElementById("updateProfile").style.display = "none"
                document.getElementById("addDetailsTab").style.display = "none"
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("superOnly1").style.display = "block"
                document.getElementById("superOnly2").style.display = "block"
                document.getElementById("superOnly3").style.display = "block"
                document.getElementById("addTravelDetails") !== null ? document.getElementById("addTravelDetails").style.display = "none" : ""
                document.getElementById("events").style.display = "block"
            }
            if(JSON.parse(localStorage.getItem("role")) === "admin"){
                document.getElementById("events").style.display = "block"
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("showMembers").style.display = "none"
                document.getElementById("addMembers").style.display = "none"
                document.getElementById("addDetailsTab").style.display = "none"
                document.getElementById("addTravelDetails") !== null ? document.getElementById("addTravelDetails").style.display = "none" : ""
                
            }
            if(JSON.parse(localStorage.getItem("role")) === "member" ){
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("addEvent").style.display = "none"
                document.getElementById("events").style.display = "block"
                document.getElementById("addMembers").style.display = "none"
                document.getElementById("showTravel").style.display = "none"
                document.getElementById("history").style.display = "block"
            }
            if(JSON.parse(localStorage.getItem("role")) === "head"){
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("addEvent").style.display = "none"
                document.getElementById("events").style.display = "block"
                document.getElementById("showTravel").style.display = "none"
                document.getElementById("history").style.display = "block"
            }
            if (token) {
                try {
                    // Parse the JWT to extract the fullName property
                    const name = parseJwt(token);
                    // Update the "username" element with the fullName
                    const usernameElement = document.getElementById("brand");
                    usernameElement.innerText = name.fullName === undefined ? "Admin":name.fullName;
                } catch (error) {
                    console.error("Error parsing JWT:", error);
                }
            }
            let email = parseJwt(localStorage.getItem("data")).email
            document.getElementById("userPic").src = `http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/${email}.jpg`
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();
