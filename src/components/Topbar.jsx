import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiFillBell } from 'react-icons/ai';

import './Topbar.css';
import { useNotification } from './Notification';

export default function Topbar() {
    const { message } = useNotification();
    const [showAlertBox, setShowAlertBox] = useState(false);

    const handleBellClick = () => {
        setShowAlertBox(prev => !prev);
    };

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
                <a className="profile-page" href="/profile" style={{fontFamily:'sana-serif', fontSize:' 13px'}}>나의페이지</a>
                <AiFillBell className="bell-icon" size={30} onClick={handleBellClick} />
            </div>

            {showAlertBox && (
                <div className="alert-box">
                    {message || "알림이 없습니다."}
                </div>
            )}
        </div>
    );
}
