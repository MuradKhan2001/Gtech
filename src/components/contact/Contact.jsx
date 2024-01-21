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
    const {t} = useTranslation();
    const [map, setMap] = useState(false)

    return <div className="about-us-container">
        <Navbar/>

        <div className="home_sections">
            <div className="title_home_two">
                <div className="text_title">
                    {t("tariff")}
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
                            {t("phone")}
                        </div>
                        <div className="text">
                            +998 90 135 99 99
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="img-box">
                        <img src="./images/poi.png" alt=""/>
                    </div>

                    <div className="mobile-box">
                        <div className="name-box">
                            {t("address")}
                        </div>
                        <div className="text">
                            {t("address-info")}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="img-box">
                        <img src="./images/telegram.png" alt=""/>
                    </div>
                    <div className="mobile-box">
                        <div className="name-box">
                            {t("tg")}
                        </div>
                        <div className="text">
                            @globalTechno
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => setMap(!map)} className="map-navbar">
                <img src="./images/map.png" alt=""/>
                <span> {t("map")}</span>
                <img className={map ? "arrow-icon" : ""} src="./images/next_ui.png" alt=""/>
            </div>

            {map && <div className="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d890.8062315304869!2d69.23076028341168!3d41.324050987067594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzI1LjkiTiA2OcKwMTMnNTMuNyJF!5e0!3m2!1sru!2s!4v1705608717834!5m2!1sru!2s"
                    allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>}

        </div>

        <Footer/>

    </div>
}

export default Contact