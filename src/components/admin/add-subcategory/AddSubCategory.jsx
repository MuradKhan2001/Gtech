import "./style.scss"
import {useContext, useEffect, useState, useRef} from "react";
import axios from "axios";
import {CSSTransition} from "react-transition-group";
import {MyContext} from "../../App/App";

const AddSubCategory = () => {
    let value = useContext(MyContext);
    const [modalShow, setModalShow] = useState({show: false})
    const nodeRef = useRef(null);
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [subcategoryId, setSubcategoryId] = useState("")

    const [subcategoryNameUz, setSubcategoryNameUz] = useState("")
    const [subcategoryNameRu, setSubcategoryNameRu] = useState("")
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

    const addSubcategory = () => {
        if (subcategoryNameUz.trim().length > 0 && subcategoryNameRu.trim().length > 0) {

            const post = {
                translations: {
                    uz: {
                        name: subcategoryNameUz
                    }, ru: {
                        name: subcategoryNameRu
                    }
                }, category: categoryId
            };
            axios.post(`${value.url}/api/v1/subcategory/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                filterSubcategory(categoryId)
                showModalForm("", false)
            })

        } else alert("Kategoruya nomini kiriting")
    }

    const delSubcategory = (id) => {
        axios.delete(`${value.url}/api/v1/subcategory/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            filterSubcategory(categoryId)
        })
    }

    const getEditId = (ind, id) => {
        setSubcategoryNameUz(subcategoryList[ind].translations.uz.name)
        setSubcategoryNameRu(subcategoryList[ind].translations.ru.name)
        setSubcategoryId(id)
    }

    const editSubcategory = () => {
        if (subcategoryNameUz.trim().length > 0 && subcategoryNameRu.trim().length > 0) {

            const post = {
                translations: {
                    uz: {
                        name: subcategoryNameUz
                    }, ru: {
                        name: subcategoryNameRu
                    }
                }, category: categoryId
            };
            axios.put(`${value.url}/api/v1/subcategory/${subcategoryId}/`, post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                filterSubcategory(categoryId)
                showModalForm("", false)
            })

        } else alert("Kategoruya nomini kiriting")

    }

    const filterSubcategory = (id) => {
        setCategoryId(id)

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

    return <div className="subcategory-container">
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
                            <input onChange={(e) => setSubcategoryNameUz(e.target.value)} placeholder="Kategoriya nomi"
                                   type="text"/>
                            <input onChange={(e) => setSubcategoryNameRu(e.target.value)}
                                   placeholder="Название категории" type="text"/>

                            <div onClick={addSubcategory} className="add-button">
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
                            <input value={subcategoryNameUz} onChange={(e) => setSubcategoryNameUz(e.target.value)}
                                   placeholder="Kategoriya nomi"
                                   type="text"/>
                            <input value={subcategoryNameRu} onChange={(e) => setSubcategoryNameRu(e.target.value)}
                                   placeholder="Название категории" type="text"/>

                            <div onClick={editSubcategory} className="add-button">
                                Tahrirlash
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
        </CSSTransition>

        <div className="header-side">

            <div className="category-box">
                <select onChange={(e) => filterSubcategory(e.target.value)} name="category" id="category">
                    <option value="">--- </option>
                    {categoryList.map((item, index) => {
                        return <option  key={index} value={item.id}>
                            {item.translations.uz.name}
                        </option>
                    })}
                </select>
            </div>

            <div onClick={() => categoryId ? showModalForm("add", true) : null} className="add-catolog">
                Subkategoriya qo'shish +
            </div>
        </div>

        <div className="content-box">
            {subcategoryList.map((item, index) => {
                return <div key={index} className="content">
                    <div className="names">
                        <div className="title">
                            <div>UZ:</div>
                            {item.translations.uz.name}</div>
                        <div className="title">
                            <div>RU:</div>
                            {item.translations.ru.name}</div>
                    </div>

                    <div className="buttons">
                        <div onClick={() => {
                            showModalForm("edit", true)
                            getEditId(index, item.id)
                        }} className="edit-button">
                            Tahrirlash
                        </div>
                        <div onClick={() => delSubcategory(item.id)} className="del-button">
                            O'chirish
                        </div>
                    </div>
                </div>
            })}

        </div>
    </div>
}

export default AddSubCategory