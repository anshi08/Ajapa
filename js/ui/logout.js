function loadContent() {
    fetch('logout.html')
        .then(response => response.text())
        .then(data => {
            // Assuming you have a div with id "content" in your HTML file
            document.getElementById('logoutModal').innerHTML = data;
            document.getElementById("logoutbtn").addEventListener("click",()=>{
              localStorage.clear()
              window.location.href="index.html"
            })
            
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

// Call the function to load the content
loadContent();

