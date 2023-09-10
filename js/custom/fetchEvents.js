async  function fetchDetails(){
    let id = window.location.href.split("?")[1].split("=")[1]
    const res = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/fetchEvent/'+id)
    const response = await res.json()
    console.log(response)
    document.getElementById('event_name').value = response.event_name;
    document.getElementById('event_type').value = response.event_type;
    document.getElementById('event_location').value = response.event_location;
    document.getElementById('start_date').value = response.start_date;
    document.getElementById('end_date').value = response.end_date;
    document.getElementById('listed_by').value = response.listed_by;
   
}



fetchDetails()


 async function getEmail (){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getEmail",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+JSON.parse(localStorage.getItem("data"))
        }
    })
    const res = await response.json()
    console.log("jjjj",res.Email)
    document.getElementById("event_pic").src = 'http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/images/'+res.Email+".jpg"
}

getEmail()
