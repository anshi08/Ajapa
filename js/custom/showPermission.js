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
        else if(this.debug)
        console.log('duplicate keys not allowed. key : '+_key)
        }
        hashMap.prototype.get = function (_key) {
            return this.hashDict[_key];
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
    console.log('res',res)
    let drpdwn = document.getElementById("dropdown")

 
    let n = new hashMap();
      await  res.forEach(item =>{
        n.put(item.eventId,item.eventName);
      })
    
      
    Object.keys(n.hashDict).forEach(item =>{
        let option = document.createElement("option")
        option.value = item 
        option.text = n.get(item)
        drpdwn.appendChild(option)
        
    })

    drpdwn.addEventListener("change",e =>{
        console.log(e.target.value)
       const newres =  res.filter(item => item.eventId === +e.target.value)
       document.getElementById("body").innerHTML = null
       newres.forEach(data => {
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
    })
    

})


function setSessionTimeout() {
    const timeoutInMilliseconds = 43200000; // 12 hours
  
    setTimeout(() => {
      alert('Your session has timed out. You are now logged out.');
      localStorage.clear();
      window.location.href = 'login.html';
    }, timeoutInMilliseconds);
  }
setSessionTimeout();


