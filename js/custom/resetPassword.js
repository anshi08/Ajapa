
let btn = document.getElementById("btn")

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

btn.addEventListener("submit", (e)=>{
    e.preventDefault();
    let password = document.getElementById("password").value
    let repwd = document.getElementById("repwd").value

    resetPassword(password)
})


async function resetPassword(password){
        const response = await fetch(`http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/changePassword?password=${password}`,{
        method:"POST",
        headers:{
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("data")),
            "Content-type":"application/json;  charset=UTF-8"
        }
    })

    const res = await response.text()
    console.log("k",res)
    if(res === 'Your password has been changed'){
        document.getElementById("password").value='';
        document.getElementById("repwd").value='';
        $('#ForgetPassword').modal('show');
        setTimeout(()=>{
            window.location.href = "dashboard.html"
        },2000)
    }
   
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