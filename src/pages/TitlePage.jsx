import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './TitlePage.css';

import Layout from '../components/Layout';

import { AiFillStar } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';

export default function TitlePage() {
    const navigate = useNavigate();

    return (
        <Layout>
        <div>
            <h2>진심인에 오신 것을 환영합니다.</h2>
            <button onClick={() => navigate('/signup')}>처음 오셨나요?</button>
            <button onClick={() => navigate('/login')} style={{ marginLeft: '1rem' }}>
                이미 아이디가 있으신가요?
            </button>
        </div>
        </Layout>
    );
}

