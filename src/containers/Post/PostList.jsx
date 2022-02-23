import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import getPostImg from '../../components/post/getPostImg';
import getPostList from '../../components/post/getPostList';

import '../../../public/css/style.css';

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
    
    useEffect(()=>{
      let completed = false;
      console.log('post-list 컴포넌트 화면에 나타남');
      
      if(!completed) {
        const result = getPost();
      }      
      return () => {
        completed = true; //초기에 한번만 실행시키기 위한 플래그
        console.log('post-list 컴포넌트 화면에서 사라짐');
      }
    }, [query]);  //두번째 파라미터 배열이 비워져있으면 컴포넌트가 처음 나타날때만 실행됨

    //TODO : 스타일 변경
    const postItem = (posts) => posts.map((post)=>(
        <div className="col mb-5"  key={post.id}>
          <div className="card h-100">
          <p>{post.title}</p>
          <p>{post.userId}</p>
          <p>{post.catagory}</p>
          <p>{post.content}</p>
          <p>{post.dealState}</p>
          <p>{post.imageIds}</p>
          </div>
        </div>
      )
    );

    const getPost = async e => {
      //호출 단계에 따라 condition 변경해줘야 함
      const res = await getPostList(condition);
      try{
        console.log(res.data);
        if(res.status === 200 && res.data.data.content.length > 0) {
          setPostList(postItem(res.data.data.content));
        }else{
          console.log(res);
          return false;
        }
      }catch(e){
        console.log(e);
      }
    }

    return (
        <div>
            <h1>판매글 목록</h1>
            {/* <ImageGallery items={images} />; */}
            <p>
              <img src={img}></img>
            </p>
            <div className = "post-list">
              {postList}
            </div>
        </div>
    )
}