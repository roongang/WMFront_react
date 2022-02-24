import React from 'react';
import axios from 'axios';

import deleteCookie from '../common/deleteCookie';
// API Call
async function logoutCall(){
    try{
        sessionStorage.setItem('isAuth',false);
        const res = await axios.post('/api/v1/signout',{
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        window.location.href = "/";    
    }catch(e){
        window.location.href = "/";    
        console.log(e);
        return false;
    }
    
    return true;
}


export default async function logout(){
    const result = await logoutCall();
    
    return(
        <div>logout</div>
    )
}
