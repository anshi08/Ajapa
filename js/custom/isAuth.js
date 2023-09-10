function checkAuthenticated(){
    if(localStorage.getItem("data") === '' ||localStorage.getItem("data") === null){
        window.location.href = 'login.html'
    }


}

checkAuthenticated()