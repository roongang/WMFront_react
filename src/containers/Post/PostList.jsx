import React, { Component, useState } from 'react';
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
    
    window.onload = function(){
      console.log("window.onload");
      const file = getImgFile();
      console.log(file);
    }

    const getImgFile = async e => {
      e.preventDefault();
      const res = await getPostImg(6);
      console.log('getImg');
      // try{
      //   console.log(res);
      //   return res;
      // }catch(err){
      //   console.log(err);
      //   return null;
      // }
    }

    return (
        <div>
            <h1>판매글 목록</h1>
            <ImageGallery items={images} />;
        </div>
    )
}