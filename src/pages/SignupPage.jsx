import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = () => {
        if (!loginId.trim() || !password.trim()) {
            setMessage("아이디와 비밀번호를 모두 입력해주세요 :)");
            return;
        }

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
            setMessage("앗, 이미 존재하는 아이디네요. 다른 아이디로 시도해주세요 :)")
        });
    };

    return (
        <div style={{width: "100vw", display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h2 style={{fontFamily: "Ownglyph_ryurue-Rg", fontSize: "3rem"}}>진심인의 회원이 되어주세요. 💌</h2>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", width: "350px"}}>
                    <label style={{display: "block", textAlign: "right", width: "100px", marginRight: "20px"}}>아이디</label>
                    <input
                        type="text"
                        placeholder="진심인에서 사용할 아이디를 입력해주세요."
                        value={loginId}
                        onChange={e => setLoginId(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "0.8rem",
                        }}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", width: "350px"}}>
                    <label style={{display: "block", textAlign: "right", width: "100px", marginRight: "20px"}}>비밀번호</label>
                    <input
                        type="password"
                        placeholder="숫자 8자리로 입력해주세요"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "0.8rem",
                        }}
                    />
                </div>
            </div>
            {message && <p style={{ marginTop: "0px", color: "red" }}>{message}</p>}
            <button onClick={handleSignup}
                    style={{
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
                    }}>가입하기</button>
        </div>
    );
}

//rgb(237, 184, 177)
//rgb(255, 220, 206);