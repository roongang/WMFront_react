import axios from 'axios';

export default async function getPostImgIdAPI(id){
    try{
        const res = await axios.get(`/api/v1/deal-posts/${id}/images`);
        return res.data.data;
    }catch(err){
        console.log(err);
        return false;
    }
}