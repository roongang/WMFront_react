import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import getPostImg from '../../components/post/getPostImg';


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
    const [imgBase64, setImgBase64] = useState(null);
    const [query, setQuery] = useState("react");
    
    useEffect(()=>{
      let completed = false;
      console.log('post-list 컴포넌트 화면에 나타남');
      
      if(!completed) {
        getImgFile(1)
        .then(result => onLoadFile(result))
      }      
      return () => {
        completed = true; //초기에 한번만 실행시키기 위한 플래그
        console.log('post-list 컴포넌트 화면에서 사라짐');
      }
    }, [query]);  //두번째 파라미터 배열이 비워져있으면 컴포넌트가 처음 나타날때만 실행됨

    const getImgFile = async id =>{
      try{
        const res = await getPostImg(id);
        ///여기부터 마저해야함
        setImg(res.data);
        console.log(res);
        console.log(img);
        return res.data;
      }catch(err){
        alert(err);
        return false;
      }
    }

    const onLoadFile = async e =>{
      var reader = new FileReader();
      reader.onloadend = () => {
        setImgBase64(reader.result)
      }
      console.log('load');
      console.log(e);
      reader.readAsBinaryString(e);
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