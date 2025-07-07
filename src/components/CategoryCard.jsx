import "./Category.css";

export default function Category({ title, image, badge, description }) {
    return (
        <div className="cat-container">
            <div className="img-wrapper">
                <img src={image} alt={title} className="cat-img" />
                <div className="p-wrapper">
                    <p className="cat-title">{title} 카테고리</p>
                    <p className="badge-ex">진심을 다한 답변으로 <span className="badge-anim">[{badge}]</span> 뱃지를 얻을 수 있어요.</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}