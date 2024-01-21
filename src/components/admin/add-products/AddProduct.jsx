import "./style.scss"
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useContext, useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import axios from "axios";
import {MyContext} from "../../App/App";
import Slider from "react-slick";
import DOMPurify from 'dompurify';

const AddProduct = () => {
    let value = useContext(MyContext);
    const [modalShow, setModalShow] = useState({show: false})
    const nodeRef = useRef(null);
    const showModalForm = (status, show) => {
        let modal = {
            show,
            status
        }
        setModalShow(modal)
    }
    const [photos, setPhotos] = useState(null)
    const [main, setMain] = useState(false)
    const [price, setPrice] = useState("")
    const [EditorContentUz, setEditorContentUz] = useState("")
    const [EditorContentRu, setEditorContentRu] = useState("")
    const [nameUz, setNameUz] = useState("")
    const [nameRu, setNameRu] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [subcategoryId, setSubcategoryId] = useState("")
    const [productList, setProductList] = useState([])
    const [productId, setProductId] = useState("")

    const handleEditorChangeUz = (event, editor) => {
        const data = editor.getData();
        setEditorContentUz(data);
    };
    const handleEditorChangeRu = (event, editor) => {
        const data = editor.getData();
        setEditorContentRu(data);
    };

    const getInputPhoto = (event) => {
        const {target: {files}} = event;
        let photo_list = []
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = function () {
                let obj = {image: reader.result}
                photo_list.push(obj);
                setPhotos(photo_list)
            };
        }
    };

    const updateInputPhoto = (event) => {
        const {target: {files}} = event;
        let photo_list = []
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = function () {
                let obj = {image: reader.result}
                photo_list.push(obj);
                if (photo_list.length === files.length) {
                    // setPhotos(photo_list)
                    axios.post(`${value.url}/api/v1/product/${productId}/add_photo/`, {photos: photo_list}, {
                        headers: {
                            "Authorization": `Token ${localStorage.getItem("token")}`
                        }
                    }).then((response) => {
                        console.log(response.data)
                        getProducts(subcategoryId)
                    });
                }
            };
        }
    };

    const getList = () => {
        axios.get(`${value.url}/api/v1/category/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setCategoryList(response.data);
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("token");
            }
        });


    };

    const getProducts = (e) => {
        axios.get(`${value.url}/api/v1/product/?category=${e}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setProductList(response.data)
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("token");
            }
        });

    }
    const filterSubcategory = (id) => {
        setCategoryId(id)
        setSubcategoryId("")
        axios.get(`${value.url}/api/v1/subcategory/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            let newList = response.data.filter((item) => item.category == id)
            setSubcategoryList(newList);
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("token");
            }
        });

    }

    useEffect(() => {
        getList();
    }, []);

    const getEditId = (ind, id) => {
        setNameUz(productList[ind].translations.uz.name)
        setNameRu(productList[ind].translations.ru.name)
        setEditorContentUz(productList[ind].translations.uz.description)
        setEditorContentRu(productList[ind].translations.ru.description)
        setPrice(productList[ind].price)
        setMain(productList[ind].main)
        setProductId(id)
    }

    const editProduct = () => {
        if (price.trim().length > 0 && nameUz.trim().length > 0
            && nameRu.trim().length > 0 && EditorContentRu.trim().length > 0 && EditorContentUz.trim().length > 0) {

            const post = {
                translations: {
                    uz: {
                        name: nameUz,
                        description: EditorContentUz
                    },
                    ru: {
                        name: nameRu,
                        description: EditorContentRu
                    },
                },
                subcategory: subcategoryId,
                main,
                price
            };

            console.log(post)
            axios.put(`${value.url}/api/v1/product/${productId}/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                getProducts(subcategoryId)
                setEditorContentRu("")
                setEditorContentUz("")
                setPrice("")
                setNameUz("")
                setNameRu("")
                showModalForm("", false)
            })


        } else alert("Formani toldiring")
    }

    const delImage = (id) => {
        axios.delete(`${value.url}/api/v1/photo/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            getProducts(subcategoryId)
        })
    }
    const deleteProduct = (id) => {
        axios.delete(`${value.url}/api/v1/product/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            getProducts(subcategoryId)
        })
    }
    const addProduct = () => {
        if (price.trim().length > 0 && nameUz.trim().length > 0
            && nameRu.trim().length > 0 && EditorContentRu.trim().length > 0 && EditorContentUz.trim().length > 0) {

            const post = {
                translations: {
                    uz: {
                        name: nameUz,
                        description: EditorContentUz
                    },
                    ru: {
                        name: nameRu,
                        description: EditorContentRu
                    },
                },
                subcategory: subcategoryId,
                main,
                price,
                photos: photos
            };

            axios.post(`${value.url}/api/v1/product/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                getProducts(subcategoryId)
                setEditorContentRu("")
                setEditorContentUz("")
                setPrice("")
                setNameUz("")
                setNameRu("")
                showModalForm("", false)
            })


        } else alert("Formani toldiring")
    }

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

    return <div className="drivers-container">
        <CSSTransition
            in={modalShow.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">

                    {modalShow.status === "add" &&
                        <div className="add-box">
                            <div className="cancel-btn">
                                <img onClick={() => showModalForm("", false)} src="./images/x.png" alt=""/>
                            </div>
                            <div className="title">
                                Maxsulot qo'shish
                            </div>

                            <div className="form-order-info">
                                <div className="header">
                                    <label htmlFor="photo">Maxsulot rasmi: </label>
                                    <input onChange={getInputPhoto} id="photo" className="add-photo" type="file"
                                           multiple={true}/>

                                    <label htmlFor="check">Tanlanganlar qatoriga qo'shish: </label>
                                    <input onClick={() => setMain(prevState => !prevState)} id="check" type="checkbox"/>

                                    <label onChange={(e) => setPrice(e.target.value)} className="price"
                                           htmlFor="price">Narx: </label>
                                    <input onChange={(e) => setPrice(e.target.value)} className="price-input" id="price"
                                           type="text"/>
                                </div>


                                <div className="bottom-side">
                                    <div className="sides">
                                        <input onChange={(e) => setNameUz(e.target.value)} placeholder="Sarlavha"
                                               type="text"/>
                                        <div className="ckeditor">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={EditorContentUz}
                                                onChange={handleEditorChangeUz}/>
                                        </div>
                                    </div>
                                    <div className="sides">
                                        <input onChange={(e) => setNameRu(e.target.value)} placeholder="Заголовок"
                                               type="text"/>
                                        <div className="ckeditor">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={EditorContentRu}
                                                onChange={handleEditorChangeRu}/>
                                        </div>
                                    </div>
                                </div>

                                <div onClick={addProduct} className="add-button">
                                    Qo'shish
                                </div>
                            </div>
                        </div>
                    }

                    {modalShow.status === "edit" &&
                        <div className="edit-box">
                            <div className="cancel-btn">
                                <img onClick={() => showModalForm("", false)} src="./images/x.png" alt=""/>
                            </div>
                            <div className="title">
                                Maxsulotni tahrirlash
                            </div>
                            <div className="form-order-info">
                                <div className="header">
                                    <label htmlFor="check">Tanlanganlar qatoriga qo'shish: </label>
                                    <input onClick={() => setMain(prevState => !prevState)} id="check" type="checkbox"
                                           checked={main}/>

                                    <label onChange={(e) => setPrice(e.target.value)} className="price"
                                           htmlFor="price">Narx: </label>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)}
                                           className="price-input" id="price"
                                           type="text"/>
                                </div>
                                <div className="bottom-side">
                                    <div className="sides">
                                        <input value={nameUz} onChange={(e) => setNameUz(e.target.value)}
                                               placeholder="Sarlavha"
                                               type="text"/>
                                        <div className="ckeditor">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={EditorContentUz}
                                                onChange={handleEditorChangeUz}/>
                                        </div>
                                    </div>
                                    <div className="sides">
                                        <input value={nameRu} onChange={(e) => setNameRu(e.target.value)}
                                               placeholder="Заголовок"
                                               type="text"/>
                                        <div className="ckeditor">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={EditorContentRu}
                                                onChange={handleEditorChangeRu}/>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={editProduct} className="add-button">
                                    Tahrirlash
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </CSSTransition>

        <div className="header-side">
            <div className="categories">
                <label htmlFor="category">Kategoriyani tanlang:</label>
                <select onChange={(e) => filterSubcategory(e.target.value)} name="category"
                        id="category">
                    <option value="">---</option>
                    {categoryList.map((item, index) => {
                        return <option key={index} value={item.id}>
                            {item.translations.uz.name}
                        </option>
                    })}
                </select>

                <label htmlFor="category">Subkategoriyani tanlang:</label>
                <select value={subcategoryId} onChange={(e) => {
                    setSubcategoryId(e.target.value)
                    getProducts(e.target.value)
                }} name="" id="">
                    <option disabled={true} selected={true} value="">--</option>
                    {subcategoryList.map((item, index) => {
                        return <option key={index} value={item.id}>
                            {item.translations.uz.name}
                        </option>
                    })}
                </select>
            </div>
            <div onClick={() => subcategoryId ? showModalForm("add", true) : ""} className="add-catolog">
                Maxsulot qo'shish +
            </div>
        </div>

        <div className="content-box">
            {productList.map((item, index) => {
                return <div key={index} className="content">
                    <div className="photo">
                        <Slider {...settingsThree} >
                            {item.images.map((item, index) => {
                                return <div key={index} className="img-box">
                                    <img src={item.image} alt=""/>
                                    <img onClick={() => delImage(item.id)} className="del-img" src="./images/bin.png"
                                         alt=""/>
                                </div>
                            })}
                        </Slider>
                    </div>
                    <div className="add-btn">
                        <img src="./images/add.png" alt=""/>
                        <input onClick={() => setProductId(item.id)} onChange={updateInputPhoto} multiple={true}
                               type="file"/>
                    </div>
                    <div className="title">
                        {item.translations.uz.name}
                    </div>
                    <div className="price">
                        <img src="./images/money.png" alt=""/>
                        {item.price}
                    </div>
                    <div className="description">
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.translations.uz.description)}}/>
                    </div>
                    <div className="buttons">
                        <div onClick={() => {
                            showModalForm("edit", true)
                            getEditId(index, item.id)
                        }} className="edit-button">
                            Tahrirlash
                        </div>
                        <div onClick={() => deleteProduct(item.id)} className="del-button">
                            O'chirish
                        </div>
                    </div>
                </div>
            })}
        </div>

    </div>
}

export default AddProduct