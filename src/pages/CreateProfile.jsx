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
        .then((res) => {
            console.log("프로필 생성 성공");

            // localStorage에 nickname, profile.id 저장
            localStorage.setItem("nickname", userName);
            localStorage.setItem("profileId", res.data.id);
            // MainPage 에 nickname 보내기
            navigate('/mainp', { state: { nickname: userName}});

        })
        .catch(err => {
            console.error("프로필 생성 실패", err);
        });
    };

    return (
        <div style={{ width: "100vw", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center"
        }}>
            <h2 style={{ fontFamily: "InkLipquid", fontSize: "2.5rem", marginBottom: "2rem"}}>
                진심인에서 사용할 프로필을 생성해주세요 🥰</h2>

            {/* 이름(실명) */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", width: "400px"}}>
            <label style={{ display: "block", textAlign: "right", width: "100px", marginRight: "20px" }}>이름</label>
            <input
                type="text"
                placeholder="실명을 입력해주세요"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "0.8rem"
                }}
            />
            </div>
    
            {/* 직업 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", width: "400px" }}>
                <label style={{ display: "block", textAlign: "right", width: "100px", marginRight: "20px" }}>직업</label>
                <input
                    type="text"
                    placeholder="예: 대학생, 웹개발자"
                    value={job}
                    onChange={e => setJob(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "0.8rem"
                    }}
                />
            </div>
            
            {/* 한줄소개 */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", width: "400px" }}>
            <label style={{ display: "block", textAlign: "right", width: "100px", marginRight: "20px" }}>소개</label>
            <input
                type="text"
                placeholder="한줄소개를 입력해주세요"
                value={bio}
                onChange={e => setBio(e.target.value)}
                style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "0.8rem"
                }}
            />
            </div>

            {/* 이미지 URL */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", width: "400px" }}>
            <label style={{ display: "block", textAlign: "right", width: "100px", marginRight: "20px" }}>이미지</label>
            <input
                type="text"
                placeholder="이미지 주소를 붙여넣어주세요"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "0.8rem"
                }}
            />
            </div>

            {/* 메시지와 버튼 */}
            {message && (
                <p style={{ color: "red", marginTop: "0.5rem" }}>{message}</p>
            )}

            <button onClick={handleCreateProfile}
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
                }}>
                프로필 생성
            </button>
        </div>
    );
}


