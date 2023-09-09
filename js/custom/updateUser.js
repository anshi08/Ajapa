let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click", () => {

    let age = getElementByIdName("age")
    let mobile_num = getElementByIdName("mobile_num")
    let whatsapp_num = getElementByIdName("whatsapp_num")
    let blood_grp = getElementByIdName("blood_grp")
    let diksha_dt = getElementByIdName("diksha_dt")
    let occupation = getElementByIdName("occupation")
    let file = getElementByIdName("file")
    let qualification = getElementByIdName("qualification")
    let address_linep = getElementByIdName("address_linep")
    let state = getElementByIdName("state")
    let pincode = getElementByIdName("pincode")

    const data = {
        age: age,
        mobile_num: mobile_num,
        whatsapp_num: whatsapp_num,
        blood_grp: blood_grp,
        diksha_dt: diksha_dt,
        occupation: occupation,
        file: file,
        qualification: qualification,
        address_linep: address_linep,
        state: state,
        pincode: pincode
    }
    updateProfile(data)
})

async function updateProfile(data) {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/updateUser",{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")),
                "Content-type":"application/json;  charset=UTF-8"
            }
        })
        const res = await response.json()
        console.log("update",res)
        // return res;
}