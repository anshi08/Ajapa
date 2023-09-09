let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click",() =>{

    let name = getElementByIdName("name");
    let gender = document.getElementById("gender").value;
    let dob = getElementByIdName("dob");
    let email = getElementByIdName("email");
    let pw = getElementByIdName("pw");
    let country = getElementByIdName("country");
    let city = getElementByIdName("city");
    const data = {
        full_name: name,
        gender: gender,
        dob: dob, 
        email: email,
        password:pw,
        country: country,
        city: city,
    }
    signup(data);
})


async function signup(data){
    const response = await fetch('http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/signup',{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log(res)
    return res;
}