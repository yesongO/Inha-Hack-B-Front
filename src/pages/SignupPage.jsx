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
            navigate('/create-profile', { state: { userId: newUserId } });
        })
        .catch(err => {
            console.error("회원가입 실패:", err);
            setMessage("이미 존재하는 아이디입니다.🥹 다른 아이디로 시도해주세요.")
        });
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>진심인의 회원이 되어주세요.</h2>
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