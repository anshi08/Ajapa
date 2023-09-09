function loadContent() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('accordionSidebar').innerHTML = data;

        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();
