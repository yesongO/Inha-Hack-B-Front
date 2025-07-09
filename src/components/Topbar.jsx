import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiFillBell } from 'react-icons/ai';

import './Topbar.css';
import { useNotification } from './Notification';
import { useNavigate } from 'react-router-dom';


export default function Topbar() {
    const { message } = useNotification();
    const [showAlertBox, setShowAlertBox] = useState(false);
   
    const [newNotification, setNewNotification] = useState(false);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const handleBellClick = () => {
        setShowAlertBox(prev => !prev);
        setNewNotification(false);
    };

    const handleSearch = () => { 
        if (keyword.trim() !== "") {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    useEffect(() => {
        if (message) {
            setNewNotification(true);
        }
    }, [message]);

    return(
        <div className="topbar-container">
            <div className="topbar-left">
                <FiSearch size={35} color='#686D76' onClick={handleSearch}/>
            </div>
            <input 
                type="text"
                className="topbar-search"
                placeholder='누군가의 진심을 찾아보아요'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
            }}
            />
            <div className="topbar-right">
                <a className="profile-page" href="/profile" style={{fontFamily:'sana-serif', fontSize:' 13px'}}>나의페이지</a>
                <AiFillBell 
                className={`bell-icon ${newNotification ? "glow" : ""}`}
                size={30} onClick={handleBellClick} />
            </div>

            {showAlertBox && (
                <div className="alert-box">
                    {message || "알림이 없습니다."}
                </div>
            )}
        </div>
    );
}
