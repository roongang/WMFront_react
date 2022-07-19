import React, { useState, useEffect } from 'react';
import {useParams, useLocation} from 'react-router';
import {useNavigate} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';

import getPostImgAPI from '../../components/post/getPostImgAPI';
import getPostAPI from '../../components/post/getPostAPI';
import getPostImgIdAPI from '../../components/post/getPostImgIdAPI';
import imgLoader from '../../components/common/imgLoader';

import '../../../public/css/styles.css';

export default function PostView(){

  const postId = useParams().no;
  const [post, setPost] = useState(useLocation().state.post);
  const [postImgs, setPostImgs] = useState([]);

  useEffect(()=>{
    if(post === undefined || post === null){
      //글쓰기 후 redirect 된 경우
      getPost();
    }
    getPostImgs(post.id);
  },[postId]);

  const getPost = async e => {
    try{
      const res = await getPostAPI(postId);
      if(res.status === 200){
        setPost(res.data.data);
      }
    }catch(e){
      alert("게시물이 없습니다");
      console.log(e);
      return false;
    }
    
  }

  const getPostImgs = async postId =>{
    const idList = await getPostImgIdAPI(postId);
    idList.map(async(item)=>{
      const res = await getPostImgAPI(item.id);
      const url = await imgLoader(res);
      setPostImgs((postImgs)=>postImgs.concat(url));
    })
  }

    return (
        <div>
            <h1>판매글 상세보기</h1>
            <div className = "post-list">
            <div className="col mb-5">
            {post === null? 
              <div>로딩 중</div> : 
              <div className="card h-100">
                {postImgs.map((url,index)=>(
                  <img src={url} width='300px' height='400px' alt="..."/>
                ))}
                <p>제목 : {post.title}</p>
                <p>유저아이디 : {post.userId}</p>
                <p>카테고리 : {post.category}</p>
                <p>컨텐츠 : {post.content}</p>
                <p>상태 : {post.dealState}</p>
              </div>
            }    
            </div> 
            </div>
        </div>
    )
}