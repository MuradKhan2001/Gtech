import "./style.scss"
import {useContext, useEffect, useRef, useState} from "react";
import {MyContext} from "../../App/App";
import axios from "axios";
import {CSSTransition} from "react-transition-group";

const AboutUsAdmin = () => {
    let value = useContext(MyContext);
    const [modalShow, setModalShow] = useState({show: false})
    const nodeRef = useRef(null);
    const [nameUz, setNameUz] = useState("")
    const [nameRu, setNameRu] = useState("")
    const [descriptionUz, setDescriptionUz] = useState("")
    const [descriptionRu, setDescriptionRu] = useState("")
    const [image, setImage] = useState(null)
    const [catalogList, setCatalogList] = useState([])
    const [catalogId, setCatalogId] = useState("")
    const showModalForm = (status, show) => {
        let modal = {
            show, status
        }
        setModalShow(modal)
    }

    const getInputPhoto = (event) => {
        const {target: {files}} = event;
        const file = files[0];

        function getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setImage(reader.result);
            };
            reader.onerror = function () {
                setImage(null);
            };

        }

        getBase64(file);
    };

    const addCatalog = () => {
        if (nameUz.trim().length > 0 && nameRu.trim().length > 0 && descriptionUz.trim().length > 0 && descriptionRu.trim().length > 0 && image) {
            const post = {
                translations: {
                    uz: {
                        name: nameUz, description: descriptionUz
                    }, ru: {
                        name: nameRu, description: descriptionRu
                    },
                }, photo: image
            };
            axios.post(`${value.url}/api/v1/about-us/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setDescriptionRu("")
                setDescriptionUz("")
                setImage(null)
                setNameUz("")
                setNameRu("")
                showModalForm("", false)
                getCatalogs()
            })

        } else alert("Formani to'ldiring")
    }

    const getEditId = (ind, id) => {
        setNameUz(catalogList[ind].translations.uz.name)
        setNameRu(catalogList[ind].translations.ru.name)
        setDescriptionUz(catalogList[ind].translations.uz.description)
        setDescriptionRu(catalogList[ind].translations.ru.description)
        setCatalogId(id)
        setImage(catalogList[ind].image)
    }

    const getCatalogs = () => {
        axios.get(`${value.url}/api/v1/about-us/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setCatalogList(response.data)
        })
    }

    const editCatalog = () => {
        if (nameUz.trim().length > 0 && nameRu.trim().length > 0 && descriptionUz.trim().length > 0 && descriptionRu.trim().length > 0) {
            const post = {
                translations: {
                    uz: {
                        name: nameUz, description: descriptionUz
                    }, ru: {
                        name: nameRu, description: descriptionRu
                    },
                }, image
            };

            axios.patch(`${value.url}/api/v1/about-us/${catalogId}/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setDescriptionRu("")
                setDescriptionUz("")
                setImage(null)
                setNameUz("")
                setNameRu("")
                showModalForm("", false)
                getCatalogs()
            })

        } else alert("Formani to'ldiring")
    }

    const delCategory = (id) => {
        axios.delete(`${value.url}/api/v1/about-us/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            getCatalogs()
        })
    }

    useEffect(() => {
        getCatalogs();
    }, []);

    return <div className="about-uscontainer ">
        <CSSTransition
            in={modalShow.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">

                    {modalShow.status === "add" && <div className="add-box">
                        <div className="cancel-btn">
                            <img onClick={() => showModalForm("", false)} src="./images/x.png" alt=""/>
                        </div>
                        <div className="title">
                            Ma'lumot qo'shish
                        </div>
                        <div className="form-order-info">
                            <input onChange={getInputPhoto} className="add-photo" type="file"/>

                            <input onChange={(e) => setNameUz(e.target.value)} placeholder="Sarlavha" type="text"/>
                            <textarea onChange={(e) => setDescriptionUz(e.target.value)}
                                      placeholder="Ma'lumot uchun"></textarea>

                            <input onChange={(e) => setNameRu(e.target.value)} placeholder="Заголовок" type="text"/>
                            <textarea onChange={(e) => setDescriptionRu(e.target.value)}
                                      placeholder="Информация"></textarea>

                            <div onClick={addCatalog} className="add-button">
                                Qo'shish
                            </div>
                        </div>
                    </div>}

                    {modalShow.status === "edit" && <div className="edit-box">
                        <div className="cancel-btn">
                            <img onClick={() => showModalForm("", false)} src="./images/x.png" alt=""/>
                        </div>
                        <div className="title">
                            Ma'lumotni tahrirlash
                        </div>
                        <div className="form-order-info">
                            <input onChange={getInputPhoto} className="add-photo" type="file"/>

                            <input value={nameUz} onChange={(e) => setNameUz(e.target.value)} placeholder="Sarlavha"
                                   type="text"/>
                            <textarea value={descriptionUz} onChange={(e) => setDescriptionUz(e.target.value)}
                                      placeholder="Ma'lumot uchun"></textarea>

                            <input value={nameRu} onChange={(e) => setNameRu(e.target.value)} placeholder="Заголовок"
                                   type="text"/>
                            <textarea value={descriptionRu} onChange={(e) => setDescriptionRu(e.target.value)}
                                      placeholder="Информация"></textarea>

                            <div onClick={editCatalog} className="add-button">
                                Tahrirlash
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </CSSTransition>

        <div className="header-side">
            <div onClick={() => showModalForm("add", true)} className="add-catolog">
                Biz haqimizda +
            </div>
        </div>

        <div className="content-box">
            {catalogList.map((item, index) => {
                return <div key={index} className="content">
                    <div className="image-box">
                        <img src={item.image} alt=""/>
                    </div>
                    <div className="title">{item.translations.uz.name}</div>
                    <div className="description">
                        {item.translations.uz.description}
                    </div>
                    <div className="buttons">
                        <div onClick={() => {
                            showModalForm("edit", true)
                            getEditId(index, item.id)
                        }} className="edit-button">
                            Tahrirlash
                        </div>

                        <div onClick={() => delCategory(item.id)} className="del-button">
                            O'chirish
                        </div>
                    </div>
                </div>
            })}


        </div>
    </div>
}

export default AboutUsAdmin