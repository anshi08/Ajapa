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

    //Validations
    if(age.trim() === ''){
        displayError("Enter Age");
        return;
    }

    const phoneRegex = /^\d{10}$/;
    if(mobile_num.trim() === ''){
        clearDisplayError()
        displayError("Mobile number is required");
        return;
    }else if (!phoneRegex.test(mobile_num)){
        clearDisplayError()
        displayError("Enter a valid 10-digit mobile number");
        return;
    }

    const num = /^\d{10}$/;
    if(whatsapp_num.trim() === ''){
        clearDisplayError()
        displayError("WhatsApp number is required");
        return;
    }else if (!num.test(whatsapp_num)){
        clearDisplayError()
        displayError("Enter a valid 10-digit WhatsApp number");
        return;
    }

    if(blood_grp.trim() === ''){
        clearDisplayError()
        displayError("Enter Blood Group");
        return;
    }

    if(diksha_dt.trim() === ''){
        clearDisplayError()
        displayError("Enter Diksha Date");
        return;
    }

    if(occupation.trim() === ''){
        clearDisplayError()
        displayError("Enter Occupation");
        return;
    }

    if(qualification.trim() === ''){
        clearDisplayError()
        displayError("Enter Qualification");
        return;
    }

    if(address_linep.trim() === ''){
        clearDisplayError()
        displayError("Enter Address");
        return;
    }

    if(state.trim() === ''){
        clearDisplayError()
        displayError("Enter State");
        return;
    }

    const pin = /^\d{6}$/;
    if(pincode.trim() === ''){
        clearDisplayError()
        displayError("PinCode is required");
        return;
    }else if(!pin.test(pincode)){
        clearDisplayError()
        displayError("Pincode should be a 6-digit number")
    }

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

function displayError(errorMessage) {
    const errorContainer = document.getElementById("errorContainer");
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger");
    errorDiv.textContent = errorMessage;
    errorContainer.appendChild(errorDiv);
}

function clearDisplayError(){
    // Clear previous error messages
    const errorContainer = document.getElementById("errorContainer");
    errorContainer.innerHTML = '';
}


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