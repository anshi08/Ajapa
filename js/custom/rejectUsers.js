async function rejectedUsers(){
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getRejectedUsers',{
        method:"GET"
    })
    const response = await res.json()
    console.log("data",response)
    response.reverse()

    document.getElementById("body").innerHTML = null
    response.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.fullName}</td>
        <td>${data.email}</td>
        <td>${data.mobileNum}</td>
        <td>${data.dob}</td>
        <td>${data.country.split(":")[1]}</td>
        <td>${data.state.split(":")[1]}</td>
        <td>${data.city.split(":")[1]}</td>
         `
        document.getElementById("body").appendChild(tr)
})
}

rejectedUsers()