import React from 'react';
import {useTranslation} from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import "./style.scss";

function AboutUs() {
    const {t} = useTranslation();
    return (
        <div className="container-about">
            <Navbar/>
            <div className="content">
                <div className="video">
                    <img src="./images/home-image.jpg" alt=""/>
                </div>
                <div className="text">
                    <p>{t('aboutus')}</p>
                    <p className="main-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem blanditiis ea error ipsam
                        iusto officiis quos reiciendis. Accusamus ad corporis culpa cum cumque delectus dicta dolores
                        ea, earum facere fuga fugit necessitatibus nobis obcaecati optio perspiciatis quia quibusdam
                        quisquam sunt tenetur, ut, vitae voluptate voluptatum! Et excepturi libero omnis repudiandae
                        sapiente sequi unde vitae? Culpa eligendi eum facilis inventore libero sapiente unde
                        voluptatibus? Alias eveniet exercitationem nostrum possimus. Ab consequuntur cum dicta fuga,
                        fugit itaque, labore natus nisi repellat repudiandae, sequi sunt ut voluptatum. Ab adipisci
                        animi dolores fuga illo in ipsa, mollitia, natus nesciunt tenetur ut velit, voluptatum!
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AboutUs;