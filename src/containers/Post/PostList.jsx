import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import ImageGallery from 'react-image-gallery';

import getPostImg from '../../components/post/getPostImg';
import getPostList from '../../components/post/getPostList';

import '../../../public/css/styles.css';

export default function PostList(){
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
          },
          {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
          },
          {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
          },
    ];
    //TODO : 이미지 호출은 백엔드서버에서 수정한 다음에 하기
    const [img, setImg] = useState(null);
    const [imgBase64, setImgBase64] = useState(null);
    const [condition, setCondition] = useState({size : 10, page : 0, sort : 'pullingDate:desc'});
    const [postList, setPostList] = useState(null);
    const [query, setQuery] = useState("react");    
    const navigation = useNavigate();

    useEffect(()=>{
      let completed = false;
      
      if(!completed) {
        const result = getPost();
      }      
      return () => {
        completed = true; //초기에 한번만 실행시키기 위한 플래그
      }
    }, [query]);  //두번째 파라미터 배열이 비워져있으면 컴포넌트가 처음 나타날때만 실행됨

    const getPost = async e => {
      //호출 단계에 따라 condition 변경해줘야 함(pagination)
      try{
        const res = await getPostList(condition);
        console.log(res.data);
        if(res.status === 200 && res.data.data.content.length > 0) {
          setPostList(res.data.data.content);
        }else{
          console.log(res);
          return false;
        }
      }catch(e){
        console.log(e);
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

    return (
        <div>
            <h1>판매글 목록</h1>
            {/* <ImageGallery items={images} />; */}
            <p>
              <img src={img}></img>
            </p>
            <div className = "post-list">
              <table>
              <tbody>
              {postList === null ?
                <tr><td>불러오는 중</td></tr>
                : postList.map((post,index)=>(
                    <tr key={index} >
                      <td onClick={()=> handleClickPost(post.id,index)}>
                        제목 : {post.title}
                      </td>
                      <td>유저아이디 : {post.userId}</td>
                      <td>카테고리 : {post.category}</td>
                      <td>컨텐츠 : {post.content}</td>
                      <td>상태 : {post.dealState}</td>
                      <td>이미지 : {post.imageIds}</td>
                    </tr>
                  )
                )
              }
              </tbody>
              </table>
            </div>
        </div>
    )
}