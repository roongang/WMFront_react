import axios from 'axios';

// API Call
export default async function getPostAPI(id){
    try{
        const res = await axios.get(`/api/v1/deal-posts/${id}`);
        return res;
    }catch(err){
        console.log(err);
        return false;
    }
}
