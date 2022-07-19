import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import ImageGallery from 'react-image-gallery';

import Loader from '../common/Loader';

import getPostImgAPI from '../../components/post/getPostImgAPI';
import getPostListAPI from '../../components/post/getPostListAPI';
import imgLoader from '../../components/common/imgLoader';

import '../../../public/css/styles.css';

const AppWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  .Target-Element {
    width: 100vw;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;

export default function PostList(){
    //TODO : 이미지 호출은 백엔드서버에서 수정한 다음에 하기
    const [imgBase64, setImgBase64] = useState(null);
    const [condition, setCondition] = useState({size : 10, page : 0, sort : 'pullingDate:desc'});
    const [postList, setPostList] = useState([]);
    const [postImgList, setPostImgList] = useState([]);
    const [query, setQuery] = useState("react");    
    const navigation = useNavigate();
    let page = 0;
    const itemNum = 6; // 한번에 호출할 개수
    const offset = (page)*itemNum;

    useEffect(()=>{
      const result = getPost();
      
      console.log("getPostImgList=",postImgList);
    },[]);

    const getPost = async e => {
      //호출 단계에 따라 condition 변경해줘야 함(pagination)
      try{
        console.log(itemNum,'------',page);
        const res = await getPostListAPI({size:itemNum,page:page,sort:'pullingDate:desc'});
        if(res.status === 200 && res.data.data.content.length > 0) {
          setPostList((postList)=>postList.concat(res.data.data.content));
          page = page+1;
          await getPostImgList(res.data.data.content);
          return true;
        }else if(res.status===200 && res.data.data.content.length==0){
          //저장된 게시글이 없음
          return false;
        }else{
          //백엔드 서버 오류 의심
          return false;
        }
      }catch(e){
        console.log(e);
        return false;
      }
    }

    const getPostImgList = async postList => {
      postList.map(async(post,index) =>{
        // 대표이미지 1개만 가져오기
        const res = await getPostImgAPI(post.imagesId[0]);
        const url = await imgLoader(res);
        setPostImgList((postImgList)=>postImgList.concat(url));
      })
    }

    const handleClickPost = (postId,index) =>{
      console.log(postList[index])
      navigation(`/postView/${postId}`, {
        state:{
          post : postList[index]
        }
      });
    };
    
    return (
        <div>
            <h1>판매글 목록</h1>
            {/* <ImageGallery items={images} />; */}
            <div className = "post-list">
            <div className="container px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {postList === null ?
                <tr><td>불러오는 중</td></tr>
                : postList.map((post,index)=>(
                  <div className="col mb-5" key={index}>
                    <div className="card h-100">
                      <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>{post.dealState}</div>
                      {/* <!-- Product image--> */}
                      <img className="card-img-top" src={postImgList[index]} alt="..." />
                      {/* <!-- Product details--> */}
                      <div className="card-body p-4">
                        <div className="text-center">
                          <h5 className="fw-bolder" onClick={()=> handleClickPost(post.id,index)}>{post.title}</h5>
                          {post.price}<br />
                           {post.userId}<br />
                          {post.category}<br />
                        </div>
                      </div>
                      {/* <!-- Product actions--> */}
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">관심</a></div>
                      </div>
                    </div>
                  </div>
                  )
                )
              }
              </div>
            </div>
            </div>                
        </div>
    )
}