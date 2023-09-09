function loadContent() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('customnavbar').innerHTML = data;

        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();
