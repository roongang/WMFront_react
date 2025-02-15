import React from "react";
import {Link} from 'react-router-dom';

import useCookie from "../../components/common/useCookie";

import "./Header.css";

import Logout from '../../components/user/logout';

function Header(){
    const MenuItem = ({active, children, to}) =>(
        <div className="menu-item">{children}</div>
    );
    //problem : 한 번 로딩되면 더이상 체크안하는거 같음 (웹 로컬변수로 변경하기)
    const isAuth = sessionStorage.getItem('isAuth');
    return(
        <div>
            <div className="logo">Menu</div>
            <div className="menu">
                <Link to="/"><MenuItem>홈</MenuItem></Link>
                <Link to="/postView"><MenuItem>인기매물</MenuItem></Link>
                <Link to="/post-save"><MenuItem>글쓰기</MenuItem></Link>
                <Link to="/invoices"><MenuItem>디테일</MenuItem></Link>
                {isAuth==='false'? <Link to="/signup"><MenuItem>회원가입</MenuItem></Link>  : <Link to="/my-posts"><MenuItem>내 판매글</MenuItem></Link>}
                {isAuth==='false'? <Link to="/signin"><MenuItem>로그인</MenuItem></Link>  : <MenuItem><button onClick={Logout}>로그아웃</button></MenuItem>}
            </div>
        </div>
    );
}

export default Header;
