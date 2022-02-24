import React, { useState, useEffect } from 'react';
import {useParams, useLocation} from 'react-router';
import {useNavigate} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';

import getPostImg from '../../components/post/getPostImg';
import getPostAPI from '../../components/post/getPostAPI';

import '../../../public/css/styles.css';

export default function PostView(){

  const postId = useParams().no;
  const [post, setPost] = useState(useLocation().state.post);

  useEffect(()=>{
    if(post === undefined || post === null){
      //글쓰기 후 redirect 된 경우
      getPost();
    }
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

    return (
        <div>
            <h1>판매글 상세보기</h1>
            <div className = "post-list">
            <div className="col mb-5">
            {post === null? 
              <div>로딩 중</div> : 
              <div className="card h-100">
                <p>제목 : {post.title}</p>
                <p>유저아이디 : {post.userId}</p>
                <p>카테고리 : {post.category}</p>
                <p>컨텐츠 : {post.content}</p>
                <p>상태 : {post.dealState}</p>
                <p>이미지 : {post.imageIds}</p>
              </div>
            }    
            </div> 
            </div>
        </div>
    )
}