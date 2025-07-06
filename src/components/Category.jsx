import { Link } from "react-router-dom";
import "./Category.css";

export default function Category({ title, image, badge, link, description }) {
    return (
        <Link to={link} className="cat-container">
            <div className="img-wrapper">
                <img src={image} alt={title} className="cat-img" />
                <div className="p-wrapper">
                    <p className="cat-title">{title}</p>
                    <p className="badge-ex">진심을 다한 답변으로 <span className="badge-anim">[{badge}]</span> 뱃지를 얻을 수 있어요.</p>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    );
}