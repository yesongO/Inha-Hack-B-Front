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
    const [answers, setAnswers] = useState([]);
    const [answerText, setAnswerText] = useState("");

    useEffect(() => {
    //     axios.get(`/question/questions/${questionId}/`)
    //     .then((res) => {
    //     console.log("받은 데이터:", res.data);
    //     setQuestion(res.data);
    //     })
    //     .catch((err) => console.error(err));
    // }, [questionId]);

    const fetchData = async () => {
        try {
          // 질문 GET
            const questionRes = await axios.get(`/question/questions/${questionId}/`);
            setQuestion(questionRes.data);
    
          // 답변 목록 GET
            const answerRes = await axios.get(`/answer/questions/${questionId}/answers/`);
            setAnswers(answerRes.data);
    
        } catch (err) {
            console.error("❌ 데이터 불러오기 실패:", err);
        }
        };
    
        fetchData();
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

            <div>
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
                    </div>
                    ))
                )}
            </div>

            <div className="NoteText">진심으로 읽고 마음으로 답해보아요</div>

            <div className="AnswerFormBox">
                <textarea
                    className="AnswerTextarea"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="답변을 입력하세요"
                />
                <div className="ButtonRow" style={{marginRight: "-50px"}}>
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
