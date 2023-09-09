let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click",() => {
    let email = getElementByIdName("email")
    let pwd = getElementByIdName("pwd")
    const data = {
         email:email,
         password:pwd
    }
    signin(data);
    
})

async function signin(data) {
        // let data = JSON.stringify({email,password})
        const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json;  charset=UTF-8"
            }
        })
        const res = await response.json()
        console.log("res",res)
        localStorage.setItem("data",JSON.stringify(res.token))
        console.log("login",res)
}