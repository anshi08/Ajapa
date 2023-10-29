// Create a new spinner
const target = document.getElementById('spinner-container');
const s = new Spinner().spin(target);

let hashMap=function(){
    this.hashDict={};//dictionary
    this.size=0;
    this.debug=true;
    return this;
    }

    hashMap.prototype.put=function(_key,_value){
        if (!this.hashDict.hasOwnProperty(_key)) {
        this.hashDict[_key] = _value;
        ++this.size;
        }
        // else if(this.debug)
        // // throw 'duplicate keys not allowed. key : '+_key;
        }

async function showPermission(){
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getAllEventsWitPermissions")
    const res = await response.json()
    res.forEach(data => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${data.eventName}</td>
        <td>${data.adminId}</td>
        <td>${data.canModify}</td>
        <td>${data.canDelete}</td>
        `
        document.getElementById("body").appendChild(tr)
           // To stop the spinner
           s.stop(); 
      
    })
    return res
}

window.addEventListener("DOMContentLoaded",async()=>{
    const res =   await showPermission()
    console.log("🚀 ~ file: showPermission.js:27 ~ window.addEventListener ~ res:", res)
    let drpdwn = document.getElementById("dropdown")
    const arrySet = []
 
    let n = new hashMap();
      await  res.forEach(item =>{

       
        n.put(item.eventId,item.eventName);
      })

    console.log(n)
    

})

function checkSessionExpireOrNot(){
    setTimeout(()=>{
        localStorage.clear()
        window.location.reload()
    },43200000)
}
checkSessionExpireOrNot()


