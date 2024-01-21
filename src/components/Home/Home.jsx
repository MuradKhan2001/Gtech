import "./style.scss";
import Navbar from "../Navbar/Navbar";
import {useContext, useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import Footer from "../footer/Footer";
import Carousel from 'react-bootstrap/Carousel';
import Aos from "aos";
import {useTranslation} from "react-i18next";
import {CSSTransition} from "react-transition-group";
import {useNavigate} from "react-router-dom";
import {MyContext} from "../App/App";
import axios from "axios";
import i18next from "i18next";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import {useOnKeyPress} from "../catalog/useOnKeyPress";

const Home = () => {
    let value = useContext(MyContext);
    const [modalShow, setModalShow] = useState({show: false})
    const nodeRef = useRef(null);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [partners, setPartners] = useState([])
    const [imageIndex, setImageIndex] = useState(0);
    const [information, setInformation] = useState([]);
    const [products, setProducts] = useState([])
    const [homePhoto, setHomePhoto] = useState("")
    const [mobileHomePhoto, setMobileHomePhoto] = useState("")
    const [productId, setProductId] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [phone, setPhone] = useState("")
    const [description, setDescription] = useState("")
    const [searchText, setSearchText] = useState("")
    const [countProduct, setCountProduct] = useState("")
    const [counterOn, setCounterOn] = useState(false)

    useEffect(() => {
        axios.get(`${value.url}/api/v1/photo/dashboard/`).then((response) => {
            setHomePhoto(response.data);
        })

        axios.get(`${value.url}/api/v1/photo/mobile/`).then((response) => {
            setMobileHomePhoto(response.data);
        })

        axios.get(`${value.url}/api/v1/photo/partner/`).then((response) => {
            setPartners(response.data);
        })

        axios.get(`${value.url}/api/v1/catalog/`).then((response) => {
            setInformation(response.data)
        })

        axios.get(`${value.url}/api/v1/product/?main=true`).then((response) => {
            setProducts(response.data)
        })

        axios.get(`${value.url}/api/v1/home/`).then((response) => {
            setCountProduct(response.data);
        })

        Aos.init({duration: 600});
    }, []);

    const settings = {
        lazyLoad: true,
        slidesToShow: 5,
        dots: false,
        navs: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: 0,
        beforeChange: (current, next) => setImageIndex(next),
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: false
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 3, slidesToScroll: 1, initialSlide: 1
            }
        }, {
            breakpoint: 480, settings: {
                slidesToShow: 3, slidesToScroll: 1
            }
        }]
    };

    const settingsTwo = {
        lazyLoad: true,
        slidesToShow: 4,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: 0,
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 4, slidesToScroll: 1, infinite: true, dots: false
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

    const settingsHomeSlider = {
        lazyLoad: false,
        slidesToShow: 1,
        dots: false,
        infinite: true,
        fade: true,
        speed: 2000,
        autoplay: true,
        navs: true,
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

    const addClient = () => {
        if (first_name.trim().length > 0 && phone.trim().length > 0 && description.trim().length > 0) {
            let client = {
                first_name, description, phone, product: productId
            }

            axios.post(`${value.url}/api/v1/client/`, client).then((response) => {
                showModalForm("success", true)
                setTimeout(() => {
                    showModalForm("", false)
                }, 3000)
            })

        } else alert(t("formText"))
    }

    const showModalForm = (status, show) => {
        let modal = {
            show, status
        }
        setModalShow(modal)
    }
    const filterProduct = () => {
        navigate("/catalogs")
        sessionStorage.setItem("searchText", searchText)
    }

    useOnKeyPress(filterProduct, 'Enter');

    return <div className="home-wrapper">
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
                            <input onChange={(e) => setFirst_name(e.target.value)} placeholder={t("name")} type="text"/>
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

        <div className="home_page">
            <div className="navbar_box">
                <Navbar/>
            </div>

            <div className="home_contents">
                <div className="search-box">
                    <input onChange={(e) => setSearchText(e.target.value)}
                           placeholder={t("searchProduct")} type="text"/>

                    <div className="icon">
                        <img onClick={filterProduct} src="./images/search.png" alt=""/>
                    </div>
                </div>
                <div className="desctop-slider">
                    <Slider {...settingsHomeSlider}>
                        {homePhoto ? homePhoto.map((item, index) => {
                            return <div key={index}>
                                <img src={item.image} alt=""/>
                            </div>
                        }) : ""}
                    </Slider>
                </div>
                <div className="mobile-slider">
                    <Slider {...settingsHomeSlider}>
                        {mobileHomePhoto ? mobileHomePhoto.map((item, index) => {
                            return <div key={index}>
                                <img src={item.image} alt=""/>
                            </div>
                        }) : ""}
                    </Slider>
                </div>
            </div>
        </div>

        <div className="home_sections">
            <div className="title_home_one">
                <div className="text_title">
                    {t("catalogs")}
                </div>
                <div className="line_title"></div>
            </div>

            <div className="section-one">
                <Carousel data-aos="zoom-in">
                    {information ? information.map((item, index) => {
                        return <Carousel.Item key={index} interval={2000}>
                            <div className="content">
                                <div className="photo">
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className="text">
                                    <h3>{i18next.language === "ru" ? item.translations.ru.name : item.translations.uz.name}</h3>
                                    {i18next.language === "ru" ? item.translations.ru.description : item.translations.uz.description}
                                </div>
                            </div>
                        </Carousel.Item>
                    }) : ""}
                </Carousel>
            </div>

            <div className="title_home_two">
                <div className="text_title">
                    {t("top-products")}
                </div>
                <div className="line_title"></div>
            </div>

            <div className="section-two" data-aos="zoom-in">
                <div className="articles-box">
                    <Slider {...settingsTwo} >
                        {products ? products.map((item, index) => {
                            return <div key={index}>
                                <div className="click-slide-box">
                                    <div className="cardbox">
                                        <div className="photo">
                                            <Slider {...settingsThree} >
                                                {item.images ? item.images.map((item, index) => {
                                                    return <div key={index} className="img-box"><img src={item.image}
                                                                                                     alt=""/></div>
                                                }) : ""}
                                            </Slider>
                                        </div>
                                        <div className="text">
                                            {i18next.language === "uz" ? <h4>
                                                {item.translations.uz.name.length > 16 ?
                                                    <div>{item.translations.uz.name.slice(0, 16)}...</div> : item.translations.uz.name}
                                            </h4> : <h4>
                                                {item.translations.ru.name.length > 16 ?
                                                    <div>{item.translations.ru.name.slice(0, 16)}...</div> : item.translations.ru.name}
                                            </h4>}

                                            <div className="price">
                                                <div className="count">
                                                    <img src="./images/money.png" alt=""/>
                                                    {item.price}
                                                </div>

                                                <div onClick={() => {
                                                    navigate("/product-info")
                                                    localStorage.setItem("productId", item.id)
                                                    setTimeout(() => {
                                                        window.scrollTo(0, 0)
                                                    }, 200)
                                                }} className="more-btn">
                                                    {t("more-info")} <img src="./images/next.png" alt=""/>
                                                </div>

                                            </div>

                                            <div onClick={() => {
                                                showModalForm("shop", true)
                                                setProductId(item.id)
                                            }}
                                                 className="button-shop">
                                                <img src="./images/trolley.png" alt=""/>
                                                {t("shop")}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }) : ""}
                    </Slider>
                </div>
            </div>

            <div className="statistics">
                <div className="right-side">
                    <div className="counts">
                        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                            <div className="count">
                                {counterOn && <CountUp start={0} end={countProduct.product} duration={2} delay={0}/>}
                                +
                            </div>
                        </ScrollTrigger>

                        <div className="name">{t("productCount")}</div>
                    </div>
                    <div className="counts">
                        <div className="count">
                            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                                <div className="count">
                                    {counterOn &&
                                        <CountUp start={0} end={countProduct.partner} duration={2} delay={0}/>}
                                    +
                                </div>
                            </ScrollTrigger>
                        </div>
                        <div className="name">{t("partnersCount")}</div>
                    </div>
                    <div className="counts">
                        <div className="count">
                            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                                <div className="count">
                                    {counterOn &&
                                        <CountUp start={0} end={countProduct.catalog} duration={2} delay={0}/>}
                                    +
                                </div>
                            </ScrollTrigger>
                        </div>
                        <div className="name">{t("catalogsCount")}</div>
                    </div>
                </div>
            </div>

            <div className="title_home_two">
                <div className="text_title">
                    {t("partners")}
                </div>
                <div className="line_title"></div>
            </div>

            <div className="carousel-comment">
                <Slider {...settings}>
                    {partners.map((img, idx) => (
                        <div key={idx} className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                            <img src={img.image} alt={img.img}/>
                        </div>))}
                </Slider>
            </div>
        </div>
        <Footer/>
    </div>
}
export default Home