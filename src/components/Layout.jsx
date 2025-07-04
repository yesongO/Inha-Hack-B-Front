import React, { useState, useEffect, useRef } from 'react';
import './Layout.css';
import { FiMenu } from 'react-icons/fi';

//-- Layout.jsx
//-- 모든 페이지에서 넣어 줄 테두리 레이아웃

export default function Layout({ children }) {
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

                <button className='side-write'></button>
                <p style={{fontSize:'14px', marginTop:'3px', color:'#444444'}}>글쓰기</p>
                <button className='side-profile'></button>
                <p style={{fontSize: '14px', marginTop:'3px', color:'#444444'}}>내 프로필</p>
            </div>

            <div ref={hamRef} className={`side-menu ${hamOpen ? 'open' : ''}`}>
                <p className='side-logo'>진심인</p>
                <div className='side-page'>
                    <a href="/main">메인페이지</a>
                    <img src="/side_line.png" style={{width: '95px', marginTop: '0px'}}/>
                    <a href="/profile">나의페이지</a>
                    <img src="/side_line.png" style={{width: '95px'}}/>
                    <a href="/category">카테고리페이지</a>
                    <img src="/side_line.png" style={{width: '130px'}}/>
                    <a href="/write">글쓰기페이지</a>
                    <img src="/side_line.png" style={{width: '110px'}}/>
                    <p style={{color: '#7D7C7C', marginTop: '90px'}}>진심인의 철학</p>
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