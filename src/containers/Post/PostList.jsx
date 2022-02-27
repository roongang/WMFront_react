import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import ImageGallery from 'react-image-gallery';

import Loader from '../common/Loader';

import getPostImg from '../../components/post/getPostImg';
import getPostList from '../../components/post/getPostList';

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
    const [query, setQuery] = useState("react");    
    const navigation = useNavigate();
    //무한스크롤
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let page = 0;
    const itemNum = 8; // 한번에 호출할 개수

    useEffect(()=>{
      console.log(postList);
    },[postList]);

    // useEffect(()=>{
    //   let completed = false;
      
    //   if(!completed) {
    //     const result = getPost();
    //   }      
    //   return () => {
    //     completed = true; //초기에 한번만 실행시키기 위한 플래그
    //   }
    // }, [query]);  //두번째 파라미터 배열이 비워져있으면 컴포넌트가 처음 나타날때만 실행됨

    useEffect(()=>{
      let observer;
      if(target){
        observer = new IntersectionObserver(onIntersect,{
          threshold : 0.3,
        });
        observer.observe(target);
      }
      return () => observer && observer.disconnect();
    },[target]);

    const getPost = async e => {
      //호출 단계에 따라 condition 변경해줘야 함(pagination)
      try{
        console.log(itemNum,'------',page);
        const res = await getPostList({size:itemNum,page:page,sort:'pullingDate:desc'});
        console.log(res.data);
        if(res.status === 200 && res.data.data.content.length > 0) {
          setPostList((postList)=>postList.concat(res.data.data.content));
          page = page+1;
          return true;
        }else{
          console.log(res);
          return false;
        }
      }catch(e){
        console.log(e);
        return false;
      }
    }

    const handleClickPost = (postId,index) =>{
      console.log(postList[index])
      navigation(`/postView/${postId}`, {
        state:{
          post : postList[index]
        }
      });
    };

    const onIntersect = async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        await getMoreItem();
        observer.observe(entry.target);
      }
    };

    const getMoreItem = async () =>{
      setIsLoaded(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const result = await getPost();
      console.log(result,target);
      if(!result){
        //더 이상 게시글이 없으면 load stop
      }  
      setIsLoaded(false);    
    }

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
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
              <div ref={setTarget} className="Target-Element">
                {isLoaded && <Loader />}
              </div>
              </div>
            </div>
            </div>                
        </div>
    )
}