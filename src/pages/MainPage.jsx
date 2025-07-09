import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Layout from '../components/Layout';
import Topbar from '../components/Topbar';
import Category from '../components/Category';

import './MainPage.css';
import { categories } from "../data/categories";

import { AiFillStar } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';
//-----------------------------------------------------------

export default function MainPage() {
    const location = useLocation();
    // const nickname = location.state?.nickname || "OO";

    // localStorage에 있는 userId와 nickname 불러오기
    const nickname = localStorage.getItem("nickname") || "OO";
    const userId = localStorage.getItem("userId");

    return (
        <Layout>
            <Topbar />
            <div className="coral-box">
                <p style={{fontSize: '3rem', marginTop: '0px'}}>사람이 건네는 답, 진심인
                    <img src="/realmoon.png" alt="달" className="dark-only-icon" />
                </p>
                
                <div className="firefly-container">
                    <div className="firefly-dot dot1"></div>
                    <div className="firefly-dot dot2"></div>
                    <div className="firefly-dot dot3"></div>
                    <div className="firefly-dot dot4"></div>
                    <div className="firefly-dot dot5"></div>
                </div>
                <p style={{color: 'white', fontSize: '1.7rem', margin: 0}}>안녕하세요, {nickname}님.</p>
                <p style={{color: 'white', fontSize: '2.2rem', margin: 0}}>지금 당신의 마음을 톡-- 두드린 궁금증은?</p>

                <img
                    src="/nami.png"
                    alt="나미야 잡화점"
                    className="dark-mode-bottom-right"
                />
            </div>
            <div className="btn-container">
                <button className="btn-1"><AiFillStar size={20} color='white'/>실시간 인기 카테고리</button>
                <button className="btn-2"><BsBookmarkFill size={20} color='#686D76'/>내 카테고리</button>
            </div>
            <div className="cat-list">
                {categories.slice(0, 2).map((cat, idx) => (
                    <Category 
                        key={idx}
                        title={cat.title}
                        badge={cat.badge}
                        image={cat.image}
                        link={cat.link}
                        description={cat.description}
                    />
                ))}
            </div>
        </Layout>
    );
}
