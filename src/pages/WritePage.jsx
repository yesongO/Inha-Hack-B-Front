import React, { useEffect, useState } from "react";
import '../pages/WritePage.css';
import Layout from '../components/Layout';

export default function WritePage() {

    //--localStorage에서 불러온 닉네임을 상단 오른쪽에 표시합니다.
    const [nickname, setNickname] = useState("누군가");

    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        }
    }, []);
    // -----------------------------------------------

    return (
        <Layout>
            <div className="full-container">
                <div className="PageContainer">
                    <div className="top">
                        <p className="TopMessage">무엇이든 괜찮아요. 누군가는 당신의 고민에 진심으로 답할 거예요.</p>
                        <div className="ProfileBox">
                            <div className="ProfileCircle"></div>
                            <span className="ProfileName">{nickname}</span>
                        </div>
                    </div>
                    <div className= "mainbox">
                    <div className="TitleRow ">
                    <p className="Label">제목</p>
                    <input className="TitleInput" />
                    </div>

                    <div className="CategoryRow ">
                    <p className="Label">카테고리</p>
                    <div className="CategoryContainer">
                        <button className="CategoryButton">카테고리1</button>
                        <button className="CategoryButton">카테고리2</button>
                        <button className="CategoryButton">카테고리3</button>
                        <span className="CategoryNotice">카테고리를 한 개 이상 입력해 주세요.</span>
                    </div>
                    </div>

                    <div className="ContentRow ">
                    <p className="Label">본문</p>
                    <textarea className="ContentArea" />
                    </div>
                    </div>

                    <div className="BottomContainer">
                        <div className="AnonymousCheck">
                            <input type="checkbox" className="CheckBox" />
                            <span>익명체크</span>
                        </div>
                        <button className="SubmitButton">등록하기</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
