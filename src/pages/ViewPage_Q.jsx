import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "../pages/ViewPage_Q.css";
import Topbar from '../components/Topbar';

export default function ViewPage_Q() {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(parseInt(storedUserId));

        axios.get(`/question/questions/${questionId}/`)
            .then(res => {
                console.log("✅ 질문 데이터:", res.data);
                setQuestion(res.data);
                setLoading(false);

                if (res.data.user && res.data.user.id) {
                    localStorage.setItem("userId", res.data.user.id);
                    setUserId(res.data.user.id);
                    console.log(`🔄 localStorage userId 덮어씀: ${res.data.user.id}`);
                }
            })
            .catch(err => {
                console.error("질문 불러오기 실패:", err);
                setError("질문을 불러오는데 실패했습니다.");
                setLoading(false);
            });
    }, [questionId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/question/questions/${questionId}/`);
            alert("질문이 삭제되었습니다.");
            navigate("/question_list");
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditTitle(question.title);
        setEditBody(question.body);
    };

    const handleSave = async () => {
        console.log("질문 원래 user:", question.user.id);
        console.log("현재 local user:", userId);

        try {
            await axios.put(`/question/questions/${questionId}/`, {
                title: editTitle,
                body: editBody,
                user: question.user.id
            });
            alert("수정되었습니다.");
            setQuestion({
                ...question,
                title: editTitle,
                body: editBody
            });
            setIsEditing(false);
        } catch (err) {
            console.error("🚨 수정 실패:", err);
            console.error("🚨 서버 응답:", err.response?.data || err.message);
            alert("수정에 실패했습니다.");
        }
    };

    if (loading) return <div>로딩중...</div>;
    if (error) return (
        <Layout>
            <Topbar />
            <div style={{color: "red", padding: "20px"}}>에러: {error}</div>
        </Layout>
    );

    return (
        <Layout>
            <Topbar />

            <div className="full-container">
                <div className="ContentArea">
                    {isEditing ? (
                        <>
                            <input 
                                className="EditInput" 
                                value={editTitle} 
                                onChange={(e) => setEditTitle(e.target.value)} 
                            />
                            <textarea 
                                className="EditTextarea"
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="ContentTitle" style={{fontFamily: "omyu_pretty"}}>
                                {question.title}
                            </h2>
                            <p className="ContentBody">{question.body}</p>
                        </>
                    )}
                </div>

                <div className="ProfileBox">
                    <div className="ProfileCircle"></div>
                    <span className="ProfileName">작성자: {question.user.login_id}</span>
                    <span className="ProfileDate">{question.created_at.slice(0,10)}</span>
                </div>

                <div className="BottomContainer">
                    {/* {isEditing ? (
                        <button className="EditButton" onClick={handleSave}>저장하기</button>
                    ) : (
                        <button className="EditButton" onClick={handleEdit}>수정하기</button>
                    )}
                    <button className="DeleteButton" onClick={handleDelete}>삭제하기</button> */}
                </div>

                <div className="NoAnswerMsg">
                    아직 등록된 답변이 없어요!
                </div>
            </div>
        </Layout>
    );
}
