import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import "../pages/ViewPage_A.css";
import axios from '../api/axiosInstance';

export default function ViewPage_A() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionRes = await axios.get(`/question/questions/${questionId}/`);
        setQuestion(questionRes.data);

        const answerRes = await axios.get(`/answer/questions/${questionId}/answers/`);
        setAnswers(answerRes.data);

      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [questionId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/question/questions/${questionId}/?user_id=${question?.user?.id}`);
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
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다.");
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (!question) return <div>질문 데이터를 불러오지 못했습니다.</div>;

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
          <span className="ProfileDate">{question.created_at.slice(0, 10)}</span>
        </div>

        
        <div className="AnswerContainer">
  {answers.length === 0 ? (
    <div className="NoAnswerMsg">아직 등록된 답변이 없어요!</div>
  ) : (
    answers.map(answer => (
      <div key={answer.id} className="AnswerBox">
        <span className="AnswerMeta">
          {answer.user_login_id}님의 답변
        </span>
        <p className="AnswerBody">
          {answer.body}
        </p>
        
        {/* {parseInt(localStorage.getItem("userId")) === answer.user_id && (
          <div className="AnswerButtonRow">
            <button className="EditButton" onClick={() => handleAnswerEdit(answer)}>수정하기</button>
            <button className="DeleteButton" onClick={() => handleAnswerDelete(answer.id)}>삭제하기</button>
          </div>
        )} */}
      </div>
    ))
  )}
</div>

      </div>
    </Layout>
  );
}
