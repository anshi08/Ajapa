
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
                document.getElementById("addPermission").style.display = "block"
                document.getElementById("showPermission").style.display = "block"
                document.getElementById("addAdmins").style.display = "block"
                document.getElementById("showAdmins").style.display = "block"
                document.getElementById("rejectUsers").style.display = "block"
                document.getElementById("deletedEvents").style.display = "block"
                document.getElementById("addMembers").style.display = "none"
                document.getElementById("updateProfile").style.display = "none"
                document.getElementById("addDetailsTab").style.display = "none"
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("addTravelDetails") !== null ? document.getElementById("addTravelDetails").style.display = "none" : ""
                document.getElementById("events").style.display = "block"
            }
            if(JSON.parse(localStorage.getItem("role")) === "admin"){
                document.getElementById("events").style.display = "block"
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("pendingrequest").style.display = "none"
                document.getElementById("showMembers").style.display = "none"
                document.getElementById("addPermission").style.display = "none"
                document.getElementById("showPermission").style.display = "none"
                document.getElementById("addAdmins").style.display = "none"
                document.getElementById("showAdmins").style.display = "none"
                document.getElementById("rejectUsers").style.display = "none"
                document.getElementById("deletedEvents").style.display = "none"
                document.getElementById("addMembers").style.display = "none"
                // document.getElementById("updateProfile").style.display = "none"
                document.getElementById("addDetailsTab").style.display = "none"
                document.getElementById("addTravelDetails") !== null ? document.getElementById("addTravelDetails").style.display = "none" : ""
                
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
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();
