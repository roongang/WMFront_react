import axios from 'axios';

// API Call
async function getImgId(id){
    try{
        const res = await axios.get('/api/v1/deal-post-images/'+id)
        return res;
    }catch(err){
        console.log(err);
        return  err;
    }
}

export default async function getPostImg(id){
    return await getImgId(id);
}