import {useState, useEffect, useContext} from "react";
import {useNavigate, Route, Routes, NavLink} from "react-router-dom";
import "./admin.scss"
import {adminPageRoutes} from "../../../rootes";
import {MyContext} from "../../App/App";


const Admin = () => {
    let value = useContext(MyContext);
    const navigate = useNavigate();
    const [adminMenu, setAdminMenu] = useState(false)

    const menues = [
        {
            name: "Bosh sahifa",
            url: "/",
            img: "../images/admin/dashboard.png"
        },
        {
            name: "Mijozlar",
            url: "/clients",
            img: "../images/admin/customer.png"
        },
        {
            name: "Kategoriya",
            url: "/add-category",
            img: "../images/admin/menu.png"
        },
        {
            name: "Subkategoiya",
            url: "/add-subcategory",
            img: "../images/admin/component.png"
        },
        {
            name: "Maxsulot qo'shish",
            url: "/add-product",
            img: "../images/admin/ecommerce.png"
        },
        {
            name: "Kataloglar",
            url: "/category-info",
            img: "../images/admin/products.png"
        },
        {
            name: "Kompyuter uchun rasmlar",
            url: "/home-image",
            img: "../images/admin/photo.png"
        },
        {
            name: "Telefon uchun rasmlar",
            url: "/mobile-image",
            img: "../images/admin/photo.png"
        },
        {
            name: "Hamkorlar",
            url: "/partners",
            img: "../images/admin/handshake.png"
        },
        {
            name: "It xizmatlar va yechimlar",
            url: "/about-us",
            img: "../images/admin/info.png"
        },
        {
            name: "Parolni almashtirish",
            url: "/change-password",
            img: "../images/admin/padlock.png"
        },
    ];

    return <div className="admin-home">

        <div className="left-box">

            <div className="logo">
                <img onClick={() => navigate('/')} src="./images/logoTech3.png" alt=""/>
            </div>

            <div className="admin-navbar">
                {
                    menues.map((item, index) => {
                        return <NavLink to={item.url} key={index}
                                        className={`nav-item ${({isActive}) => isActive ? "active" : ""}`}>
                            <img src={item.img} alt=""/>
                            <span>{item.name}</span>
                        </NavLink>
                    })
                }
            </div>

        </div>

        <div className={`right-box ${adminMenu ? "" : "show-right"}`}>
            <div className="top-box">
                <div></div>
                <div className="title">
                    <img src="./images/admin/logo2.png" alt=""/>
                </div>
                <div className="icons">
                    <div onClick={() => {
                        window.location.pathname = "/";
                        localStorage.removeItem("token")
                    }} className="exit"><img src="./images/admin/logout.png" alt=""/></div>
                </div>
            </div>

            <div className="bottom-box">
                <Routes>
                    {
                        adminPageRoutes.map((route, index) => (
                            <Route key={index} {...route} />
                        ))
                    }
                </Routes>
            </div>
        </div>
    </div>
};

export default Admin