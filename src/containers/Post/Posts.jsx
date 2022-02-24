import React, { useState,useEffect } from 'react';
import {useParams, useLocation} from 'react-router';
import { Button, TextField,MenuItem, Box,Input, IconButton} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';

import { getCategory } from "../../data/categories";
import savePost from "../../components/post/savePost";
import {getConfRex} from "../../components/common/confRex.jsx";
import deleteCookie from '../../components/common/deleteCookie';

import '../../index.css';

export default function Posts(){
    const [category, setCategory] = useState('A');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');
    const [imgFile, setImgFile] = useState([]);
    const [imgBase64, setImgBase64] = useState([]);
    const [price_error] = useState("숫자 입력");

    const categories = getCategory();
    const navigation = useNavigate();

    useEffect(()=>{
        //state가 바뀔때마다 호출되다보니, state를 사용하기 어려워짐
        //preview();
        
    });

    const deleteImg = e => {
        if(confirm("사진을 삭제?")){            
            //state를 직접 변경하지 않고(불변성을 지키기위해) 복사본을 만들어서 사용
            var temp1 = [...imgBase64];
            var temp2 = [...imgFile];

            temp1.splice(e,1);
            temp2.splice(e,1);

            setImgFile(temp2);
            setImgBase64(temp1);
        }else{
            return;
        }
    }

    const onLoadFile = async e =>{
        const file = e.target.files;
        setImgFile(imgFile => [...imgFile, e.target.files]);

        var reader = new FileReader();
        reader.onloadend= ()=>{
            const base64 = reader.result;
            setImgBase64(imgBase64=>[...imgBase64,reader.result]);
        }

        reader.onerror = () =>{
            alert("업로드 실패\n\n"+reader.error);
        }
        
        reader.readAsDataURL(file[0]);
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        console.log(imgFile);
        const res = await savePost({
            category,
            title,
            price,
            content,
            imgFile
        });
        try{
            console.log(res);
            if(res.status === 200 || res.status === 201){
                alert("게시글 등록 성공");

                //To-Do : 해당 게시글로 이동하기
                console.log(res.data.data.id);
                navigation(`/postView/${res.data.data.id}`,{
                    state:{
                        post : null
                    }
                });
            }else if(res.status === 400 && res.code==="U006"){
                //만료된 세션아이디인 경우 삭제
                sessionStorage.setItem('isAuth',false);
                alert(res.message);
                window.location.href = 'signin'
            }else{
                alert(res.message);
                console.log(res.message);
            }
        }catch(e){
            alert("작성 내용을 확인해주세요");
            console.log(e);
        }

    }

    return (
        <div>
            <h1>중고거래 글쓰기</h1>
                <div className = "custom-img">
                    <strong>업로드된 이미지</strong>
                    
                    <div className="grid-scroll-wrap">
                    {imgBase64.length === 0 ?
                        <div className="img-box"  style={{"backgroundColor": "#efefef","width":"300px", "height" : "300px"}}></div>
                        : imgBase64.map((file, index)=>(
                            <div key={index}>
                                <div>
                                    <img className="img-preview" src={file} width='300px' height='300px'></img>
                                </div>
                                <div>
                                    <button id={index} onClick={e => deleteImg(e.target.id)}>X</button>
                                </div>
                            </div>
                            )
                        )
                    }                            
                    </div>
            </div>
            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
            <div>
                <label htmlFor="icon-button-file">
                    {/* 현재는 동일 사진을 중복해서 올리면 인식 못함. onChange */}
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onLoadFile}/> 
                    <IconButton color="primary" aria-label="upload picture" component="span" />
                </label>
            </div>
            <div>
                <TextField
                    id="standard-required"
                    label="제목"
                    margin="normal"
                    onChange={e => setTitle(e.target.value)}
                    variant="standard"
                    />
            </div>
            <div>
                <TextField
                    id="standard-select-currency"
                    select
                    label="제품 카테고리"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    //helperText="Please select your currency"
                    variant="standard"
                    >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <TextField
                    id="standard-required"
                    error={getConfRex("NUMBER",price) || price ==='' ? false : true}
                    helperText={price_error}
                    label="₩ 가격"
                    margin="normal"
                    onChange={e => {
                        if(e.target.value === ''){
                            return false;
                        }else{
                        setPrice(e.target.value)}
                    }}
                    variant="standard"
                    />
            </div>
            <div>
                <TextField
                    required
                    margin="normal"
                    id="outlined-multiline-static"
                    label="판매 글"
                    multiline
                    rows={4}
                    placeholder="게시글 내용을 작성해주세요. 가품 및 판매금지품목은 게시가 제한될 수 있어요."
                    onChange={e => setContent(e.target.value)}
                />
            </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    완료
                </Button>
            </Box>
        </div>
        );
}