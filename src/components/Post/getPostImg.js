import axios from 'axios';

// API Call
export default async function getPostImg(id){
    try{
        const res = await axios.get('/api/v1/deal-post-images/'+id)
        return res;
    }catch(err){
        console.log(err);
        return  err;
    }
}