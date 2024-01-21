import "./style.scss"
import {useContext, useEffect, useState, useRef} from "react";
import axios from "axios";
import {CSSTransition} from "react-transition-group";
import {MyContext} from "../../App/App";

const AddCategory = () => {
    let value = useContext(MyContext);
    const [modalShow, setModalShow] = useState({show: false})
    const nodeRef = useRef(null);
    const [categoryId, setCategoryId] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [categoryNameUz, setCategoryNameUz] = useState("")
    const [categoryNameRu, setCategoryNameRu] = useState("")

    const showModalForm = (status, show) => {
        let modal = {
            show, status
        }
        setModalShow(modal)
    }

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

    useEffect(() => {
        getList();
    }, []);

    const addCategory = () => {
        if (categoryNameUz.trim().length > 0 && categoryNameRu.trim().length > 0) {

            const post = {
                translations: {
                    uz: {
                        name: categoryNameUz
                    }, ru: {
                        name: categoryNameRu
                    }
                }
            };
            axios.post(`${value.url}/api/v1/category/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                getList();
                showModalForm("", false)
            })

        } else alert("Kategoruya nomini kiriting")
    }

    const delCategory = (id) => {
        axios.delete(`${value.url}/api/v1/category/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            getList();
        })
    }

    const getEditId = (ind, id) => {
        setCategoryNameUz(categoryList[ind].translations.uz.name)
        setCategoryNameRu(categoryList[ind].translations.ru.name)
        setCategoryId(id)
    }

    const editCategory = () => {
        if (categoryNameUz.trim().length > 0 && categoryNameRu.trim().length > 0) {

            const post = {
                translations: {
                    uz: {
                        name: categoryNameUz
                    }, ru: {
                        name: categoryNameRu
                    }
                }
            };
            axios.put(`${value.url}/api/v1/category/${categoryId}/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                getList();
                showModalForm("", false)
            })

        } else alert("Kategoruya nomini kiriting")

    }

    return <div className="category-container">
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
                            Kategoriya qo'shish
                        </div>

                        <div className="form-order-info">
                            <input onChange={(e) => setCategoryNameUz(e.target.value)} placeholder="Kategoriya nomi"
                                   type="text"/>
                            <input onChange={(e) => setCategoryNameRu(e.target.value)}
                                   placeholder="Название категории" type="text"/>

                            <div onClick={addCategory} className="add-button">
                                Qo'shish
                            </div>
                        </div>
                    </div>}

                    {modalShow.status === "edit" && <div className="edit-box">
                        <div className="cancel-btn">
                            <img onClick={() => showModalForm("", false)} src="./images/x.png" alt=""/>
                        </div>

                        <div className="title">
                            Kategoriyani tahrirlash
                        </div>

                        <div className="form-order-info">
                            <input value={categoryNameUz} onChange={(e) => setCategoryNameUz(e.target.value)}
                                   placeholder="Kategoriya nomi"
                                   type="text"/>
                            <input value={categoryNameRu} onChange={(e) => setCategoryNameRu(e.target.value)}
                                   placeholder="Название категории" type="text"/>

                            <div onClick={editCategory} className="add-button">
                                Tahrirlash
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </CSSTransition>

        <div className="header-side">
            <div onClick={() => showModalForm("add", true)} className="add-catolog">
                Kategoriya qo'shish +
            </div>
        </div>

        <div className="content-box">
            {categoryList.map((item, index) => {
                return <div key={index} className="content">
                    <div className="names">
                        <div className="title"><div>UZ:</div>{item.translations.uz.name}</div>
                        <div className="title"><div>RU:</div>{item.translations.ru.name}</div>
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

export default AddCategory