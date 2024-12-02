import axios from "axios";

async function postApi(endpoint, data) {


    const response = await axios.post(`http://localhost:5000/${endpoint}`, data, { withCredentials: true });
    return response;


}

async function getApi (endpoint){
    const response = await axios.get(`http://localhost:5000/${endpoint}`,{withCredentials:true});
    // console.log(response)
    return response;
}

export  {postApi,getApi}
