import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import "./style.scss";
import axios from "axios";
import {MyContext} from "../App/App";
import i18next from "i18next";

function AboutUs() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [aboutUs, setAboutUs] = useState([])

    useEffect(() => {
        axios.get(`${value.url}/api/v1/about-us/`).then((response) => {
            setAboutUs(response.data)
        })
    }, [])

    return (<div className="container-about">
        <Navbar/>
        <div className="title">{t('aboutus')}</div>
        <div className="content">
            <div className="video">
                {aboutUs[0] ? <img src={aboutUs[0].image} alt=""/> : ""}
            </div>
            <div className="text">
                <p>
                    {aboutUs[0] ? <>
                        {i18next.language === "uz" ? aboutUs[0].translations.uz.name :
                            aboutUs[0].translations.ru.name}
                    </> : ""}
                </p>
                <p className="main-text">
                    {aboutUs[0] ? <>
                        {i18next.language === "uz" ? aboutUs[0].translations.uz.description :
                            aboutUs[0].translations.ru.description}
                    </> : ""}
                </p>
            </div>
        </div>
        <Footer/>
    </div>);
}

export default AboutUs;