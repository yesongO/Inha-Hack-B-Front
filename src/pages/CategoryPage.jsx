import React, { useState } from "react";
import axios from "axios";
import Layout from '../components/Layout';
import Topbar from '../components/Topbar';

import { categories } from "../data/categories";
import Category from "../components/Category";

export default function CategoryPage() {

    const [categoryId, setCategoryId] = useState("");
    const [fetchedCategory, setFetchedCategory] = useState(null);
    const [error, setError] = useState("");

    //-- 카테고리 등록
    const handleCategorySeed = () => {
        categories.forEach((cat) => {
            axios.post("/api/categories/", {
                name: cat.title,
                description: cat.description,
            })
            .then(res => {
                console.log(`✅ [${cat.title}] 등록됨`, res.data);
            })
            .catch(err => {
                console.error(`❌ [${cat.title}] 등록 실패`, err.response?.data || err);
            });
        });
    };

    //-- 카테고리 조회
    const handleCategoryRead = () => {
        if (!categoryId) return alert("카테고리 ID를 입력해주세요!");
        axios.get(`/api/categories/${categoryId}/`)
            .then(res => {
                setFetchedCategory(res.data);
                setError("");
            })
            .catch(err => {
                setError("조회 실패: " + (err.response?.data?.detail || err.message));
                setFetchedCategory(null);
            });
    };

    return (
        <Layout>
            <Topbar />
            <br />

            {/* //-- 카테고리 등록하는 버튼 */}
            {/* <button onClick={handleCategorySeed} style={{
                    padding: '8px 16px',
                    backgroundColor: '#f7a69e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}>
                    🔄 전체 카테고리 등록하기
            </button> */}
            
            {/* //-- 카테고리 조회 및 입력 버튼 */}

            {/* <input
                type="number"
                placeholder="조회할 카테고리 ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    marginRight: '10px'
                }}
            />
            <button onClick={handleCategoryRead} style={{
                    padding: '8px 16px',
                    backgroundColor: '#a6c1ee',
                    color: '#222',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}>
                    🔍 카테고리 조회
            </button>
            {fetchedCategory && (
                    <div style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '10px' }}>
                        <h4>📦 조회된 카테고리</h4>
                        <pre>{JSON.stringify(fetchedCategory, null, 2)}</pre>
                    </div>
            )} */}

            {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
            )}

            
            {/* // 기존 카테고리 목록 출력 */}
            <div className="cat-list">
                {categories.map((cat, idx) => (
                    <Category 
                        key={idx}
                        title={cat.title}
                        badge={cat.badge}
                        image={cat.image}
                        link={cat.link}
                        description={cat.description}
                        />
                ))}
            </div>
        </Layout>
    );
}