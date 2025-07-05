import React, { useState } from "react";
import axios from "axios";
import Layout from '../components/Layout';

export default function ProfilePage() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

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


    return(
        <Layout>
            <p>나의페이지</p>
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
        </Layout>
    );
}
