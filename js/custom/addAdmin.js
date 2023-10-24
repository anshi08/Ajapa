

btn.addEventListener("submit",(e)=>{
   e.preventDefault();
//Getting Id of user
let identifier = document.getElementById("id").value
let password = document.getElementById("password").value

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{10}$/;

function areAllCharactersNumbers(inputString) {
    // Use a regular expression to check if all characters are numbers
    return /^\d+$/.test(inputString);
}

if(identifier.length===0 || password.length===0){
    alert("Please Enter the Id/Email or Password")
}else if(areAllCharactersNumbers(identifier)){
    if (!phoneRegex.test(identifier)) {
        alert('Please Enter a Valid Phone number')
    }else{
        addAdmin(identifier.password);
    }
}else if(!emailPattern.test(identifier)){
    alert("Please Enter a Valid Email Address")
}else{
   addAdmin(identifier,password);
}
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
    console.log("oo",response)
    // $('#pendingDialog1000').modal('show');
    // setTimeout(()=>{
    //     window.location.href = "addAdmin.html"
    // },2000)
    return response;

}
function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()