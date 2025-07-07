import React from 'react';

import { FiSearch } from 'react-icons/fi';
import { AiFillBell } from 'react-icons/ai';

import './Topbar.css';

export default function Topbar() {

    return(
        <div className="topbar-container">
            <div className="topbar-left">
                <FiSearch size={35} color='#686D76'/>
            </div>
            <input 
                type="text"
                className="topbar-search"
                placeholder='궁금한 점을 입력해보세요!'
            />
            <div className="topbar-right">
                <a className="profile-page" href="/profile" style={{fontFamily:'omyu_pretty', fontSize:'20px'}}>나의페이지</a>
                <AiFillBell className="bell-icon" size={30} />
            </div>
        </div>
    )
}
