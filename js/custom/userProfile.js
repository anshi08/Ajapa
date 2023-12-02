async function getUserById(id){
    const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getUserById'+id,{
    // const response = await fetch("http://192.168.29.217:8080/getUserById/"+id,{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()

    return res;
}

window.addEventListener("DOMContentLoaded",async() =>{
  
    let id =window.location.search.toString().split("=")[1]

    const res = await getUserById(id)
    document.getElementById("body").innerHTML = null
    let tr= document.createElement("tr")
    tr.innerHTML = `
    <td>${res.fullName}</td>
    <td>${res.email}</td>
    <td>${res.mobileNum}</td>
    <td>${res.age}</td>
    <td>${res.country.split(":")[1]}</td>
    <td>${res.state.split(":")[1]}</td>
    <td>${res.city.split(":")[1]}</td>

    `
    document.getElementById("body").appendChild(tr)

    document.getElementById("userpic").src = 'http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/'+res.email
})