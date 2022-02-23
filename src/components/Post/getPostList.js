import axios from 'axios';

// API Call
export default async function getPostList({size=5,page=0,sort='pullingDate:desc'}){
    try{
        const res = await axios.get(`/api/v1/deal-posts/page?size=${size}&page=${page}&sort=${sort}`);
        return res;
    }catch(err){
        console.log(err);
        return false;
    }
}
