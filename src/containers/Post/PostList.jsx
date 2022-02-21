import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import getPostImg from '../../components/post/getPostImg';
import getPostList from '../../components/post/getPostList';

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
    const [img, setImg] = useState(null);
    const [imgBase64, setImgBase64] = useState([]);
    const [imgPreview, setImgPreview] = useState(null);
    const [query, setQuery] = useState("react");

    const imgItem = () => imgBase64.map((file,index)=>(
      <div key={index}>
                    <div>
                        <img className="img-preview" src={file} width='300px' height='300px'></img>
                    </div>
                    <div>
                        <button id={index}>X</button>
                    </div>
                </div>
    ))

    useEffect(()=>{
      let completed = false;
      console.log('post-list 컴포넌트 화면에 나타남');
      
      if(!completed) {
        const res = getPost({size:3,page:0,sort:'pullingDate:desc'});
        console(res);
        // getImgFile(1).then((res)=>{
        //   if(res !== false){
        //     onLoadFile(res);
        //   }
        // });
      }      
      return () => {
        completed = true; //초기에 한번만 실행시키기 위한 플래그
        console.log('post-list 컴포넌트 화면에서 사라짐');
      }
    }, [query]);  //두번째 파라미터 배열이 비워져있으면 컴포넌트가 처음 나타날때만 실행됨

    const getPost = async param => {
      const res = await getPostList(param);
      try{
       console.log(res);
       
        return res;
      }catch(e){
        console.log(e);
        
        return false;
      }
    }

    const getImgFile = async id =>{
      const res = await getPostImg(id);
      try{
        setImg(res.data);
        console.log('getImgFile');
        return res.data;
      }catch(err){
        alert(err);
        return false;
      }
    }

    const onLoadFile = async res =>{
      //var reader = new FileReader();
      // reader.onloadend = () => {
      //   setImgBase64(imgBase64=>[...imgBase64,`data:image/png;base64,${reader.result}`]);
      //   setImgPreview(imgItem());
      //   console.log(imgPreview);
      // }
      // console.log('onLoadFile');
      // if(res){
      //   reader.readAsBinaryString(res);  // null이 아닐 때
      // }
      console.log('이미지는 나중에 하자');
    }

    return (
        <div>
            <h1>판매글 목록</h1>
            {/* <ImageGallery items={images} />; */}
            <p>
              <img src={img}></img>
            </p>
        </div>
    )
}