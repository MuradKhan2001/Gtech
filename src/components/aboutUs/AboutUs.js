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

        <div className="content-wrapper">
            {
                aboutUs.map((item, index)=>{
                    return  <div key={index} className="content">
                        <div className="video">
                            <img src={item.image} alt=""/>
                        </div>
                        <div className="text">
                            <p>
                                {i18next.language === "uz" ? item.translations.uz.name :
                                    item.translations.ru.name}
                            </p>
                            <p className="main-text">
                                {i18next.language === "uz" ? item.translations.uz.description :
                                    item.translations.ru.description}
                            </p>
                        </div>
                    </div>
                })
            }
        </div>


        <Footer/>
    </div>);
}

export default AboutUs;