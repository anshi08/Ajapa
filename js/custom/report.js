async function getCountry() {
    const response = await fetch("http://54.198.229.134:8080/Ajapa_webservice-0.0.1-SNAPSHOT/getTravelReportDateWise/103",{
        method: "GET",
        headers: {
            "Content-type":"application/json;  charset=UTF-8"
        }
    })
    const res = await response.json()
    console.log(res)
}
getCountry()