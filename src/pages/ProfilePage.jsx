import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../components/Layout';

import './ProfilePage.css';

export default function ProfilePage() {
    const [users, setUsers] = useState([]); // 조회용
    const [message, setMessage] = useState(""); // 조회용

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    // 뱃지 데이터 리스트
    const badgeList = [
        {name: "첫 진심", image: "/badge_basic", earned: true},
    ]

    // 조회용
    const handleGetUsers = () => {
        axios.get('/main/users/')
        .then(res => {
            console.log("유저 목록 조회 성공:", res.data);
            setUsers(res.data);
        })
        .catch(err => {
            console.error("유저 조회 실패:", err);
        });
    };

    // 프로필
    useEffect(() => {
        const profileId = localStorage.getItem("profileId");

        if (!profileId) {
            setError("프로필 ID가 존재하지 않아요.");
            return;
        }

        axios.get(`/main/profiles/${profileId}`)
        .then(res => {
            setProfile(res.data);
        })
        .catch(err => {
            console.error("프로필 조회 실패", err);
            setError("프로필을 불러오지 못했습니다.");
        });
    }, []);

    if (!profile) {
        return <p>프로필을 불러오는 중...</p>;
    }


    return(
        <Layout>
            <p className="title-p">내 프로필</p>

            {/* // 프로필 소개 부분 */}
            <div className="profile-cont">
                <img className="profile-img" src={"/person.png"} alt="프로필사진" />
                <div className="profile-text">
                    <div className="name-job">
                        <h2 className="nickname">{profile.user_name}</h2>
                        <span className="job">( {profile.job} )</span>
                    </div>
                    <p className="bio">" {profile.bio} "</p>
                </div>
            </div>
            {/* // 뱃지 부분 */}
            <div className="badge-section">
                <h3>나의 뱃지</h3>
                <div className="badge-grid">
                    {badgeList.map((badge, idx) => (
                    <div key={idx} className="badge-item">
                        {badge.earned ? (
                        <img src={badge.image} alt={badge.name} className="badge-img" />
                        ) : (
                        <div className="badge-placeholder"></div>
                        )}
                        <p className="badge-name">
                        {badge.earned ? badge.name : ""}
                        </p>
                    </div>
                    ))}
                </div>
            </div>


            {/* //---------------------------------------------- */}
            <p>api 테스트</p>
            <button onClick={handleGetUsers} style={{ marginLeft: '1rem' }}>📋 유저 전체 조회</button>
            <p>{message}</p>
            <div style={{ marginTop: '2rem' }}>
            <h3>유저 목록</h3>
            {users.length === 0 ? (
                <p>아직 불러온 유저가 없습니다.</p>
            ) : (
                <ul>
                {users.map(user => (
                    <li key={user.id}>
                    key: {user.id} /<strong>아이디: {user.login_id}</strong> - 비번: {user.password} / 관리자: {user.is_admin ? "O" : "X"}
                    </li>
                ))}
                </ul>
            )}
            </div>
            {/* // ------------------------------------------------ */}
        </Layout>
    );
}
