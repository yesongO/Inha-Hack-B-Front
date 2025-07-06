import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = () => {
        const data = {
            login_id: loginId,
            password: password,
        };

        axios.post('/main/users/', data)
        .then(res => {
            const newUserId = res.data.id;
            console.log("회원가입 성공", res.data);

            // localStroage에 userId 저장
            localStorage.setItem("userId", newUserId);
            // CreateProfile 페이지에 userId 저장
            navigate('/create-profile', { state: { userId: newUserId } });

        })
        .catch(err => {
            console.error("회원가입 실패:", err);
            setMessage("이미 존재하는 아이디입니다.🥹 다른 아이디로 시도해주세요.")
        });
    };

    return (
        <div style={{width: "100vw", display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h2 style={{fontFamily: "Ownglyph_ryurue-Rg", fontSize: "2rem"}}>진심인의 회원이 되어주세요.</h2>
            <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
            />
            </div>
            <div style={{ marginBottom: "1rem" }}>
            <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            </div>
            <button onClick={handleSignup}>가입하기</button>
            {message && <p style={{ marginTop: "1rem", color: "red" }}>{message}</p>}
        </div>
    );
}