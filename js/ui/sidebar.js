function loadContent() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('accordionSidebar').innerHTML = data;
            if(JSON.parse(localStorage.getItem("role")) === "super"){
                console.log("SSS");
                document.getElementById("rejectUsers").style.display = "block"
                document.getElementById("deletedEvents").style.display = "block"
                document.getElementById("addMembers").style.display = "none"
                document.getElementById("updateProfile").style.display = "none"
                document.getElementById("addDetailsTab").style.display = "none"
                document.getElementById("superOnly").style.display = "block"
                document.getElementById("addTravelDetails").style.display = "none"
                document.getElementById("events").style.display = "block"
                // document.getElementById("addMembers").style.display = "none"

            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();
