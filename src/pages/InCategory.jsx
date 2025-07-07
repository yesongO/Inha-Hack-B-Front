import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Topbar from "../components/Topbar";

import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";


export default function InCategory() {
    const { slug } = useParams();  // ex. "cat", "movie"
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const matchedCategory = categories.find(cat => cat.link === `/category/${slug}`);

    const slugToId = {
        study: 1,
        fashion: 2,
        cat: 3,
        love: 4,
        travel: 5,
        coding: 6,
        movie: 7,
        music: 8,
    };

    useEffect(() => {
        const categoryId = slugToId[slug];
        if (!categoryId) return;

        axios.get("/question/questions/search/", {
            params: {
                categories: categoryId,
                keyword: "",
                date: "",
                user: "",
            }
        })
        .then(res => {
                setQuestions(res.data);
                setLoading(false);
        })
        .catch(err => {
                console.error("질문 불러오기 실패:", err);
                setLoading(false);
        });
    }, [slug]);

    if (!slugToId[slug]) return <p>존재하지 않는 카테고리입니다.</p>;

    if (loading) 
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontFamily: 'InkLipquid', fontSize: '2rem',
        }}>
            Loading...
        </div>

    return (
        <Layout>
            <Topbar />
            <div className="full-container">
                {matchedCategory && (
                    <div style={{ marginBottom: "2rem" }}>
                        <CategoryCard
                            title={matchedCategory.title}
                            image={matchedCategory.image}
                            badge={matchedCategory.badge}
                            description={matchedCategory.description} 
                        />
                    </div>
                )}

                {/* <h2 style={{ marginBottom: "1rem" }}>🗂️ {slug} 카테고리의 질문들</h2> */}

                {questions.length === 0 ? (
                    <p>아직 등록된 질문이 없어요.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
                        {questions.map(q => (
                            <li key={q.id} style={{
                                borderBottom: "1px solid #ccc",
                                padding: "1rem 0",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                        {q.title}
                                    </div>
                                    <div style={{ fontSize: "0.95rem", color: "#333" }}>
                                        {q.body}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigate(`/answer/${q.id}`)} 
                                    style={{
                                        marginLeft: "1rem",
                                        padding: "0.6rem 1rem",
                                        backgroundColor: "#FFB6B9",
                                        border: "none",
                                        borderRadius: "8px",
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    진심을 담아 답변하기
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* {questions.length === 0 ? (
                    <p>아직 등록된 질문이 없어요.</p>
                ) : (
                    <ul>
                        {questions.map(q => (
                            <li key={q.id}>
                                <strong>{q.title}</strong><br />
                                <span>{q.body}</span>
                            </li>
                        ))}
                    </ul>
                )} */}
            </div>
        </Layout>
    );
}