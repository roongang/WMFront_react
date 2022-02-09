import axios from 'axios';

// API Call
async function getPostImg(id){
    try{
        const url = '/api/v1/deal-post-images/'+id
        console.log(url);
        const res = await axios.get(url)
        return res;
    }catch(err){
        console.log(err);
        return  err;
    }
}

export default async function getPostImg(){
    return await getPostImg();
}