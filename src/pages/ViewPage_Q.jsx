import React from "react";
import Layout from "../components/Layout";

export default function ViewPage_Q() {
    const question = {
    title: "",
    body: "",
    author: "",
    created_at: ""
};

    return (
         <Layout>
            <div className="full-container">
                <div className="PageContainer">
                    <div className="top">
                        <p className="TopMessage">{question.title}</p>
                        <div className="ProfileBox">
                            <div className="ProfileCircle"></div>
                            <span className="ProfileName">작성자: {question.author}</span>
                            <span className="ProfileDate">작성일: {question.created_at}</span>
                        </div>
                    </div>

                    <div className="mainbox">
                        <div className="ContentRow">
                            <p className="Label">본문</p>
                            <div className="ContentArea">
                                {question.body}
                            </div>
                        </div>
                    </div>

                    <div className="ButtonRow">
                            <button className="EditButton">수정하기</button>
                            <button className="DeleteButton">삭제하기</button>
                        </div>

                    <div className="BottomContainer">
                        <p className="NoAnswer">아직 등록된 답변이 없어요!</p>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}