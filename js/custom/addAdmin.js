

btn.addEventListener("submit",(e)=>{
   e.preventDefault();
//Getting Id of user
let identifier = document.getElementById("id").value
let password = document.getElementById("password").value

const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const phoneRegex = /^\d{10}$/;


// let isEmail = true;
let isPhone = true;

// if (emailPattern.test(identifier)) {
//     isEmail = false;
// //     // console.log("email",isEmail)
// } 

if (phoneRegex.test(identifier)) {
    isPhone = false;
    // console.log("phone",isPhone)
}

// if (isEmail) {
//     alert("Not Valid Email Address");
// } 
else if (isPhone) {
    alert("Not Valid Mobile Number");
}else{
    alert("hii")
}



// if (!emailPattern.test(identifier)) {
//     alert("Enter Proper Email Address");
//     return;
// } 

// else if (!phoneRegex.test(identifier)) {
//     alert("Enter Valid Mobile Number");
//     return;
// }
//  else{
//    addAdmin(identifier,password);
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