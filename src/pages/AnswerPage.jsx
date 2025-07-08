import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Topbar from '../components/Topbar';
import "../pages/AnswerPage.css";

export default function AnswerPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    axios.get(`/question/questions/${questionId}/`)
      .then((res) => {
        console.log("받은 데이터:", res.data);
        setQuestion(res.data);
      })
      .catch((err) => console.error(err));
  }, [questionId]);

  const handleSubmit = () => {
    const payload = {
      user_id: parseInt(localStorage.getItem("userId")),
      question_id: parseInt(questionId),
      body: answerText
    };

    console.log("보내는 데이터:", payload);

    axios.post('/answer/answers/', payload)
      .then(() => {
        alert("답변 등록 완료!");
        setAnswerText("");
        navigate(`/viewpage-a/${questionId}`); // ✅ 백틱으로 수정
      })
      .catch(err => console.error("POST 오류:", err));
  };

  return (
    <div>
      <Layout>
        <Topbar />

        <div className="AnswerPageContainer">
          {question && (
            <>
              <div className="QuestionBox">
                <h2 className="QuestionTitle">{question.title}</h2>
                <p className="QuestionBody">{question.body}</p>
              </div>

              <div className="NoteText">진심으로 읽고 마음으로 답해보아요</div>

              <div className="AnswerFormBox">
                <textarea
                  className="AnswerTextarea"
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="답변을 입력하세요"
                />
                <div className="ButtonRow">
                  <button className="SubmitButton" onClick={handleSubmit}>
                    답변 등록
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  );
}
