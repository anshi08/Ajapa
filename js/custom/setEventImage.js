// let btn = document.getElementById("btn")

function getElementByIdName(idName){
    return document.getElementById(idName).value
}

btn.addEventListener("click",() =>{

      const fileInput = document.getElementById("file");
      const form = new FormData();
      form.append("event_id",10)
      form.append("file",fileInput.files[0])
      setEventImg(form)
})

 const setEventImg = async (formData) => {

    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/saveEventD",{
        method:"POST",
        body:formData,
    })
    const res = await response.json()
    console.log("RES",res)
    return res;
}