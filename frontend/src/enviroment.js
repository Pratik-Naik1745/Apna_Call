
let IS_PROD=true;

const servers=IS_PROD ?
"https://apna-video-call-p7s8.onrender.com":
    "http://localhost:8000";



export default servers;