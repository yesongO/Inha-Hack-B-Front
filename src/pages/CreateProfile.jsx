import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function CreateProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    // SignupPage 에서 넘겨준 userId (사용자가 회원가입한 아이디)
    const { userId } = location.state || {};

    // 프로필 생성에 필요한 요소들
    const [userName, setUserName] = useState("");
    const [job, setJob] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");

    const handleCreateProfile = () => {
        if (!userId) {
            setMessage("유저의 ID가 존재하지 않습니다.");
            return;
        }

        const data = {
            user: userId,
            user_name: userName,
            job: job,
            bio: bio,
            image_url: imageUrl || "https://example.com/default-profile.png"
        }

        axios.post('/main/profiles/', data)
        .then(() => {
            console.log("프로필 생성 성공");
            navigate('/main', { state: { nickname: userName}});
        })
        .catch(err => {
            console.error("프로필 생성 실패", err);
        });
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>프로필 생성</h2>
    
            <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                placeholder="닉네임"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            </div>
    
            <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                placeholder="직업 (예: 프론트엔드 개발자)"
                value={job}
                onChange={e => setJob(e.target.value)}
            />
            </div>
    
            <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                placeholder="한줄소개"
                value={bio}
                onChange={e => setBio(e.target.value)}
            />
            </div>
    
            <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                placeholder="프로필 이미지 URL"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
            />
            </div>
    
            <button onClick={handleCreateProfile}>프로필 생성</button>
    
            {message && <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>}
        </div>
    );
}