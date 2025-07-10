import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import './SearchPage.css';
import axios from '../api/axiosInstance';

export default function SearchPage() {
    const { search } = useLocation(); 
    const queryParams = new URLSearchParams(search);
    const keyword = queryParams.get("keyword");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (keyword) {
            setLoading(true);
            axios.get(`/question/questions/search/?keyword=${encodeURIComponent(keyword)}`)
                .then((res) => {
                    setResults(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("검색 중 오류가 발생했어요.");
                    setLoading(false);
                });
        }
    }, [keyword]);

    return (
        <Layout>
        <div className="search-page-container">
            <h2 style={{ margin: "20px" }}>
                '{keyword}' 검색 결과
            </h2>

            {loading && <p style={{ margin: "20px" }}>불러오는 중...</p>}
            {error && <p style={{ margin: "20px", color: "red" }}>{error}</p>}

            {!loading && !error && results.length === 0 && (
                <p style={{ margin: "20px" }}>검색 결과가 없습니다.</p>
            )}

            <div className="search-results">
                {results.map(item => (
                    <div key={item.id} className="question-card">
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                        <a href={`/viewpage-a/${item.id}`}>자세히 보기</a>
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
}
