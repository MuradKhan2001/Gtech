import React from 'react';
import {useTranslation} from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

function AboutUs() {
    const {t} = useTranslation();
    return (
        <div className="container-about">
            <Navbar/>
            <div className="content">
                <div className="video">
                    <img src="./images/about4.jpg" alt=""/>
                </div>
                <div className="text">
                    <p>{t('aboutUs')}</p>
                    <p className="main-text">
                        {t('aboutUsText')}
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AboutUs;