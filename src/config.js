let API_URL; 

if(process.env["NODE_ENV"]==="development"){
    API_URL = 'http://localhost:3000'
} else {
    API_URL = "https://issuehandlrapi.herokuapp.com"
}

export default API_URL
