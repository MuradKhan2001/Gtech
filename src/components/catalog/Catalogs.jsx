import {useContext, useState, useRef, useEffect} from "react";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {CSSTransition} from "react-transition-group";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import {MyContext} from "../App/App";
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import axios from "axios";
import {useOnKeyPress} from "./useOnKeyPress";
import Loader from "../loader/Loader";

const Catalogs = () => {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [modalShow, setModalShow] = useState({show: false})
    const [categoryList, setCategoryList] = useState([])
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const [subcategoryList, setSubcategoryList] = useState([])
    const [subcategoryId, setSubcategoryId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categoryIndex, setCategoryIndex] = useState("")
    const [productId, setProductId] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [phone, setPhone] = useState("")
    const [description, setDescription] = useState("")
    const [products, setProducts] = useState([])
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
    const worksPage = 12;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;
    const [searchValidate, setSearchValidate] = useState(false)
    const displayWorks = products.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} className="click-slide-box">
            <div className="cardbox">
                <div className="photo">
                    <Slider {...settingsThree} >
                        {item.images ? item.images.map((item, index) => {
                            return <div key={index} className="img-box"><img src={item.image} alt=""/></div>
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
    });
    const pageCount = Math.ceil(products.length / worksPage);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        axios.get(`${value.url}/api/v1/category/`).then((response) => {
            setCategoryList(response.data);
        })
        document.getElementById("search").focus()
        filterProduct()
    }, []);

    const filterProduct = () => {
        setLoader(true)
        axios.get(`${value.url}/api/v1/product/?search=${value.searchText.trim().length > 0 && value.searchText}`).then((response) => {
            if (response.data.length === 0 && value.searchText) {
                setSearchValidate(true)
            } else setSearchValidate(false)
            setProducts(response.data)
            setLoader(false)
        })
        setProducts([])
        setSubcategoryId("")
        setSubcategoryList([])
        setCategoryId("")
        setCategoryIndex("")
    }

    const filterSubcategory = (id, ind) => {
        setCategoryId(id)
        setCategoryIndex(ind)
        axios.get(`${value.url}/api/v1/subcategory/`).then((response) => {
            let newList = response.data.filter((item) => item.category == id)
            setSubcategoryList(newList);
        })

    }

    const getProducts = (e) => {
        setLoader(true)
        axios.get(`${value.url}/api/v1/product/?category=${e}`).then((response) => {
            setProducts(response.data)
            setLoader(false)
        })
    }

    const changePage = ({selected}) => {
        setPageNumber(selected)
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

    useOnKeyPress(filterProduct, 'Enter');

    return <div className="catalog-wrapper">
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

        <Navbar/>
        <div className={`catalog-container ${products.length === 0 ? "v100" : ""}`}>
            <div className="header-side-catalog">
                <div className="icon-filter">
                    <div className="top-btn">
                        <img src="./images/panel.png" alt=""/>
                        <div className="text">
                            {t("category")}
                        </div>
                    </div>

                    <div className="category-list">
                        {categoryList.map((item, index) => {
                            return <div onClick={() => filterSubcategory(item.id, index)} className="item-category"
                                        key={index}>
                                {item.translations[i18next.language].name}
                            </div>
                        })}
                    </div>

                </div>
                <div className="search-box">
                    <input id="search" value={value.searchText} onChange={(e) => {
                        value.setSearchText(e.target.value)
                        setSearchValidate(false)
                    }}
                           placeholder={t("searchProduct")} type="text"/>

                    <div onClick={filterProduct} className="icon">
                        <img src="./images/search.png" alt=""/>
                    </div>
                </div>
                <div></div>
            </div>

            <div className="category-name">
                {categoryList && categoryIndex !== "" ? categoryList[categoryIndex].translations[i18next.language].name : ""}
            </div>

            <div className="subcategory-box">
                {subcategoryList.map((item, index) => {
                    return <div key={index}>
                        <div onClick={() => {
                            setSubcategoryId(item.id)
                            getProducts(item.id)
                            value.setSearchText("")
                        }} className={`sub-category ${subcategoryId === item.id ? "active" : ""} `}>
                            {item.translations.uz.name}
                        </div>
                    </div>
                })}
            </div>

            <div className="content">
                <div className="row">
                    {searchValidate ? <div className="serach-validate">{t("searchValidate")}</div> : ""}
                    {loader ? <Loader/> : displayWorks}
                </div>
                {
                    products.length > 0 ?
                        <ReactPaginate
                            previousLabel={<img src="./images/work-pagination-prev.png" alt=""/>}
                            nextLabel={<img src="./images/work-pagination-next.png" alt=""/>}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledCalassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        /> : ""

                }
            </div>
        </div>
        <Footer/>

    </div>
}

export default Catalogs