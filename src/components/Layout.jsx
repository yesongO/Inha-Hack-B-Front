import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Layout.css';
import { FiMenu } from 'react-icons/fi';

//-- Layout.jsx
//-- 모든 페이지에서 넣어 줄 테두리 레이아웃

export default function Layout({ children }) {

    //-- 🌙 다크 모드 관련 ------------------------
    const [isDark, setIsDark] = useState(false);

    const toggleDark = () => {
        setIsDark(prev => !prev);
        if (!isDark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };

    useEffect(() => {
    if (isDark) {
        const numStars = 80;
        const colors = ['white','#ffc',];

        for (let i = 0; i < numStars; i++) {
            const size = Math.random() * 1 + 0.9;
            const star = document.createElement("span");
            star.className = "star";
            star.style.position = "fixed";
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.background = colors[Math.floor(Math.random() * colors.length)];
            star.style.borderRadius = "50%";
            star.style.opacity = "0.8";
            star.style.animation = "twinkle 2s infinite ease-in-out";
            star.style.animationDuration = `${Math.random() * 4 + 3}s`; // 1s ~ 3s
            star.style.zIndex = "1";
            document.body.appendChild(star);
        }
        } else {
        document.querySelectorAll(".star").forEach(el => el.remove());
        }
    }, [isDark]);
    //-- 🌙 다크 모드 관련 ------------------------

    const navigate = useNavigate();

    const [hamOpen, setHamOpen] = useState(false);
    const hamRef = useRef(null);

    const toggleHam = () => {
        setHamOpen(prev => !prev);
    };

    // 햄버거 메뉴를 열었을 때, 바깥 클릭 시 닫히게 한다.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hamRef.current && !hamRef.current.contains(event.target)) {
                setHamOpen(false);
            }
        };

        if (hamOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [hamOpen]);

    return (
        <div className='layout-container'>
            <div className='left-border'>
                <button className='ham-btn' onClick={toggleHam}><FiMenu /></button>

                <button className='side-write'
                        onClick={() => navigate("/write")} 
                        style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                    <img src="/pen.png" style={{width: "20px"}}/>
                </button>
                <p className='write'>글쓰기</p>
                <button className='side-profile' onClick={toggleDark} style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
                    <img src="/moon.png" style={{width: "20px"}}/>
                </button>
                <p className='darkmode'>다크모드</p>
            </div>

            <div ref={hamRef} className={`side-menu ${hamOpen ? 'open' : ''}`}>
                <p className='side-logo'>진심인</p>
                <div className='side-page'>
                    <div style={{display: "flex", alignItems: "center", }}>
                        <img src="/side_line.png" style={{width: '100px', marginBottom: '5px'}} />
                        <span>💌</span>
                    </div>
                    <div className='nav-links'>
                        <Link to="/mainp">메인페이지</Link>
                        <Link to="/profile">나의페이지</Link>
                        <Link to="/category">카테고리페이지</Link>
                        <Link to="/write">글쓰기페이지</Link>
                        {/* <p style={{color: '#7D7C7C', marginTop: '35px'}}>진심인의 철학</p> */}
                    </div>    
                </div>
            </div>

            <div className='right-area'>
                <div className='top-border'></div>
                <main className='content'>
                    {children}
                </main>
            </div>
        </div>
    );
}