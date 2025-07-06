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

    // 수정 상태
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(parseInt(storedUserId));

        axios.get(`/question/questions/${questionId}/`)
            .then(res => {
                setQuestion(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("질문 불러오기 실패:", err);
                setQuestion({
                    id: 3,
                    user: { login_id: "익명" },
                    categories: [],
                    like_count: 0,
                    views: 0,
                    title: "애완동물 추천해주세요!",
                    body: "제가 강아지, 고양이, 고슴도치 중 어떤 동물을 제 가족으로 맞이할지 고민 중이에요 ㅜㅜ",
                    created_at: "2025-07-05T16:21:33.643844+09:00",
                    anony: true,
                    likes: []
                });
                setLoading(false);
            });
    }, [questionId]);

    // 삭제 기능
    const handleDelete = async () => {
        try {
            await axios.delete(`/question/questions/${questionId}/?user_id=${userId}`);
            alert("질문이 삭제되었습니다.");
            navigate("/question_list");
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제에 실패했습니다.");
        }
    };

    // 수정 모드 on
    const handleEdit = () => {
        setIsEditing(true);
        setEditTitle(question.title);
        setEditBody(question.body);
    };

    // 저장
    const handleSave = async () => {
        try {
            await axios.put(`/question/questions/${questionId}/`, {
                title: editTitle,
                body: editBody,
                user: userId
            });
            alert("수정되었습니다.");
            setQuestion({
                ...question,
                title: editTitle,
                body: editBody
            });
            setIsEditing(false);
        } catch (err) {
            console.error("수정 실패:", err);
            alert("수정에 실패했습니다.");
        }
    };

    if (loading) return <div>로딩중...</div>;

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
                            <h2 className="ContentTitle">{question.title}</h2>
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
                    {isEditing ? (
                        <button className="EditButton" onClick={handleSave}>저장하기</button>
                    ) : (
                        <button className="EditButton" onClick={handleEdit}>수정하기</button>
                    )}
                    <button className="DeleteButton" onClick={handleDelete}>삭제하기</button>
                </div>
                <div className="NoAnswerMsg">
                    아직 등록된 답변이 없어요!
                </div>
            </div>
        </Layout>
    );
}
