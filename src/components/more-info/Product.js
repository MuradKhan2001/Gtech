import React, {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import "./style.scss";
import Slider from "react-slick";
import {CSSTransition} from "react-transition-group";
import axios from "axios";
import {MyContext} from "../App/App";
import i18next from "i18next";
import DOMPurify from 'dompurify';

function Product() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [modalShow, setModalShow] = useState({show: false})
    const nodeRef = useRef(null);
    const [first_name, setFirst_name] = useState("")
    const [phone, setPhone] = useState("")
    const [description, setDescription] = useState("")
    const [product, setProduct] = useState("")
    const settingsThree = {
        lazyLoad: true,
        slidesToShow: 1,
        dots: true,
        infinite: true,
        navs: false,
        speed: 1000,
        autoplay: false,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: 0,
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 1, slidesToScroll: 1, initialSlide: 1
            }
        }, {
            breakpoint: 480, settings: {
                slidesToShow: 1, slidesToScroll: 1
            }
        }]
    };
    const showModalForm = (status, show) => {
        let modal = {
            show, status
        }
        setModalShow(modal)
    }
    const addClient = () => {
        if (first_name.trim().length > 0 && phone.trim().length > 0 && description.trim().length > 0) {
            let client = {
                first_name, description, phone, product: product.id
            }

            axios.post(`${value.url}/api/v1/client/`, client).then((response) => {
                showModalForm("success", true)
                setTimeout(() => {
                    showModalForm("", false)
                }, 3000)
            })

        } else alert("Iltimos formani to'ldiring")
    }

    useEffect(() => {
        axios.get(`${value.url}/api/v1/product/${localStorage.getItem("productId")}`).then((response) => {
            setProduct(response.data)
        })
    }, [])

    return (
        <div className="container-product-info">
            <Navbar/>

            <CSSTransition
                in={modalShow.show}
                nodeRef={nodeRef}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                <div className="modal-sloy">
                    <div ref={nodeRef} className="modal-card">

                        {modalShow.status === "shop" && <div className="shop-box">
                            <div className="cancel-btn">
                                <img onClick={() => showModalForm("", false)} src="./images/x.png" alt=""/>
                            </div>

                            <div className="title">
                                {t("info-shop")}
                            </div>

                            <div className="form-order-info">
                                <input onChange={(e) => setFirst_name(e.target.value)} placeholder={t("name")}
                                       type="text"/>
                                <input onChange={(e) => setPhone(e.target.value)} placeholder={t("phone-number")}
                                       type="text"/>
                                <textarea onChange={(e) => setDescription(e.target.value)}
                                          placeholder={t("more-informetion")}></textarea>
                                <div onClick={addClient} className="add-button">
                                    {t("send")}
                                </div>
                            </div>

                        </div>}

                    </div>
                    {modalShow.status === "success" && <div className="success-box">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>

                    </div>}
                </div>
            </CSSTransition>

            {product ? <div className="content">
                <div className="video">
                    <div className="images-slider">
                        <Slider {...settingsThree} >
                            {product.images.map((item, index) => {
                                return <div key={index} className="img-box">
                                    <img src={item.image} alt=""/>
                                </div>
                            })}
                        </Slider>
                    </div>

                    <div className="price">
                        <img src="./images/money2.png" alt=""/>
                        {product.price}
                    </div>
                </div>
                <div className="text">
                    <p>
                        {product.translations[i18next.language].name}
                    </p>
                    <p className="main-text">
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.translations[i18next.language].description)}}/>
                    </p>

                    <div onClick={() => showModalForm("shop", true)}
                         className="button-shop">
                        <img src="./images/trolley.png" alt=""/>
                        {t("shop")}
                    </div>
                </div>
            </div> :""}
            <Footer/>
        </div>
    );
}

export default Product;