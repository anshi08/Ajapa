// let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("submit", () => {

    const formData = {
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

    const form = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const value = formData[key];
          
          if (key === 'file') {
  
            const fileInput = document.getElementById('file');
            form.append(key, fileInput.files[0]);
          } else {
            
            form.append(key, value);
          }
        }
      }
     userPic(form)
})

    const userPic = async (form) =>{
      try {
    const response = await fetch ("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveImage" ,{
        method:"POST",
        body:form,
        headers:{
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("data")) 
        }
    })
    const res = await response.json()
    console.log("done",res)
}catch(error){
    console.log("Error", error)
}}