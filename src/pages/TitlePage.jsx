import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axiosInstance';

import Layout from '../components/Layout';

import { AiFillStar } from 'react-icons/ai';
import { BsBookmarkFill } from 'react-icons/bs';

export default function TitlePage() {
    const navigate = useNavigate();

    return (
        <div style={{width: "100vw", display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h2 style={{fontFamily: "Ownglyph_ryurue-Rg", fontSize: "3rem", marginBottom: 0}}>진심인에 오신 것을 환영합니다. 🤗</h2>
            <div style={{display: "flex", gap: "30px",}}>
                <button style={{
                            fontSize: "0.9rem",
                            color: "#444",
                            backgroundColor: "rgb(247, 212, 201)",
                            padding: "0.6rem 1.5rem",
                            marginTop: "40px",
                            border: "none",
                            borderRadius: "20px",
                            boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
                            transition: "all 0.2s ease-in-out",
                            cursor: "pointer",
                        }}
                onClick={() => navigate('/signup')}>처음 오셨나요?</button>
                <button style={{
                            fontSize: "0.9rem",
                            color: "#444",
                            backgroundColor: "rgb(247, 212, 201)",
                            padding: "0.6rem 1.5rem",
                            marginTop: "40px",
                            border: "none",
                            borderRadius: "20px",
                            boxShadow: "0 4px 4px rgba(0,0,0,0.1)",
                            transition: "all 0.2s ease-in-out",
                            cursor: "pointer",
                        }}
                onClick={() => navigate('/login')}>
                    이미 아이디가 있으신가요?
                </button>
            </div>
        </div>
    );
}

