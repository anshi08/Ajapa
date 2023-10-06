

btn.addEventListener("submit",(e)=>{
   e.preventDefault();
//Getting Id of user
let identifier = document.getElementById("id").value
let password = document.getElementById("password").value
const identifierPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{10}$/;
//     console.log(phoneRegex.test(identifier))
// if(!identifierPattern.test(identifier)){
//    alert("Enter Proper Email Address");
// //    return;
// }
// else if(!phoneRegex.test(identifier)){
//     alert("Enter Valid Mobile Number")
//     return;
// }else{
//    addAdmin(identifier,password);
// }
let str = ""
if(!identifierPattern.test(identifier)){
    str = "Please Enter the Valid Email Address"
}else if(!phoneRegex.test(identifier)){
    str = "Please Enter the Phone Number"
}
alert(str)
    // if(str.length==0){
    //     alert(str)
    // }else{
    //     addAdmin(identifier,password)
    // }


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