import axios from 'axios';

// API Call
export default async function getPostList(param){
    try{
        const res = await axios.get(`/deal-posts/page?size=${param.size}&page=${param.page}&sort=${param.sort}`);
        return res;
    }catch(err){
        return err;
    }
};