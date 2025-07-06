import React, { useEffect, useState } from "react";
import axios from "axios";
import '../pages/WritePage.css';
import Layout from '../components/Layout';
import { useNavigate } from "react-router-dom";

export default function WritePage() {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("누군가");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        const storedUserId = localStorage.getItem("userId");
        if (storedNickname) setNickname(storedNickname);
        if (storedUserId) setUserId(parseInt(storedUserId));
    }, []);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // 카테고리 불러오기
    useEffect(() => {
        axios.get("/api/categories/")
            .then(res => {
                console.log(" categories GET 응답:", res.data);
                setCategories(res.data.results || res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("카테고리 불러오기 실패:", err);
                setLoading(false);
            });
    }, []);

    //  카테고리 버튼 클릭
    const handleCategoryClick = (id) => {
        const parsedId = parseInt(id);
        setSelectedCategories(prev =>
            prev.includes(parsedId)
                ? prev.filter(cat => cat !== parsedId)
                : [...prev, parsedId]
        );
    };

    const handleSubmit = async () => {
    console.log("선택된 categories (types):", selectedCategories.map(v => typeof v));

    if (selectedCategories.length === 0) {
        alert("카테고리를 한 개 이상 선택해주세요.");
        return;
    }

    const payload = {
        title,
        body: content,
        user: parseInt(userId) || 1,
        categories: selectedCategories.map(v => parseInt(v)),
        anony: !!isAnonymous
    };

    console.log(" payload:", JSON.stringify(payload, null, 2));

    try {
        await axios.post("/question/questions/", payload);
        alert('질문이 등록되었습니다!');
        setTitle("");
        setContent("");
        setSelectedCategories([]);
        setIsAnonymous(false);
        navigate("/viewpage_q");
    } catch (err) {
        console.error("🚨 등록 실패:", err);
        console.error("🚨 서버 응답:", err.response?.data || err.message || err);
        alert('등록 실패: ' + JSON.stringify(err.response?.data || err.message));
    }
};


    return (
        <Layout>
            <div className="full-container">
                <div className="PageContainer">
                    <div className="top">
                        <p className="TopMessage">
                            무엇이든 괜찮아요. 누군가는 당신의 고민에 진심으로 답할 거예요.
                        </p>
                        <div className="ProfileBox">
                            <div className="ProfileCircle"></div>
                            <span className="ProfileName">{nickname}</span>
                        </div>
                    </div>

                    <div className="mainbox">
                        <div className="TitleRow">
                            <p className="Label">제목</p>
                            <input className="TitleInput" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="CategoryRow">
                            <p className="Label">카테고리</p>
                            <div className="CategoryContainer">
                                {loading ? (
                                    <span>카테고리를 불러오는 중...</span>
                                ) : categories && categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            className={`CategoryButton ${selectedCategories.includes(parseInt(cat.id)) ? "selected" : ""}`}
                                            onClick={() => handleCategoryClick(cat.id)}
                                        >
                                            {cat.name}
                                        </button>
                                    ))
                                ) : (
                                    <span>카테고리가 없습니다.</span>
                                )}
                                <span className="CategoryNotice">
                                    카테고리를 한 개 이상 선택해 주세요.
                                </span>
                            </div>
                        </div>

                        <div className="ContentRow">
                            <p className="Label">본문</p>
                            <textarea className="ContentArea" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                    </div>

                    <div className="BottomContainer">
                        <div className="AnonymousCheck">
                            <input
                                type="checkbox"
                                className="CheckBox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                            <span>익명체크</span>
                        </div>
                        <button className="SubmitButton" onClick={handleSubmit}>
                            등록하기
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// export default function WritePage({ categories }) {
//     const navigate = useNavigate();

//     const [nickname, setNickname] = useState("누군가");
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         const storedNickname = localStorage.getItem("nickname");
//         const storedUserId = localStorage.getItem("userId");
//         if (storedNickname) setNickname(storedNickname);
//         if (storedUserId) setUserId(parseInt(storedUserId));
//     }, []);

//     const [title, setTitle] = useState("");
//     const [content, setContent] = useState("");
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [isAnonymous, setIsAnonymous] = useState(false);

//     const handleCategoryClick = (id) => {
//         setSelectedCategories(prev =>
//             prev.includes(id)
//                 ? prev.filter(cat => cat !== id)
//                 : [...prev, id]
//         );
//     }

//     const handleSubmit = async () => {
//         console.log("선택된 categories:", selectedCategories);

//         if (selectedCategories.length === 0) {
//             alert("카테고리를 한 개 이상 선택해주세요.");
//             return;
//         }

//         const payload = {
//             title,
//             body: content,
//             user: userId || 1,
//             categories: selectedCategories,
//             anony: isAnonymous
//         };

//         console.log("payload:", payload);

//         try {
            
//             alert('질문이 등록되었습니다!');
//             setTitle("");
//             setContent("");
//             setSelectedCategories([]);
//             setIsAnonymous(false);
//             navigate("/viewpage_q");

//         } catch (err) {
//             console.error(err);
//             alert('등록 실패');
//         }
//     }

//     return (
//         <Layout>
//             <div className="full-container">
//                 <div className="PageContainer">
//                     <div className="top">
//                         <p className="TopMessage">
//                             무엇이든 괜찮아요. 누군가는 당신의 고민에 진심으로 답할 거예요.
//                         </p>
//                         <div className="ProfileBox">
//                             <div className="ProfileCircle"></div>
//                             <span className="ProfileName">{nickname}</span>
//                         </div>
//                     </div>

//                     <div className="mainbox">
//                         <div className="TitleRow">
//                             <p className="Label">제목</p>
//                             <input className="TitleInput" value={title} onChange={(e) => setTitle(e.target.value)} />
//                         </div>

//                         <div className="CategoryRow">
//                             <p className="Label">카테고리</p>
//                             <div className="CategoryContainer">
//                                 {categories && categories.length > 0 ? (
//                                     categories.map((cat) => (
//                                         <button
//                                             key={cat.id}
//                                             className={`CategoryButton ${selectedCategories.includes(cat.id) ? "selected" : ""}`}
//                                             onClick={() => handleCategoryClick(cat.id)}
//                                         >
//                                             {cat.name}
//                                         </button>
//                                     ))
//                                 ) : (
//                                     <span>카테고리를 불러오는 중...</span>
//                                 )}
//                                 <span className="CategoryNotice">
//                                     카테고리를 한 개 이상 선택해 주세요.
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="ContentRow">
//                             <p className="Label">본문</p>
//                             <textarea className="ContentArea" value={content} onChange={(e) => setContent(e.target.value)} />
//                         </div>
//                     </div>

//                     <div className="BottomContainer">
//                         <div className="AnonymousCheck">
//                             <input
//                                 type="checkbox"
//                                 className="CheckBox"
//                                 checked={isAnonymous}
//                                 onChange={(e) => setIsAnonymous(e.target.checked)}
//                             />
//                             <span>익명체크</span>
//                         </div>
//                         <button className="SubmitButton" onClick={handleSubmit}>
//                             등록하기
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }
