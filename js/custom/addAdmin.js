

btn.addEventListener("submit",(e)=>{
   e.preventDefault();
//Getting Id of user
let identifier = document.getElementById("id").value
let password = document.getElementById("password").value
   addAdmin(identifier,password);
})

async function addAdmin(identifier,password){
    const res = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/adminSignup`,{
        method:"POST",
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body:JSON.stringify({identifier:identifier,password:password})
    })
    const response = await res.text()
    $('#pendingDialog1000').modal('show');
    setTimeout(()=>{
        window.location.href = "addAdmin.html"
    },2000)
    return response;

}