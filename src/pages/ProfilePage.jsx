import React, { useEffect, useState } from "react";
import Layout from '../components/Layout';
import axios from '../api/axiosInstance';

import './ProfilePage.css';

export default function ProfilePage() {
    const [users, setUsers] = useState([]); // 조회용
    const [message, setMessage] = useState(""); // 조회용

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    //사용자 쓴 글
    const [myQuestions, setMyQuestions] = useState([]);

    // 사용자의 뱃지 불러오기
    const [badges, setBadges] = useState([]);

    // ⚪️ 뱃지 생성하기
    // axios.post("/api/badges/", {
    //     name: "첫 진심",
    //     description: "작은 용기, 첫 진심의 시작",
    //     condition_description: "첫 질문 등록",
    //     image_url: "https://jinsimin.p-e.kr/jinsim_badge.png",
    //     category: ""
    // })
    // .then(res => {
    //     console.log("뱃지 생성 성공:", res.data);
    // })
    // .catch(err => {
    //     console.error("뱃지 생성 실패", err)
    // });

    // ⚪️ 뱃지 조회하기
    // axios.get("/api/badges/")
    // .then(res => {
    //     console.log("뱃지 목록", res.data);
    // })
    // .catch(err => {
    //     console.error(err);
    // });

    // 뱃지 데이터 리스트
    const badgeList = [
        {name: "첫 진심", image: "/jinsim_badge.png", earned: true},
    ]

    // 조회용
    // const handleGetUsers = () => {
    //     axios.get('/main/users/')
    //     .then(res => {
    //         console.log("유저 목록 조회 성공:", res.data);
    //         setUsers(res.data);
    //     })
    //     .catch(err => {
    //         console.error("유저 조회 실패:", err);
    //     });
    // };

    // 프로필
    useEffect(() => {
        const profileId = localStorage.getItem("profileId");
        const userId = localStorage.getItem("userId");

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

        // 사용자의 뱃지 정보 불러오기
        axios.get(`api/badges/user/${userId}`)
        .then(res => setBadges(res.data))
        .catch(err => console.error(err));
    }, []);
    
    useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get('/question/questions/search/', {
        params: {
            categories: "",
            keyword: "",
            date: "",
            user: userId
        }
    })
    .then(res => setMyQuestions(res.data))
    .catch(err => console.error("내 질문 불러오기 실패:", err));
}, []);


    if (!profile) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontFamily: 'InkLipquid', fontSize: '2rem',
            }}>
                Loading...
            </div>
        );
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
            <hr style={{border: "0.9px solid rgb(255, 225, 220)"}}/>

            {/* // 뱃지 부분 */}
            <div className="badge-section">
                <h3>: 진심이 담겨 있는 뱃지</h3>
                <div className="badge-grid">
                    {badges.length > 0 ? (
                        badges.map((badgeWrapper, idx) => (
                        <div key={idx} className="badge-item b-tooltip-wrapper">
                            <img 
                                src={"/jinsim_badge.png"} 
                                alt={badgeWrapper.badge.name} 
                                className="badge-img" />
                            <p className="badge-name">{badgeWrapper.badge.name}</p>
                            <div className="b-tooltip">{badgeWrapper.badge.description}</div>
                        </div>
                        ))
                    ) : (
                        <p>획득한 뱃지가 아직 없어요.</p>
                    )}
                    {/* {badgeList.map((badge, idx) => (
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
                    ))} */}
                </div>
            </div>
            <hr style={{border: "0.9px solid rgb(255, 225, 220)"}}/>

            {/* // 포트폴리오 부분 */}
            <div className="port-section">
                <h3>: 진심이 담겨 있는 포트폴리오</h3>
                    <p>제작한 포트폴리오가 아직 없어요.</p>
            </div>
            <hr style={{border: "0.9px solid rgb(255, 225, 220)"}}/>

            <div className="my-questions-section">
            <h3>✍🏼 내가 작성한 질문</h3>
            <br />
            {myQuestions.length === 0 ? (
            <p>아직 작성한 질문이 없어요 🥲</p>
                ) : (
                <div className="question-list">
                    {myQuestions.map(q => (
                        <div key={q.id} className="question-card">
                            <a href={`/viewpage-a/${q.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h2 className="question-title">{q.title}</h2>
                                <p className="question-body line-clamp">{q.body}</p>
                            </a>
                        </div>
                    ))}
                </div>
            )}
            </div>


            {/* //---------------------------------------------- */}
            {/* <p>api 테스트</p>
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
            </div> */}
            {/* // ------------------------------------------------ */}
        </Layout>
    );
}
