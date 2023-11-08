
let btn = document.getElementById("btn")

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// let email = "Bearer " + JSON.parse(localStorage.getItem("data"))
// console.log(email)

// let email = parseJwt(localStorage.getItem("data")).email
// console.log(email)

// let role = localStorage.getItem("role").replaceAll("/","")
// console.log(role)

btn.addEventListener("submit", (e)=>{
    e.preventDefault();
    let pw = document.getElementById("password").value
    let repwd = document.getElementById("repwd").value

    resetPassword(pw)
})

async function resetPassword(pw){
    const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changePassword`,{
        method:"POST",
        headers:{
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("data")),
            "Content-type":"application/json;  charset=UTF-8"
        },
        body:JSON.stringify({password:pw})
    })

    const res = await response.json()
    console.log("k",res)
}

function validate() {
    let rp = document.getElementById("repwd").value;
    let pwd = document.getElementById("password").value;
    let pwdErr = document.getElementById("pwdErr");
    let submitBtn = document.getElementById("update");

    if (rp !== pwd) {
        pwdErr.style.display = "block";
        pwdErr.focus();
        submitBtn.disabled = true;
    } else {
        pwdErr.style.display = "none";
        submitBtn.disabled = false;
    }
}