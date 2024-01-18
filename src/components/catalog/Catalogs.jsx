import {useContext, useState, useRef} from "react";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {CSSTransition} from "react-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";
import {MyContext} from "../App/App";
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";


const Contact = () => {
    let value = useContext(MyContext);
    const nodeRef = useRef(null);
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [languageMenu, setLanguageMenu] = useState(false)
    const [map, setMap] = useState(false)

    const menu = [{
        id: 1, name: t('home'), link: "/"
    }, {
        id: 2, name: t('services'), link: "/"
    }, {
        id: 3, name: t('tariff'), link: "/"
    }, {
        id: 4, name: t('aboutus'), link: "/contact"
    }];

    const language = [{
        code: 'uz', name: 'UZ', country_code: 'uz'
    }, {
        code: 'en', name: 'EN', country_code: 'en'
    }, {
        code: 'ru', name: 'RU', country_code: 'ru'
    }];


    return <div className="about-us-container">
        <Navbar/>

        <div className="home_sections">
            <div className="title_home_two">
                <div className="text_title">
                    Контакты
                </div>
                <div className="line_title"></div>
            </div>

            <div className="contents">
                <div className="content">
                    <div className="img-box">
                        <img src="./images/call.png" alt=""/>
                    </div>
                    <div className="mobile-box">
                        <div className="name-box">
                            Телефон
                        </div>
                        <div className="text">
                            +998 71 120 32 90
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="img-box">
                        <img src="./images/poi.png" alt=""/>
                    </div>

                    <div className="mobile-box">
                        <div className="name-box">
                            Адресс
                        </div>
                        <div className="text">
                            город Ташкент, Янгихаётский район, 1726292, Choshtepa ko`chasi, 38-40-uylari
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="img-box">
                        <img src="./images/email_outlined.png" alt=""/>
                    </div>
                    <div className="mobile-box">
                        <div className="name-box">
                            Почта
                        </div>
                        <div className="text">
                            Test@gmail.com
                        </div>
                    </div>

                </div>
            </div>

            <div onClick={() => setMap(!map)} className="map-navbar">
                <img src="./images/map.png" alt=""/>
                <span> Показать на карте</span>
                <img className={map ? "arrow-icon" : ""} src="./images/next_ui.png" alt=""/>
            </div>

            {map && <div className="map-container">
                <iframe
                    src="https://yandex.uz/map-widget/v1/?ll=69.262049%2C41.344163&mode=poi&poi%5Bpoint%5D=69.279729%2C41.311153&poi%5Buri%5D=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgk3NzEyODg4ODUSFk_Ku3piZWtpc3RvbiwgVG9zaGtlbnQiCg06j4pCFaA-JUI%2C&z=11.9"
                    frameBorder="1" allowFullScreen="true">
                </iframe>
            </div>}

        </div>

        <Footer/>

    </div>
}

export default Contact