import axios from 'axios';

// API Call
export default async function getPostImgAPI(id){
    try{
        const res = await fetch('/api/v1/deal-post-images/'+id);
        return res.body;
    }catch(err){
        console.log(err);
        return  err;
    }
}